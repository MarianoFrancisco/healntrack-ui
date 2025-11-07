// app/components/medicine/medicine-sale-cart.tsx
"use client";

import { useMemo } from "react";
import { ArrowUpDown, Plus, Minus, Hash, Package, Activity, Layers, DollarSign } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
  const { cart, addItem, decrementItem, updateQuantity } = useCart();

  const qtyByCode = useMemo(() => {
    const map = new Map<string, number>();
    for (const it of cart) map.set(it.medicineCode, it.quantity);
    return map;
  }, [cart]);

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
        const qty = qtyByCode.get(m.code) ?? 0;
        const canAdd = isActive && stock > 0 && qty < stock;
        const canDec = qty > 0;

        const handleAdd = () => {
          if (qty >= stock) {
            toast.error("No hay suficiente stock");
            return;
          }
          addItem({
            medicineCode: m.code,
            medicineName: m.name,
            quantity: 1,
            unitCost: m.currentPrice,
          });
        };

        const handleDec = () => {
          if (!canDec) return;
          // Si baja a 0, el hook lo removerá
          decrementItem(m.code, 1);
        };

        const handleDirectChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
          const raw = e.target.value.replace(/\D+/g, "");
          const val = raw === "" ? 0 : Math.max(0, Math.min(Number(raw), stock));
          if (val > stock) {
            toast.error("La cantidad supera el stock disponible");
            return;
          }
          if (val === 0) {
            // elimina si estaba en el carrito
            if (qty > 0) decrementItem(m.code, qty);
            return;
          }
          if (qty === 0) {
            addItem({ medicineCode: m.code, medicineName: m.name, quantity: val, unitCost: m.currentPrice });
            return;
          }
          updateQuantity(m.code, val);
        };

        return (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={handleDec} disabled={!canDec}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              className="w-16 text-center"
              inputMode="numeric"
              pattern="\d*"
              value={qty}
              onChange={handleDirectChange}
            />
            <Button size="icon" variant="secondary" onClick={handleAdd} disabled={!canAdd}>
              <Plus className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground">/ {stock}</span>
          </div>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={5} />;
}
