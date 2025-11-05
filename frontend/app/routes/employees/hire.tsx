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
import { EmployeeHireForm } from "~/components/employees/employee-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contratar empleado" },
    { name: "description", content: "Página para contratar nuevos empleados" },
  ];
}

export const handle = {
  crumb: "Contratar empleado",
};

export async function loader({}: LoaderFunctionArgs) {
  try {
    const departments = await departmentService.getAllDepartments();

    const departmentOptions: ComboboxOption[] = departments.map((d: any) => ({
      value: d.code,
      label: d.name,
    }));

    return { departments: departmentOptions };
  } catch (error) {
    console.error("Error cargando departamentos:", error);
    return { departments: [] };
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const hireEmployeeRequest = {
      cui: formData.get("cui") as string,
      nit: formData.get("nit") as string,
      fullname: formData.get("fullname") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      birthDate: formData.get("birthDate") as string,
      departmentCode: formData.get("departmentCode") as string,
      startDate: formData.get("startDate") as string,
      salary: parseFloat(formData.get("salary") as string),
      igssPercent: Number(formData.get("igssPercent")) / 100,
      irtraPercent: Number(formData.get("irtraPercent")) / 100,
      notes: (formData.get("notes") as string) || "",
    };

    await employeeService.hireEmployee(hireEmployeeRequest);

    return redirect("/employees");
  } catch (error: any) {
    console.error("Error al contratar empleado:", error);

    if (error instanceof ApiError && error.response) {
      const errorData = (error.response as any).data || error.response;

      return {
        errors: errorData.errors || {},
        error: errorData.detail || errorData.message || `Error ${error.status}`,
      };
    }

    return { error: error.message || "Error al contratar empleado" };
  }
}

export default function HireEmployeePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <section className="p-6">
      <EmployeeHireForm departments={data?.departments ?? []} />
    </section>
  );
}
