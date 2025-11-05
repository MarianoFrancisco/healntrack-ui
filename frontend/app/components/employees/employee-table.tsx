import { ArrowUpDown, Edit, Users, Building2, DollarSign, User, IdCard, Banknote, Shield } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { DataTable } from "../common/data-table";
import type { EmployeeResponseDTO } from "~/types/employee";
import type { ColumnDef } from "@tanstack/react-table";
import { EmployeeEditDialog } from "./employee-dialog";

interface EmployeeTableProps {
  data: EmployeeResponseDTO[];
  handleEdit: (cui: string, updated: {
    fullname?: string;
    phoneNumber?: string;
    igssPercent?: number;
    irtraPercent?: number;
  }) => void | Promise<void>;
}

export function EmployeeTable({ data, handleEdit }: EmployeeTableProps) {
  const columns: ColumnDef<EmployeeResponseDTO>[] = [
    {
      accessorKey: "cui",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
          <IdCard className="h-4 w-4" />
          CUI
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "fullname",
            header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
          <User className="h-4 w-4" />
          Nombre completo
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "department.name",
            header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
          <Building2 className="h-4 w-4" />
          Area
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "salary",
            header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
          <Banknote className="h-4 w-4" />
          Salario
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => `Q. ${Number(info.getValue()).toFixed(2)}`,
    },
    {
      accessorKey: "isActive",
            header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
          <Shield className="h-4 w-4" />
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
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <EmployeeEditDialog
            employee={employee}
            onSave={handleEdit}
          />
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
