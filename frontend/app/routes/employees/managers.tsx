import { employeeService } from "~/services/employment-service";
import type { DepartmentManagerResponseDTO } from "~/types/employee";
import { useLoaderData } from "react-router";
import type { Route } from "../+types/home";
import { DepartmentManagerFilter } from "~/components/employees/managers-filter";
import { DepartmentManagerTable } from "~/components/employees/managers-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jefes de área" },
    {
      name: "description",
      content: "Consulta los jefes de área y filtra por empleado, departamento, fechas o estado",
    },
  ];
}

export const handle = {
  crumb: "Jefes de área",
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

  const managers: DepartmentManagerResponseDTO[] =
    await employeeService.getAllDepartmentManagers(params);
  return Response.json(managers);
}

export default function DepartmentManagersPage() {
  const managers = useLoaderData<typeof loader>() as DepartmentManagerResponseDTO[];

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jefes de área</h1>
        <p className="text-muted-foreground">
          Consulta los jefes de área registrados y filtra por empleado, departamento, fechas o estado.
        </p>
      </div>

      {/* Filtros */}
      <DepartmentManagerFilter />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <DepartmentManagerTable data={managers} />
      </div>
    </section>
  );
}
