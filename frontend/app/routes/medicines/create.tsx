import { redirect, type ActionFunctionArgs } from "react-router";
import type { CreateMedicineRequest, UnitType } from "~/types/medicine";
import { ApiError } from "~/lib/api-client";
import { medicineService } from "~/services/medicine-service";
import { MedicineForm } from "~/components/medicine/medicine-form";

export function meta() {
  return [
    { title: "Nuevo Medicamento" },
    { name: "description", content: "Crear un nuevo medicamento en el catálogo" },
  ];
}

export const handle = {
  crumb: "Crear Medicamento",
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const medicineData: CreateMedicineRequest = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      unitType: formData.get("unitType") as UnitType,
      minStock: Number(formData.get("minStock")),
      currentPrice: Number(formData.get("currentPrice")),
      currentCost: Number(formData.get("currentCost")),
    };
    console.log("Medicine Data:", medicineData);

    await medicineService.createMedicine(medicineData);
    return redirect("/medicines");
  } catch (error: any) {
    console.error("Action Error:", error);
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

    return { error: error.message || "Error al crear el medicamento" };
  }
}

export default function CreateMedicinePage() {
  return (
    <section className="p-6">
      <MedicineForm />
    </section>
  );
}
