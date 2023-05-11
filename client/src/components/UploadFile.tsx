import { useRef, useState } from 'react'
import useUploadFile from '../hooks/useUploadFile'
import useUploadJourneys from '../hooks/useUploadJourneys'
import { readCsvFileHeaders } from '../utils/readCsvFileHeaders'

const UploadFile = () => {
  const [fileType, setFileType] = useState<string | null>(null)
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
    if (fileType === 'stations') {
      sendFile(file)
    }
    if (fileType === 'journeys') {
      sendJourneys(file)
    }
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const fileObj = event.target.files && event.target.files[0]
    const filetype = await readCsvFileHeaders(fileObj)
    if (!fileObj && !filetype) return

    setFile(fileObj)
    setFileType(filetype)
  }

  const handleRemove = () => {
    setFile(null)
    setFileType(null)
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
      {!fileType && (
        <>
          <button data-testid="upload-button" onClick={onButtonClick}>
            Add File
          </button>
        </>
      )}
      {fileType && (
        <span>
          Detected filetype <strong>{fileType}</strong>
        </span>
      )}
      {isError ? (
        <p className="text-red-900">
          There was a problem with uploading station
        </p>
      ) : null}
      {isLoading ? <p>Uploading {fileType}</p> : null}

      {file && fileType && !isLoading && (
        <div className="text-left" data-testid="file-state">
          <p className="break-all">
            <strong>Filename</strong> {file.name}
          </p>
          <div className="flex justify-between">
            <button
              onClick={() => handleSend(file)}
              className="border rounded-md bg-green-400 p-2"
            >
              Upload
            </button>
            <button
              className="border rounded-md bg-red-400 p-2"
              onClick={handleRemove}
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
