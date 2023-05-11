import { useState } from 'react'

interface Props {
  setDates: (value: object) => void
}
export const MonthSelector = ({ setDates }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }
  const startDate = new Date(currentYear, currentMonth - 1, 1)
    .toISOString()
    .slice(0, 10)
  const endDate = new Date(currentYear, currentMonth, 0)
    .toISOString()
    .slice(0, 10)

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div>
      <button
        onClick={() => setDates({ startDate, endDate })}
        className="p-2 border block bg-neutral-300"
      >
        Apply
      </button>
      <button className="p-2 border bg-neutral-300" onClick={handlePrevMonth}>
        Previous Month
      </button>
      <span>{`${currentMonth}/${currentYear}`}</span>
      <button className="p-2 border bg-neutral-300" onClick={handleNextMonth}>
        Next Month
      </button>
    </div>
  )
}
