import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData } from "react-router";
import { ApiError } from "~/lib/api-client";
import { patientService } from "~/services/patient-service";
import type { ComboboxOption } from "~/components/common/combobox-option";
import type { Route } from "../+types/home";
import { HospitalizationForm } from "~/components/hospitalization/hospitalization-form";
import { roomService } from "~/services/hospitalization/room-service";
import type { CreateHospitalizationRequest } from "~/types/hospitalization/hospitalization";
import { hospitalizationService } from "~/services/hospitalization/hospitalization-service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva hospitalización" },
    { name: "description", content: "Registrar una nueva hospitalización de paciente" },
  ];
}

export const handle = {
  crumb: "Crear hospitalización",
};

export async function loader(_: LoaderFunctionArgs) {
  try {
    const [patients, rooms] = await Promise.all([
      patientService.getAllPatients(),
      roomService.getAllRooms(),
    ]);

    const patientOptions: ComboboxOption[] = patients.map((p) => ({
      label: p.fullName,
      value: p.id,
    }));

    const roomOptions: ComboboxOption[] = rooms.map((r) => ({
      label: `Habitación ${r.number}`,
      value: r.id,
    }));

    return { patientOptions, roomOptions };
  } catch (error) {
    console.error("Error al cargar pacientes o habitaciones:", error);
    throw error;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload: CreateHospitalizationRequest = {
    patientId: formData.get("patientId") as string,
    roomId: formData.get("roomId") as string,
    admissionDate: formData.get("admissionDate") as string,
  };

  try {
    await hospitalizationService.createHospitalization(payload);
    return redirect("/hospitalizations");
  } catch (error: any) {
    console.error("Error al crear hospitalización:", error);

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

    return { error: error.message || "Error al crear la hospitalización" };
  }
}

export default function CreateHospitalizationPage() {
  const { patientOptions, roomOptions } = useLoaderData<typeof loader>();

  return (
    <section className="p-6">
      <HospitalizationForm patients={patientOptions} rooms={roomOptions} />
    </section>
  );
}
