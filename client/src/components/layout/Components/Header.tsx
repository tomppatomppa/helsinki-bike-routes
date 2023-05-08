import React from 'react'

interface Props {
  handleSetSidebar: () => void
}
const Header = ({ handleSetSidebar }: Props) => {
  return (
    <div className="h-full bg-red-200">
      <button onClick={handleSetSidebar}>Show</button>
      Header
    </div>
  )
}

export default Header
