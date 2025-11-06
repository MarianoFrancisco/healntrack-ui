import { vacationService } from "~/services/vacation-service";
import type { VacationResponseDTO } from "~/types/vacation";
import { useLoaderData } from "react-router";
import type { Route } from "../+types/home";
import { VacationFilter } from "~/components/vacations/vacation-filter";
import { VacationTable } from "~/components/vacations/vacation-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Solicitudes de Vacaciones" },
    {
      name: "description",
      content:
        "Consulta las solicitudes de vacaciones y filtra por empleado, departamento, fechas o estado.",
    },
  ];
}

export const handle = {
  crumb: "Solicitudes de vacaciones",
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams.entries());

  // Limpiar parámetros vacíos o 'all'
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(rawParams)) {
    const trimmed = (value ?? "").trim();
    if (trimmed !== "" && trimmed.toLowerCase() !== "all") {
      params[key] = trimmed;
    }
  }

  const vacations: VacationResponseDTO[] =
    await vacationService.findAllVacations(params);

  return Response.json(vacations);
}

export default function VacationsPage() {
  const vacations = useLoaderData<typeof loader>() as VacationResponseDTO[];

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Solicitudes de Vacaciones</h1>
        <p className="text-muted-foreground">
          Consulta las solicitudes de vacaciones registradas y filtra por empleado, departamento, fechas o estado.
        </p>
      </div>

      {/* Filtros */}
      <VacationFilter />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <VacationTable data={vacations} />
      </div>
    </section>
  );
}
