import Suggestions from '@/app/Components/Media/Suggestions'
import Link from 'next/link'
import React from 'react'


const page = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center  h-screen'>

      <div className='w-8/12 border flex justify-around'>

      <div>
        Suggestions
      </div>

       <div>
        Projects Media
        </div>

      <div>
      Markerting Media
      </div>

    

        {/* <Link href="/media">
          <div>
            Media
          </div>
        </Link> */}




      </div>


      <div className='w-8/12 h-full'>
{/* container for media menu options */}
    
            {
                <Suggestions/>
            }
    
      </div>

       
    </div>
  )
}

export default page