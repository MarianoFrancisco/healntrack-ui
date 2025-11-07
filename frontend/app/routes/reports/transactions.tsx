import { useLoaderData } from "react-router";
import type { Route } from "../+types/home";
import type { SearchTransactionsRequestDTO, TransactionResponseDTO } from "~/types/reports";
import { transactionService } from "~/services/report-service";
import { TransactionFilter } from "~/components/reports/transaction-filter";
import { TransactionTable } from "~/components/reports/transaction-table";

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

  // Crear un objeto completo de SearchTransactionsRequestDTO
  const params: SearchTransactionsRequestDTO = {
    area: rawParams.area ?? "",
    startDate: rawParams.startDate ?? new Date().toISOString().split("T")[0],
    endDate: rawParams.endDate ?? new Date().toISOString().split("T")[0],
    type: rawParams.type ?? "INCOME", // <-- Por defecto INCOME
  };

  const transactions: TransactionResponseDTO[] = await transactionService.getAllTransactions(params);
  return Response.json(transactions);
}

export default function TransactionsPage() {
  const transactions = useLoaderData<typeof loader>() as TransactionResponseDTO[];

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transacciones</h1>
        <p className="text-muted-foreground">
          Consulta todas las transacciones registradas y filtra por área, tipo y fechas.
        </p>
      </div>

      {/* Filtros */}
      <TransactionFilter />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <TransactionTable data={transactions} />
      </div>
    </section>
  );
}
