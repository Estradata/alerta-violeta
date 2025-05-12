export const Ripple = () => {
  return (
    <div className='w-40 h-40 relative circles'>
      <span className='bg-purple-500 rounded-full h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></span>
      <div className='circle1'></div>
      <div className='circle2'></div>
      <div className='circle3'></div>
    </div>
  )
}
