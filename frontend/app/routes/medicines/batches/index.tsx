import { useLoaderData } from "react-router";
import { batchService } from "~/services/batch-service";
import type { BatchResponseDTO, FindBatchesRequestDTO } from "~/types/batch";
import type { Route } from "../+types";
import { BatchFilter } from "~/components/batchs/batch-filter";
import { BatchTable } from "~/components/batchs/batch-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lotes de Medicinas" },
    { name: "description", content: "Listado de lotes de medicinas" },
  ];
}

export const handle = {
  crumb: "Listado de lotes",
};

// Loader para obtener los batches con filtros
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const filters: FindBatchesRequestDTO = {};

  if (params.medicineCode && params.medicineCode.trim() !== "") {
    filters.medicineCode = params.medicineCode.trim();
  }

  if (params.onlyWithStock && params.onlyWithStock !== "all") {
    filters.onlyWithStock = params.onlyWithStock === "true";
  }

  if (params.onlyNotExpired && params.onlyNotExpired !== "all") {
    filters.onlyNotExpired = params.onlyNotExpired === "true";
  }

  try {
    const batches = await batchService.getAllBatches(filters);
    return Response.json(batches);
  } catch (error) {
    console.error("Error al cargar lotes:", error);
    return Response.json([], { status: 500 });
  }
}

// Página principal
export default function BatchesPage() {
  const batches = useLoaderData<typeof loader>() as BatchResponseDTO[];

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lotes de Medicinas</h1>
        <p className="text-muted-foreground">
          Consulta los lotes registrados, su cantidad, fechas de expiración y responsables de compra.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col w-full">
        <BatchFilter />
      </div>

      {/* Tabla */}
      <BatchTable data={batches} />
    </section>
  );
}
