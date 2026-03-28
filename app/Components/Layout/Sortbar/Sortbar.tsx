import React from 'react'

const Sortbar = () => {
  // bg-[#1E359C]
  return (
    <div className='h-[29px] font-helvetica text-sm font-bold'>
      <div className='flex'>
        <div className='bg-[#E2E2E2] h-[29px] px-8 py-2 text-black flex items-center justify-center'>
            SORT BY
        </div>

        <div className=' gradientblack h-[29px] px-8 py-2 flex items-center justify-center'>
            PROJECTS
        </div>
      </div>
    </div>
  )
}

export default Sortbar
