import { useMutation } from 'react-query'
import CloseButton from '../common/CloseButton'
import { StationForm } from './StationForm'

import useCreateStation from './hooks/useCreateStation'
import { deleteStation } from '../../api/stationApi'

interface Props {
  setShowModal: (value: string | null) => void
}

const StationCreate = ({ setShowModal }: Props) => {
  const { sendStationForm, nextID, station } = useCreateStation()
  const {
    mutate: deleteCreatedStation,
    isSuccess,
    isError,
  } = useMutation(deleteStation)

  return station ? (
    <div className="relative bg-white p-12 flex rounded-md flex-col">
      <label className="text-xl">
        {isSuccess ? 'Deleted Station' : 'Succesfully added station'}
      </label>
      {isError && <label>Station has already been deleted</label>}
      <div className="absolute top-0 right-0">
        <CloseButton onClick={() => setShowModal(null)} />
      </div>
      {!isSuccess && (
        <button
          className="p-2 mt-6 bg-red-900 text-white"
          onClick={() => deleteCreatedStation(station?.ID)}
        >
          Delete Created Station
        </button>
      )}
    </div>
  ) : (
    <StationForm
      nextAvailableID={nextID}
      onSubmit={sendStationForm}
      onCancel={() => setShowModal(null)}
    />
  )
}

export default StationCreate
