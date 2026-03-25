'use client'

import React from 'react'
import { useHouseUnit } from '@/Context/HouseUnitContext';

const page = () => {
  const { selectedHouse } = useHouseUnit();

  if (!selectedHouse) {
    return <div className='h-screen bg-red-400'>No house selected</div>;
  }

  return (
    <div className='p-4 bg-white'>
      <h1 className='text-2xl font-bold mb-4'>{selectedHouse.title}</h1>
      <img src={selectedHouse.imageSrc} alt={selectedHouse.title} className='w-full h-64 object-cover mb-4' />
      <p>{selectedHouse.description}</p>
    </div>
  )
}

export default page