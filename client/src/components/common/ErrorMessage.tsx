interface ErrorMessageProps {
  show: boolean
  text: string
  children?: JSX.Element
}
const ErrorMessage = (props: ErrorMessageProps) => {
  return props.show ? (
    <div className="text-red-900">
      <p>{props.text}</p>
      {props.children}
    </div>
  ) : null
}

export default ErrorMessage
