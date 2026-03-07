import React from 'react'
import DropzoneUploader from './DropzoneUploader'


const Suggestions = () => {
  return (
    <div className=''>
    
        <div className=' border bg-white'>
<DropzoneUploader/>
        </div>

        <div className='font-milligram px-1 text-2xl text-blue-900'>
          Updates
        </div>

        <div className='bg-white h-10/12 flex flex-col px-1 text-black'>
          <div>
             Recent Media Uploads
          </div>

          <div className='hover:underline cursor-pointer'>
             Upload Media
          </div>

           <div>
               Search
          </div>

          
        </div>
    </div>
  )
}

export default Suggestions