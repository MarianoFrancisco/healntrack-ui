import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { PatientForm } from "~/components/patients/patient-form";
import type { PatientResponseDTO, UpdatePatientRequestDTO } from "~/types/patient";
import { patientService } from "~/services/patient-service";
import { ApiError } from "~/lib/api-client";
import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Editar Paciente" },
    { name: "description", content: "Editar paciente" },
  ];
}

export const handle = {
  crumb: "Editar paciente"
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Error("No se proporcionó el ID del paciente");

  try {
    const patient = await patientService.getPatient(params.id);
    return patient;
  } catch (error) {
    console.error("Loader error:", error);
    throw error;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) throw new Error("No se proporcionó el ID del paciente");

  const formData = await request.formData();

  try {
    const updateData: UpdatePatientRequestDTO = {
      fullName: formData.get("fullName") as string,
      gender: formData.get("gender") as string,
      address: formData.get("address") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      emergencyPhoneNumber: formData.get("emergencyPhoneNumber") as string,
    };

    await patientService.updatePatient(params.id, updateData);
    return redirect("/patients");
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

    return { error: error.message || "Error al actualizar el paciente" };
  }
}

export default function EditPatientPage({ loaderData }: { loaderData: PatientResponseDTO }) {
  return (
    <section className="p-6">
      <PatientForm patient={loaderData} />
    </section>
  );
}
