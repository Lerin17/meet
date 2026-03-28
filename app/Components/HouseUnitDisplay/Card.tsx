import { useProjects } from '@/Context/ProjectsDataContext'
import React from 'react'




const {projectHouseData} = useProjects()


const Card = () => {
  return (
    <div>
        x
    </div>
    // <div className='p-4 bg-white'>
    //   <h1 className='text-2xl font-bold mb-4'>{selectedHouse.title}</h1>
    //   <img src={selectedHouse.imageSrc} alt={selectedHouse.title} className='w-full h-64 object-cover mb-4' />
    //   {/* <p>{selectedHouse.description}</p> */}
    // </div>
  )
}

export default Card