import Link from 'next/link'
import React from 'react'
import BufferAnimation from '../Components/LottieFiles/Bufferloader'
import Image from 'next/image'
import image1 from '../../public/Image/The Encore Table Lamp Captures a Certain Kind of Feeling.jpg'
import Button1 from '../Components/LottieFiles/Button'
import Button2 from '../Components/LottieFiles/Button2'



const page = () => {
  return (
    <div
    style={{
      // background:'#d9d9d9'
    }}
    className='flex w-full justify-center items-center h-screen bg-white'>

      <div className='w-8/12  flex justify-around text-black'>

       <div className='w-16 h-16 hover:underline cursor-pointer hover:text-[#0071BC] text-xl font-creato font-thin flex items-center justify-center rounded-full  text-black'>
            Suggestions
           
        </div>


         

        <Link href="home_1/media">
           <div className='w-16 h-16 hover:underline cursor-pointer hover:text-[#0071BC] text-xl font-creato font-thin flex items-center justify-center rounded-full  text-black'>
            Media
           
        </div>
        </Link>

      <div>
      {/* About */}
      <Button2
      text="About"
      />
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