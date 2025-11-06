import {
    ArrowUpDown,
    CalendarDays,
    IdCard,
    User,
    Building2,
    Eye,
    CheckCircle2,
    XCircle,
    Shield,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { DataTable } from "../common/data-table";
import type { VacationResponseDTO } from "~/types/vacation";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";
import { VacationStatusBadge } from "./vacation-status-badge";
import { VacationDialog } from "./vacation-dialog";

interface VacationTableProps {
    data: VacationResponseDTO[];
}

export function VacationTable({ data }: VacationTableProps) {
    const navigate = useNavigate();

    const columns: ColumnDef<VacationResponseDTO>[] = [
        {
            accessorKey: "requestedAt",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="flex items-center gap-2 font-semibold"
                >
                    <CalendarDays className="h-4 w-4" />
                    Fecha
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ getValue }) => {
                const date = new Date(getValue() as string);
                return date.toLocaleDateString("es-GT");
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
            accessorKey: "employeeName",
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
            id: "period",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="flex items-center gap-2 font-semibold"
                >
                    <CalendarDays className="h-4 w-4" />
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
            accessorKey: "status",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-2 font-semibold"
                >
                    <Shield className="h-4 w-4" />
                    Estado
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ getValue }) => <VacationStatusBadge status={getValue() as string} />,
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                const vacation = row.original;
                const canReview = vacation.status === "PENDIENTE" || vacation.status === "AUTOGENERADA";

                return (
                    <div className="flex items-center gap-2">
                        <VacationDialog vacation={vacation}/>
                        {canReview && (
                            <Button
                                size="sm"
                                onClick={() => navigate(`/vacations/${vacation.id}/review`)}
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                Revisar
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return <DataTable data={data} columns={columns} pageSize={10} />;
}
