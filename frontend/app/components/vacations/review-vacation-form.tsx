import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import { DatePicker } from "~/components/common/date-picker";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";
import type { VacationResponseDTO } from "~/types/vacation";
import { VacationStatusBadge } from "~/components/vacations/vacation-status-badge";

import {
    RadioGroup,
    RadioGroupItem,
} from "~/components/ui/radio-group";

interface ReviewVacationFormProps {
    vacation: VacationResponseDTO;
    employees: ComboboxOption[]; // [{ label: string, value: string }]
}

export function ReviewVacationForm({ vacation, employees }: ReviewVacationFormProps) {
    const actionData = useActionData() as { error?: string; success?: string; errors?: Record<string, string> } | undefined;
    const navigation = useNavigation();
    const [submitted, setSubmitted] = useState(false);

    const [selectedReviewer, setSelectedReviewer] = useState<string>("");
    const [reviewDate, setReviewDate] = useState<Date | undefined>();
    const [reviewType, setReviewType] = useState<string>("approve");

    const isSubmitting = navigation.state === "submitting";

    const formatDate = (dateString?: string) =>
        dateString
            ? new Date(dateString).toLocaleDateString("es-GT", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            : "—";

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Revisar Solicitud</h2>

            {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
            {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

            <Form
                method="post"
                onSubmit={() => setSubmitted(true)}
                className="space-y-6 rounded-lg border p-6 shadow-sm bg-white"
            >
                {/* Datos de la solicitud */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Empleado</Label>
                        <Input value={vacation.employeeName} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>CUI del Empleado</Label>
                        <Input value={vacation.employeeCui} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>Fecha de Solicitud</Label>
                        <Input value={formatDate(vacation.requestedAt)} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>Estado Actual</Label>
                        <div className="flex items-center">
                            <VacationStatusBadge status={vacation.status} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Fecha de Inicio</Label>
                        <Input value={formatDate(vacation.startDate)} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>Fecha de Fin</Label>
                        <Input value={formatDate(vacation.endDate)} disabled />
                    </div>

                </div>

                {/* Campos del revisor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="reviewerCui">Revisor</Label>
                        <input type="hidden" name="reviewerCui" value={selectedReviewer} />
                        <Combobox
                            options={employees}
                            value={selectedReviewer}
                            onChange={setSelectedReviewer}
                            placeholder="Seleccionar revisor"
                        />
                        {actionData?.errors?.reviewerCui && (
                            <p className="text-sm text-red-600">{actionData.errors.reviewerCui}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reviewedAt">Fecha de Revisión</Label>
                        <input type="hidden" name="reviewedAt" value={reviewDate ? reviewDate.toISOString().split("T")[0] : ""} />
                        <DatePicker value={reviewDate} onChange={setReviewDate} placeholder="Seleccionar fecha de revisión" />
                        {actionData?.errors?.reviewedAt && (
                            <p className="text-sm text-red-600">{actionData.errors.reviewedAt}</p>
                        )}
                    </div>
                </div>

                {/* Decisión */}
                <div className="space-y-2 pt-4">
                    <Label>Decisión</Label>
                    <input type="hidden" name="reviewType" value={reviewType} />
                    <RadioGroup value={reviewType} onValueChange={setReviewType} className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="approve" id="r1" />
                            <Label htmlFor="r1">Aprobar</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="reject" id="r2" />
                            <Label htmlFor="r2">Rechazar</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Botón de envío */}
                <div className="flex items-center justify-end pt-6">
                    <Button
                        type="submit"
                        disabled={isSubmitting || !selectedReviewer || !reviewDate}
                        className="flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" /> Registrar Revisión
                            </>
                        )}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
