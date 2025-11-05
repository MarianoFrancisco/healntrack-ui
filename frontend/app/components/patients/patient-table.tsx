import { ArrowUpDown, IdCard, User, AtSign, Phone } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DataTable } from "../common/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { PatientResponseDTO } from "~/types/patient";
import { useNavigate } from "react-router";

interface PatientTableProps {
  data: PatientResponseDTO[];
}

export function PatientTable({ data }: PatientTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<PatientResponseDTO>[] = [
    {
      accessorKey: "cui",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <IdCard className="h-4 w-4" />
          CUI
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <User className="h-4 w-4" />
          Nombre
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "gender",
      header: "Género",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <AtSign className="h-4 w-4" />
          Email
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Phone className="h-4 w-4" />
          Teléfono
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/patients/${row.original.id}/edit`)}
        >
          Editar
        </Button>
      ),
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
