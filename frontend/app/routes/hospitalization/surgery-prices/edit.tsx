import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData } from "react-router";
import type { Route } from "../+types";
import { surgeryPriceService } from "~/services/hospitalization/surgery-price-service";
import type { SurgeryPriceResponseDTO, UpdateSurgeryPriceRequestDTO } from "~/types/hospitalization/surgery";
import { ApiError } from "~/lib/api-client";
import { SurgeryPriceForm } from "~/components/hospitalization/surgery/surgery-price-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Editar Tarifa de Cirugía" },
    { name: "description", content: "Editar tarifa de cirugía" },
  ];
}

export const handle = {
  crumb: "Editar Tarifa",
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Error("No se proporcionó el ID de la tarifa de cirugía");
  try {
    const surgeryPrice = await surgeryPriceService.getById(params.id);
    return surgeryPrice;
  } catch (error) {
    console.error("Loader error:", error);
    throw error;
  }
}

// Action para actualizar
export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) throw new Error("No se proporcionó el ID de la tarifa de cirugía");

  const formData = await request.formData();

  try {
    const updateData: UpdateSurgeryPriceRequestDTO = {
      name: formData.get("name") as string,
      hospitalFee: parseFloat(formData.get("hospitalFee") as string),
      specialistFee: parseFloat(formData.get("specialistFee") as string),
      surgeryFee: parseFloat(formData.get("surgeryFee") as string),
    };

    await surgeryPriceService.update(params.id, updateData);
    return redirect("/surgery-prices");
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

    return { error: error.message || "Error al actualizar la tarifa de cirugía" };
  }
}

export default function EditSurgeryPricePage() {
  const surgeryPrice = useLoaderData<SurgeryPriceResponseDTO>();

  return (
    <section className="p-6">
      <SurgeryPriceForm surgeryPrice={surgeryPrice} />
    </section>
  );
}
