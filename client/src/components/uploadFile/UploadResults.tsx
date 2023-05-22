interface Props {
  data: object
}

const UploadResults = ({ data }: Props) => {
  return (
    <ul className="mt-6 text-left ">
      <h1 id="results-heading">Result</h1>
      {Object.entries(data).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
  )
}

export default UploadResults
