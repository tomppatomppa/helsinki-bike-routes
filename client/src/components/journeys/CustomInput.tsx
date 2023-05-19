import React, { useState } from 'react'
import { StationNameAndID } from '../../types/station'

interface CustomInputProps {
  onClick: (value: StationNameAndID) => void
  value: string
  options: StationNameAndID[]
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = (props: CustomInputProps) => {
  const { onClick, options, ...customProps } = props
  const [isFocused, setIsFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filteredList =
    options.filter((station) =>
      station.Name.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? []

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
      <label> {customProps.value}</label>
      <input
        autoComplete="off"
        {...customProps}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={handleFocus}
      />
      {isFocused && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto">
          {filteredList?.map((station, index) => (
            <div
              onClick={() => handleItemClick(station)}
              className="cursor-pointer text-left hover:bg-neutral-200 p-2"
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
