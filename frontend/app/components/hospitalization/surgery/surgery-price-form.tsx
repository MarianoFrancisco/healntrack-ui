import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import type { SurgeryPriceResponseDTO } from "~/types/hospitalization/surgery";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";

interface SurgeryPriceFormProps {
  surgeryPrice?: SurgeryPriceResponseDTO;
}

export function SurgeryPriceForm({ surgeryPrice }: SurgeryPriceFormProps) {
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;

  const navigation = useNavigation();
  const [submitted, setSubmitted] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  const isEditMode = !!surgeryPrice;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        {isEditMode ? "Editar Cirugía" : "Crear Cirugía"}
      </h2>

      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form
        method="post"
        onSubmit={() => setSubmitted(true)}
        className="space-y-4 rounded-lg border p-6 shadow-sm bg-white"
      >
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la cirugía</Label>
          <Input
            id="name"
            name="name"
            type="text"
            maxLength={100}
            placeholder="Ej. Apendicectomía"
            defaultValue={surgeryPrice?.name ?? ""}
            required
          />
          {actionData?.errors?.name && (
            <p className="text-sm text-red-600">{actionData.errors.name}</p>
          )}
        </div>

        {/* Tarifas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="hospitalFee">Tarifa hospitalaria</Label>
            <Input
              id="hospitalFee"
              name="hospitalFee"
              type="number"
              step="0.01"
              placeholder="Ej. 500.00"
              defaultValue={surgeryPrice?.hospitalFee ?? 0}
              required
            />
            {actionData?.errors?.hospitalFee && (
              <p className="text-sm text-red-600">{actionData.errors.hospitalFee}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialistFee">Tarifa especialistas</Label>
            <Input
              id="specialistFee"
              name="specialistFee"
              type="number"
              step="0.01"
              placeholder="Ej. 300.00"
              defaultValue={surgeryPrice?.specialistFee ?? 0}
              required
            />
            {actionData?.errors?.specialistFee && (
              <p className="text-sm text-red-600">{actionData.errors.specialistFee}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="surgeryFee">Tarifa cirugía</Label>
            <Input
              id="surgeryFee"
              name="surgeryFee"
              type="number"
              step="0.01"
              placeholder="Ej. 1000.00"
              defaultValue={surgeryPrice?.surgeryFee ?? 0}
              required
            />
            {actionData?.errors?.surgeryFee && (
              <p className="text-sm text-red-600">{actionData.errors.surgeryFee}</p>
            )}
          </div>
        </div>

        {/* Botón submit */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
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
