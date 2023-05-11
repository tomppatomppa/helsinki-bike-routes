import CloseButton from '../common/CloseButton'

interface FileDetailsProps {
  fileType: string | null
  file: File
  handleSend: () => void
  handleRemove: () => void
}

const FileDetails = (props: FileDetailsProps) => {
  const { file, handleSend, handleRemove, fileType } = props

  if (!fileType) {
    return (
      <div className="relative">
        <p className="text-red-900">
          The file doesn't contain required headers
        </p>
        <CloseButton onClick={handleRemove} />
      </div>
    )
  }

  return (
    <div
      className="text-left flex-col flex gap-2 text-sm"
      data-testid="file-state"
    >
      <h5 className="text-base font-semibold text-gray-500 uppercase">
        File Details
      </h5>
      <p className="break-all">
        Filtetype: <strong className="uppercase">{fileType}</strong>
      </p>
      <p className="break-all">Filename: {file.name}</p>
      <div className="flex justify-between">
        <button onClick={handleSend} className="border bg-green-300 p-2">
          Upload
        </button>
        <CloseButton onClick={handleRemove} />
      </div>
    </div>
  )
}

export default FileDetails
