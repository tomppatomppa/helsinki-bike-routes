import { useState } from 'react'
import { StationForm } from './StationForm'
import { StationFormFields } from '../../types/station'

const StationCreate = () => {
  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = (values: StationFormFields) => {
    console.log(values)
  }
  return (
    <div>
      {!show && (
        <button
          className="border p-2 mt-2 bg-gray-300"
          onClick={() => setShow(!show)}
        >
          Add Station
        </button>
      )}
      {show && (
        <StationForm onSubmit={handleSubmit} onCancel={() => setShow(false)} />
      )}
    </div>
  )
}

export default StationCreate
