import { Link, useFetcher, useLoaderData, useNavigate } from "react-router";
import { DepartmentTable } from "~/components/departments/department-table";
import { Button } from "~/components/ui/button";
import { departmentService } from "~/services/department-service";
import type { DepartmentResponseDTO, FindDepartmentsRequest } from "~/types/department";
import type { Route } from "../+types/home";
import { DepartmentFilter } from "~/components/departments/department-filter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Áreas" },
    { name: "description", content: "Listado de areas" },
  ];
}

export const handle = {
  crumb: "Listado de areas"
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const filters: FindDepartmentsRequest = {};

  if (params.q && params.q.trim() !== "") filters.q = params.q.trim();
  if (params.isActive && params.isActive !== "all") {
    filters.isActive = params.isActive === "true";
  }

  try {
    const departments = await departmentService.getAllDepartments(filters);
    return Response.json(departments);
  } catch (error) {
    console.error("Error al cargar departamentos:", error);
    return Response.json([], { status: 500 });
  }
}

export default function DepartmentsPage() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const departments = useLoaderData<typeof loader>() as DepartmentResponseDTO[];

  const handleEdit = (code: string) => {
    navigate(`/departments/${code}/edit`);
  };

  const handleDeactivate = (code: string) => {
    fetcher.submit(
      { id: code, redirectTo: "/departments" },
      { method: "POST", action: `/departments/${code}/deactivate` }
    );
  };

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Áreas</h1>
        <p className="text-muted-foreground">
          Gestiona las áreas o departamentos registrados en el sistema.
        </p>
      </div>

      {/* Filtro + botón de crear */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 w-full">
        <div className="flex-1">
          <DepartmentFilter />
        </div>

        <div className="flex lg:justify-start justify-end">
          <Button asChild>
            <Link to="/departments/create">Nuevo Departamento</Link>
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <DepartmentTable
        data={departments}
        handleEdit={handleEdit}
        handleDeactivate={handleDeactivate}
      />
    </section>
  );
}