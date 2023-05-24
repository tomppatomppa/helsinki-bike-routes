import { SearchField } from '../../hooks/useQueryParams'

interface DropdownProps {
  title: string
  options: string[]
  value: string
  onSelect: (event: SearchField) => void
}

const Dropdown = (props: DropdownProps) => {
  const { title, options, value, onSelect } = props

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value.toString() as SearchField)
  }

  return (
    <div>
      <label className="mr-1" htmlFor="dropdown">
        {title}
      </label>
      <select id="dropdown" value={value} onChange={handleOnChange}>
        <option value="">--Please select an option--</option>
        {options?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
