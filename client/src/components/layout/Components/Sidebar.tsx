import { Link } from 'react-router-dom'

import UploadFile from '../../UploadFile'

interface Props {
  handleSetSidebar: () => void
}

const Sidebar = ({ handleSetSidebar }: Props) => {
  return (
    <div
      data-testid="sidebar-element"
      className={`bg-teal-100 h-full w-56 px-6 py-4 divide-y-2 transition-all duration-200`}
    >
      <nav className="flex flex-col items-start space-y-3">
        <button onClick={handleSetSidebar} className="absolute top-0 right-0">
          Close
        </button>
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
