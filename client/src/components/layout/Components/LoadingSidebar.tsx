const LoadingSidebar = () => {
  return (
    <div className="fixed z-10 flex flex-col gap-5 bg-neutral-100 h-full w-56 px-6 py-4 divide-y-2 border-r">
      <div className="animate-pulse h-5  bg-gray-200 rounded"></div>
      <div className="animate-pulse h-5 mb-12 bg-gray-200 rounded"></div>
      <div className="animate-pulse h-12 bg-gray-200 rounded"></div>
      <div className="animate-pulse h-12 bg-gray-200 rounded"></div>
      <div className="animate-pulse h-12 bg-gray-200 rounded"></div>
    </div>
  )
}

export default LoadingSidebar
