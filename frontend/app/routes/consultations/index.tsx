import { useLoaderData } from "react-router";
import { ConsultationFilter } from "~/components/consultation/consultation-filter";
import { ConsultationTable } from "~/components/consultation/consultation-table";
import { consultationService } from "~/services/consultation-service";
import { employeeService } from "~/services/employment-service";
import { patientService } from "~/services/patient-service";
import type {
  ConsultationFullData,
  ConsultationResponseDTO,
} from "~/types/consultation";
import type { PatientResponseDTO } from "~/types/patient";
import type { EmployeeResponseDTO } from "~/types/employee";
import type { Route } from "../+types/home";

export function meta() {
  return [
    { title: "Consultas" },
    { name: "description", content: "Historial y búsqueda de consultas médicas" },
  ];
}

export const handle = {
  crumb: "Consultas",
};

// Loader para traer consultas, pacientes y doctores
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  // Limpieza de parámetros de búsqueda
  const rawParams = Object.fromEntries(url.searchParams.entries());
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(rawParams)) {
    const trimmed = (value ?? "").trim();
    if (trimmed !== "" && trimmed.toLowerCase() !== "all") {
      params[key] = trimmed;
    }
  }

  // Llamadas paralelas al backend
  const [consultations, patients, doctors] = await Promise.all([
    consultationService.getAllConsultations(params),
    patientService.getAllPatients(),
    employeeService.getAllEmployees({ isActive: true, department: "MED-025" }),
  ]);

  // Datos simplificados para los filtros
  const patientsForFilter = patients.map((p) => ({ id: p.id, fullname: p.fullName }));
  const doctorsForFilter = doctors.map((d) => ({ id: d.id, fullname: d.fullname }));

  return Response.json({
    consultations,
    patients,
    doctors,
    patientsForFilter,
    doctorsForFilter,
  });
}

export default function ConsultationPage() {
  const { consultations, patients, doctors, patientsForFilter, doctorsForFilter } =
    useLoaderData<typeof loader>() as {
      consultations: ConsultationResponseDTO[];
      patients: PatientResponseDTO[];
      doctors: EmployeeResponseDTO[];
      patientsForFilter: { id: string; fullname: string }[];
      doctorsForFilter: { id: string; fullname: string }[];
    };

  const consultationTableData: ConsultationFullData[] = consultations
    .map((consultation) => {
      const patient = patients.find((p) => p.id === consultation.patientId);
      const doctor = doctors.find((d) => d.id === consultation.employeeId);

      // si alguno no existe, se omite esa fila
      if (!patient || !doctor) return null;

      return {
        id: consultation.id,
        patient,
        doctor,
        date: consultation.date,
        reason: consultation.reason,
        diagnosis: consultation.diagnosis,
        treatment: consultation.treatment,
        totalFee: consultation.totalFee,
      };
    })
    .filter((item): item is ConsultationFullData => item !== null);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Consultas</h1>
        <p className="text-muted-foreground">
          Visualiza y filtra el historial de consultas médicas.
        </p>
      </div>

      {/* Filtro */}
      <ConsultationFilter patients={patientsForFilter} doctors={doctorsForFilter} />

      {/* Tabla de consultas */}
      <ConsultationTable data={consultationTableData} />
    </section>
  );
}
