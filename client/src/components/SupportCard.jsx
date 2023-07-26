import React from 'react'

const SupportCard = ({image , content, description }) => {
  return (
    <div className='bg-gray-300 rounded-3xl p-7 w-80 m-8 shadow-lg '>
        <div className='flex flex-row gap-4 items-center justify-center'>
            <img src={image} alt="icon" className='w-20 h-20 '/>
        </div>
        <div className='flex flex-col gap-2 py-2 text-sky-800 font-semibold text-xl items-center justify-center'>
            {content}
        </div>
        <div>
            {description}
        </div>
        

    </div>
  )
}

export default SupportCard