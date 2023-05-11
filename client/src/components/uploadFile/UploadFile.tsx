import { useRef, useState } from 'react'
import useUploadFile from './hooks/useUploadFile'
import { readCsvFileHeaders } from '../../utils/readCsvFileHeaders'
import FileDetails from './FileDetails'

const UploadFile = () => {
  const [filetype, setFileType] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const { sendFile, isError, isLoading, message } = useUploadFile(setFile)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleSend = () => {
    if (!file || !filetype) return

    sendFile({ file, filetype: filetype })

    setFileType(null)
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
      {!file && (
        <>
          <button data-testid="upload-button" onClick={onButtonClick}>
            Upload File
          </button>
        </>
      )}
      {isError ? (
        <p className="text-red-900">
          There was a problem with uploading {filetype}
        </p>
      ) : null}
      {isLoading ? <p>Uploading {filetype}</p> : null}
      {file && !isLoading && (
        <FileDetails
          fileType={filetype}
          file={file}
          handleSend={handleSend}
          handleRemove={handleRemove}
        />
      )}
      <span className="text-xl">{message}</span>
    </div>
  )
}

export default UploadFile
