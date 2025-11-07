import {
  ArrowUpDown,
  CalendarDays,
  User,
  Hash,
  BedDouble,
  DollarSign,
  Users,
  LogOut,
  Eye,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../common/data-table";
import { useNavigate } from "react-router";
import type { HospitalizationResponseComplete } from "~/types/hospitalization/hospitalization";
import { HospitalizationStatusBadge } from "./hospitalization-status-badge";

interface HospitalizationTableProps {
  data: HospitalizationResponseComplete[];
}

export function HospitalizationTable({ data }: HospitalizationTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<HospitalizationResponseComplete>[] = [
    {
      accessorKey: "admissionDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-semibold"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          <CalendarDays className="h-4 w-4" />
          Periodo
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const h = row.original;
        const admission = h.admissionDate
        const discharge = h.dischargeDate
          ? h.dischargeDate
          : "—";
        return (
          <div className="text-sm text-muted-foreground">
            <div>{admission}</div>
            <div className="text-xs text-muted-foreground">→ {discharge}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "patient.cui",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-semibold"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          <Hash className="h-4 w-4" />
          CUI
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.patient.cui,
    },
    {
      accessorKey: "patient.fullname",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-semibold"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          <User className="h-4 w-4" />
          Paciente
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.patient.fullName,
    },
    {
      accessorKey: "room.number",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-semibold"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          <BedDouble className="h-4 w-4" />
          Habitación
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.room.number,
    },
    {
      accessorKey: "staffAssignment",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-semibold"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          <Users className="h-4 w-4" />
          Staff asignado
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const count = row.original.staffAssignment.length;
        return <span>{count} empleado{count !== 1 ? "s" : ""}</span>;
      },
    },
    {
      id: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const active = !row.original.dischargeDate;
        return <HospitalizationStatusBadge active={active} />;
      },
    },
    {
      accessorKey: "totalFee",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-semibold"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          <DollarSign className="h-4 w-4" />
          Total
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const total = row.original.totalFee ?? 0;
        return `Q${total.toFixed(2)}`;
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const hospitalization = row.original;
        const isActive = !hospitalization.dischargeDate;

        return (
          <div className="flex items-center gap-2">
            {isActive ? (
              <>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    navigate(`/hospitalizations/${hospitalization.id}/staff`)
                  }
                >
                  <Users className="h-4 w-4" />
                  Manejar staff
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    navigate(`/hospitalizations/${hospitalization.id}/discharge`)
                  }
                >
                  <LogOut className="h-4 w-4" />
                  Dar de alta
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  navigate(`/hospitalizations/${hospitalization.id}`)
                }
              >
                <Eye className="h-4 w-4" />
                Ver detalles
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
