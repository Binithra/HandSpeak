import React from 'react'

const Uncomp = ({type}) => {
  return (
    <div className='p-2'>
        <div className='bg-pink-100 px-4 py-2 rounded-full drop-shadow-lg'>
        <div className='font-semibold text-pink-700'>{type}</div>
        </div>
    </div>
  )
}

export default Uncomp