import { Badge } from "~/components/ui/badge";

interface MedicineStatusBadgeProps {
  status: boolean
}

export function StatusBadge({ status }: MedicineStatusBadgeProps) {
  const base = "px-2 py-1 font-medium";

  switch (status) {
    case true:
      return (
        <Badge
          className={`${base} bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100`}
        >
          Activo
        </Badge>
      );

    case false:
      return (
        <Badge
          className={`${base} bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100`}
        >
          Inactivo
        </Badge>
      );

    default:
      return (
        <Badge
          className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100`}
        >
          {status}
        </Badge>
      );
  }
}
