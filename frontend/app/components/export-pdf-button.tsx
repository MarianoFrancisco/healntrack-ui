"use client";

import { Button } from "./ui/button";
import { exportTableToPDF } from "~/lib/pdf-export";
import type { ExportPdfOptions } from "~/lib/pdf-export";

type Props = Omit<ExportPdfOptions, "orientation" | "unit" | "format"> & {
  className?: string;
};

export default function ExportPdfButton(props: Props) {
  return (
    <Button
      className={props.className}
      variant="outline"
      onClick={() =>
        exportTableToPDF({
          title: props.title,
          fileName: props.fileName,
          columns: props.columns,
          rows: props.rows,
        })
      }
    >
      Exportar PDF
    </Button>
  );
}
