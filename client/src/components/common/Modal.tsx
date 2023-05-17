interface ModalProps {
  show: boolean
  children: JSX.Element
}

const Modal = ({ show, children }: ModalProps) => {
  return show ? (
    <div className="fixed inset-0 w-screen h-screen backdrop-blur-sm overflow-auto bg-black bg-opacity-20 flex justify-center items-center">
      <div className="mx-auto max-w-3xl items-center ">{children}</div>
    </div>
  ) : null
}

export default Modal
