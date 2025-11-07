import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { DatePicker } from "../common/date-picker";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";
import type { HospitalizationResponseComplete } from "~/types/hospitalization/hospitalization";

interface DischargeFormProps {
  hospitalization: HospitalizationResponseComplete;
}

export function DischargeHospitalizationForm({ hospitalization }: DischargeFormProps) {
  const actionData = useActionData() as { error?: string; success?: string } | undefined;
  const navigation = useNavigation();
  const [dischargeDate, setDischargeDate] = useState<Date | undefined>();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Dar de alta hospitalización</h2>

      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form method="post" className="space-y-6 rounded-lg border p-6 shadow-sm bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha de alta editable */}
          <div className="space-y-2">
            <Label htmlFor="dischargeDate">Fecha de alta</Label>
            <input
              type="hidden"
              name="dischargeDate"
              value={dischargeDate ? dischargeDate.toISOString().split("T")[0] : ""}
            />
            <DatePicker
              value={dischargeDate}
              onChange={setDischargeDate}
              placeholder="Selecciona fecha de alta"
            />
          </div>

          {/* CUI */}
          <div className="space-y-2">
            <Label htmlFor="cui">CUI</Label>
            <Input id="cui" value={hospitalization.patient.cui} disabled />
          </div>

          {/* Nombre paciente */}
          <div className="space-y-2">
            <Label htmlFor="fullname">Nombre paciente</Label>
            <Input id="fullname" value={hospitalization.patient.fullName} disabled />
          </div>

          {/* Número de habitación */}
          <div className="space-y-2">
            <Label htmlFor="roomNumber">Número de habitación</Label>
            <Input id="roomNumber" value={hospitalization.room.number} disabled />
          </div>

          {/* Fecha de admisión */}
          <div className="space-y-2">
            <Label htmlFor="admissionDate">Fecha de admisión</Label>
            <Input id="admissionDate" value={new Date(hospitalization.admissionDate).toLocaleDateString("es-GT")} disabled />
          </div>

          {/* Total Fee */}
          <div className="space-y-2">
            <Label htmlFor="totalFee">Costo total</Label>
            <Input
              id="totalFee"
              value={hospitalization.totalFee?.toLocaleString("es-GT", { style: "currency", currency: "GTQ" }) || "Q0.00"}
              disabled
            />
          </div>

          {/* Cantidad de staff asignado */}
          <div className="space-y-2">
            <Label htmlFor="staffCount">Cantidad de staff asignado</Label>
            <Input id="staffCount" value={hospitalization.staffAssignment.length} disabled />
          </div>
        </div>

        <div className="flex items-center justify-end pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Dar de alta
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
