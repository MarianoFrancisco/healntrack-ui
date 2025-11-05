import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { RewardEmployeeForm } from "~/components/employees/reward-employee-form";
import type {
  EmployeeResponseDTO,
  PromoteEmployeeRequestDTO,
  SalaryIncreaseRequestDTO,
} from "~/types/employee";
import { ApiError } from "~/lib/api-client";
import type { Route } from "../+types/home";
import { employeeService } from "~/services/employment-service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aumento o ascenso de empleado" },
    { name: "description", content: "Registrar aumento salarial o ascenso de un empleado" },
  ];
}

export const handle = {
  crumb: "Recompensar empleado",
};

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

export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.cui) throw new Error("No se proporcionó el CUI del empleado");

  const formData = await request.formData();
  const rewardType = formData.get("rewardType") as string;

  try {
    const date = formData.get("date") as string;
    const salaryIncrease = parseFloat(formData.get("salaryIncrease") as string);
    const notes = (formData.get("notes") as string) || "";

    if (rewardType === "ASCENSO") {
      const promoteData: PromoteEmployeeRequestDTO = {
        salaryIncrease: salaryIncrease || 0,
        departmentCode: formData.get("departmentCode") as string,
        date,
        notes,
      };

      await employeeService.promoteEmployee(params.cui, promoteData);
    } else if (rewardType === "AUMENTO") {
      const increaseData: SalaryIncreaseRequestDTO = {
        salaryIncrease: salaryIncrease || 0,
        date,
        notes,
      };

      await employeeService.applySalaryIncrease(params.cui, increaseData);
    } else {
      throw new Error("Tipo de recompensa no válido (debe ser ASCENSO o AUMENTO)");
    }

    return redirect("/employees");
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
            `Error ${error.status || ""} al registrar la recompensa`,
        };
      } catch {
        return { error: "Error al procesar la respuesta del servidor" };
      }
    }

    return { error: error.message || "Error desconocido al registrar la recompensa" };
  }
}

export default function RewardEmployeePage({
  loaderData,
}: {
  loaderData: EmployeeResponseDTO;
}) {
  return (
    <section className="p-6">
      <RewardEmployeeForm employee={loaderData} />
    </section>
  );
}
