import { Badge } from "~/components/ui/badge";

interface HospitalizationStatusBadgeProps {
  active: boolean;
}

export function HospitalizationStatusBadge({ active }: HospitalizationStatusBadgeProps) {
  const base = "px-2 py-1 font-medium";

  if (active) {
    return (
      <Badge
        className={`${base} bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100`}
      >
        Hospitalizado
      </Badge>
    );
  }

  return (
    <Badge
      className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100`}
    >
      Dado de alta
    </Badge>
  );
}
