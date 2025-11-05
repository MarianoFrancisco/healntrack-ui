import { ArrowUpDown, Calendar, User, Building2, Briefcase, Banknote } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import type { EmploymentResponseDTO } from "~/types/employee";
import { DataTable } from "../common/data-table";

interface EmploymentTableProps {
  data: EmploymentResponseDTO[];
}

export function EmploymentTable({ data }: EmploymentTableProps) {
  const columns: ColumnDef<EmploymentResponseDTO>[] = [
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
        const start = new Date(row.original.startDate).toLocaleDateString();
        const end = row.original.endDate
          ? new Date(row.original.endDate).toLocaleDateString()
          : "Actual";
        return `${start} - ${end}`;
      },
    },
    {
      accessorKey: "employeeFullname",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <User className="h-4 w-4" />
          Empleado
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
          Departamento
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
          <Briefcase className="h-4 w-4" />
          Tipo
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const type = getValue() as string;
        const color =
          type === "HIRING"
            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
            : type === "TERMINATION"
            ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
            : "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100";
        return (
          <Badge variant="secondary" className={`px-2 py-1 ${color}`}>
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "salary",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="flex items-center gap-2 font-semibold"
        >
            <Banknote className="h-4 w-4" />
          Salario
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const salary = getValue() as number;
        return salary.toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        });
      },
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
