import { useState, useEffect } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { RoomResponseDTO, RoomStatus } from "~/types/hospitalization/room";

interface RoomFormProps {
  room?: RoomResponseDTO; // opcional, si se pasa es edición
}

const STATUS_OPTIONS = [
  { label: "Disponible", value: "AVAILABLE" },
  { label: "Ocupada", value: "OCCUPIED" },
  { label: "Fuera de servicio", value: "OUT_OF_SERVICE" },
];

export function RoomForm({ room }: RoomFormProps) {
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isEditMode = !!room;

  const [submitted, setSubmitted] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(room?.status || "AVAILABLE");

  useEffect(() => {
    if (room) setSelectedStatus(room.status);
  }, [room]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        {isEditMode ? "Editar Habitación" : "Registrar Habitación"}
      </h2>

      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form
        method="post"
        onSubmit={() => setSubmitted(true)}
        className="space-y-6 rounded-lg border p-6 shadow-sm bg-white"
      >
          {room && <input type="hidden" name="id" value={room.id} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Número de habitación */}
          <div className="space-y-2">
            <Label htmlFor="number">Número</Label>
            <Input
              id="number"
              name="number"
              type="text"
              maxLength={10}
              placeholder="Ej. 1B"
              defaultValue={room?.number || ""}
              required
            />
            {actionData?.errors?.number && (
              <p className="text-sm text-red-600">{actionData.errors.number}</p>
            )}
          </div>

          {/* Costo por día */}
          <div className="space-y-2">
            <Label htmlFor="costPerDay">Costo por día</Label>
            <Input
              id="costPerDay"
              name="costPerDay"
              type="number"
              step="0.01"
              min={0}
              defaultValue={room?.costPerDay || ""}
              required
            />
            {actionData?.errors?.costPerDay && (
              <p className="text-sm text-red-600">{actionData.errors.costPerDay}</p>
            )}
          </div>

          {/* Costo de mantenimiento */}
          <div className="space-y-2">
            <Label htmlFor="maintenanceCost">Costo de mantenimiento</Label>
            <Input
              id="maintenanceCost"
              name="maintenanceCost"
              type="number"
              step="0.01"
              min={0}
              defaultValue={room?.maintenanceCost || ""}
              required
            />
            {actionData?.errors?.maintenanceCost && (
              <p className="text-sm text-red-600">{actionData.errors.maintenanceCost}</p>
            )}
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <input type="hidden" name="status" value={selectedStatus} />
            <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as RoomStatus)}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Selecciona estado" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {actionData?.errors?.status && (
              <p className="text-sm text-red-600">{actionData.errors.status}</p>
            )}
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex items-center justify-end pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isEditMode ? "Actualizando..." : "Creando..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isEditMode ? "Actualizar Habitación" : "Registrar Habitación"}
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
