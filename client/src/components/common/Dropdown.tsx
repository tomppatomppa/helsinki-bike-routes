interface DropdownProps {
  title: string
  options: any[]
  value: string
  onSelect: (event: string) => void
}

const Dropdown = (props: DropdownProps) => {
  const { title, options, value, onSelect } = props

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value.toString())
  }
  return (
    <div>
      <label htmlFor="dropdown">{title}:</label>
      <select id="dropdown" value={value} onChange={handleOnChange}>
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
