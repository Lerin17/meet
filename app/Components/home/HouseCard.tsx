'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useHouseUnit } from '@/Context/HouseUnitContext';

interface HouseCardProps {
    house: {
        imageSrc: string;
        title: string;
        description: string;
    };
}

const HouseCard = (props: HouseCardProps) => {
  const { house } = props;
  const router = useRouter();
  const { setSelectedHouse } = useHouseUnit();

  const handleClick = () => {
    setSelectedHouse(house);
    router.push('/HouseUnit');
  };

  return (
    <div className='h-[240px] 
     flex w-full mb-[20px] cursor-pointer' onClick={handleClick}>

  
        <div className='w-[40%] border-r-6 border-[#1E359C]'>
    
            <img src={house.imageSrc} alt="house" className='h-[240px] w-full object-cover'/>
        </div>

        <div className=' w-[60%] gradienty text-black font-helvetica'>
            <div className='uppercase font-bold w-full text-end px-2 py-1'>
               {house.title}
            </div>
        </div>
     </div>
  )
}

export default HouseCard