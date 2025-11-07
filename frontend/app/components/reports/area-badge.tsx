import { Badge } from "~/components/ui/badge";

interface AreaBadgeProps {
  area: string;
}

export function AreaBadge({ area }: AreaBadgeProps) {
  const base = "px-2 py-1 font-medium";

  switch (area.toUpperCase()) {
    case "CONSULTATION":
      return (
        <Badge className={`${base} bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100`}>
          Consulta
        </Badge>
      );
    case "MEDICATION":
      return (
        <Badge className={`${base} bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100`}>
          Medicacion
        </Badge>
      );
    case "PHARMACY":
      return (
        <Badge className={`${base} bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-100`}>
          Farmacia
        </Badge>
      );
    case "EMPLOYEE":
      return (
        <Badge className={`${base} bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100`}>
          Empleados
        </Badge>
      );
    case "ROOM":
      return (
        <Badge className={`${base} bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100`}>
          Habitaciones
        </Badge>
      );
    case "STAY":
      return (
        <Badge className={`${base} bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-100`}>
          Estadias
        </Badge>
      );
    case "SURGERY":
      return (
        <Badge className={`${base} bg-pink-100 text-pink-700 dark:bg-pink-800 dark:text-pink-100`}>
          Cirugias
        </Badge>
      );
    default:
      return (
        <Badge className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100`}>
          {area}
        </Badge>
      );
  }
}
