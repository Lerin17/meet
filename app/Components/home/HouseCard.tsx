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

//   https://drive.google.com/file/d/1ayh90UEoCto8K7wcVf3nKXUhYSKzvXMH/view?usp=drive_link

  const getThumbnailUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.split('/d/')[1].split('/')[0];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
    }else return 'https://res.cloudinary.com/dxjys4qpi/image/upload/v1771941530/NETCONSTRUCT/WhatsApp_Image_2025-10-15_at_19.59.19_7a0e6e43_pfjevt.jpg'}

  return (
    <div className='h-[250px] 
     flex w-full mb-[20px] cursor-pointer' onClick={handleClick}>

  
        <div className='w-[40%] border-r-6 border-[#1E359C]'>
    
            <img  src={getThumbnailUrl(house.imageSrc)} alt="house" className='h-[250px] w-full object-cover'/>
        </div>

        <div className=' w-[60%] gradienty text-black font-helvetica'>
            <div className='uppercase font-bold w-full text-end px-2 py-1'>
               {house.title}
            </div>

            {/* <div className='text-xs '>
                {house.description}
            </div> */}
        </div>
     </div>
  )
}

export default HouseCard