import { Link, redirect, useActionData, useFetcher, useLoaderData, type ActionFunctionArgs } from "react-router";
import type { Route } from "../+types/home";
import { EmployeeTable } from "~/components/employees/employee-table";
import { Button } from "~/components/ui/button";
import type { EmployeeResponseDTO, FindAllEmployeesRequestDTO, UpdateEmployeeRequestDTO } from "~/types/employee";
import { employeeService } from "~/services/employment-service";
import { EmployeeFilter } from "~/components/employees/employee-filter";
import { ApiError } from "~/lib/api-client";
import { toast } from "sonner";
import { useEffect } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Empleados" },
    { name: "description", content: "Listado y gestión de empleados" },
  ];
}

export const handle = {
  crumb: "Empleados",
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const filters: FindAllEmployeesRequestDTO = {};
  if (params.q && params.q.trim() !== "") filters.q = params.q.trim();
  if (params.department && params.department.trim() !== "")
    filters.department = params.department.trim();

  if (params.isActive && params.isActive !== "all") {
    filters.isActive = params.isActive === "true";
  }

  try {
    const employees = await employeeService.getAllEmployees(filters);
    return Response.json(employees);
  } catch (error) {
    console.error("Error al cargar empleados:", error);
    return Response.json([], { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const cui = formData.get("cui") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/employees";

  if (!cui) {
    return { error: "No se proporcionó el CUI del empleado" };
  }

  const updateRequest = {
    fullname: formData.get("fullname") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    igssPercent: Number(formData.get("igssPercent")) / 100,
    irtraPercent: Number(formData.get("irtraPercent")) / 100,
  };

  try {
    const result = await employeeService.updateEmployee(cui, updateRequest);
    return redirect(redirectTo);
  } catch (error: any) {
    console.error("Error al actualizar empleado:", error);

    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;
        return {
          errors: errorData.errors || {},
          error:
            errorData.detail ||
            errorData.message ||
            `Error ${error.status}`,
        };
      } catch (parseError) {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }

    return { error: error.message || "Error al actualizar empleado" };
  }
}


export default function EmployeesPage() {
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;
  const employees = useLoaderData<typeof loader>() as EmployeeResponseDTO[];
  const fetcher = useFetcher();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
    if (actionData?.success) {
      toast.success(actionData.success);
    }
  }, [actionData]);

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
        <p className="text-muted-foreground">
          Gestiona los empleados registrados en el sistema.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 w-full">
        <div className="flex-1">
          <EmployeeFilter />
        </div>

        <div className="flex lg:justify-start justify-end">
          <Button asChild >
            <Link to="/employees/hire">Contratar empleado</Link>
          </Button>
        </div>
      </div>


      <EmployeeTable data={employees} />
    </section>
  );
}
