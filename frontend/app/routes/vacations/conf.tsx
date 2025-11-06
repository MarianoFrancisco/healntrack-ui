import { useLoaderData, useActionData, useNavigation } from "react-router";
import type { Route } from "../+types/home";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";
import { employeeService } from "~/services/employment-service";
import type { ConfigurationResponseDTO, UpdateConfDTO } from "~/types/vacation";
import { ConfigForm } from "~/components/vacations/vacation-conf";

// --- Metadata ---
export function meta() {
  return [
    { title: "Configuraciones" },
    { name: "description", content: "Gestión de parámetros de configuración del módulo de empleados" },
  ];
}

export const handle = {
  crumb: "Configuraciones",
};

// --- Loader: obtiene todas las configuraciones ---
export async function loader() {
  const configs = await employeeService.findAllConf();
  return Response.json(configs);
}

// --- Action: actualiza una configuración individual ---
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const key = formData.get("key") as string;
  const value = Number(formData.get("value"));

  try {
    const dto: UpdateConfDTO = { value };
    await employeeService.updateConf(key, dto);
    return { success: `Configuración "${key}" actualizada correctamente.` };
  } catch (error: any) {
    console.error("Error actualizando configuración:", error);
    return { error: error.message || "Error al actualizar la configuración." };
  }
}

// --- Página principal ---
export default function ConfigurationsPage() {
  const configs = useLoaderData<typeof loader>() as ConfigurationResponseDTO[];
  const actionData = useActionData() as { success?: string; error?: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="p-6 mx-auto max-w-3xl space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Ajusta los parámetros del módulo de vacaciones como días de vacaciones por año y días de anticipación para solicitudes.
        </p>
      </div>

      {/* Mensajes de acción */}
      {actionData?.error && (
        <ErrorAlert title="Error" description={actionData.error} />
      )}
      {actionData?.success && (
        <SuccessAlert title="Éxito" description={actionData.success} />
      )}

      {/* Contenedor centrado y con ancho limitado */}
      <div className="w-full">
        {configs.map((conf) => (
          <ConfigForm key={conf.key} config={conf} />
        ))}
      </div>

      {isSubmitting && (
        <p className="text-sm text-muted-foreground text-center">
          Guardando cambios...
        </p>
      )}
    </section>
  );
}

