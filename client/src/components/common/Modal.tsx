interface ModalProps {
  show: boolean
  children: JSX.Element
}

const Modal = ({ show, children }: ModalProps) => {
  return show ? (
    <div className="fixed z-50 inset-0 w-screen h-screen backdrop-blur-sm overflow-auto bg-black bg-opacity-20 flex justify-center items-center">
      <div className="mx-auto max-w-3xl items-center mt-96 sm:mt-0">
        {children}
      </div>
    </div>
  ) : null
}

export default Modal
