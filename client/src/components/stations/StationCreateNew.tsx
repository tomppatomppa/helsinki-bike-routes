import CloseButton from '../common/CloseButton'
import { StationForm } from './StationForm'

import useCreateStation from './hooks/useCreateStation'

interface Props {
  setShowModal: (value: string | null) => void
}

const StationCreate = ({ setShowModal }: Props) => {
  const { sendStationForm, nextID, isSuccess } = useCreateStation()

  return isSuccess ? (
    <div className="relative bg-white p-12 flex rounded-md">
      <label>Succesfully added station</label>
      <div className="absolute top-0 right-0">
        <CloseButton onClick={() => setShowModal(null)} />
      </div>
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
