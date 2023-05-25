import { useRef, useState } from 'react'
import useUploadFile from './hooks/useUploadFile'
import { readCsvFileHeaders } from '../../utils/readCsvFileHeaders'
import FileDetails from './FileDetails'
import UploadResults from './UploadResults'
import ProgressBar from '../common/ProgressBar'
import useUploadProgress from './hooks/useUploadProgres'
import { MdOutlineFileUpload } from 'react-icons/md'
import ErrorMessage from '../common/ErrorMessage'

export type FILETYPE = 'stations' | 'journeys'

const UploadFile = () => {
  const [filetype, setFileType] = useState<FILETYPE | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const { sendFile, isError, isLoading, data, error } = useUploadFile()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const uploadProgress = useUploadProgress(isLoading)

  const openFileDialogWindow = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleSendFile = () => {
    if (!file || !filetype) return
    sendFile({ file, filetype: filetype })
    handleResetFile()
  }

  const handleSelectedFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.length) return
    const fileObj = event.target.files && event.target.files[0]
    const filetype = await readCsvFileHeaders(fileObj)

    if (!fileObj && !filetype) return
    setFile(fileObj)
    setFileType(filetype)
  }

  const handleResetFile = () => {
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
        onChange={handleSelectedFile}
      />
      {!file && (
        <button
          className="border-2 p-2 mt-2 border-black flex items-center hover:border-primary"
          data-testid="upload-button"
          onClick={openFileDialogWindow}
        >
          <MdOutlineFileUpload className="mr-2" /> Upload File
        </button>
      )}
      <ErrorMessage show={isError} text="There was a problem with uploading">
        <p>Reason: {error?.response?.data.error}</p>
      </ErrorMessage>
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
          handleSend={handleSendFile}
          handleRemove={handleResetFile}
        />
      )}
      {data && <UploadResults data={data} />}
    </div>
  )
}

export default UploadFile
