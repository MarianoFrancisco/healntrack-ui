import { Badge } from "~/components/ui/badge";
import type { RoomStatus } from "~/types/hospitalization/room";

interface RoomStatusBadgeProps {
  status: RoomStatus;
}

export function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
  const base = "px-2 py-1 font-medium";

  switch (status) {
    case "AVAILABLE":
      return (
        <Badge className={`${base} bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100`}>
          Disponible
        </Badge>
      );
    case "OCCUPIED":
      return (
        <Badge className={`${base} bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100`}>
          Ocupada
        </Badge>
      );
    case "OUT_OF_SERVICE":
      return (
        <Badge className={`${base} bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100`}>
          Fuera de servicio
        </Badge>
      );
    default:
      return (
        <Badge className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100`}>
          {status}
        </Badge>
      );
  }
}
