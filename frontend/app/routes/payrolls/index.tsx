import { payrollService } from "~/services/payroll-service";
import type { PayrollItemResponseDTO } from "~/types/payroll";
import { useLoaderData } from "react-router";
import type { Route } from "../+types/home";
import { PayrollFilter } from "~/components/payroll/payroll-filter";
import { PayrollTable } from "~/components/payroll/payroll-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nóminas" },
    {
      name: "description",
      content: "Consulta las nóminas y filtra por empleado, departamento o fechas",
    },
  ];
}

export const handle = {
  crumb: "Nóminas",
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams.entries());

  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(rawParams)) {
    const trimmed = (value ?? "").trim();
    if (trimmed !== "" && trimmed.toLowerCase() !== "all") {
      params[key] = trimmed;
    }
  }

  const payrolls: PayrollItemResponseDTO[] =
    await payrollService.getAllPayrolls(params);

  return Response.json(payrolls);
}

export default function PayrollsPage() {
  const payrolls = useLoaderData<typeof loader>() as PayrollItemResponseDTO[];

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nóminas</h1>
        <p className="text-muted-foreground">
          Consulta las nóminas registradas y filtra por empleado, departamento o fechas.
        </p>
      </div>

      {/* Filtros */}
      <PayrollFilter />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <PayrollTable data={payrolls} />
      </div>
    </section>
  );
}
