"use client";

import React from "react";
import { useHouseUnit } from "@/Context/HouseUnitContext";

const page = () => {
  const { selectedHouse } = useHouseUnit();

  if (!selectedHouse) {
    return <div className="h-screen bg-red-400">No house selected</div>;
  }

  const getThumbnailUrl = (url: string) => {
    if (url.includes("drive.google.com")) {
      const fileId = url.split("/d/")[1].split("/")[0];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
    } else
      return "https://res.cloudinary.com/dxjys4qpi/image/upload/v1771941530/NETCONSTRUCT/WhatsApp_Image_2025-10-15_at_19.59.19_7a0e6e43_pfjevt.jpg";
  };

  return (
    <div className="    w-full flex flex-col  bg-white h-screen">
      <div className="flex items-center w-[100%] h-full bg-white  ">
        <div className="w-1/2 pt-30 flex flex-col justify-content h-full border border-gray-300 font-helvetica bg-[#e5e5db] text-black  px-3">

        <div className="w-8/12  text-start align-left text-xs">
                  <p>{selectedHouse.description}</p>
          </div>

          <div className = 'flex w-full justify-between mt-10 '>
           <div className="text-xl font-bold mb-4 w-1/2 align-left">{selectedHouse.title}</div>

            <div className="text-xl font-bold mb-4 w-1/2 align-left">{selectedHouse.title}</div>
          </div>
         

          <div className="flex  items-end h-full w-full  ">
            <div className="flex w-8/12 justify-between font-bold mb-20">
                  <div>
              Plot Size
                </div>

            <div>
              500sqm
            </div>
            </div>
          

            <div className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quaerat, deserunt consequatur ut numquam architecto commodi. 
            </div>
          </div>

        </div>

        <div className="w-1/2 h-full flex items-center ">
          <img
            src={getThumbnailUrl(selectedHouse.imageSrc)}
            alt={selectedHouse.title}
            className="w-full h-[500px]  object-cover mb-4"
          />
        </div>
      </div>
{/* 
      <div className="fixed bg-black flex items-center justify-center text-white w-1/2 h-16 bottom-0 uppercase font-helvetica ">
      
        Upload
      </div> */}
    </div>
  );
};

export default page;
