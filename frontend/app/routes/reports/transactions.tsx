import { useLoaderData } from "react-router";
import type { Route } from "../+types/home";
import type { SearchTransactionsRequestDTO, TransactionResponseDTO } from "~/types/reports";
import { transactionService } from "~/services/report-service";
import { TransactionFilter } from "~/components/reports/transaction-filter";
import { TransactionTable } from "~/components/reports/transaction-table";
import ExportPdfButton from "~/components/export-pdf-button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Transacciones" },
    {
      name: "description",
      content: "Consulta todas las transacciones registradas y filtra por área, tipo y fechas",
    },
  ];
}

export const handle = {
  crumb: "Transacciones",
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams.entries());
  const params: SearchTransactionsRequestDTO = {
    area: rawParams.area ?? "",
    startDate: rawParams.startDate ?? new Date().toISOString().split("T")[0],
    endDate: rawParams.endDate ?? new Date().toISOString().split("T")[0],
    type: rawParams.type ?? "INCOME",
  };
  const transactions: TransactionResponseDTO[] = await transactionService.getAllTransactions(params);
  return Response.json(transactions);
}

export default function TransactionsPage() {
  const transactions = useLoaderData<typeof loader>() as TransactionResponseDTO[];
  const columns = [
    { header: "Área", key: "area" },
    { header: "Concepto", key: "concept" },
    { header: "Fecha", key: "occurredAt" },
    { header: "Monto", key: "amount" },
  ];
  const rows = transactions.map((t) => ({
    area: t.area,
    concept: t.concept,
    occurredAt: new Date(t.occurredAt).toLocaleDateString("es-GT"),
    amount: t.amount.toLocaleString("es-GT", { style: "currency", currency: "GTQ" }),
  }));

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transacciones</h1>
          <p className="text-muted-foreground">
            Consulta todas las transacciones registradas y filtra por área, tipo y fechas.
          </p>
        </div>
        <ExportPdfButton
          title="Transacciones"
          fileName={`transacciones_${new Date().toISOString().slice(0,10)}`}
          columns={columns}
          rows={rows}
        />
      </div>
      <TransactionFilter />
      <div className="overflow-x-auto">
        <TransactionTable data={transactions} />
      </div>
    </section>
  );
}
