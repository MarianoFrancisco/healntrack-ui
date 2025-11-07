import { Link, useFetcher, useLoaderData, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "../../+types/home";
import type { RoomResponseDTO, SearchRoomsRequestDTO } from "~/types/hospitalization/room";
import { roomService } from "~/services/hospitalization/room-service";
import { RoomFilter } from "~/components/hospitalization/room/room-filter";
import { RoomTable } from "~/components/hospitalization/room/room-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Habitaciones" },
    { name: "description", content: "Listado de habitaciones del hospital" },
  ];
}

export const handle = {
  crumb: "Listado de habitaciones",
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const filters: SearchRoomsRequestDTO = {};

  if (params.number && params.number.trim() !== "") {
    filters.number = params.number.trim();
  }

  if (params.status && params.status !== "all") {
    filters.status = params.status as any;
  }

  try {
    const rooms = await roomService.getAllRooms(filters);
    return Response.json(rooms);
  } catch (error) {
    console.error("Error al cargar habitaciones:", error);
    return Response.json([], { status: 500 });
  }
}

export default function RoomsPage() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const rooms = useLoaderData<typeof loader>() as RoomResponseDTO[];

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Habitaciones</h1>
        <p className="text-muted-foreground">
          Gestiona las habitaciones del hospital, incluyendo su estado y costos.
        </p>
      </div>

      {/* Filtros + botón de crear */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 w-full">
        <div className="flex-1">
          <RoomFilter />
        </div>

        <div className="flex lg:justify-start justify-end">
          <Button asChild>
            <Link to="/rooms/create">Nueva Habitación</Link>
          </Button>
        </div>
      </div>

      {/* Tabla de habitaciones */}
      <RoomTable data={rooms} />
    </section>
  );
}
