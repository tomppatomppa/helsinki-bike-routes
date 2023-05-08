type Props = {
  children?: JSX.Element | JSX.Element[]
}
const ScrollWrapper = ({ children }: Props) => {
  return (
    <div className="w-screen grid-cols-[minmax(0,1fr),16rem] overflow-auto">
      {children}
    </div>
  )
}

export default ScrollWrapper
