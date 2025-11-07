"use client";

import { ArrowUpDown, Plus, Minus, Hash, Package, Activity, Layers, DollarSign } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DataTable } from "../common/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { MedicineResponseDTO } from "~/types/medicine";
import { StatusBadge } from "../common/status-badge";
import { UnitTypeBadge } from "./unit-type-badge";
import { useCart } from "~/hooks/use-cart";
import { toast } from "sonner";

interface MedicineSaleCartTableProps {
  data: MedicineResponseDTO[];
}

export function MedicineSaleCartTable({ data }: MedicineSaleCartTableProps) {
  const { addItem, decrementItem, getItemQuantity } = useCart();

  const columns: ColumnDef<MedicineResponseDTO>[] = [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
          <DollarSign className="h-4 w-4" />
          Precio
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => {
        const value = info.getValue() as number;
        return `${value.toLocaleString("es-GT", { style: "currency", currency: "GTQ" })}`;
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const m = row.original;
        const isActive = m.status === "ACTIVE";
        const stock = m.stock ?? 0;
        const qty = getItemQuantity(m.code);
        const canDec = qty > 0;
        const canInc = isActive && stock > 0 && qty < stock;

        return (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              disabled={!canDec}
              onClick={() => decrementItem(m.code, 1)}
              aria-label="Disminuir"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <div className="min-w-[72px] text-center tabular-nums">{qty} / {stock}</div>

            <Button
              size="icon"
              variant="secondary"
              disabled={!canInc}
              onClick={() => {
                if (!canInc) {
                  toast.error("No hay stock suficiente");
                  return;
                }
                addItem({
                  medicineCode: m.code,
                  medicineName: m.name,
                  quantity: 1,
                  unitCost: m.currentPrice,
                });
              }}
              aria-label="Aumentar"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={5} />;
}
