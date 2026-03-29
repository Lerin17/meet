import React from "react";
import {motion} from "framer-motion";

const UploadPageStages = ({
  currentUploadStage,
}: {
  currentUploadStage: number;
}) => {
  return (
    <div className="w-full absolute bottom-10 bg-white py-2">
      <div className="flex w-full h-6 rounded-full">
        <div
          className={`w-1/4 ${currentUploadStage >= 1 ? "" : "bg-gray-100"} flex items-center justify-center flex-col  font-bold mx-1 ml-0 text-blue-400 relative overflow-hidden`}
        >
{/* 
          <div className='z-10 font-heltica'>
            text text
          </div> */}

          <motion.div
          className='h-full w-full  bg-black'
          animate={{x: currentUploadStage >= 1 ? 0 : -400}}
          initial ={{x:-400, scaleX: 1.3}}
          transition={{duration: 0.5, ease: "easeInOut"}}
          >
            
          </motion.div>
        </div>

        <div
          className={`w-1/4 ${currentUploadStage >= 2 ? "bg-blue-500" : "bg-gray-100"} flex items-center justify-center flex-col  text-white font-bold mx-1`}
        ></div>

        <div
          className={`w-1/4 ${currentUploadStage >= 3 ? "bg-blue-500" : "bg-gray-100"} flex items-center justify-center flex-col  text-white font-bold mx-1`}
        ></div>
        <div
          className={`w-1/4 ${currentUploadStage === 3 ? "bg-blue-500" : "bg-gray-100"} flex items-center justify-center flex-col  text-white font-bold mx-1 mr-0`}
        ></div>
      </div>

      <div className="w-full bg-gray-400 h-[2px]"></div>
    </div>
  );
};

export default UploadPageStages;
