import { useRef, useState } from 'react'

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onButtonClick = () => {
    inputRef.current.click()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) return

    setFile(fileObj)
  }
  return (
    <div>
      <input
        id="file"
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={handleChange}
      />
      <button className="self-center text-4xl" onClick={onButtonClick}>
        +
      </button>
    </div>
  )
}

export default UploadFile
