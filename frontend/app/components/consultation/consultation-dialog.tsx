import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { ConsultationFullData } from "~/types/consultation";

interface ConsultationDialogProps {
    consultation: ConsultationFullData;
}

export function ConsultationDialog({ consultation }: ConsultationDialogProps) {
    const [open, setOpen] = useState(false);
    const { patient, doctor } = consultation;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Ver Consulta
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        Consulta del {new Date(consultation.date).toLocaleDateString("es-GT")}
                    </DialogTitle>
                    <DialogDescription>
                        Información detallada de la consulta, paciente y doctor.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {/* Paciente */}
                    <div className="grid gap-2">
                        <Label>Paciente</Label>
                        <Input value={patient.fullName} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label>CUI</Label>
                        <Input value={patient.cui} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label>Correo</Label>
                        <Input value={patient.email} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label>Teléfono</Label>
                        <Input value={patient.phoneNumber} disabled />
                    </div>

                    {/* Doctor */}
                    <div className="grid gap-2">
                        <Label>Doctor</Label>
                        <Input value={doctor.fullname} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label>Departamento</Label>
                        <Input value={doctor.department.name} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label>Correo</Label>
                        <Input value={doctor.email} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label>Teléfono</Label>
                        <Input value={doctor.phoneNumber} disabled />
                    </div>

                    {/* Consulta */}
                    <div className="grid gap-2 sm:col-span-2">
                        <Label>Motivo</Label>
                        <Input value={consultation.reason} disabled />
                    </div>
                    <div className="grid gap-2 sm:col-span-2">
                        <Label>Diagnóstico</Label>
                        <Input value={consultation.diagnosis} disabled />
                    </div>
                    <div className="grid gap-2 sm:col-span-2">
                        <Label>Tratamiento</Label>
                        <Input value={consultation.treatment} disabled />
                    </div>
                    <div className="grid gap-2 sm:col-span-2">
                        <Label>Precio de consulta</Label>
                        <Input value={consultation.totalFee.toLocaleString("es-GT", {
                            style: "currency",
                            currency: "GTQ",
                        })
                        } disabled />
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button variant="outline">Cerrar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
