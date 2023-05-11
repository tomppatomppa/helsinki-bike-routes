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
        <p className="text-red-900">The file doesn't have required headers</p>
        <CloseButton onClick={handleRemove} />
      </div>
    )
  }

  return (
    <div className="text-left" data-testid="file-state">
      <h5 className="text-base font-semibold text-gray-500 uppercase">
        File Details
      </h5>
      <p className="break-all">Filtetype: {fileType}</p>
      <p className="break-all">Filename: {file.name}</p>
      <div className="flex justify-between">
        <button
          onClick={handleSend}
          className="border rounded-md bg-green-400 p-2"
        >
          Upload
        </button>
        <CloseButton onClick={handleRemove} />
      </div>
    </div>
  )
}

export default FileDetails
