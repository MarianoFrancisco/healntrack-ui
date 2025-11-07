import { useLoaderData } from "react-router";
import type { Route } from "../+types/home";
import type { ProfitResponseDTO, SearchProfitsRequestDTO } from "~/types/reports";
import { transactionService } from "~/services/report-service";
import { ProfitFilter } from "~/components/reports/profits-filter";
import { ProfitTable } from "~/components/reports/profit-table";
import ExportPdfButton from "~/components/export-pdf-button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ganancias" },
    {
      name: "description",
      content: "Consulta todas las ganancias registradas y filtra por área y fechas",
    },
  ];
}

export const handle = {
  crumb: "Ganancias",
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams.entries());
  const params: SearchProfitsRequestDTO = {
    area: rawParams.area ?? "",
    startDate: rawParams.startDate ?? new Date().toISOString().split("T")[0],
    endDate: rawParams.endDate ?? new Date().toISOString().split("T")[0],
  };
  const profits: ProfitResponseDTO[] = await transactionService.getAllProfits(params);
  return Response.json(profits);
}

export default function ProfitsPage() {
  const profits = useLoaderData<typeof loader>() as ProfitResponseDTO[];
  const columns = [
    { header: "Área", key: "area" },
    { header: "Concepto", key: "concept" },
    { header: "Fecha", key: "occurredAt" },
    { header: "Monto", key: "amount" },
  ];
  const rows = profits.map((p) => ({
    area: p.area,
    concept: p.concept,
    occurredAt: new Date(p.occurredAt).toLocaleDateString("es-GT"),
    amount: p.amount.toLocaleString("es-GT", { style: "currency", currency: "GTQ" }),
  }));

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ganancias</h1>
          <p className="text-muted-foreground">
            Consulta todas las ganancias registradas y filtra por área y fechas.
          </p>
        </div>
        <ExportPdfButton
          title="Ganancias"
          fileName={`ganancias_${new Date().toISOString().slice(0,10)}`}
          columns={columns}
          rows={rows}
        />
      </div>
      <ProfitFilter />
      <div className="overflow-x-auto">
        <ProfitTable data={profits} />
      </div>
    </section>
  );
}
