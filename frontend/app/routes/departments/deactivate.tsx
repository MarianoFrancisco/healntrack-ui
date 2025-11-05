import { redirect, type ActionFunctionArgs } from "react-router";
import { departmentService } from "~/services/department-service";
import { ApiError } from "~/lib/api-client";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const code = formData.get("id") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/departments";

  if (!code) {
    return { error: "No se proporcionó el código del departamento" };
  }

  try {
    await departmentService.deactivateDepartment(code);
    return redirect(redirectTo);
  } catch (error: any) {
    console.error("Error al desactivar departamento:", error);

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

    return { error: error.message || "Error al desactivar el departamento" };
  }
}
