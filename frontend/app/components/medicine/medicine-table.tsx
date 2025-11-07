import {
  ArrowUpDown,
  Eye,
  Pencil,
  CheckCircle2,
  XCircle,
  Hash,
  Package,
  DollarSign,
  BadgeDollarSign,
  Layers,
  Activity,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { DataTable } from "../common/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { MedicineResponseDTO } from "~/types/medicine";
import { useFetcher, useNavigate } from "react-router";
import { UnitTypeBadge } from "./unit-type-badge";
import { MedicineDialog } from "./medicine-dialog";
import { StatusBadge } from "../common/status-badge";

interface MedicineTableProps {
  data: MedicineResponseDTO[];
}

export function MedicineTable({ data }: MedicineTableProps) {
  const navigate = useNavigate();
   const fetcher = useFetcher();

    const handleActivation = (code: string, activate: boolean) => {
    fetcher.submit(
      {
        code: code,
        redirectTo: "/medicines",
        activate: String(activate), // Enviamos como string para compatibilidad
      },
      {
        method: "POST",
        action: `/medicines/${code}/action`,
      }
    );
  };

  const columns: ColumnDef<MedicineResponseDTO>[] = [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
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
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
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
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Activity className="h-4 w-4" />
          Estado
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => (
        <StatusBadge status={getValue() === "ACTIVE"} />
      ),
    },
    {
      accessorKey: "unitType",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Layers className="h-4 w-4" />
          Unidad
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => (
        <UnitTypeBadge unitType={getValue() as any} />
      ),
    },
    {
      accessorKey: "minStock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Layers className="h-4 w-4" />
          Min. Stock
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "currentPrice",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <DollarSign className="h-4 w-4" />
          Precio
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => `Q${(info.getValue() as number).toFixed(2)}`,
    },
    {
      accessorKey: "currentCost",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <BadgeDollarSign className="h-4 w-4" />
          Costo
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => `Q${(info.getValue() as number).toFixed(2)}`,
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const medicine = row.original;
        const isActive = medicine.status === "ACTIVE";

        return (
          <div className="flex items-center gap-2">
            <MedicineDialog medicine={medicine} />
            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigate(`/medicines/${medicine.code}/edit`)}
            >
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
            <Button
              size="sm"
              variant={isActive ? "destructive" : "default"}
              onClick={() => handleActivation(medicine.code, !isActive)}
            >
              {isActive ? (
                <>
                  <XCircle className="h-4 w-4" />
                  Desactivar
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Activar
                </>
              )}
            </Button>
          </div>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
