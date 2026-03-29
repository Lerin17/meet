import React from 'react'
import DropzoneUploader from './../../../Media/DropzoneUploader'

import { useProjectsContext,  } from '@/Context/ProjectsDataContext';
const UploadMediaPage = () => {

    const {allProjectNames, allProjectAxis, updateMediaUploadSelection,mediaUploadData} = useProjectsContext();
  return (
    <div className ={`  flex flex-col md:flex-row  relative font-helvetica h-screen w-full bg-white text-black`}>

      

        <div className ='w-full h-full bg-white p-2'>
            <DropzoneUploader/>
        </div>

        <div className='w-full h-[2px] bg-gray-100 p-2 h-full mb-10'>
            <div className='flex w-full bg-gray-300 p-2   mb-6'>
                TAGS
            </div>

            <div className ='flex w-full mb-6'>
             <div className=' flex items-center justify-start font-bold mx-2 bg-gray-300 px-2 py-1'>
                PROJECT 
            </div>

            <div className=' flex items-center justify-start font-bold mx-2 bg-gray-300 px-2 py-1'>
                MEDIA TYPE
            </div>
            </div>

            <div className='h-full w-full flex flex-col'>
                {/* exe */}


        {/* <div className='w-full  bg-white mx-2
     flex p-1'>
                {
                    allProjectStates.map((projectName, index) => (
                        <div 
                        onClick={() => updateMediaUploadSelection({projectName})}
                        key={index} className={` ${mediaUploadData.projectName === projectName ? 'bg-blue-500 text-white' : 'bg-[#D9D9D9]'} w-[106px] h-[65px] flex items-center justify-center text-center rounded-full mx-2`}>
                            {projectName}
                        </div>
                    ))
                }

    </div> */}

    <div className='w-full  bg-white mx-2
     flex p-1'>
                {
                    allProjectNames.map((projectName, index) => (
                        <div 
                        onClick={() => updateMediaUploadSelection({projectName})}
                        key={index} className={` ${mediaUploadData.projectName === projectName ? 'bg-blue-500 text-white' : 'bg-[#D9D9D9]'} w-[106px] h-[65px] flex items-center justify-center text-center rounded-full mx-2`}>
                            {projectName}
                        </div>
                    ))
                }



    </div>


        <div className='w-full  bg-white mx-2
     flex p-1 mt-4'>
                {
                    allProjectAxis.map((projectAxis, index) => (
                        <div 
                         onClick={() => updateMediaUploadSelection({projectAxis})}
                        key={index} className={` ${mediaUploadData.ProjectAxis === projectAxis ? 'bg-blue-500 text-white' : 'bg-[#D9D9D9]'} px-3 h-[25px] flex items-center justify-center text-center rounded-full mx-2`}>
                            {projectAxis}
                        </div>
                    ))
                }



    </div>
               

                {/* <div className='w-[106px] h-[65px] bg-[#D9D9D9] flex items-center justify-center text-center rounded-full mx-2'>
                    SUNNY VALE
                </div>

                 <div className='w-[106px] h-[65px] bg-[#D9D9D9] flex items-center justify-center text-center rounded-full mx-2  '>
                     CITY VIEW
                </div>

                 <div className='w-[106px] h-[65px] bg-[#D9D9D9] flex items-center justify-center text-center rounded-full mx-2'>
                    SVG KABUSA
                </div> */}


            </div>

          
        
        </div>



     
    </div>
  )
}

export default UploadMediaPage
