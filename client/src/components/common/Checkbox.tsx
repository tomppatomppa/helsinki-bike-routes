interface CheckboxProps {
  title: string
  checked: boolean
  onChange: () => void
}

const Checkbox = (props: CheckboxProps) => {
  const { title, checked, onChange } = props

  return (
    <label>
      <input checked={checked} onChange={onChange} type="checkbox" />
      {title}
    </label>
  )
}

export default Checkbox
