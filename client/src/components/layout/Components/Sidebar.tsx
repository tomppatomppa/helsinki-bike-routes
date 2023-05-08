import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div
      className={` bg-teal-100 h-full px-6 py-4 divide-y-2 transition-all duration-200`}
    >
      <nav className="flex flex-col items-start space-y-3">
        <Link className="hover:text-teal-700" to={'/journeys'}>
          Journeys
        </Link>
        <Link className="hover:text-teal-700" to={'/stations'}>
          Stations
        </Link>
        <p className="border border-black w-full"></p>
      </nav>
    </div>
  )
}

export default Sidebar
