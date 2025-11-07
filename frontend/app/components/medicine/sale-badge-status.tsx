import { Badge } from "~/components/ui/badge";

interface SaleBadgeStatusProps {
  status: boolean
}

export function SaleBadgeStatus({ status }: SaleBadgeStatusProps) {
  const base = "px-2 py-1 font-medium";

  switch (status) {
    case true:
      return (
        <Badge
          className={`${base} bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100`}
        >
          Abierta
        </Badge>
      );

    case false:
      return (
        <Badge
          className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100`}
        >
          Completada
        </Badge>
      );

    default:
      return (
        <Badge
          className={`${base} bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200`}
        >
          {status}
        </Badge>
      );
  }
}
