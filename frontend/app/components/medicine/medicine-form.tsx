import { useState, useEffect } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { MedicineResponseDTO, UnitType } from "~/types/medicine";

interface UnitTypeOption {
    label: string;
    value: UnitType;
}

interface MedicineFormProps {
    medicine?: MedicineResponseDTO; // opcional, si se pasa es edición
    unitTypes?: UnitTypeOption[]; // lista de unidades disponibles
}

export function MedicineForm({ medicine, unitTypes = [
    { label: "Unidad", value: "UNIT" },
    { label: "Tableta", value: "TAB" },
    { label: "Cápsula", value: "CAP" },
    { label: "Ampolla", value: "AMP" },
    { label: "Vial", value: "VIAL" },
    { label: "Botella", value: "BOTTLE" },
    { label: "Caja", value: "BOX" },
] }: MedicineFormProps) {
    const actionData = useActionData() as
        | { error?: string; success?: string; errors?: Record<string, string> }
        | undefined;
    const navigation = useNavigation();
    const [submitted, setSubmitted] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<UnitType>(medicine?.unitType || "UNIT");

    const isSubmitting = navigation.state === "submitting";
    const isEditMode = !!medicine;

    console.log("errors", actionData?.errors);
    useEffect(() => {
        if (medicine) {
            setSelectedUnit(medicine.unitType);
        }
    }, [medicine]);

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">
                {isEditMode ? "Editar Medicamento" : "Registrar Medicamento"}
            </h2>

            {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
            {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

            <Form
                method="post"
                onSubmit={() => setSubmitted(true)}
                className="space-y-6 rounded-lg border p-6 shadow-sm bg-white"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Código */}
                    <div className="space-y-2">
                        <Label htmlFor="code">Código</Label>
                        <Input
                            id="code"
                            name="code"
                            type="text"
                            maxLength={10}
                            placeholder="Ej. AMOX-500"
                            defaultValue={medicine?.code || ""}
                            disabled={isEditMode}
                            required
                        />
                        {actionData?.errors?.code && <p className="text-sm text-red-600">{actionData.errors.code}</p>}
                    </div>

                    {/* Nombre */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            maxLength={120}
                            placeholder="Ej. Amoxicilina 500mg"
                            defaultValue={medicine?.name || ""}
                            required
                        />
                        {actionData?.errors?.name && <p className="text-sm text-red-600">{actionData.errors.name}</p>}
                    </div>

                    {/* Unidad de medida */}
                    <div className="space-y-2">
                        <Label htmlFor="unitType">Unidad</Label>
                        <input type="hidden" name="unitType" value={selectedUnit} />
                        <Select value={selectedUnit} onValueChange={(v) => setSelectedUnit(v as UnitType)}>
                            <SelectTrigger id="unitType" className="w-full">
                                <SelectValue placeholder="Selecciona unidad" />
                            </SelectTrigger>
                            <SelectContent>
                                {unitTypes.map((unit) => (
                                    <SelectItem key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {actionData?.errors?.unitType && <p className="text-sm text-red-600">{actionData.errors.unitType}</p>}
                    </div>

                    {/* Stock mínimo */}
                    <div className="space-y-2">
                        <Label htmlFor="minStock">Stock mínimo</Label>
                        <Input
                            id="minStock"
                            name="minStock"
                            type="number"
                            step={1}
                            min={0}
                            defaultValue={medicine?.minStock || ""}
                            required
                        />
                        {actionData?.errors?.minStock && <p className="text-sm text-red-600">{actionData.errors.minStock}</p>}
                    </div>

                    {/* Precio actual */}
                    <div className="space-y-2">
                        <Label htmlFor="currentPrice">Precio actual</Label>
                        <Input
                            id="currentPrice"
                            name="currentPrice"
                            type="number"
                            step="0.01"
                            min={0}
                            defaultValue={medicine?.currentPrice || ""}
                            required
                        />
                        {actionData?.errors?.currentPrice && <p className="text-sm text-red-600">{actionData.errors.currentPrice}</p>}
                    </div>

                    {/* Costo actual */}
                    <div className="space-y-2">
                        <Label htmlFor="currentCost">Costo actual</Label>
                        <Input
                            id="currentCost"
                            name="currentCost"
                            type="number"
                            step="0.01"
                            min={0}
                            defaultValue={medicine?.currentCost || ""}
                            required
                        />
                        {actionData?.errors?.currentCost && <p className="text-sm text-red-600">{actionData.errors.currentCost}</p>}
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            name="description"
                            maxLength={255}
                            placeholder="Descripción del medicamento (opcional)"
                            defaultValue={medicine?.description || ""}
                        />
                        {actionData?.errors?.description && <p className="text-sm text-red-600">{actionData.errors.description}</p>}
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
                                {isEditMode ? "Actualizar Medicamento" : "Registrar Medicamento"}
                            </>
                        )}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
