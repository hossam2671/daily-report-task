"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

const sixteenYearsAgo = new Date(new Date());

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // Initialize month state to 16 years ago
  const [month, setMonth] = React.useState<Date>(sixteenYearsAgo)

  // Handlers to change month and year
  const handlePrevYear = () => setMonth(new Date(month.getFullYear() - 1, month.getMonth()))
  const handleNextYear = () => setMonth(new Date(month.getFullYear() + 1, month.getMonth()))

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      fixedWeeks={true}
      month={month}
      onMonthChange={setMonth}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col text-card sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 text-card",
        caption: "flex justify-center text-card pt-1 relative items-center",
        caption_label: "text-sm font-medium text-card",
        nav: "space-x-1 flex items-center text-card",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 text-card opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-card rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([abgria-selected])]:-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-normal hover:bg-none aria-selected:opacity-100 aria-selected:text-red-500"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "focus:bg-card focus:text-black text-card focus:text-[#1b6bfe]",
        day_today: "bg-accent text-[#1b6bfe]",
        day_outside:
          "day-outside text-card opacity-50 aria-selected:bg-accent/50 aria-selected:text-[#1b6bfe] aria-selected:opacity-30",
        day_disabled: "text-card opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-[#1b6bfe]",
        day_hidden: "invisible",
        ...classNames,
      }}
      captionLayout="dropdown" 
      footer={
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePrevYear}
            className={cn(buttonVariants({ variant: "outline" }), "text-xs")}
          >
            Previous Year
          </button>
          <button
            onClick={handleNextYear}
            className={cn(buttonVariants({ variant: "outline" }), "text-xs")}
          >
            Next Year
          </button>
        </div>
      }
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
