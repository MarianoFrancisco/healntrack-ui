import { redirect, type ActionFunctionArgs } from "react-router";
import { medicineService } from "~/services/medicine-service";
import { ApiError } from "~/lib/api-client";

export async function action({ request, params }: ActionFunctionArgs) {
    const code = params.code as string;
    const formData = await request.formData();
    const redirectTo = (formData.get("redirectTo") as string) || "/medicines";
    const activateFlag = formData.get("activate") as string;
    const activate = activateFlag === "true";

    if (!code) {
        return { error: "No se proporcionó el código del medicamento" };
    }

    try {
        if (activate) {
            await medicineService.activateMedicine(code);
        } else {
            await medicineService.deactivateMedicine(code);
        }

        return redirect(redirectTo);
    } catch (error: any) {
        console.error("Error al actualizar estado del medicamento:", error);

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
                return {
                    error: `Error ${error.status}: No se pudo procesar la respuesta`,
                };
            }
        }

        return {
            error:
                error.message || "Error al activar/desactivar el medicamento",
        };
    }
}
