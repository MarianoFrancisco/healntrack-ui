import { ArrowUpDown, CalendarDays, Package, User, Barcode, Timer } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DataTable } from "../common/data-table";
import type { BatchResponseDTO } from "~/types/batch";
import type { ColumnDef } from "@tanstack/react-table";
import { BatchDialog } from "./batch-dialog";
import { BatchExpirationDateBadge } from "./batch-expiration-badge";

interface BatchTableProps {
  data: BatchResponseDTO[];
}

export function BatchTable({ data }: BatchTableProps) {
  const columns: ColumnDef<BatchResponseDTO>[] = [
    {
      accessorKey: "medicine.code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Barcode className="h-4 w-4" />
          Código
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "medicine.name",
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
      accessorKey: "expirationDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <CalendarDays className="h-4 w-4" />
          Expira
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return date.toLocaleDateString("es-GT");
      },
    },
    {
      id: "expirationStatus",
      header: () => (
        <div className="flex items-center gap-2 font-semibold">
          <Timer className="h-4 w-4" />
          Estado
        </div>
      ),
      cell: ({ row }) => (
        <BatchExpirationDateBadge expirationDate={row.original.expirationDate} />
      ),
    },
    {
      accessorKey: "quantityOnHand",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Package className="h-4 w-4" />
          Cantidad en Stock
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "employee.fullname",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <User className="h-4 w-4" />
          Comprado por
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const batch = row.original;
        return (
          <div className="flex items-center gap-2">
            <BatchDialog batch={batch} />
          </div>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
