import { Badge } from "~/components/ui/badge";
import type { UnitType } from "~/types/medicine";

interface UnitTypeBadgeProps {
  unitType: UnitType;
}

export function UnitTypeBadge({ unitType }: UnitTypeBadgeProps) {
  const base = "px-2 py-1 font-medium";

  switch (unitType) {
    case "UNIT":
      return (
        <Badge className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100`}>
          Unidad
        </Badge>
      );
    case "TAB":
      return (
        <Badge className={`${base} bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100`}>
          Tableta
        </Badge>
      );
    case "CAP":
      return (
        <Badge className={`${base} bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-100`}>
          Cápsula
        </Badge>
      );
    case "AMP":
      return (
        <Badge className={`${base} bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-100`}>
          Ampolla
        </Badge>
      );
    case "VIAL":
      return (
        <Badge className={`${base} bg-pink-100 text-pink-700 dark:bg-pink-800 dark:text-pink-100`}>
          Vial
        </Badge>
      );
    case "BOTTLE":
      return (
        <Badge className={`${base} bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-100`}>
          Frasco
        </Badge>
      );
    case "BOX":
      return (
        <Badge className={`${base} bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100`}>
          Caja
        </Badge>
      );
    default:
      return (
        <Badge className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100`}>
          {unitType}
        </Badge>
      );
  }
}
