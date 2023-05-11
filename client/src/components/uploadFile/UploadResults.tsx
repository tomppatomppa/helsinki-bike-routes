interface Props {
  data: object
}

const UploadResults = ({ data }: Props) => {
  return (
    <ul className="mt-6 text-left ">
      <span className="text-lg">Result</span>
      {Object.entries(data).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
  )
}

export default UploadResults
