import { redirect, type ActionFunctionArgs } from "react-router";
import type { CreatePatientRequestDTO } from "~/types/patient";
import { ApiError } from "~/lib/api-client";
import { patientService } from "~/services/patient-service";
import { PatientForm } from "~/components/patients/patient-form";
import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo paciente" },
    { name: "description", content: "Crear un nuevo paciente" },
  ];
}

export const handle = {
  crumb: "Crear paciente"
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const patientData: CreatePatientRequestDTO = {
      cui: formData.get("cui") as string,
      fullName: formData.get("fullName") as string,
      birthDate: formData.get("birthDate") as string,
      gender: formData.get("gender") as string,
      address: formData.get("address") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      emergencyPhoneNumber: formData.get("emergencyPhoneNumber") as string,
    };

    await patientService.createPatient(patientData);
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
      } catch (parseError) {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }

    return { error: error.message || "Error al crear el paciente" };
  }
}

export default function CreatePatientPage() {
  return (
    <section className="p-6">
      <PatientForm />
    </section>
  );
}
