import { useLoaderData } from "react-router";
import type { Route } from "../+types/home";
import type { MedicineResponseDTO, FindMedicinesRequest } from "~/types/medicine";
import { medicineService } from "~/services/medicine-service";
import { MedicineFilter } from "~/components/medicine/medicine-filter";
import { MedicineTable } from "~/components/medicine/medicine-table";

// --- Metadatos ---
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Medicinas" },
    {
      name: "description",
      content: "Consulta las medicinas y filtra por nombre o estado",
    },
  ];
}

export const handle = {
  crumb: "Medicinas",
};

// --- Loader ---
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams.entries());

  const params: FindMedicinesRequest = {};

  if (rawParams.searchTerm && rawParams.searchTerm.trim() !== "") {
    params.searchTerm = rawParams.searchTerm.trim();
  }

  if (rawParams.isActive && rawParams.isActive !== "all") {
    params.isActive = rawParams.isActive === "true";
  }

  const medicines: MedicineResponseDTO[] = await medicineService.getAllMedicines(params);

  return Response.json(medicines);
}

// --- Página principal ---
export default function MedicinesPage() {
  const medicines = useLoaderData<typeof loader>() as MedicineResponseDTO[];

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Medicinas</h1>
        <p className="text-muted-foreground">
          Consulta y gestiona las medicinas registradas en el sistema.
        </p>
      </div>

      {/* Filtros */}
      <MedicineFilter />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <MedicineTable data={medicines} />
      </div>
    </section>
  );
}
