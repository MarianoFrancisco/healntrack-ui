import { ArrowUpDown, Calendar, IdCard, User, Building2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DataTable } from "../common/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { PayrollItemResponseDTO } from "~/types/payroll";

interface PayrollTableProps {
  data: PayrollItemResponseDTO[];
}

export function PayrollTable({ data }: PayrollTableProps) {
  const columns: ColumnDef<PayrollItemResponseDTO>[] = [
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Calendar className="h-4 w-4" />
          Periodo
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const start = new Date(row.original.startDate).toLocaleDateString("es-GT");
        const end = new Date(row.original.endDate).toLocaleDateString("es-GT");
        return `${start} - ${end}`;
      },
    },
    {
      accessorKey: "payDay",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold"
        >
          <Calendar className="h-4 w-4" />
          Fecha de pago
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString("es-GT"),
    },
    {
      accessorKey: "employeeCui",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
      accessorKey: "employeeName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
      accessorKey: "departmentName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
      accessorKey: "igssDeduction",
      header: "IGSS",
      cell: ({ getValue }) =>
        Number(getValue()).toLocaleString("es-GT", { style: "currency", currency: "GTQ" }),
    },
    {
      accessorKey: "irtraDeduction",
      header: "IRTRA",
      cell: ({ getValue }) =>
        Number(getValue()).toLocaleString("es-GT", { style: "currency", currency: "GTQ" }),
    },
    {
      accessorKey: "netSalary",
      header: "Salario neto",
      cell: ({ getValue }) =>
        Number(getValue()).toLocaleString("es-GT", { style: "currency", currency: "GTQ" }),
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
