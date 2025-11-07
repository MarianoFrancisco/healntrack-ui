import { ArrowUpDown, Users, Building2, DollarSign, User, IdCard, Banknote, Shield, XCircle, Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { DataTable } from "../common/data-table";
import type { EmployeeResponseDTO } from "~/types/employee";
import type { ColumnDef } from "@tanstack/react-table";
import { Form } from "react-router";

interface StaffTableRow {
  employee: EmployeeResponseDTO;
  assignedAt: string;
}

interface StaffTableProps {
  data: StaffTableRow[];
}

export function StaffTable({ data }: StaffTableProps) {
  const columns: ColumnDef<StaffTableRow>[] = [
    {
      accessorFn: (row) => row.assignedAt,
      id: "assignedAt",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
          <Calendar className="h-4 w-4" />
          Fecha de asignación
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.employee.cui,
      id: "cui",
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
      accessorFn: (row) => row.employee.fullname,
      id: "fullname",
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
      accessorFn: (row) => row.employee.department.name,
      id: "department",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
          <Building2 className="h-4 w-4" />
          Área
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.employee.isActive,
      id: "isActive",
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
        const { employee } = row.original;
        return (
          <Form method="post">
            <input type="hidden" name="employeeId" value={employee.id} />
            <Button type="submit" size="sm" variant="destructive" className="flex items-center gap-1">
              <XCircle className="h-4 w-4" />
              Desasignar
            </Button>
          </Form>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
