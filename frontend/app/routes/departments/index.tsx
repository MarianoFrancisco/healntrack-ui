import { Link, useFetcher, useLoaderData, useNavigate } from "react-router";
import { DepartmentTable } from "~/components/departments/department-table";
import { Button } from "~/components/ui/button";
import { departmentService } from "~/services/department-service";
import type { DepartmentResponseDTO } from "~/types/department";

export async function loader({ request }: { request: Request }) {
  console.log("Departments loader called with:", request.url);

  try {
    const response = await departmentService.getAllDepartments();

    return Response.json(response);
  } catch (error) {
    console.error("Departments loader error:", error);
    return Response.json(
      {
        data: [],
        totalElements: 0,
        pageNumber: 1,
        totalPages: 0,
        isFirst: true,
        isLast: true,
        hasNext: false,
        hasPrevious: false,
      },
      { status: 500 }
    );
  }
}

export default function DepartmentsPage() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const response = useLoaderData<typeof loader>();

  const departments = (response || []) as DepartmentResponseDTO[];

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Departamentos</h1>
        <p className="text-muted-foreground">
          Gestiona las áreas o departamentos registrados en el sistema.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex-1">
        </div>
        <Button asChild>
          <Link to="/departments/create">Nuevo Departamento</Link>
        </Button>
      </div>

      <DepartmentTable data={departments} handleEdit={handleEdit} handleDeactivate={handleDeactivate} />
    </section>
  );
}
