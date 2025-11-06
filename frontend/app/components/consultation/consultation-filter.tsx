import { Form, useNavigate, useSearchParams } from "react-router";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { CalendarSearch } from "lucide-react";
import { DatePicker } from "~/components/common/date-picker";
import { useState } from "react";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";

interface ConsultationFilterProps {
    patients: { id: string; fullname: string }[];
    doctors: { id: string; fullname: string }[];
}

export function ConsultationFilter({ patients, doctors }: ConsultationFilterProps) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Fecha inicial y final
    const [dateFrom, setDateFrom] = useState<Date | undefined>(
        searchParams.get("dateFrom") ? new Date(searchParams.get("dateFrom")!) : undefined
    );
    const [dateTo, setDateTo] = useState<Date | undefined>(
        searchParams.get("dateTo") ? new Date(searchParams.get("dateTo")!) : undefined
    );

    // Combobox
    const [patientId, setPatientId] = useState(searchParams.get("patientId") ?? "");
    const [doctorId, setDoctorId] = useState(searchParams.get("employeeId") ?? "");

    const patientOptions: ComboboxOption[] = [
        { value: "", label: "Todos los pacientes" },
        ...patients.map((p) => ({ value: p.id, label: p.fullname })),
    ];

    const doctorOptions: ComboboxOption[] = [
        { value: "", label: "Todos los doctores" },
        ...doctors.map((d) => ({ value: d.id, label: d.fullname })),
    ];

    return (
        <Form
            method="get"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4 border rounded-lg bg-card shadow-sm"
        >
            {/* Paciente */}
            <div className="grid gap-1">
                <Label htmlFor="patient">Paciente</Label>
                <Combobox
                    options={patientOptions}
                    value={patientId}
                    onChange={setPatientId}
                    className="w-full"
                />
                <input type="hidden" name="patientId" value={patientId} />
            </div>

            {/* Doctor */}
            <div className="grid gap-1">
                <Label htmlFor="employee">Doctor</Label>
                <Combobox
                    options={doctorOptions}
                    value={doctorId}
                    onChange={setDoctorId}
                    className="w-full"
                />
                <input type="hidden" name="employeeId" value={doctorId} />
            </div>

            {/* Fecha desde */}
            <div className="grid gap-1">
                <Label htmlFor="dateFrom">Fecha desde</Label>
                <DatePicker value={dateFrom} onChange={setDateFrom} placeholder="Desde" />
                <input
                    type="hidden"
                    name="dateFrom"
                    value={dateFrom ? dateFrom.toISOString().split("T")[0] : ""}
                />
            </div>

            {/* Fecha hasta */}
            <div className="grid gap-1">
                <Label htmlFor="dateTo">Fecha hasta</Label>
                <DatePicker value={dateTo} onChange={setDateTo} placeholder="Hasta" />
                <input
                    type="hidden"
                    name="dateTo"
                    value={dateTo ? dateTo.toISOString().split("T")[0] : ""}
                />
            </div>

            {/* Botones */}
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-5 flex justify-end gap-3 mt-2">
                <Button type="submit" className="flex items-center gap-2">
                    <CalendarSearch className="h-4 w-4" />
                    Buscar
                </Button>
                <Button
                    type="reset"
                    variant="outline"
                    onClick={() => navigate("/consultations")}
                >
                    Limpiar
                </Button>
            </div>
        </Form>
    );
}
