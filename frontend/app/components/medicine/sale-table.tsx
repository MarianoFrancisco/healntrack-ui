"use client"

import {
  ArrowUpDown,
  Eye,
  DollarSign,
  Package,
  User,
  Calendar,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { DataTable } from "../common/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import type { SaleResponseDTO } from "~/types/sale"
import { StatusBadge } from "../common/status-badge"
import { SaleDialog } from "./sale-item-dialog"
import { SaleBadgeStatus } from "./sale-badge-status"

interface SaleTableProps {
  data: SaleResponseDTO[]
}

export function SaleTable({ data }: SaleTableProps) {
  const columns: ColumnDef<SaleResponseDTO>[] = [
    {
      accessorKey: "occurredAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Calendar className="h-4 w-4" />
          Fecha
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) =>
        new Date(getValue() as number).toLocaleDateString("es-GT", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      accessorKey: "seller.fullname",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <User className="h-4 w-4" />
          Vendedor
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.seller.fullname,
    },
    {
      accessorKey: "buyer.fullname",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <User className="h-4 w-4" />
          Comprador
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.buyer.fullname,
    },
    {
      accessorKey: "buyerType",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          Tipo
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => getValue(),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          Estado
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => <SaleBadgeStatus status={getValue() !== "COMPLETED"} />,
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <DollarSign className="h-4 w-4" />
          Total
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) =>
        (getValue() as number).toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        }),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <SaleDialog saleId={row.original.id} items={row.original.items} />
        </div>
      ),
    },
  ]

  return <DataTable data={data} columns={columns} pageSize={10} />
}
