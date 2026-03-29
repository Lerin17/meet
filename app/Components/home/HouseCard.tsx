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

  const getThumbnailUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.split('/d/')[1].split('/')[0];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
    } else {
      return 'https://res.cloudinary.com/dxjys4qpi/image/upload/v1771941530/NETCONSTRUCT/WhatsApp_Image_2025-10-15_at_19.59.19_7a0e6e43_pfjevt.jpg'
    }
  }

  return (
    <div 
      className="lg:h-[250px] md:h-[300px]  flex flex-col md:flex-row w-full mb-[20px] lg:mb-[20px] cursor-pointer"
      onClick={handleClick}
    >
      
      {/* Image Section */}
      <div className="w-full md:w-[40%] md:border-r-6 border-[#1E359C]">
        <img 
          src={getThumbnailUrl(house.imageSrc)} 
          alt="house" 
          className="h-[250px]  w-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:mt-0 md:mt-4 md:w-[60%] gradienty text-black font-helvetica lg:h-[250px] ">
        <div className="uppercase font-bold w-full text-end px-2 py-1">
          {house.title}
        </div>

      </div>


        {/* <div className='h-40'>
          x
        </div> */}
    </div>
  )
}

export default HouseCard