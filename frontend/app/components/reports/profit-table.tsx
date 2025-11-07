import { ArrowUpDown, Banknote, DollarSign, Layers } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DataTable } from "../common/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { AreaBadge } from "./area-badge";
import type { ProfitResponseDTO } from "~/types/reports";

interface ProfitTableProps {
  data: ProfitResponseDTO[];
}

export function ProfitTable({ data }: ProfitTableProps) {
  const columns: ColumnDef<ProfitResponseDTO>[] = [
    {
      accessorKey: "area",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Layers className="h-4 w-4" />
          Área
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => <AreaBadge area={getValue() as string} />,
    },
    {
      accessorKey: "concept",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <DollarSign className="h-4 w-4" />
          Concepto
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
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
          <Layers className="h-4 w-4" />
          Fecha
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Banknote className="h-4 w-4" />
          Monto
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => `${(info.getValue() as number).toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        })}`,
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
