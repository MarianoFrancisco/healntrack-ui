import { useLoaderData } from "react-router"
import { saleService } from "~/services/sale-service"
import { employeeService } from "~/services/employment-service"
import type { SaleResponseDTO } from "~/types/sale"
import type { SaleSeller } from "~/types/sale"
import type { Route } from "../+types"
import { SaleFilter } from "~/components/medicine/sale-filter"
import { SaleTable } from "~/components/medicine/sale-table"

export function meta() {
  return [
    { title: "Ventas" },
    { name: "description", content: "Historial y búsqueda de ventas" },
  ]
}

export const handle = {
  crumb: "Ventas",
}

// Loader para traer todas las ventas y empleados
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)

  // Limpieza de parámetros de búsqueda
  const rawParams = Object.fromEntries(url.searchParams.entries())
  const params: Record<string, string> = {}
  for (const [key, value] of Object.entries(rawParams)) {
    const trimmed = (value ?? "").trim()
    if (trimmed !== "" && trimmed.toLowerCase() !== "all") {
      params[key] = trimmed
    }
  }

  // Llamadas paralelas al backend
  const [sales, employees] = await Promise.all([
    saleService.listSales(params),
    employeeService.getAllEmployees(),
  ])

  // Simplificar empleados para el filtro
  const sellersForFilter: { sellerId: string; sellerName: string }[] = employees.map((e: SaleSeller) => ({
    sellerId: e.fullname, // si quieres id real, usa e.id
    sellerName: e.fullname,
  }))

  return Response.json({
    sales,
    sellersForFilter,
  })
}

export default function SalePage() {
  const { sales, sellersForFilter } = useLoaderData<typeof loader>() as {
    sales: SaleResponseDTO[]
    sellersForFilter: { sellerId: string; sellerName: string }[]
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ventas</h1>
        <p className="text-muted-foreground">
          Visualiza y filtra el historial de ventas.
        </p>
      </div>

      {/* Filtro */}
      <SaleFilter sellers={sellersForFilter} />

      {/* Tabla de ventas */}
      <SaleTable data={sales} />
    </section>
  )
}
