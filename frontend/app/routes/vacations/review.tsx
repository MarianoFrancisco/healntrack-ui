import {
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  useLoaderData,
} from "react-router";
import { vacationService } from "~/services/vacation-service";
import { employeeService } from "~/services/employment-service";
import type { ComboboxOption } from "~/components/common/combobox-option";
import type { ReviewVacationRequestDTO } from "~/types/vacation";
import { ApiError } from "~/lib/api-client";
import { ReviewVacationForm } from "~/components/vacations/review-vacation-form";

export function meta() {
  return [
    { title: "Revisar solicitud de vacaciones" },
    { name: "description", content: "Revisión (aprobación o rechazo) de solicitud de vacaciones" },
  ];
}

export const handle = {
  crumb: "Revisar vacaciones",
};

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const vacationId = params.id;
    if (!vacationId) throw new Error("Falta el parámetro de ID de la solicitud.");

    // Obtener la solicitud de vacaciones
    const vacation = await vacationService.getVacationById(vacationId);

    // Obtener los managers activos del mismo departamento
    const managers = await employeeService.getAllDepartmentManagers({
      department: vacation.departmentCode,
      isActive: true,
    });

    const managerOptions: ComboboxOption[] = managers.map((m) => ({
      label: m.employeeFullName,
      value: m.employeeCui,
    }));

    return { vacation, managerOptions };
  } catch (error) {
    console.error("Error al cargar datos de revisión de vacaciones:", error);
    throw error;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const vacationId = params.id;
  if (!vacationId) return { error: "Falta el ID de la solicitud de vacaciones." };

  const reviewType = formData.get("reviewType") as string; // "approve" o "reject"

  const payload: ReviewVacationRequestDTO = {
    reviewerCui: formData.get("reviewerCui") as string,
    reviewedAt: formData.get("reviewedAt") as string,
  };

  try {
    if (reviewType === "approve") {
      await vacationService.approveVacation(vacationId, payload);
    } else if (reviewType === "reject") {
      await vacationService.rejectVacation(vacationId, payload);
    } else {
      return { error: "Tipo de revisión inválido." };
    }

    return redirect("/vacations");
  } catch (error: any) {
    console.error("Error al procesar la revisión:", error);

    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;
        return {
          errors: errorData.errors || {},
          error:
            errorData.detail ||
            errorData.message ||
            `Error ${error.status}`,
        };
      } catch (parseError) {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }

    return { error: error.message || "Error al procesar la revisión de vacaciones" };
  }
}

export default function ReviewVacationPage() {
  const { vacation, managerOptions } = useLoaderData<typeof loader>();

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Revisar Solicitud de Vacaciones
      </h1>
      <ReviewVacationForm vacation={vacation} employees={managerOptions} />
    </section>
  );
}
