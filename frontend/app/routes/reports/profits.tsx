import { useLoaderData } from "react-router";
import type { Route } from "../+types/home";
import type { ProfitResponseDTO, SearchProfitsRequestDTO } from "~/types/reports";
import { transactionService } from "~/services/report-service";
import { ProfitFilter } from "~/components/reports/profits-filter";
import { ProfitTable } from "~/components/reports/profit-table";

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

  // Crear un SearchProfitsRequestDTO completo
  const params: SearchProfitsRequestDTO = {
    area: rawParams.area ?? "", // valor por defecto vacío
    startDate: rawParams.startDate ?? new Date().toISOString().split("T")[0],
    endDate: rawParams.endDate ?? new Date().toISOString().split("T")[0],
  };

  const profits: ProfitResponseDTO[] = await transactionService.getAllProfits(params);
  return Response.json(profits);
}


export default function ProfitsPage() {
  const profits = useLoaderData<typeof loader>() as ProfitResponseDTO[];

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ganancias</h1>
        <p className="text-muted-foreground">
          Consulta todas las ganancias registradas y filtra por área y fechas.
        </p>
      </div>

      {/* Filtros */}
      <ProfitFilter />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <ProfitTable data={profits} />
      </div>
    </section>
  );
}
