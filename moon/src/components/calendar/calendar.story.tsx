import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from '~/src/components/calendar'
import * as React from 'react'
import { addDays } from 'date-fns'
import { Card, CardContent, CardFooter } from '~/src/components/card'
import { Button } from '~/src/components/button'
import { Clock2Icon } from 'lucide-react'
import { type DateRange } from 'react-day-picker'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
}
export default meta
type Story = StoryObj<typeof Calendar>

export const Basic: Story = {
  render: () => <Calendar mode="single" className="rounded-lg border" />,
}

export const RangeCalendar: Story = {
  render: () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), 0, 12),
      to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
    })

    return (
      <Card className="mx-auto w-fit p-0">
        <CardContent className="p-0">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
          />
        </CardContent>
      </Card>
    )
  },
}

export const MonthAndYearSelector: Story = {
  render: () => (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      className="rounded-lg border"
    />
  ),
}

export const WithPresets: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(new Date().getFullYear(), 1, 12)
    )
    const [currentMonth, setCurrentMonth] = React.useState<Date>(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    )

    return (
      <Card className="mx-auto w-fit max-w-[300px]" size="sm">
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            fixedWeeks
            className="p-0 [--cell-size:--spacing(9.5)]"
          />
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 border-t">
          {[
            { label: 'Today', value: 0 },
            { label: 'Tomorrow', value: 1 },
            { label: 'In 3 days', value: 3 },
            { label: 'In a week', value: 7 },
            { label: 'In 2 weeks', value: 14 },
          ].map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const newDate = addDays(new Date(), preset.value)
                setDate(newDate)
                setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1))
              }}
            >
              {preset.label}
            </Button>
          ))}
        </CardFooter>
      </Card>
    )
  },
}

export const BookedDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(new Date().getFullYear(), 1, 3)
    )
    const bookedDates = Array.from(
      { length: 15 },
      (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
    )

    return (
      <Card className="mx-auto w-fit p-0">
        <CardContent className="p-0">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            disabled={bookedDates}
            modifiers={{
              booked: bookedDates,
            }}
            modifiersClassNames={{
              booked: '[&>button]:line-through opacity-100',
            }}
          />
        </CardContent>
      </Card>
    )
  },
}

export const WeekNumbers: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(new Date().getFullYear(), 1, 3)
    )

    return (
      <Card className="mx-auto w-fit p-0">
        <CardContent className="p-0">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            showWeekNumber
          />
        </CardContent>
      </Card>
    )
  },
}