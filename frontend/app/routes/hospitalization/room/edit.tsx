import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import type { Route } from "../../+types/home";
import { ApiError } from "~/lib/api-client";
import type { RoomResponseDTO, UpdateRoomRequestDTO, RoomStatus } from "~/types/hospitalization/room";
import { roomService } from "~/services/hospitalization/room-service";
import { RoomForm } from "~/components/hospitalization/room/room-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Editar Habitación" },
    { name: "description", content: "Editar una habitación registrada en el sistema" },
  ];
}

export const handle = {
  crumb: "Editar habitación",
};

// --- Loader ---
export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Error("No se proporcionó el número de la habitación");

  try {
    // Usa getAllRooms filtrando por número
    const rooms = await roomService.getAllRooms({ number: params.id });

    // Busca la habitación exacta
    const room = rooms.find((r) => r.number === params.id);

    if (!room) {
      throw new Response("Habitación no encontrada", { status: 404 });
    }

    return room;
  } catch (error) {
    console.error("Error al cargar la habitación:", error);
    throw error;
  }
}

// --- Action ---
export async function action({ request, params }: ActionFunctionArgs) {
    
    const formData = await request.formData();
    const id = formData.get("id") as string;

  if (!id) throw new Error("No se proporcionó el número de la habitación");
  try {
    const updateData: UpdateRoomRequestDTO = {
      number: formData.get("number") as string,
      costPerDay: Number(formData.get("costPerDay")),
      maintenanceCost: Number(formData.get("maintenanceCost")),
      status: formData.get("status") as RoomStatus,
    };

    await roomService.updateRoom(id, updateData);

    return redirect("/rooms");
  } catch (error: any) {
    console.error("Error al actualizar habitación:", error);

    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;
        return {
          errors: errorData.errors || {},
          error: errorData.detail || errorData.message || `Error ${error.status}`,
        };
      } catch {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta del servidor` };
      }
    }

    return { error: error.message || "Error desconocido al actualizar la habitación" };
  }
}

// --- Componente principal ---
export default function EditRoomPage({ loaderData }: { loaderData: RoomResponseDTO }) {
  return (
    <section className="p-6">
      <RoomForm room={loaderData} />
    </section>
  );
}
