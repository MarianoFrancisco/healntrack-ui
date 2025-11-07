import { ArrowUpDown, Edit, DollarSign, Banknote } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import type { SurgeryPriceResponseDTO } from "~/types/hospitalization/surgery";
import { DataTable } from "~/components/common/data-table";
import { useNavigate } from "react-router";

interface SurgeryPriceTableProps {
  data: SurgeryPriceResponseDTO[];
}

export function SurgeryPriceTable({ data }: SurgeryPriceTableProps) {
    const navigate = useNavigate();
  const columns: ColumnDef<SurgeryPriceResponseDTO>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Edit className="h-4 w-4" />
          Cirugía
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "hospitalFee",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Banknote className="h-4 w-4" />
          Tarifa Hospital
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return value.toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        });
      },
    },
    {
      accessorKey: "specialistFee",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Banknote className="h-4 w-4" />
          Tarifa Especialista
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return value.toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        });
      },
    },
    {
      accessorKey: "surgeryFee",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Banknote className="h-4 w-4" />
          Tarifa Cirugía
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return value.toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        });
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const surgeryPrice = row.original;
        return (
          <div className="flex items-center gap-2">
            
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/surgery-prices/${surgeryPrice.id}/edit`)}
              >
                Editar
              </Button>
          </div>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
