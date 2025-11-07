import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { DatePicker } from "~/components/common/date-picker";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";
import type { MedicineResponseDTO } from "~/types/medicine";

interface BatchFormProps {
  medicine: MedicineResponseDTO;
  employees: ComboboxOption[];
}

export function BatchForm({ medicine, employees }: BatchFormProps) {
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [expirationDate, setExpirationDate] = useState<Date | undefined>();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Registrar Lote</h2>

      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form method="post" className="space-y-6 rounded-lg border p-6 shadow-sm bg-white">
        {/* Medicamento info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="medicineCode">Código de Medicina</Label>
            <Input id="medicineCode" name="medicineCode" value={medicine.code} readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicineName">Nombre</Label>
            <Input id="medicineName" value={medicine.name} readOnly />
          </div>
        </div>

        {/* Campos del lote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="expirationDate">Fecha de Expiración</Label>
            <input
              type="hidden"
              name="expirationDate"
              value={expirationDate ? expirationDate.toISOString().split("T")[0] : ""}
            />
            <DatePicker
              value={expirationDate}
              onChange={setExpirationDate}
              placeholder="Seleccionar fecha"
            />
            {actionData?.errors?.expirationDate && (
              <p className="text-sm text-red-600">{actionData.errors.expirationDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchasedQuantity">Cantidad Comprada</Label>
            <Input
              id="purchasedQuantity"
              name="purchasedQuantity"
              type="number"
              min={1}
              placeholder="Ej. 100"
              required
            />
            {actionData?.errors?.purchasedQuantity && (
              <p className="text-sm text-red-600">{actionData.errors.purchasedQuantity}</p>
            )}
          </div>
        </div>

        {/* Selector de empleado */}
        <div className="space-y-2">
          <Label htmlFor="purchasedBy">Comprado Por</Label>
          <input type="hidden" name="purchasedBy" value={selectedEmployee} />
          <Combobox
            options={employees}
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            placeholder="Seleccionar empleado"
          />
          {actionData?.errors?.purchasedBy && (
            <p className="text-sm text-red-600">{actionData.errors.purchasedBy}</p>
          )}
        </div>

        {/* Botón de envío */}
        <div className="flex items-center justify-end pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Registrando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Registrar Lote
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
