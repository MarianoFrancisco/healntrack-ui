import { redirect, type ActionFunctionArgs } from "react-router";
import { ApiError } from "~/lib/api-client";
import type { Route } from "../../+types/home";
import type { CreateRoomRequestDTO } from "~/types/hospitalization/room";
import { roomService } from "~/services/hospitalization/room-service";
import { RoomForm } from "~/components/hospitalization/room/room-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nueva habitación" },
    { name: "description", content: "Registrar una nueva habitación" },
  ];
}

export const handle = {
  crumb: "Crear habitación",
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const roomData: CreateRoomRequestDTO = {
      number: formData.get("number") as string,
      costPerDay: parseFloat(formData.get("costPerDay") as string),
      maintenanceCost: parseFloat(formData.get("maintenanceCost") as string),
      status: formData.get("status") as "AVAILABLE" | "OCCUPIED" | "OUT_OF_SERVICE",
    };

    await roomService.createRoom(roomData);
    return redirect("/rooms");
  } catch (error: any) {
    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;

        return {
          errors: errorData.errors || {},
          error: errorData.detail || errorData.message || `Error ${error.status}`,
        };
      } catch (parseError) {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }

    return { error: error.message || "Error al crear la habitación" };
  }
}

export default function CreateRoomPage() {
  return (
    <section className="p-6">
      <RoomForm />
    </section>
  );
}
