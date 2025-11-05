import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";

export function EmploymentActions({ cui, isActive }: { cui: string; isActive: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      {isActive ? (
        <>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => navigate(`/employees/${cui}/terminate`)}
          >
            Terminar
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/employees/${cui}/reward`)}
          >
            Recompensar
          </Button>
        </>
      ) : (
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate(`/employees/${cui}/rehire`)}
        >
          Recontratar
        </Button>
      )}
    </div>
  );
}
