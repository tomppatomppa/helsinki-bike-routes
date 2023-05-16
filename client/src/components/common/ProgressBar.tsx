interface ProgressBarProps {
  value: number
}
const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div id="progress-bar" className="w-full h-4 bg-gray-300 rounded">
      <div
        className="h-full transition-all duration-500 ease-in-out bg-green-500"
        style={{ width: `${value}%` }}
      ></div>
      <span>{`${value.toFixed(0)}%`}</span>
    </div>
  )
}

export default ProgressBar
