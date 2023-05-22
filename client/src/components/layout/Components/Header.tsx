interface Props {
  handleSetSidebar: () => void
}
const Header = ({ handleSetSidebar }: Props) => {
  return (
    <div
      id="header-element"
      className="h-full  bg-neutral-400 p-2 shadow-lg flex items-center"
    >
      <button className="md:absolute" onClick={handleSetSidebar}>
        Toggle Sidebar
      </button>
      <label className="flex-1 uppercase font-semibold text-xl">
        Helsinki city bike app
      </label>
    </div>
  )
}

export default Header
