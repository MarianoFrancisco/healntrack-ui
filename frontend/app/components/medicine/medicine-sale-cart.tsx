import { ArrowUpDown, PlusCircle, Hash, Package, Activity, Layers, DollarSign } from "lucide-react"
import { Button } from "~/components/ui/button"
import { DataTable } from "../common/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import type { MedicineResponseDTO } from "~/types/medicine"
import { StatusBadge } from "../common/status-badge"
import { UnitTypeBadge } from "./unit-type-badge"
import { useCart } from "~/hooks/use-cart"

interface MedicineSaleCartTableProps {
  data: MedicineResponseDTO[]
}

export function MedicineSaleCartTable({ data }: MedicineSaleCartTableProps) {
  const { addItem } = useCart();

  const columns: ColumnDef<MedicineResponseDTO>[] = [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Hash className="h-4 w-4" />
          Código
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Package className="h-4 w-4" />
          Nombre
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Activity className="h-4 w-4" />
          Estado
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => <StatusBadge status={getValue() === "ACTIVE"} />,
    },
    {
      accessorKey: "unitType",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Layers className="h-4 w-4" />
          Unidad
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => <UnitTypeBadge unitType={getValue() as any} />,
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Layers className="h-4 w-4" />
          Stock
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue() ?? 0,
    },
{
  accessorKey: "currentPrice",
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center gap-2 font-semibold"
    >
      <DollarSign className="h-4 w-4" />
      Precio
      <ArrowUpDown className="ml-1 h-4 w-4" />
    </Button>
  ),
  cell: (info) => {
    const value = info.getValue() as number
    return `${value.toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        })}`
  },
},
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const medicine = row.original
        const isActive = medicine.status === "ACTIVE"
        const hasStock = (medicine.stock ?? 0) > 0

        return (
          <Button
            size="sm"
            variant="secondary"
            disabled={!isActive || !hasStock}
            onClick={() =>
              addItem({
                medicineCode: medicine.code,
                medicineName: medicine.name,
                quantity: 1,
                unitCost: medicine.currentPrice,
              })
            }
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Agregar
          </Button>
        )
      },
    },
  ]

  return <DataTable data={data} columns={columns} pageSize={5} />
}
