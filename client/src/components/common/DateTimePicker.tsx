import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateTimePickerProps {
  selectedDate: Date
  id: string
  onSelect: (date: Date) => void
}
const DateTimePicker = ({
  selectedDate,
  id,
  onSelect,
}: DateTimePickerProps) => {
  const handleDateChange = (date: Date) => {
    onSelect(date)
  }

  return (
    <DatePicker
      autoComplete="off"
      id={id}
      selected={selectedDate}
      onChange={handleDateChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Select date and time"
      shouldCloseOnSelect={true}
    />
  )
}

export default DateTimePicker
