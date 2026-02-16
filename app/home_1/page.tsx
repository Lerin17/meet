import Link from 'next/link'
import React from 'react'
import BufferAnimation from '../Components/LottieFiles/Bufferloader'


const page = () => {
  return (
    <div className='flex w-full justify-center items-center h-screen bg-white'>

      <div className='w-8/12 border flex justify-around text-black'>

       <div>
            Suggestions
        </div>

        <Link href="home_1/media">
          <div>
            Media
          </div>
        </Link>

      <div>
      About
      </div>

        




      </div>


<div>

  {/* BUFFER ANIMATION FOR TESTING PURPOSES */}
  {/* <BufferAnimation */}

  
</div>
       
    </div>
  )
}

export default page