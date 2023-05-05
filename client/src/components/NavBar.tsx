interface NavBarProps {
  setSelect: (values: string) => void
}

const NavBar: React.FC<NavBarProps> = ({ setSelect }) => {
  return (
    <div className="w-full bg-blue-200">
      <div className="flex gap-4 justify-end">
        <button onClick={() => setSelect('journeys')}>Journeys</button>
        <button onClick={() => setSelect('stations')}>Stations</button>
      </div>
    </div>
  )
}

export default NavBar
