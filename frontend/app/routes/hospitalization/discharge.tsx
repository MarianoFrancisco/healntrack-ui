import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  useLoaderData,
  useActionData,
} from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import type { HospitalizationResponseComplete } from "~/types/hospitalization/hospitalization";
import { hospitalizationService } from "~/services/hospitalization/hospitalization-service";
import { DischargeHospitalizationForm } from "~/components/hospitalization/hospi-discharge-form";

export async function loader({ params }: LoaderFunctionArgs) {
  const hospitalizationId = params.id as string;

  try {
    const hospitalization: HospitalizationResponseComplete =
      await hospitalizationService.getHospitalizationById(hospitalizationId);

    return Response.json({ hospitalization });
  } catch (error) {
    console.error("Error al cargar hospitalización:", error);
    return Response.json({ error: "No se pudo cargar la hospitalización" }, { status: 500 });
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const hospitalizationId = params.id as string;
  const formData = await request.formData();

  const dischargeDate = formData.get("dischargeDate") as string;

  if (!dischargeDate) {
    return { error: "Debes seleccionar una fecha de alta" };
  }

  try {
    await hospitalizationService.dischargePatient(hospitalizationId, {
      dischargeDate,
    });

    return redirect(`/hospitalizations`);
  } catch (error: any) {
    console.error("Error al dar de alta la hospitalización:", error);

    if (error.response) {
      const errorData = (error.response as any).data || error.response;
      return {
        error: errorData.detail || errorData.message || "Error al procesar la solicitud",
      };
    }

    return { error: error.message || "Error al procesar la solicitud" };
  }
}

export default function DischargeHospitalizationPage() {
  const { hospitalization, error: loaderError } = useLoaderData<typeof loader>() as {
    hospitalization: HospitalizationResponseComplete;
    error?: string;
  };
  const actionData = useActionData() as { error?: string } | undefined;

  useEffect(() => {
    if (loaderError) toast.error(loaderError);
    if (actionData?.error) toast.error(actionData.error);
  }, [loaderError, actionData]);

  if (!hospitalization) {
    return <p className="text-red-600">No se encontró la hospitalización.</p>;
  }

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Dar de alta hospitalización</h1>
      <p className="text-muted-foreground">
        Hospitalización del paciente: {hospitalization.patient.fullName}
      </p>

      <DischargeHospitalizationForm hospitalization={hospitalization} />
    </section>
  );
}
