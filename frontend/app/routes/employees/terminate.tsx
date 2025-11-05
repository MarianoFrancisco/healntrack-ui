import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { TerminateEmployeeForm } from "~/components/employees/terminate-employee-form";
import type { EmployeeResponseDTO, TerminateEmploymentRequestDTO } from "~/types/employee";
import { ApiError } from "~/lib/api-client";
import type { Route } from "../+types/home";
import { employeeService } from "~/services/employment-service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terminar empleado" },
    { name: "description", content: "Registrar la terminación laboral de un empleado" },
  ];
}

export const handle = {
  crumb: "Terminar empleado",
};

// 🔹 Loader: obtiene al empleado usando su CUI
export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.cui) throw new Error("No se proporcionó el CUI del empleado");

  try {
    const employee = await employeeService.getEmployee(params.cui);
    return employee;
  } catch (error) {
    console.error("Loader error:", error);
    throw error;
  }
}

// 🔹 Action: envía la terminación al backend
export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.cui) throw new Error("No se proporcionó el CUI del empleado");

  const formData = await request.formData();

  try {
    const terminateData: TerminateEmploymentRequestDTO = {
      date: formData.get("date") as string,
      terminationType: formData.get("terminationType") as string,
      reason: (formData.get("reason") as string) || "",
    };

    await employeeService.terminateEmployment(params.cui, terminateData);
    return redirect("/employees/history");
  } catch (error: any) {
    console.error("Action error:", error);

    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;
        return {
          errors: errorData.errors || {},
          error:
            errorData.detail ||
            errorData.message ||
            `Error ${error.status || ""} al registrar la terminación`,
        };
      } catch (parseError) {
        return { error: "Error al procesar la respuesta del servidor" };
      }
    }

    return { error: error.message || "Error desconocido al registrar la terminación" };
  }
}

// 🔹 Página principal
export default function TerminateEmployeePage({
  loaderData,
}: {
  loaderData: EmployeeResponseDTO;
}) {
  return (
    <section className="p-6">
      <TerminateEmployeeForm employee={loaderData} />
    </section>
  );
}
