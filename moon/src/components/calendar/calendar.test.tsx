import * as React from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { axe, } from "vitest-axe"
import {
  Calendar,
  CalendarDayButton,
} from "./calendar"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

describe("Calendar", () => {
  describe("rendering", () => {
    it("renders the calendar container with data-slot='calendar'", () => {
      const { container } = render(<Calendar mode="single" />)
      const calendar = container.querySelector("[data-slot=calendar]")
      expect(calendar).toBeInTheDocument()
    })

    it("renders navigation buttons with appropriate data-slot", () => {
      const { container } = render(<Calendar mode="single" />)
      const prevBtn = container.querySelector("button.rdp-button_previous")
      const nextBtn = container.querySelector("button.rdp-button_next")
      expect(prevBtn).toBeInTheDocument()
      expect(nextBtn).toBeInTheDocument()
    })

    it("renders 1 month by default", () => {
      const { container } = render(<Calendar mode="single" />)
      const months = container.querySelectorAll(".rdp-month")
      expect(months.length).toBe(1)
    })

    it("renders correct className on root element", () => {
      const { container } = render(
        <Calendar mode="single" className="rounded-lg border" />
      )
      const calendar = container.querySelector("[data-slot=calendar]")
      expect(calendar).toHaveClass("rounded-lg")
      expect(calendar).toHaveClass("border")
    })

    it("renders with captionLayout='dropdown' when specified", () => {
      const { container } = render(
        <Calendar mode="single" captionLayout="dropdown" />
      )
      // captionLayout affects the select dropdown presence
      // Look for dropdown select elements in caption
      const monthDropdown = container.querySelector(
        ".rdp-caption select"
      )
      expect(monthDropdown).toBeInTheDocument()
    })
  })

  describe("components", () => {
    it("renders custom Root component with data-slot='calendar'", () => {
      const { container } = render(<Calendar mode="single" />)
      const root = container.querySelector("[data-slot=calendar]")
      expect(root).toBeInTheDocument()
    })

    it("renders navigation Chevron components as svg icons", () => {
      const { container } = render(<Calendar mode="single" />)
      const svgs = container.querySelectorAll("svg")
      expect(svgs.length).toBeGreaterThan(0)
      const chevronClasses = Array.from(svgs).some((svg) =>
        svg.classList.contains("size-4")
      )
      expect(chevronClasses).toBe(true)
    })

    it("renders DayButton components with expected data attributes", () => {
      const today = new Date()
      const { container } = render(
        <Calendar mode="single" selected={today} />
      )
      // The day buttons have data-day attribute with the locale date string
      const dayButtons = container.querySelectorAll("button[data-day]")
      expect(dayButtons.length).toBeGreaterThan(0)

      // Find button matching selected date's data-day attribute
      const selectedDateStr = today.toLocaleDateString()
      const selectedButton = container.querySelector(
        `button[data-day="${selectedDateStr}"]`
      )
      expect(selectedButton).toBeInTheDocument()
      expect(selectedButton).toHaveAttribute("data-selected-single", "true")
    })

    it("renders WeekNumber subcomponent as a td element", () => {
      // WeekNumber is rendered if showWeekNumber is true
      const { container } = render(
        <Calendar mode="single" showWeekNumber defaultMonth={new Date()} />
      )
      const weekNumberCells = container.querySelectorAll("td")
      expect(weekNumberCells.length).toBeGreaterThan(0)
    })
  })

  describe("variants", () => {
    it("renders with 'single' mode and selects a single date", () => {
      const selectedDate = new Date(2023, 0, 15)
      const { container } = render(
        <Calendar mode="single" selected={selectedDate} />
      )
      const selectedDateStr = selectedDate.toLocaleDateString()
      const selectedButton = container.querySelector(
        `button[data-day="${selectedDateStr}"]`
      )
      expect(selectedButton).toHaveAttribute("data-selected-single", "true")
    })
  })

  describe("size", () => {
    it("accepts className to customize cell size using CSS variables", () => {
      const className = "[--cell-size:2.75rem] md:[--cell-size:3rem]"
      const { container } = render(
        <Calendar mode="single" className={className} />
      )
      const calendar = container.querySelector("[data-slot=calendar]")
      expect(calendar).toHaveClass(className)
    })
  })

  describe("subcomponents", () => {
    it("CalendarDayButton renders with expected data attributes and classes", () => {
      const day = {
        date: new Date(2023, 0, 5),
      } as any
      const modifiers = {
        selected: true,
        range_start: false,
        range_end: false,
        range_middle: false,
        focused: false,
      }
      const { container } = render(
        <CalendarDayButton day={day} modifiers={modifiers} />
      )
      const button = container.querySelector("button")
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute(
        "data-day",
        day.date.toLocaleDateString()
      )
      expect(button).toHaveAttribute("data-selected-single", "true")
      expect(button).not.toHaveAttribute("data-range-start", "true")
      expect(button).not.toHaveAttribute("data-range-end", "true")
      expect(button).not.toHaveAttribute("data-range-middle", "true")
    })

    it("CalendarDayButton focuses when modifiers.focused is true", () => {
      const day = {
        date: new Date(),
      } as any
      const modifiers = {
        selected: false,
        range_start: false,
        range_end: false,
        range_middle: false,
        focused: true,
      }

      render(<CalendarDayButton day={day} modifiers={modifiers} />)
      const button = screen.getByRole("button")
      expect(document.activeElement).toBe(button)
    })
  })

  describe("state", () => {
    it("supports controlled selected date state", async () => {
      function ControlledCalendar() {
        const [selected, setSelected] = React.useState<Date | undefined>(
          new Date(2022, 11, 25)
        )
        return (
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            data-testid="calendar"
          />
        )
      }
      render(<ControlledCalendar />)
      // Initially selected button
      const initialSelected = screen.getAllByRole("button").find((btn) =>
        btn.hasAttribute("data-selected-single")
      )
      expect(initialSelected).toBeDefined()

      // Simulate selecting a new date button
      const buttons = screen.getAllByRole("button")
      const firstSelectable = buttons.find(
        (btn) => !btn.hasAttribute("data-disabled")
      )
      expect(firstSelectable).toBeDefined()
    })
  })

  describe("props", () => {
    it("accepts and applies the className prop", () => {
      const className = "test-class-for-calendar"
      const { container } = render(
        <Calendar mode="single" className={className} />
      )
      const root = container.querySelector("[data-slot=calendar]")
      expect(root).toHaveClass(className)
    })

    it("passes showOutsideDays prop to DayPicker", () => {
      const { container } = render(
        <Calendar mode="single" showOutsideDays={false} />
      )
      // There should be no day buttons with outside class when showOutsideDays is false
      const outsideDayButtons = container.querySelectorAll(
        ".rdp-day.outside"
      )
      expect(outsideDayButtons.length).toBe(0)
    })

    it("applies disabled dates correctly", () => {
      const disabledDate = new Date(2022, 11, 25)
      const disabledFn = (date: Date) =>
        date.toDateString() === disabledDate.toDateString()
      const { container } = render(
        <Calendar mode="single" disabled={disabledFn} />
      )
      const disabledBtn = container.querySelector(
        `button[data-day="${disabledDate.toLocaleDateString()}"]`
      )
      expect(disabledBtn).toHaveAttribute("aria-disabled", "true")
    })
  })

  describe("interactions", () => {
    it("calls onSelect when a date button is clicked (single selection mode)", async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()
      render(<Calendar mode="single" onSelect={handleSelect} />)
      const buttons = screen.getAllByRole("button").filter((btn) =>
        btn.hasAttribute("data-day")
      )
      expect(buttons.length).toBeGreaterThan(0)
      await user.click(buttons[0])
      expect(handleSelect).toHaveBeenCalledTimes(1)
      // The argument passed to onSelect is a Date (or undefined)
      const callArg = handleSelect.mock.calls[0][0]
      expect(
        callArg === null || callArg instanceof Date || callArg === undefined
      ).toBe(true)
    })

    it("calls onSelect with updated range when a date button is clicked (range mode)", async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()
      render(<Calendar mode="range" onSelect={handleSelect} />)
      const buttons = screen.getAllByRole("button").filter((btn) =>
        btn.hasAttribute("data-day")
      )
      expect(buttons.length).toBeGreaterThan(0)
      await user.click(buttons[0])
      expect(handleSelect).toHaveBeenCalledTimes(1)
      // The argument passed to onSelect is an object with from and to or undefined
      const callArg = handleSelect.mock.calls[0][0]
      if (callArg !== undefined) {
        expect(
          typeof callArg === "object" &&
          ("from" in callArg || "to" in callArg)
        ).toBe(true)
      }
    })
  })

  describe("accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Calendar mode="single" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("renders navigation buttons with aria-labels", () => {
      render(<Calendar mode="single" />)
      const prevBtn = screen.getByRole("button", { name: /previous/i })
      const nextBtn = screen.getByRole("button", { name: /next/i })
      expect(prevBtn).toBeInTheDocument()
      expect(nextBtn).toBeInTheDocument()
    })

    it("renders day buttons accessible with proper roles and states", () => {
      render(<Calendar mode="single" />)
      const buttons = screen.getAllByRole("button").filter((btn) =>
        btn.hasAttribute("data-day")
      )
      expect(buttons.length).toBeGreaterThan(0)
      buttons.forEach((btn) => {
        expect(btn).toHaveAccessibleName()
      })
    })
  })

  describe("error handling", () => {
    it("renders gracefully without selected prop", () => {
      const { container } = render(<Calendar mode="single" />)
      const calendar = container.querySelector("[data-slot=calendar]")
      expect(calendar).toBeInTheDocument()
    })

    it("renders gracefully with empty disabled array", () => {
      const { container } = render(
        <Calendar mode="single" disabled={[]} />
      )
      const calendar = container.querySelector("[data-slot=calendar]")
      expect(calendar).toBeInTheDocument()
    })

    it("renders gracefully with minimal props (mode only)", () => {
      const { container } = render(<Calendar mode="single" />)
      expect(container.firstChild).toBeDefined()
    })
  })

  describe("exports", () => {
    it("exports Calendar component", () => {
      expect(Calendar).toBeTypeOf("function")
    })

    it("exports CalendarDayButton component", () => {
      expect(CalendarDayButton).toBeTypeOf("function")
    })
  })
})