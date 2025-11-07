import { redirect, type ActionFunctionArgs } from "react-router";
import { ApiError } from "~/lib/api-client";
import type { Route } from "../../+types/home";
import type { CreateSurgeryPriceRequestDTO } from "~/types/hospitalization/surgery";
import { surgeryPriceService } from "~/services/hospitalization/surgery-price-service";
import { SurgeryPriceForm } from "~/components/hospitalization/surgery/surgery-price-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva cirugía" },
    { name: "description", content: "Crear nueva cirugía con tarifas" },
  ];
}

export const handle = {
  crumb: "Crear cirugía",
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const surgeryData: CreateSurgeryPriceRequestDTO = {
      name: formData.get("name") as string,
      hospitalFee: parseFloat(formData.get("hospitalFee") as string),
      specialistFee: parseFloat(formData.get("specialistFee") as string),
      surgeryFee: parseFloat(formData.get("surgeryFee") as string),
    };

    await surgeryPriceService.create(surgeryData);
    return redirect("/surgery-prices");
  } catch (error: any) {
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

    return { error: error.message || "Error al crear la cirugía" };
  }
}

export default function CreateSurgeryPricePage() {
  return (
    <section className="p-6">
      <SurgeryPriceForm />
    </section>
  );
}
