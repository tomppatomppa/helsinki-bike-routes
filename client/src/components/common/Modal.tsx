import React from 'react'

const Modal = ({ show, children }) => {
  return show ? (
    <div className="fixed inset-0 w-screen h-screen backdrop-blur-sm bg-black bg-opacity-30">
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  ) : null
}

export default Modal
