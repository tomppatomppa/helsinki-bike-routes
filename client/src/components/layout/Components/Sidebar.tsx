import { useState } from 'react'
import { Link } from 'react-router-dom'
import UploadFile from '../../uploadFile/UploadFile'
import CloseButton from '../../common/CloseButton'
import StationCreate from '../../stations/StationCreateNew'
import Modal from '../../common/Modal'

interface Props {
  handleSetSidebar: () => void
}

const Sidebar = ({ handleSetSidebar }: Props) => {
  const [message, setMessage] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleSetShowModal = (message: string | null) => {
    if (message) {
      setMessage(message)
    }
    setShowModal(!showModal)
  }

  return (
    <div
      data-testid="sidebar-element"
      className={` flex flex-col gap-5 bg-neutral-100 h-full w-56 px-6 py-4 divide-y-2`}
    >
      <nav className="flex flex-col items-start space-y-3 ">
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase"
        >
          Menu
        </h5>
        <div className=" absolute top-0 right-2.5">
          <CloseButton onClick={handleSetSidebar} />
        </div>
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
      <div className="flex flex-col items-start">
        {!showModal && (
          <button
            className="border p-2 mt-2 bg-gray-300"
            onClick={() => setShowModal(!showModal)}
          >
            Add Station
          </button>
        )}
        <div className="p-2 bg-green-200">{message}</div>
        <Modal show={showModal}>
          <StationCreate setShowModal={handleSetShowModal} />
        </Modal>
      </div>
    </div>
  )
}

export default Sidebar
