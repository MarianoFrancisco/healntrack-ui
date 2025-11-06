import { useState, useEffect } from "react";
import { Form, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import type { ConfigurationResponseDTO } from "~/types/vacation";

interface ConfigFormProps {
  config: ConfigurationResponseDTO;
}

export function ConfigForm({ config }: ConfigFormProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [value, setValue] = useState(config.value ?? 0);
  const [modified, setModified] = useState(false);

  // Detectar si se modificó el valor
  useEffect(() => {
    const original = config.value ?? 0;
    setModified(value !== original);
  }, [value, config.value]);

  return (
<Form
  method="post"
  className="grid gap-3 border-b py-3 sm:grid-cols-1 md:grid-cols-3 md:items-center"
>

      {/* Clave */}
      <div className="flex flex-col md:w-1/3">
        <Label htmlFor={`key-${config.key}`} className="text-sm font-medium">
          {config.key}
        </Label>
        <input type="hidden" name="key" value={config.key} />
      </div>

      {/* Valor editable */}
      <div className="flex flex-col md:w-1/2">
        <Input
          id={`value-${config.key}`}
          name="value"
          type="number"
          step="any"
          defaultValue={config.value ?? 0}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
          required
        />
      </div>

      {/* Botón */}
      <div className="flex md:w-1/3 justify-start md:justify-end">
        <Button
          type="submit"
          variant="default"
          size="sm"
          disabled={!modified || isSubmitting}
          className="flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Guardar
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
