interface Props {
  stationID: number | null
}

const StationDetailsView = (props: Props) => {
  const { stationID } = props
  return <div>StationDetailsView {stationID}</div>
}

export default StationDetailsView
