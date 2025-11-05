// routes/departments/edit.tsx
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { DepartmentForm } from "~/components/departments/department-form";
import type { DepartmentResponseDTO, UpdateDepartmentRequest } from "~/types/department";
import { departmentService } from "~/services/department-service";
import { ApiError } from "~/lib/api-client";

// Loader para obtener la info del departamento
export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Error("No se proporcionó el código del departamento");

  try {
    const department = await departmentService.getDepartment(params.id);
    return department;
  } catch (error) {
    console.error("Loader error:", error);
    throw error;
  }
}

// Action para actualizar
export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) throw new Error("No se proporcionó el código del departamento");

  const formData = await request.formData();

  try {
    const updateData: UpdateDepartmentRequest = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || "",
    };

    await departmentService.updateDepartment(params.id, updateData);
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

    return { error: error.message || "Error al actualizar el departamento" };
  }
}

export default function EditDepartmentPage({ loaderData }: { loaderData: DepartmentResponseDTO }) {
  return (
    <section className="p-6">
      <DepartmentForm department={loaderData} />
    </section>
  );
}
