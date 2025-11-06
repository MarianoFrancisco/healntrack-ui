import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import type { DepartmentResponseDTO } from "~/types/department";
import { ErrorAlert } from "../common/error-alert";
import { SuccessAlert } from "../common/success-alert";
import { Textarea } from "../ui/textarea";

interface DepartmentFormProps {
  department?: DepartmentResponseDTO;
}

export function DepartmentForm({ department }: DepartmentFormProps) {
  const actionData = useActionData() as { error?: string; success?: string; errors?: Record<string, string> } | undefined;
  const navigation = useNavigation();
  const [submitted, setSubmitted] = useState(false);

  const isSubmitting = navigation.state === "submitting";
  const isEditMode = !!department;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        {isEditMode ? "Editar Area" : "Crear Area"}
      </h2>

      {actionData?.error && (
        <ErrorAlert title="Error" description={actionData.error} />
      )}
      {actionData?.success && (
        <SuccessAlert title="Éxito" description={actionData.success} />
      )}

      <Form
        method="post"
        onSubmit={() => setSubmitted(true)}
        className="space-y-4 rounded-lg border p-6 shadow-sm bg-white"
      >
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            type="text"
            maxLength={50}
            placeholder="Ej. Recursos Humanos"
            defaultValue={department?.name ?? ""}
            required
          />
          {actionData?.errors?.name && (
            <p className="text-sm text-red-600">{actionData.errors.name}</p>
          )}
        </div>

        {/* Código */}
        <div className="space-y-2">
          <Label htmlFor="code">Código</Label>
          <Input
            id="code"
            name="code"
            type="text"
            maxLength={7}
            placeholder="Ej. HRM-001"
            defaultValue={department?.code ?? ""}
            required
            disabled={isEditMode} // no editable al actualizar
          />
          {actionData?.errors?.code && (
            <p className="text-sm text-red-600">{actionData.errors.code}</p>
          )}
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            maxLength={255}
            placeholder="Breve descripción del departamento"
            defaultValue={department?.description ?? ""}
          />
          {actionData?.errors?.description && (
            <p className="text-sm text-red-600">{actionData.errors.description}</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />{" "}
                {isEditMode ? "Guardando cambios..." : "Creando..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />{" "}
                {isEditMode ? "Guardar cambios" : "Crear"}
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
