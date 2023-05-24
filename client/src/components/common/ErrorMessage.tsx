interface ErrorMessageProps {
  show: boolean
  text: string
}
const ErrorMessage = (props: ErrorMessageProps) => {
  return props.show ? <p className="text-red-900">{props.text}</p> : null
}

export default ErrorMessage
