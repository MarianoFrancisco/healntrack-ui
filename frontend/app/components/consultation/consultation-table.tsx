import { ArrowUpDown, Banknote, Calendar, Eye, SquareUser, Stethoscope } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../common/data-table";
import { useNavigate } from "react-router";
import type {
    ConsultationFullData
} from "~/types/consultation";
import type { PatientResponseDTO } from "~/types/patient";
import type { EmployeeResponseDTO } from "~/types/employee";
import { ConsultationDialog } from "./consultation-dialog";

interface ConsultationTableProps {
    data: ConsultationFullData[];
}

export function ConsultationTable({ data }: ConsultationTableProps) {
    const navigate = useNavigate();

    const columns: ColumnDef<ConsultationFullData>[] = [
        {
            accessorKey: "date",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
                    <Calendar className="h-4 w-4" />
                    Fecha
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: (info) => new Date(info.getValue() as string).toLocaleDateString("es-GT"),
        },
        {
            accessorKey: "patient",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
                    <SquareUser className="h-4 w-4" />
                    Paciente
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: (info) => (info.getValue() as PatientResponseDTO).fullName,
        },
        {
            accessorKey: "doctor",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
                    <Stethoscope className="h-4 w-4" />
                    Doctor
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: (info) => (info.getValue() as EmployeeResponseDTO).fullname,
        },
        {
            accessorKey: "totalFee",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 font-semibold">
                    <Banknote className="h-4 w-4" />
                    Precio de consulta
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
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => (
                <ConsultationDialog consultation={row.original} />
            ),
        },
    ];

    return <DataTable data={data} columns={columns} pageSize={10} />;
}
