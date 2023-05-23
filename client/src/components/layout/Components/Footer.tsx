const Footer = () => {
  return (
    <div
      id="footer-element"
      className="h-full flex bg-neutral-400 items-center justify-center"
    >
      &copy; {new Date().getFullYear()} Created by Tomi West.
    </div>
  )
}

export default Footer
