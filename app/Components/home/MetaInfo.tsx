import React from 'react'

const MetaInfo = () => {
  return (
    <div className='w-full flex justify-center bg-gradient-to-r from-neutral-800 to-stone-900 relative text-sm' >

      
<div className='absolute w-full border-t border-from-neutral-800 to-stone-900  z-10 top-8'>
  x
</div>
<div className='w-10/12 flex flex-col justify-between rounded-lg-t rounded-lg mt-2 '>

                  <div className="w-full  justify-between flex text-gray-100">
          <div className=" px-2 font-inter ">14th of December 2023</div>

          <div className="border-r px-2">Venue: Kabusa Garden</div>

          <div className=" px-2 border-neutral-600 border-r ">Lerin Owoade</div>

          <div></div>
        </div>

                    <div className="w-full border-sky-100 justify-between flex  text-gray-100 ">
          <div className="border-r border-neutral-900 font-bold px-2 hover:bg-white">Attendees</div>

          <div className="border-r border-from-neutral-800 to-stone-9000 flex flex-col px-2 pb-2  hover:bg-white justify">
     
             <div>Anchored by: Engr Felix</div>
             </div>

          <div className="border-r border-neutral-700  px-2">Lerin Owoade</div>

          <div></div>
        </div>
    </div>
    </div>
    
 
  )
}

export default MetaInfo
