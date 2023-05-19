import React, { useState } from 'react'
import { StationNameAndID } from '../../types/station'

interface CustomInputProps {
  onClick: (value: StationNameAndID) => void
  value?: string
  list: StationNameAndID[]
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = (props: CustomInputProps) => {
  const { onClick, list, onChange, ...customProps } = props
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }
  const handleItemClick = (station: StationNameAndID) => {
    onClick(station)
    handleBlur()
  }
  return (
    <div>
      <input {...customProps} onChange={onChange} onFocus={handleFocus} />
      {isFocused && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto">
          {list?.map((station, index) => (
            <div
              onClick={() => handleItemClick(station)}
              className="cursor-pointer hover:bg-neutral-200 p-2"
              key={index}
            >
              {station.Name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomInput
