import { Link } from 'react-router-dom'

import UploadFile from '../../UploadFile'
import CloseButton from '../../common/CloseButton'

interface Props {
  handleSetSidebar: () => void
}

const Sidebar = ({ handleSetSidebar }: Props) => {
  return (
    <div
      data-testid="sidebar-element"
      className={`bg-neutral-100 h-full w-56 px-6 py-4 divide-y-2 transition-all duration-200`}
    >
      <nav className="flex flex-col items-start space-y-3">
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase"
        >
          Menu
        </h5>
        <CloseButton onClick={handleSetSidebar} />
        <Link className="hover:text-teal-700 flex-1" to={'/journeys'}>
          Journeys
        </Link>
        <Link className="hover:text-teal-700" to={'/stations'}>
          Stations
        </Link>
        <p className="border border-black w-full"></p>
      </nav>
      <div className="flex flex-col items-start">
        <UploadFile />
      </div>
    </div>
  )
}

export default Sidebar
