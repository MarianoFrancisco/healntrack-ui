"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Selecciona una fecha",
  className = "w-full",
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);

  // Sincroniza si el valor viene de fuera (ej. react-hook-form)
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleSelect = (selectedDate?: Date) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`${className} justify-between font-normal`}
          disabled={disabled}
        >
          {date ? date.toLocaleDateString("es-GT") : placeholder}
          <ChevronDownIcon className="opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
