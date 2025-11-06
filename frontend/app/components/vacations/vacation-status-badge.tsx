import { Badge } from "~/components/ui/badge";

interface VacationStatusBadgeProps {
  status: string;
}

export function VacationStatusBadge({ status }: VacationStatusBadgeProps) {
  const base = "px-2 py-1 font-medium";

  switch (status) {
    case "APROBADA":
      return (
        <Badge className={`${base} bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100`}>
          Aprobada
        </Badge>
      );
    case "RECHAZADA":
      return (
        <Badge className={`${base} bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100`}>
          Rechazada
        </Badge>
      );
    case "PENDIENTE":
      return (
        <Badge className={`${base} bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100`}>
          Pendiente
        </Badge>
      );
    case "AUTOGENERADA":
      return (
        <Badge className={`${base} bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100`}>
          Autogenerada
        </Badge>
      );
    case "FIRMADO":
      return (
        <Badge className={`${base} bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-100`}>
          Firmado
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
