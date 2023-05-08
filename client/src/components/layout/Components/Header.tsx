interface Props {
  handleSetSidebar: () => void
}
const Header = ({ handleSetSidebar }: Props) => {
  return (
    <div className="h-full bg-red-200 flex">
      <div className="bg-blue-200 flex-1 text-left flex">
        <button onClick={handleSetSidebar}>Toggle Sidebar</button>
      </div>
      <label className="flex-1"> Header</label>
    </div>
  )
}

export default Header
