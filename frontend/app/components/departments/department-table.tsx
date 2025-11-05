import { ArrowUpDown, Edit, Power, Building2, Users, TextAlignStart } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import type { DepartmentResponseDTO } from "~/types/department";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../common/data-table";
import { ConfirmDialog } from "../common/confirm-dialog";

interface DepartmentTableProps {
  data: DepartmentResponseDTO[];
  handleEdit: (code: string) => void;
  handleDeactivate: (code: string) => void;
}

export function DepartmentTable({ data, handleEdit, handleDeactivate }: DepartmentTableProps) {
  const columns: ColumnDef<DepartmentResponseDTO>[] = [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Building2 className="h-4 w-4" />
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Users className="h-4 w-4" />
          Nombre
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "description",
        header: () => (
    <div className="flex items-center gap-2 font-semibold">
      <TextAlignStart className="h-4 w-4"/>
      Descripción
    </div>
  ),
      cell: (info) => info.getValue() || "—",
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Users className="h-4 w-4" />
          Estado
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => {
        const value = info.getValue() as boolean;
        return (
          <Badge
            variant={value ? "secondary" : "destructive"}
            className={`px-2 py-1 ${
              value
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
            }`}
          >
            {value ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.original.code)}
          >
            <Edit className="h-4 w-4 mr-1" /> Editar
          </Button>
          <ConfirmDialog
            trigger={
              <Button variant="destructive" size="sm" className="flex items-center gap-1">
                <Power className="h-4 w-4 mr-1" /> Desactivar
              </Button>
            }
            title="Confirmar desactivación"
            description={`¿Seguro que quieres desactivar el departamento ${row.original.name}?`}
            onConfirm={() => handleDeactivate(row.original.code)}
          />

        </div>
      ),
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
