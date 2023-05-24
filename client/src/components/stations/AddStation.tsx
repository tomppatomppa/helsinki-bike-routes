import CloseButton from '../common/CloseButton'
import ErrorMessage from '../common/ErrorMessage'
import { AddStationForm } from './AddStationForm'

import useCreateStation from './hooks/useCreateStation'

interface Props {
  setShowModal: (value: boolean) => void
}

const AddStation = ({ setShowModal }: Props) => {
  const { sendStationForm, nextID, isSuccess, isError } = useCreateStation()

  return (
    <div className="relative bg-white flex rounded-md flex-col">
      <ErrorMessage
        show={isError}
        text="There was a problem with adding station"
      />
      {isSuccess && (
        <label className="text-xl bg-green-200">
          Succesfully added station
        </label>
      )}
      <div className="absolute top-0 right-0">
        <CloseButton onClick={() => setShowModal(false)} />
      </div>
      <AddStationForm
        nextAvailableID={nextID}
        onSubmit={sendStationForm}
        onCancel={() => setShowModal(false)}
      />
    </div>
  )
}

export default AddStation
