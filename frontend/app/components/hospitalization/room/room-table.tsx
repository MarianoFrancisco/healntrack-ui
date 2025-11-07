import {
  ArrowUpDown,
  Hash,
  Banknote,
  Wrench,
  Activity,
  Pencil,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import type { RoomResponseDTO } from "~/types/hospitalization/room";
import { useNavigate } from "react-router";
import { RoomStatusBadge } from "./room-status-badge";
import { DataTable } from "~/components/common/data-table";

interface RoomTableProps {
  data: RoomResponseDTO[];
}

export function RoomTable({ data }: RoomTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<RoomResponseDTO>[] = [
    {
      accessorKey: "number",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Hash className="h-4 w-4" />
          Número
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "costPerDay",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Banknote className="h-4 w-4" />
          Costo por día
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      // Formato monetario estilo EmployeeTable
      cell: ({ getValue }) => {
        const cost = getValue() as number;
        return cost.toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        });
      },
    },
    {
      accessorKey: "maintenanceCost",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Wrench className="h-4 w-4" />
          Costo de mantenimiento
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const maintenance = getValue() as number;
        return maintenance.toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        });
      },
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
      cell: ({ getValue }) => <RoomStatusBadge status={getValue() as any} />,
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const room = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigate(`/rooms/${room.number}/edit`)}
            >
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          </div>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
