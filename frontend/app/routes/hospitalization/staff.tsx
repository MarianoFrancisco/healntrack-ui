import { useLoaderData, useActionData, useFetcher, Form, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { toast } from "sonner";
import { employeeService } from "~/services/employment-service";
import type { EmployeeResponseDTO } from "~/types/employee";
import type { Route } from "../+types/home";
import { hospitalizationService } from "~/services/hospitalization/hospitalization-service";
import type { HospitalizationResponseComplete } from "~/types/hospitalization/hospitalization";
import { StaffManageForm } from "~/components/hospitalization/add-staff-form";
import { useEffect } from "react";
import { StaffTable } from "~/components/hospitalization/staff-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gestión de staff", name: "description", content: "Asignación de personal a hospitalización" },
  ];
}

export const handle = {
  crumb: "Gestión de staff",
};

export async function loader({ params }: LoaderFunctionArgs) {
  const hospitalizationId = params.id as string;

  const [hospitalization, allEmployees] = await Promise.all([
    hospitalizationService.getHospitalizationById(hospitalizationId),
    employeeService.getAllEmployees({ isActive: true }),
  ]);

  // Filtrar empleados por departamento
  const filteredEmployees = allEmployees.filter((e) =>
    ["MED-025", "ENF-025", "ESP-025"].includes(e.department.code)
  );

  return Response.json({ hospitalization, employees: filteredEmployees });
}


export async function action({ request, params }: ActionFunctionArgs) {
  const hospitalizationId = params.id as string;
  const formData = await request.formData();
  const employeeId = formData.get("employeeId") as string;
  const assignedAt = formData.get("assignedAt") as string | null;

  try {
    if (assignedAt) {
      // Asignar staff
      await hospitalizationService.addStaffAssignment(hospitalizationId, { employeeId, assignedAt });
      toast.success("Empleado asignado correctamente");
    } else {
      // Remover staff
      await hospitalizationService.removeStaffAssignment(hospitalizationId, { employeeId });
      toast.success("Empleado desasignado correctamente");
    }
    return redirect(`/hospitalizations/${hospitalizationId}/staff`);
  } catch (error: any) {
    console.error("Error gestionando staff:", error);
    return { error: error.response.detail || "Error al agregar staff" };
  }
}

export default function StaffPage() {
  const { hospitalization, employees } = useLoaderData<typeof loader>() as {
    hospitalization: HospitalizationResponseComplete;
    employees: EmployeeResponseDTO[];
  };
  const actionData = useActionData() as { error?: string };

  const fetcher = useFetcher();

    useEffect(() => {
    if (actionData?.error) toast.error(actionData.error);
    // if (actionData?.success) toast.success(actionData.success);
  }, [actionData]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de staff</h1>
        <p className="text-muted-foreground">
          Asignación y desasignación de empleados para la hospitalización de {hospitalization.patient.fullName}.
        </p>
      </div>
      {/* Formulario de asignación */}
      <StaffManageForm employees={employees} hospitalizationId={hospitalization.id} />

      {/* Tabla de staff asignado */}
      <StaffTable
  data={hospitalization.staffAssignment.map((sa) => ({
    employee: sa.employee,
    assignedAt: sa.assignedAt,
  }))}
/>
    </section>
  );
}
