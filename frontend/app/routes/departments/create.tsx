import { redirect, type ActionFunctionArgs } from "react-router";
import type { CreateDepartmentRequest } from "~/types/department";
import { ApiError } from "~/lib/api-client";
import { departmentService } from "~/services/department-service";
import { DepartmentForm } from "~/components/departments/department-form";
import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva area" },
    { name: "description", content: "Crear area" },
  ];
}

export const handle = {
  crumb: "Crear area"
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const departmentData: CreateDepartmentRequest = {
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      description: (formData.get("description") as string) || "",
    };

    await departmentService.createDepartment(departmentData);
    return redirect("/departments");
  } catch (error: any) {
    console.error("Action error:", error);

    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;

        return {
          errors: errorData.errors || {},
          error: errorData.detail || errorData.message || `Error ${error.status}`,
        };
      } catch (parseError) {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }

    return { error: error.message || "Error al crear el departamento" };
  }
}

export default function CreateDepartmentPage() {
  return (
    <section className="p-6">
      <DepartmentForm />
    </section>
  )
}