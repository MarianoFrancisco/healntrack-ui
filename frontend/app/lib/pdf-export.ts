"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { RowInput, UserOptions } from "jspdf-autotable";

export type PdfColumn = { header: string; key: string };
export type PdfRow = Record<string, string | number | null | undefined>;

export type ExportPdfOptions = {
  title: string;
  fileName: string;
  columns: PdfColumn[];
  rows: PdfRow[];
  orientation?: "p" | "l";
  unit?: "pt" | "mm" | "cm" | "in";
  format?: string | number[];
  styles?: UserOptions["styles"];
  headStyles?: UserOptions["headStyles"];
  bodyStyles?: UserOptions["bodyStyles"];
};

function normalize(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "number") return String(v);
  return String(v);
}

export function exportTableToPDF(opts: ExportPdfOptions): void {
  if (typeof window === "undefined") return;
  const {
    title,
    fileName,
    columns,
    rows,
    orientation = "p",
    unit = "mm",
    format = "a4",
    styles,
    headStyles,
    bodyStyles,
  } = opts;

  const doc = new jsPDF({ orientation, unit, format });
  const marginTop = 14;
  doc.setFontSize(14);
  doc.text(title, 14, marginTop);

  const head: RowInput[] = [columns.map((c) => c.header)];
  const body: RowInput[] = rows.map((r) => columns.map((c) => normalize(r[c.key])));

  autoTable(doc, {
    head,
    body,
    startY: marginTop + 4,
    styles,
    headStyles,
    bodyStyles,
  });

  doc.save(fileName.endsWith(".pdf") ? fileName : fileName + ".pdf");
}
