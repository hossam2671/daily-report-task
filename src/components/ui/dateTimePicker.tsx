"use client";

import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Button } from "./button";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calender";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [tempDate, setTempDate] = useState<Date | undefined>(value);
  const [open, setOpen] = useState(false);

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      setTempDate(date);
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", val: string) {
    if (!tempDate) return;
    const newDate = new Date(tempDate);

    if (type === "hour") {
      const hour = parseInt(val, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(val, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (val === "AM" && hours >= 12) newDate.setHours(hours - 12);
      else if (val === "PM" && hours < 12) newDate.setHours(hours + 12);
    }

    setTempDate(newDate);
  }

  function handleDone() {
    if (tempDate) {
      onChange(tempDate);
      setOpen(false); // Close the popover
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-[#1b6bfe]"
          )}
        >
          {value ? (
            format(value, "MM/dd/yyyy hh:mm aa")
          ) : (
            <span>MM/DD/YYYY hh:mm aa</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto mt-24 bg-white absolute top-[-400px] left-5" >
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={tempDate}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            {/* Hours */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i + 1)
                  .reverse()
                  .map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        tempDate && tempDate.getHours() % 12 === hour % 12
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* Minutes */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      tempDate && tempDate.getMinutes() === minute
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* AM/PM */}
            <ScrollArea>
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      tempDate &&
                      ((ampm === "AM" && tempDate.getHours() < 12) ||
                        (ampm === "PM" && tempDate.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Done Button */}
        <div className="flex justify-end mt-2">
          <Button variant="default" onClick={handleDone}>
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
