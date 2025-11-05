import { ArrowUpDown, Calendar, IdCard, User, Building2, Shield } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { DataTable } from "../common/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { DepartmentManagerResponseDTO } from "~/types/employee";

interface DepartmentManagerTableProps {
  data: DepartmentManagerResponseDTO[];
}

export function DepartmentManagerTable({ data }: DepartmentManagerTableProps) {
  const columns: ColumnDef<DepartmentManagerResponseDTO>[] = [
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Calendar className="h-4 w-4" />
          Periodo
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const start = new Date(row.original.startDate).toLocaleDateString("es-GT");
        const end = row.original.endDate
          ? new Date(row.original.endDate).toLocaleDateString("es-GT")
          : "Actual";
        return `${start} - ${end}`;
      },
    },
    {
      accessorKey: "employeeCui",
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
      accessorKey: "employeeFullName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <User className="h-4 w-4" />
          Nombre completo
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "departmentName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Building2 className="h-4 w-4" />
          Area
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Shield className="h-4 w-4" />
          Estado
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const isActive = getValue() as boolean;
        return (
          <Badge
            variant={isActive ? "secondary" : "destructive"}
            className={`px-2 py-1 ${
              isActive
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
            }`}
          >
            {isActive ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
