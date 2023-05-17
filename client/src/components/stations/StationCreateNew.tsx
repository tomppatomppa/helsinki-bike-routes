import { StationForm } from './StationForm'
import { StationFormFields } from '../../types/station'

interface Props {
  setShowModal: (value: boolean) => void
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const StationCreate = ({ setShowModal }: Props) => {
  const handleSubmit = async (values: StationFormFields) => {
    await sleep(500)
    console.log(values)
  }
  return (
    <StationForm onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
  )
}

export default StationCreate
