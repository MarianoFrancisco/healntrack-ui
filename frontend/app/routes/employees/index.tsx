import { Link, useFetcher, useLoaderData } from "react-router";
import type { Route } from "../+types/home";
import { EmployeeTable } from "~/components/employees/employee-table";
import { Button } from "~/components/ui/button";
import type { EmployeeResponseDTO, FindAllEmployeesRequestDTO, UpdateEmployeeRequestDTO } from "~/types/employee";
import { employeeService } from "~/services/employment-service";
import { EmployeeFilter } from "~/components/employees/employee-filter";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Empleados" },
    { name: "description", content: "Listado y gestión de empleados" },
  ];
}

export const handle = {
  crumb: "Empleados",
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const filters: FindAllEmployeesRequestDTO = {};
  if (params.q && params.q.trim() !== "") filters.q = params.q.trim();
  if (params.department && params.department.trim() !== "")
    filters.department = params.department.trim();

  if (params.isActive && params.isActive !== "all") {
    filters.isActive = params.isActive === "true";
  }

  try {
    const employees = await employeeService.getAllEmployees(filters);
    return Response.json(employees);
  } catch (error) {
    console.error("Error al cargar empleados:", error);
    return Response.json([], { status: 500 });
  }
}

export default function EmployeesPage() {
  const employees = useLoaderData<typeof loader>() as EmployeeResponseDTO[];
  const fetcher = useFetcher();

  const handleEdit = async (cui: string, updated: UpdateEmployeeRequestDTO) => {
    const formData = new FormData();
    formData.append("fullname", updated.fullname ?? "");
    formData.append("phoneNumber", updated.phoneNumber ?? "");
    formData.append("igssPercent", String(updated.igssPercent ?? 0));
    formData.append("irtraPercent", String(updated.irtraPercent ?? 0));

    fetcher.submit(formData, {
      method: "POST",
      action: `/employees/${cui}/edit`,
    });
  };

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
        <p className="text-muted-foreground">
          Gestiona los empleados registrados en el sistema.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 w-full">
        <div className="flex-1">
          <EmployeeFilter />
        </div>

        <div className="flex lg:justify-start justify-end">
          <Button asChild >
            <Link to="/employees/hire">Contratar empleado</Link>
          </Button>
        </div>
      </div>


      <EmployeeTable data={employees} handleEdit={handleEdit} />
    </section>
  );
}
