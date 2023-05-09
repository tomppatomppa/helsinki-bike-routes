interface DropdownProps {
  title: string
  options: any[]
  value: string
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown = (props: DropdownProps) => {
  const { title, options, value, onSelect } = props
  return (
    <div>
      <label htmlFor="dropdown">{title}:</label>
      <select id="dropdown" value={value} onChange={onSelect}>
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
