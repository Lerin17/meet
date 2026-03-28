'use client'

import React, { useRef } from 'react'

import Searchbar from '../Components/UI Components/Searchbar'
import Sortbar from '../Components/Layout/Sortbar/Sortbar'
import { image } from 'framer-motion/client'
import HouseCard from '../Components/home/HouseCard'
import { useProject } from 'sanity'
import { useProjects } from '@/Context/ProjectsDataContext'
import { useUtilityContext } from '@/Context/UtilityContext'

const page = () => {
    const [scrollY, setScrollY] = React.useState(0)
    const { setComponentScrollY } = useUtilityContext()

    const { projectHouseData } = useProjects()
    const scrollRef = useRef<HTMLDivElement>(null)

    const getFilteredHouseData = projectHouseData.map((house: any) => ({
        imageSrc: house.assets[0].url,
        title: house.houseName,
        description: house.description
    }))

    React.useEffect(() => {
      const el = scrollRef.current
      if (!el) return

      const handleScroll = () => {
        const scrollValue = el.scrollTop
        setScrollY(scrollValue)
        setComponentScrollY(scrollValue)
      }

      el.addEventListener("scroll", handleScroll, { passive: true })

      return () => {
        el.removeEventListener("scroll", handleScroll)
      }
    }, [setComponentScrollY])   

    console.log('Filtered House Data in page.tsx', getFilteredHouseData)

    // const mockHouses =[
    //     {
    //         imageSrc: 'https://res.cloudinary.com/dxjys4qpi/image/upload/v1771941530/NETCONSTRUCT/WhatsApp_Image_2025-10-15_at_19.59.19_7a0e6e43_pfjevt.jpg',
    //         title: '4 Bedroom Detached',
    //         description: 'A beautiful 4-bedroom family home with a spacious backyard and modern amenities.'
    //     },
    //         {
    //         imageSrc: 'https://res.cloudinary.com/dxjys4qpi/image/upload/v1771941530/NETCONSTRUCT/WhatsApp_Image_2025-10-15_at_19.59.19_7a0e6e43_pfjevt.jpg',
    //         title: '3 & 1 Bedroom Terrace',
    //         description: 'A beautiful 3-bedroom family home with a spacious backyard and modern amenities.'
    //     },
    //         {
    //         imageSrc: 'https://res.cloudinary.com/dxjys4qpi/image/upload/v1771941530/NETCONSTRUCT/WhatsApp_Image_2025-10-15_at_19.59.20_3fed7432_xylq5h.jpg',
    //         title: '4 Bedroom Semi-Detached',
    //         description: 'A beautiful 4-bedroom family home with a spacious backyard and modern amenities.'
    //     }
    // ]

  return (
    <div className=' bg-white h-screen'>
      {/* <div>
        Menu
      </div> */}


<div className=' relative flex bg-white w-full justify-center  ' >
<div className={`w-full absolute bg-white flex items-center justify-center transition-all duration-400 ${scrollY > 10 ? 'mt-[40px]' : 'mt-[65px]'} `} style={{ height: `${scrollY > 10 ? 40 : 80}px`, 
transition: 'height 0.4s ease-in-out' }}>

<div className='w-10/12 flex items-center  justify-start'>
 <Sortbar/>

               

            <Searchbar/>
</div>




      </div>
</div>
      
      <div ref={scrollRef} className='flex w-full overflow-y-auto  justify-center border h-full'>
              <div className=' w-[96%] pt-[150px]'>
        {getFilteredHouseData.map((house:any, index:any) => (
            <HouseCard
            key={index}
            house={house}
            />
        ))}
      </div>
      </div>

<div className='fixed bg-black flex items-center justify-center text-white w-full h-16 bottom-0 uppercase font-helvetica '>
    Upload
</div>
    
    </div>
  )
}

export default page
