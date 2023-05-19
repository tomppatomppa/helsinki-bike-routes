import { useState } from 'react'
import { Link } from 'react-router-dom'
import UploadFile from '../../uploadFile/UploadFile'
import CloseButton from '../../common/CloseButton'
import Modal from '../../common/Modal'
import AddStation from '../../stations/AddStation'
import AddJourney from '../../journeys/AddJourney'

interface SidebarProps {
  handleSetSidebar: () => void
}

type ModalType = 'STATION' | 'JOURNEY'

const Sidebar = ({ handleSetSidebar }: SidebarProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalType, setModalType] = useState<ModalType>('STATION')

  const handleSetShowModal = (type: ModalType) => {
    setShowModal(!showModal)
    setModalType(type)
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
      <div className="flex flex-col items-start flex-1">
        {!showModal && (
          <button
            className="border p-2 mt-2 bg-gray-300"
            onClick={() => handleSetShowModal('STATION')}
          >
            Add Station
          </button>
        )}
        {!showModal && (
          <button
            className="border p-2 mt-2 bg-gray-300"
            onClick={() => handleSetShowModal('JOURNEY')}
          >
            Add Journey
          </button>
        )}
        <Modal show={showModal}>
          {modalType === 'STATION' ? (
            <AddStation setShowModal={setShowModal} />
          ) : (
            <AddJourney setShowModal={setShowModal} />
          )}
        </Modal>
      </div>
    </div>
  )
}

export default Sidebar
