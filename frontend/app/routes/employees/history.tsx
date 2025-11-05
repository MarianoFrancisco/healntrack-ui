import { EmploymentHistoryFilter } from "~/components/employees/employment-history-filter";
import { EmploymentTable } from "~/components/employees/employment-table";
import { employeeService } from "~/services/employment-service";
import type { EmploymentResponseDTO } from "~/types/employee";
import { useLoaderData } from "react-router";
import type { Route } from "../+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const employments = await employeeService.getAllEmployments(params);
  return Response.json(employments);
}

export default function EmployeeHistoryPage() {
  const employments = useLoaderData<typeof loader>() as EmploymentResponseDTO[];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Historial laboral</h1>
        <p className="text-muted-foreground">
          Consulta los periodos laborales registrados y filtra por empleado, departamento o tipo.
        </p>
      </div>

      {/* 🔍 Filtros */}
      <EmploymentHistoryFilter />

      {/* 📊 Tabla */}
      <EmploymentTable data={employments} />
    </section>
  );
}
