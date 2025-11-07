import { Badge } from "~/components/ui/badge";

interface AreaBadgeProps {
  area: string;
}

export function AreaBadge({ area }: AreaBadgeProps) {
  const base = "px-2 py-1 font-medium";

  return (
    <Badge className={`${base} bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100`}>
      {area}
    </Badge>
  );
}
