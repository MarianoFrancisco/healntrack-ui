import { useLoaderData } from "react-router";
import { HospitalizationFilter } from "~/components/hospitalization/hospitalization-filter";
import { HospitalizationTable } from "~/components/hospitalization/hospitalization-table";
import { patientService } from "~/services/patient-service";
import { employeeService } from "~/services/employment-service";
import type { PatientResponseDTO } from "~/types/patient";
import type { EmployeeResponseDTO } from "~/types/employee";
import type { Route } from "../+types/home";
import { hospitalizationService } from "~/services/hospitalization/hospitalization-service";
import { roomService } from "~/services/hospitalization/room-service";
import type { HospitalizationResponseComplete, StaffAssignmentResponseComplete } from "~/types/hospitalization/hospitalization";

export function meta() {
    return [
        { title: "Hospitalizaciones" },
        { name: "description", content: "Historial y búsqueda de hospitalizaciones" },
    ];
}

export const handle = {
    crumb: "Hospitalizaciones",
};

// Loader para traer hospitalizaciones y datos relacionados
export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);

    // Limpiar parámetros de búsqueda
    const rawParams = Object.fromEntries(url.searchParams.entries());
    const params: Record<string, string> = {};
    for (const [key, value] of Object.entries(rawParams)) {
        const trimmed = (value ?? "").trim();
        if (trimmed !== "" && trimmed.toLowerCase() !== "all") {
            params[key] = trimmed;
        }
    }

    // Llamadas paralelas al backend
    const [hospitalizations, patients, rooms, employees] = await Promise.all([
        hospitalizationService.getAllHospitalizations(params),
        patientService.getAllPatients(),
        roomService.getAllRooms(),
        employeeService.getAllEmployees(),
    ]);

    // Mapeo a HospitalizationResponseComplete
    const hospitalizationTableData: HospitalizationResponseComplete[] =
        hospitalizations
            .map((hosp): HospitalizationResponseComplete | null => {
                const patient = patients.find((p) => p.id === hosp.patientId);
                const room = rooms.find((r) => r.id === hosp.roomId);

                if (!patient || !room) return null;

                const staffAssignmentComplete: StaffAssignmentResponseComplete[] =
                    hosp.staffAssignment
                        .map((s) => {
                            const employee = employees.find((e) => e.id === s.employeeId);
                            if (!employee) return null;
                            return {
                                id: s.id,
                                employee,
                                assignedAt: s.assignedAt,
                            };
                        })
                        .filter((sa): sa is StaffAssignmentResponseComplete => sa !== null);

                return {
                    id: hosp.id,
                    patient,
                    room,
                    admissionDate: hosp.admissionDate,
                    dischargeDate: hosp.dischargeDate ?? undefined, // opcional
                    totalFee: hosp.totalFee,
                    staffAssignment: staffAssignmentComplete,
                };
            })
            .filter(Boolean) as HospitalizationResponseComplete[];

    // Datos simplificados para el filtro
    const patientsForFilter = patients.map((p) => ({ id: p.id, fullname: p.fullName }));

    return {
        hospitalizations: hospitalizationTableData,
        patientsForFilter,
    };
}

export default function HospitalizationPage() {
    const { hospitalizations, patientsForFilter } = useLoaderData<typeof loader>();

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Hospitalizaciones</h1>
                <p className="text-muted-foreground">
                    Visualiza y filtra el historial de hospitalizaciones.
                </p>
            </div>

            {/* Filtro */}
            <HospitalizationFilter patients={patientsForFilter} />

            {/* Tabla */}
            <HospitalizationTable data={hospitalizations} />
        </section>
    );
}
