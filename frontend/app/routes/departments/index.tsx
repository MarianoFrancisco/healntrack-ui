import { Link, useLoaderData } from "react-router";
import { DepartmentTable } from "~/components/departments/department-table";
import { Button } from "~/components/ui/button";
import { departmentService } from "~/services/department-service";
import type { DepartmentResponseDTO } from "~/types/department";

export async function loader({ request }: { request: Request }) {
  console.log("Departments loader called with:", request.url);

  try {
    // En el futuro podrías pasar query params ?page=1&sort=asc
    console.log("Fetching all departments...");
    const response = await departmentService.getAllDepartments();
    console.log("Departments loader response:", response);

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
  const response = useLoaderData<typeof loader>();

  const departments = (response || []) as DepartmentResponseDTO[];

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
          {/* 🔍 Aquí podrías agregar un buscador después */}
        </div>
        <Button asChild>
          <Link to="/departments/create">Nuevo Departamento</Link>
        </Button>
      </div>

      {/* 📊 Tabla de departamentos */}
      <DepartmentTable data={departments} />
    </section>
  );
}
