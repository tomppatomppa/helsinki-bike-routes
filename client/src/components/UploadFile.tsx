import { useRef, useState } from 'react'
import useUploadFile from '../hooks/useUploadFile'
import useUploadJourneys from '../hooks/useUploadJourneys'

interface Props {
  location: string
}

const UploadFile = ({ location }: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const { sendFile, isError, isLoading, message } = useUploadFile(setFile)
  const { sendJourneys } = useUploadJourneys(setFile)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  const handleSend = (file: File) => {
    if (location === 'stations') {
      sendFile(file)
    } else {
      sendJourneys(file)
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) return
    setFile(fileObj)
  }

  return (
    <div className="max-w-full">
      <input
        data-testid="file-input"
        id="file"
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        accept={'.csv'}
        onChange={handleChange}
      />
      {!file && (
        <button data-testid="upload-button" onClick={onButtonClick}>
          Add File
        </button>
      )}
      {isError ? (
        <p className="text-red-900">
          There was a problem with uploading station
        </p>
      ) : null}
      {isLoading ? <p>Uploading Stations</p> : null}

      {file && !isLoading && (
        <div className="text-left" data-testid="file-state">
          <strong>Filename</strong>
          <p className="break-all"> {file.name}</p>
          <div className="flex justify-between">
            <button
              onClick={() => handleSend(file)}
              className="border rounded-md bg-green-400 p-2"
            >
              Upload
            </button>
            <button
              className="border rounded-md bg-red-400 p-2"
              onClick={() => setFile(null)}
            >
              Remove
            </button>
          </div>
        </div>
      )}
      <span className="text-xl">{message}</span>
    </div>
  )
}

export default UploadFile
