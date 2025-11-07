import { Link, useActionData, useLoaderData, type ActionFunctionArgs } from "react-router";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { useEffect } from "react";
import { ApiError } from "~/lib/api-client";
import type { Route } from ".react-router/types/app/routes/+types/home";
import type { SearchSurgeryPricesRequestDTO, SurgeryPriceResponseDTO } from "~/types/hospitalization/surgery";
import { surgeryPriceService } from "~/services/hospitalization/surgery-price-service";
import { SurgeryPriceFilter } from "../../../components/hospitalization/surgery/surgery-price-filter";
import { SurgeryPriceTable } from "../../../components/hospitalization/surgery/surgery-price-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tarifas de Cirugías" },
    { name: "description", content: "Listado y gestión de tarifas de cirugías" },
  ];
}

export const handle = {
  crumb: "Tarifas de Cirugías",
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const filters: SearchSurgeryPricesRequestDTO = {};
  if (params.name && params.name.trim() !== "") filters.name = params.name.trim();

  try {
    const surgeryPrices = await surgeryPriceService.getAll(filters);
    return Response.json(surgeryPrices);
  } catch (error) {
    console.error("Error al cargar tarifas de cirugías:", error);
    return Response.json([], { status: 500 });
  }
}

export default function SurgeryPricesPage() {
  const actionData = useActionData() as { error?: string; success?: string; errors?: Record<string, string> } | undefined;
  const surgeryPrices = useLoaderData<typeof loader>() as SurgeryPriceResponseDTO[];

  useEffect(() => {
    if (actionData?.error) toast.error(actionData.error);
    if (actionData?.success) toast.success(actionData.success);
  }, [actionData]);

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tarifas de Cirugías</h1>
        <p className="text-muted-foreground">
          Gestiona las tarifas de cirugías registradas en el sistema.
        </p>
      </div>

      {/* Filtro + botón crear */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 w-full">
        <div className="flex-1">
          <SurgeryPriceFilter />
        </div>

        <div className="flex lg:justify-start justify-end">
          <Button asChild>
            <Link to="/surgery-prices/create">Nueva tarifa</Link>
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <SurgeryPriceTable data={surgeryPrices} />
    </section>
  );
}
