import { redirect, type ActionFunctionArgs } from "react-router";
import { ApiError } from "~/lib/api-client";
import { employeeService } from "~/services/employment-service";

export async function action({ request, params }: ActionFunctionArgs) {
  console.log("Edit Employee action called MANUEL");
  const formData = await request.formData();
  const cui = params.cui as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/employees";

  if (!cui) {
    return { error: "No se proporcionó el CUI del empleado" };
  }

  const updateRequest = {
    fullname: formData.get("fullname") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    igssPercent: Number(formData.get("igssPercent")),
    irtraPercent: Number(formData.get("irtraPercent")),
  };

  try {
    const result = await employeeService.updateEmployee(cui, updateRequest);
    console.log("Empleado actualizado:", result);
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
