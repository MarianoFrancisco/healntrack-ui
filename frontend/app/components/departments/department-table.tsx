import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown, Edit, Power, Building2 } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import type { DepartmentResponseDTO } from "~/types/department";

interface DepartmentTableProps {
  data: DepartmentResponseDTO[];
}

export function DepartmentTable({ data }: DepartmentTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [page, setPage] = React.useState(0);
  const [pageSize] = React.useState(10);

  const columns = React.useMemo<ColumnDef<DepartmentResponseDTO>[]>(
    () => [
      {
        accessorKey: "code",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-semibold flex items-center gap-2"
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
            className="font-semibold flex items-center gap-2"
          >
            Nombre
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        ),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "description",
        header: "Descripción",
        cell: (info) => info.getValue() || "—",
      },
      {
        accessorKey: "active",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-semibold flex items-center gap-2"
          >
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
              className="flex items-center gap-1"
              onClick={() => console.log("Editar", row.original.code)}
            >
              <Edit className="h-4 w-4" /> Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => console.log("Desactivar", row.original.code)}
            >
              <Power className="h-4 w-4" /> Desactivar
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
  });

  const totalPages = Math.ceil(data.length / pageSize);
  const pagedData = React.useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const sort = sorting[0];
      if (!sort) return 0;
      const valueA = a[sort.id as keyof DepartmentResponseDTO];
      const valueB = b[sort.id as keyof DepartmentResponseDTO];
      if (valueA! < valueB!) return sort.desc ? 1 : -1;
      if (valueA! > valueB!) return sort.desc ? -1 : 1;
      return 0;
    });
    return sorted.slice(page * pageSize, page * pageSize + pageSize);
  }, [data, sorting, page, pageSize]);

  return (
    <div className="space-y-4">
      <Table className="border rounded-lg">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {pagedData.length ? (
            pagedData.map((row) => (
              <TableRow key={row.code}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={row.isActive ? "secondary" : "destructive"}
                    className={`px-2 py-1 ${
                      row.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                        : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
                    }`}
                  >
                    {row.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("Editar", row.code)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => console.log("Desactivar", row.code)}
                    >
                      <Power className="h-4 w-4 mr-1" /> Desactivar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No hay departamentos registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ✅ Controles de paginación dentro del flujo del layout */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          Anterior
        </Button>
        <span className="text-sm text-gray-600">
          Página {page + 1} de {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
