import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import { DatePicker } from "~/components/common/date-picker";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";

interface HospitalizationFormProps {
  patients: ComboboxOption[];
  rooms: ComboboxOption[];
}

export function HospitalizationForm({ patients, rooms }: HospitalizationFormProps) {
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;

  const navigation = useNavigation();
  const [submitted, setSubmitted] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [admissionDate, setAdmissionDate] = useState<Date | undefined>();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Registrar Hospitalización</h2>

      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form
        method="post"
        onSubmit={() => setSubmitted(true)}
        className="space-y-6 rounded-lg border p-6 shadow-sm bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Paciente */}
          <div className="space-y-2">
            <Label htmlFor="patientId">Paciente</Label>
            <input type="hidden" name="patientId" value={selectedPatient} />
            <Combobox
              options={patients}
              value={selectedPatient}
              onChange={setSelectedPatient}
              placeholder="Seleccionar paciente"
            />
            {actionData?.errors?.patientId && (
              <p className="text-sm text-red-600">{actionData.errors.patientId}</p>
            )}
          </div>

          {/* Habitación */}
          <div className="space-y-2">
            <Label htmlFor="roomId">Habitación</Label>
            <input type="hidden" name="roomId" value={selectedRoom} />
            <Combobox
              options={rooms}
              value={selectedRoom}
              onChange={setSelectedRoom}
              placeholder="Seleccionar habitación"
            />
            {actionData?.errors?.roomId && (
              <p className="text-sm text-red-600">{actionData.errors.roomId}</p>
            )}
          </div>

          {/* Fecha de ingreso */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="admissionDate">Fecha de ingreso</Label>
            <input
              type="hidden"
              name="admissionDate"
              value={admissionDate ? admissionDate.toISOString().split("T")[0] : ""}
            />
            <DatePicker
              value={admissionDate}
              onChange={setAdmissionDate}
              placeholder="Seleccionar fecha de ingreso"
            />
            {actionData?.errors?.admissionDate && (
              <p className="text-sm text-red-600">{actionData.errors.admissionDate}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Registrando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Registrar Hospitalización
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
