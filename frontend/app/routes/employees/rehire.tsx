import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router";
import { departmentService } from "~/services/department-service";
import { ApiError } from "~/lib/api-client";
import type { Route } from "../+types/home";
import type { ComboboxOption } from "~/components/common/combobox-option";
import { employeeService } from "~/services/employment-service";
import { RehireEmployeeForm } from "~/components/employees/rehire-employee-form";
import type { RehireEmployeeRequestDTO } from "~/types/employee";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recontratar empleado" },
    { name: "description", content: "Página para recontratar empleados" },
  ];
}

export const handle = {
  crumb: "Recontratar empleado",
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.cui) throw new Error("No se proporcionó el CUI del empleado");

  try {
    const [employee, departments] = await Promise.all([
      employeeService.getEmployee(params.cui),
      departmentService.getAllDepartments(),
    ]);

    const departmentOptions: ComboboxOption[] = departments.map((d: any) => ({
      value: d.code,
      label: d.name,
    }));

    return { employee, departments: departmentOptions };
  } catch (error) {
    console.error("Error en loader de rehire:", error);
    throw error;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.cui) throw new Error("No se proporcionó el CUI del empleado");

  const formData = await request.formData();

  try {
    const rehireData: RehireEmployeeRequestDTO = {
      phoneNumber: formData.get("phoneNumber") as string,
      departmentCode: formData.get("departmentCode") as string,
      newSalary: parseFloat(formData.get("salary") as string),
      igssPercent: Number(formData.get("igssPercent")) / 100,
      irtraPercent: Number(formData.get("irtraPercent")) / 100,
      startDate: formData.get("startDate") as string,
      notes: (formData.get("notes") as string) || "",
    };

    await employeeService.rehireEmployee(params.cui, rehireData);
    return redirect("/employees/history");
  } catch (error: any) {
    console.error("Error en action de rehire:", error);

    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;
        return {
          errors: errorData.errors || {},
          error:
            errorData.detail ||
            errorData.message ||
            `Error ${error.status || ""} al recontratar empleado`,
        };
      } catch (parseError) {
        return { error: "Error al procesar la respuesta del servidor" };
      }
    }

    return { error: error.message || "Error desconocido al recontratar empleado" };
  }
}

export default function RehireEmployeePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <section className="p-6">
      <RehireEmployeeForm departments={data?.departments ?? []} employee={data?.employee} />
    </section>
  );
}
