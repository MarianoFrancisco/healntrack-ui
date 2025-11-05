import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "~/components/ui/select";
import { DatePicker } from "~/components/common/date-picker";
import { ErrorAlert } from "../common/error-alert";
import { SuccessAlert } from "../common/success-alert";
import type { PatientResponseDTO, CreatePatientRequestDTO } from "~/types/patient";

interface PatientFormProps {
  patient?: PatientResponseDTO;
}

export function PatientForm({ patient }: PatientFormProps) {
  const actionData = useActionData() as { error?: string; success?: string; errors?: Record<string, string> } | undefined;
  const navigation = useNavigation();
  const [submitted, setSubmitted] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    patient?.birthDate ? new Date(patient.birthDate) : undefined
  );
  const isSubmitting = navigation.state === "submitting";
  const isEditMode = !!patient;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        {isEditMode ? "Editar paciente" : "Crear paciente"}
      </h2>

      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form
        method="post"
        onSubmit={() => setSubmitted(true)}
        className="space-y-4 rounded-lg border p-6 shadow-sm bg-white"
      >
        <div className="space-y-2">
          <Label htmlFor="cui">CUI</Label>
          <Input
            id="cui"
            name="cui"
            type="text"
            placeholder="CUI del paciente"
            maxLength={13}
            defaultValue={patient?.cui ?? ""}
            required
            disabled={isEditMode}
          />
          {actionData?.errors?.cui && <p className="text-sm text-red-600">{actionData.errors.cui}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre completo</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            maxLength={150}
            placeholder="Nombre completo"
            defaultValue={patient?.fullName ?? ""}
            required
          />
          {actionData?.errors?.fullName && <p className="text-sm text-red-600">{actionData.errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Fecha de nacimiento</Label>
          <DatePicker
            value={birthDate}
            onChange={(date) => setBirthDate(date)}
            placeholder="Selecciona la fecha de nacimiento"
          />
          <input
            type="hidden"
            name="birthDate"
            value={birthDate ? birthDate.toISOString().split("T")[0] : ""}
          />
          {actionData?.errors?.birthDate && <p className="text-sm text-red-600">{actionData.errors.birthDate}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Género</Label>
          <Select name="gender" defaultValue={patient?.gender ?? ""}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Selecciona un género" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Masculino</SelectItem>
              <SelectItem value="FEMALE">Femenino</SelectItem>
              <SelectItem value="OTHER">Otro</SelectItem>
            </SelectContent>
          </Select>
          {actionData?.errors?.gender && <p className="text-sm text-red-600">{actionData.errors.gender}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="Dirección completa"
            defaultValue={patient?.address ?? ""}
            required
          />
          {actionData?.errors?.address && <p className="text-sm text-red-600">{actionData.errors.address}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            maxLength={100}
            defaultValue={patient?.email ?? ""}
            required
          />
          {actionData?.errors?.email && <p className="text-sm text-red-600">{actionData.errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Teléfono</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="Número de teléfono"
            maxLength={8}
            defaultValue={patient?.phoneNumber ?? ""}
            required
          />
          {actionData?.errors?.phoneNumber && <p className="text-sm text-red-600">{actionData.errors.phoneNumber}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyPhoneNumber">Teléfono de emergencia</Label>
          <Input
            id="emergencyPhoneNumber"
            name="emergencyPhoneNumber"
            type="text"
            placeholder="Número de emergencia"
            maxLength={8}
            defaultValue={patient?.emergencyPhoneNumber ?? ""}
            required
          />
          {actionData?.errors?.emergencyPhoneNumber && <p className="text-sm text-red-600">{actionData.errors.emergencyPhoneNumber}</p>}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> {isEditMode ? "Guardando..." : "Creando..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> {isEditMode ? "Guardar cambios" : "Crear paciente"}
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
