import { Link, useFetcher, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "../+types/home";
import { PatientTable } from "~/components/patients/patient-table";
import { patientService } from "~/services/patient-service";
import { PatientFilter } from "~/components/patients/patient-filter";
import type { PatientResponseDTO, SearchPatientsRequestDTO, UpdatePatientRequestDTO } from "~/types/patient";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pacientes" },
    { name: "description", content: "Listado y gestión de pacientes" },
  ];
}

export const handle = {
  crumb: "Pacientes",
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const filters: SearchPatientsRequestDTO = {};
  if (params.q && params.q.trim() !== "") filters.q = params.q.trim();
  if (params.gender && params.gender !== "all") filters.gender = params.gender;

  try {
    const patients = await patientService.getAllPatients(filters);
    return Response.json(patients);
  } catch (error) {
    console.error("Error al cargar pacientes:", error);
    return Response.json([], { status: 500 });
  }
}

export default function PatientsPage() {
  const patients = useLoaderData<typeof loader>() as PatientResponseDTO[];
  const fetcher = useFetcher();

  const handleEdit = async (id: string) => {
    window.location.href = `/patients/${id}/edit`;
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
        <p className="text-muted-foreground">
          Gestiona los pacientes registrados en el sistema.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 w-full">
        <div className="flex-1">
          <PatientFilter />
        </div>

        <div className="flex lg:justify-start justify-end">
          <Button asChild>
            <Link to="/patients/create">Nuevo Paciente</Link>
          </Button>
        </div>
      </div>

      <PatientTable data={patients} />
    </section>
  );
}
