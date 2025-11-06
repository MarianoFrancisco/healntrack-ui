import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData } from "react-router";
import { ApiError } from "~/lib/api-client";
import { consultationService } from "~/services/consultation-service";
import { employeeService } from "~/services/employment-service";
import { patientService } from "~/services/patient-service";
import type { ComboboxOption } from "~/components/common/combobox-option";
import type { CreateConsultationRequestDTO } from "~/types/consultation";
import type { Route } from "../+types/home";
import { ConsultationForm } from "~/components/consultation/consultation-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva consulta" },
    { name: "description", content: "Crear una nueva consulta médica" },
  ];
}

export const handle = {
  crumb: "Crear consulta",
};

export async function loader(_: LoaderFunctionArgs) {
  try {
    const [patients, doctors] = await Promise.all([
      patientService.getAllPatients({}),
      employeeService.getAllEmployees({ isActive: true, department: "MED-025" }),
    ]);

    const patientOptions: ComboboxOption[] = patients.map((p) => ({
      label: `${p.fullName} (${p.cui})`,
      value: p.id,
    }));

    const doctorOptions: ComboboxOption[] = doctors.map((d) => ({
      label: `${d.fullname} (${d.cui})`,
      value: d.id,
    }));

    return { patientOptions, doctorOptions };
  } catch (error) {
    console.error("Error al cargar pacientes o doctores:", error);
    throw error;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload: CreateConsultationRequestDTO = {
    patientId: formData.get("patientId") as string,
    employeeId: formData.get("employeeId") as string,
    date: formData.get("date") as string,
    reason: formData.get("reason") as string,
    diagnosis: formData.get("diagnosis") as string,
    treatment: (formData.get("treatment") as string) || "",
    totalFee: Number(formData.get("totalFee")),
  };

  try {
    await consultationService.createConsultation(payload);
    return redirect("/consultations");
  } catch (error: any) {
    console.error("Error al crear consulta:", error);

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

    return { error: error.message || "Error al crear la consulta" };
  }
}

export default function CreateConsultationPage() {
  const { patientOptions, doctorOptions } = useLoaderData<typeof loader>();

  return (
    <section className="p-6">
      <ConsultationForm patients={patientOptions} doctors={doctorOptions} />
    </section>
  );
}
