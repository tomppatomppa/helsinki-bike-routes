import { IoMdMenu } from 'react-icons/io'

interface Props {
  handleSetSidebar: () => void
}

const Header = ({ handleSetSidebar }: Props) => {
  return (
    <div
      id="header-element"
      className="h-full  bg-primary p-2 shadow-lg flex items-center"
    >
      <button
        id="toggle-sidebar-button"
        className="md:absolute"
        onClick={handleSetSidebar}
      >
        <IoMdMenu size={24} />
      </button>
      <label className="flex-1 uppercase font-semibold text-xl">
        Helsinki city bike app
      </label>
    </div>
  )
}

export default Header
