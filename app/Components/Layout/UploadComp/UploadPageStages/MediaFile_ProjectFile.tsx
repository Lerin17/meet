import React from 'react'

const MediaFile_ProjectFile = ({isUploadMediaFile, isUploadProjectFile, setisUploadMediaFile, setisUploadProjectFile}: { isUploadMediaFile: boolean; isUploadProjectFile: boolean, setisUploadMediaFile: (isUploadMediaFile: boolean) => void, setisUploadProjectFile: (isUploadProjectFile: boolean) => void }) => {
  return (
     <div className ='flex relative font-helvetica h-screen w-full bg-white text-black'>

      

      <div className = 'w-full  p-2  h-full'>

      

    <div className='flex flex-col h-full '>
      
        <div className='flex flex-col  bg-gray-100 mb-10 p-2 h-full items-center justify-center'>

{/* <div>
  upload
</div> */}

<div className='flex items-center justify-center w-full h-[30px'>

{/* <BUTTON2
      text='upload media file'
      color='yellow'
      onClick={() => setisUploadMediaFile(!isUploadMediaFile)}
      isActive={isUploadMediaFile}
       /> */}


    <div className='text-2xl border border-gray-400 h-full flex items-center justify-center px-4 mx-2 font-helvetica font-bold w-[280px]'>
      Upload Project Files
    </div>
          <div
          onClick={() => setisUploadMediaFile(!isUploadMediaFile)}
          className={`text-2xl border border-gray-400 h-full flex items-center ${isUploadMediaFile ? 'bg-black text-white' : ' text-black hover:bg-white  '} justify-center transition-all px-4 mx-2 font-helvetica font-bold w-[280px] cursor-pointer`}>
      Upload Media Files
    </div>
      {/* <BUTTON2
      text='upload project file'
      color='green'
      onClick={() => setisUploadProjectFile(!isUploadProjectFile)}
      isActive={isUploadProjectFile}
      /> */}
</div>




      
      {/* <div className='text-2xl font-bold font-helvetica '>
          /
      </div> */}
    

    


      

       {/* <div className='font-bold uppercase bg-yellow-300 px-2 py-1'>
          Upload Media File
        </div>

        <div className='font-bold uppercase bg-green-300 px-2 py-1'>
          Upload Project File
        </div> */}
        </div>

    {/* <div className='mt-3'>
   <Searchbar />
    </div> */}
     
    </div>
      
       
      </div>




      {/* <div className = 'w-1/2 h-full flex flex-col pt-10 '>
       <DropzoneUploader />

       <div>
        <div>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 5h13v17h-24v-20h8l3 3zm-10-2v18h22v-15h-12.414l-3-3h-6.586z"/></svg>
        </div>
       </div>
      </div> */}

      {/* <div className = 'w-1/2 h-full flex flex-col bg-gray-200 pt-14'>

      <div>
        TAGS
      </div>

      <div className ='flex '>
          <BUTTON
          // className='mx-2'
          text='Project Info'
          color='blue'
          onClick={() => alert('Upload button clicked!')}
          />

          <BUTTON
            // className='mx-2'
          text='Media Tags'
          color='blue'
          onClick={() => alert('Upload button clicked!')}
          />
      </div>


      <div>
        <div>
          Sunnyvale
        </div>

        <div>
          SVG (Kabusa)
        </div>

        <div>

        </div>
      </div>

      </div> */}
     
    </div>
  )
}

export default MediaFile_ProjectFile
