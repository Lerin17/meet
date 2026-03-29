'use client'

import React from 'react'
import DropzoneUploader from '../Components/Media/DropzoneUploader'
import {BUTTON, BUTTON2} from '../Components/Utility/Button'
import {motion} from 'framer-motion'
import Searchbar from '../Components/UI Components/Searchbar'

import MediaFile_ProjectFile from '../Components/Layout/UploadComp/UploadPageStages/MediaFile_ProjectFile'

import UploadPageStages from '../Components/Layout/UploadComp/UploadPageStages/UploadPageStages'
import UploadMediaPage from '../Components/Layout/UploadComp/UploadPageStages/UploadMediaPage'

interface UploadPageProps {

}

const page = () => {

  const [isUploadMediaFile, setisUploadMediaFile] = React.useState<boolean>(false);

  const [isUploadProjectFile, setisUploadProjectFile] = React.useState<boolean>(false);


  const [currentUploadStage, setcurrentUploadStage] = React.useState<number>(0);


  React.useEffect(() => {
    if(isUploadMediaFile && !isUploadProjectFile){
      setcurrentUploadStage(1)
    }
    
  }, [isUploadMediaFile, isUploadProjectFile]);

  return (
    <div className='w-full h-screen relative overflow-hidden'>

{currentUploadStage === 0 && (
  
  <motion.div
  exit={{x: -400}}
  // animate={{x: 0}}
  // initial={{x: -400}}
  transition={{duration: 0.5, ease: "easeInOut"}}
  >
  <MediaFile_ProjectFile isUploadMediaFile={isUploadMediaFile} isUploadProjectFile={isUploadProjectFile} setisUploadMediaFile={setisUploadMediaFile} setisUploadProjectFile={setisUploadProjectFile} />
  </motion.div>
)}


       

    
     
   {
  currentUploadStage === 1 && (
  <motion.div>
      <UploadMediaPage />
    </motion.div>
  )
   }

  

 <UploadPageStages
       currentUploadStage={currentUploadStage}
       />
     
    </div>
  
  )
}

export default page