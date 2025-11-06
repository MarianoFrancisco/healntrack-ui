import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData } from "react-router";
import { ApiError } from "~/lib/api-client";
import { employeeService } from "~/services/employment-service";
import { vacationService } from "~/services/vacation-service";
import type { ComboboxOption } from "~/components/common/combobox-option";
import type { RequestVacationRequestDTO } from "~/types/vacation";
import type { Route } from "../+types/home";
import { VacationRequestForm } from "~/components/vacations/vacation-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva solicitud de vacaciones" },
    { name: "description", content: "Registrar una nueva solicitud de vacaciones de empleado" },
  ];
}

export const handle = {
  crumb: "Nueva solicitud",
};

// Loader: obtiene todos los empleados activos
export async function loader(_: LoaderFunctionArgs) {
  try {
    const employees = await employeeService.getAllEmployees({ isActive: true });

    const employeeOptions: ComboboxOption[] = employees.map((e) => ({
      label: e.fullname,
      value: e.cui, // Se usa CUI porque es el campo requerido por RequestVacationRequestDTO
    }));

    return { employeeOptions };
  } catch (error) {
    console.error("Error al cargar empleados:", error);
    throw error;
  }
}

// Action: procesa el envío del formulario y crea la solicitud
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload: RequestVacationRequestDTO = {
    employeeCui: formData.get("employeeCui") as string,
    requestedAt: formData.get("requestedAt") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
  };

  try {
    await vacationService.requestVacation(payload);
    return redirect("/vacations");
  } catch (error: any) {
    console.error("Error al crear solicitud de vacaciones:", error);

    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;
        return {
          errors: errorData.errors || {},
          error: errorData.detail || errorData.message || `Error ${error.status}`,
        };
      } catch (parseError) {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }

    return { error: error.message || "Error al crear la solicitud de vacaciones" };
  }
}

// Página principal
export default function CreateVacationRequestPage() {
  const { employeeOptions } = useLoaderData<typeof loader>();

  return (
    <section className="p-6">
      <VacationRequestForm employees={employeeOptions} />
    </section>
  );
}
