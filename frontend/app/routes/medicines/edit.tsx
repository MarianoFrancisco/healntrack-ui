import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import type { MedicineResponseDTO, UnitType, UpdateMedicineRequest } from "~/types/medicine";
import { medicineService } from "~/services/medicine-service";
import { ApiError } from "~/lib/api-client";
import type { Route } from "../+types/home";
import { MedicineForm } from "~/components/medicine/medicine-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Editar Medicamento" },
    { name: "description", content: "Editar medicamento registrado" },
  ];
}

export const handle = {
  crumb: "Editar medicamento",
};

// --- Loader ---
export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.code) throw new Error("No se proporcionó el código del medicamento");

  try {
    const medicine = await medicineService.getMedicineByCode(params.code);
    return medicine;
  } catch (error) {
    console.error("Loader error:", error);
    throw error;
  }
}

// --- Action ---
export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.code) throw new Error("No se proporcionó el código del medicamento");

  const formData = await request.formData();

  try {
    const updateData: UpdateMedicineRequest = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || "",
      unitType: formData.get("unitType") as UnitType,
      minStock: Number(formData.get("minStock")),
      currentCost: Number(formData.get("currentCost")),
      currentPrice: Number(formData.get("currentPrice")),
    };

    await medicineService.updateMedicine(params.code, updateData);

    return redirect("/medicines");
  } catch (error: any) {
    console.error("Action error:", error);

    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;
        return {
          errors: errorData.errors || {},
          error: errorData.detail || errorData.message || `Error ${error.status}`,
        };
      } catch {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }

    return { error: error.message || "Error al actualizar el medicamento" };
  }
}

// --- Componente principal ---
export default function EditMedicinePage({ loaderData }: { loaderData: MedicineResponseDTO }) {
  return (
    <section className="p-6">
      <MedicineForm medicine={loaderData} />
    </section>
  );
}
