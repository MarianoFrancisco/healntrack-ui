import { Badge } from "~/components/ui/badge";

interface BatchExpirationDateBadgeProps {
  expirationDate: string | Date;
}

export function BatchExpirationDateBadge({ expirationDate }: BatchExpirationDateBadgeProps) {
  const base = "px-2 py-1 font-medium";

  const expDate = new Date(expirationDate);
  const today = new Date();

  expDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const isExpired = expDate < today;

  if (isExpired) {
    return (
      <Badge className={`${base} bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100`}>
        Expirado
      </Badge>
    );
  }

  return (
    <Badge className={`${base} bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100`}>
      Vigente
    </Badge>
  );
}
