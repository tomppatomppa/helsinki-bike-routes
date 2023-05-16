import { useRef, useState } from 'react'
import useUploadFile from './hooks/useUploadFile'
import { readCsvFileHeaders } from '../../utils/readCsvFileHeaders'
import FileDetails from './FileDetails'
import UploadResults from './UploadResults'
import ProgressBar from '../common/ProgressBar'
import useUploadProgress from './hooks/useUploadProgres'

const UploadFile = () => {
  const [filetype, setFileType] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const { sendFile, isError, isLoading, data } = useUploadFile()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const uploadProgress = useUploadProgress(isLoading)

  const onUploadButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleSend = () => {
    if (!file || !filetype) return
    sendFile({ file, filetype: filetype })
    handleRemove()
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
        key={file ? file.name : 'file'}
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
          <button
            className="border p-2 mt-2 bg-gray-300"
            data-testid="upload-button"
            onClick={onUploadButtonClick}
          >
            Upload File
          </button>
        </>
      )}
      {isError ? (
        <p className="text-red-900">
          There was a problem with uploading {filetype}
        </p>
      ) : null}
      {isLoading ? (
        <div>
          <p className="animate-pulse text-xl mt-12 text-red-900">
            Uploading {filetype} please wait...
          </p>
          <ProgressBar value={uploadProgress} />
        </div>
      ) : null}

      {file && !isLoading && (
        <FileDetails
          fileType={filetype}
          file={file}
          handleSend={handleSend}
          handleRemove={handleRemove}
        />
      )}
      {data && <UploadResults data={data} />}
    </div>
  )
}

export default UploadFile
