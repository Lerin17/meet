
'use client'
import Gallery from '@/app/Components/Media/Gallery'
import GalleryMain from '@/app/Components/Media/GalleryMain'
import Suggestions from '@/app/Components/Media/Suggestions'
import { motion } from 'framer-motion'
import { del } from 'framer-motion/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [isGalleryOpen, setisGalleryOpen] = useState(false)
  // When `hiddenTriggered` is set, start a 3s timer and then show the div via className.
  const [hiddenTriggered, setHiddenTriggered] = useState(false)
  const [delayedShow, setDelayedShow] = useState(false)

  useEffect(() => {


    // let t: ReturnType<typeof setTimeout> | null = null
    // if (hiddenTriggered) {
    //   setDelayedShow(false)
    //   t = setTimeout(() => {
    //     setDelayedShow(true)
    //     setHiddenTriggered(false) // reset trigger after it fired
    //   }, 3000) // wait 3s then display the div
    // } else {
    //   setDelayedShow(false)
    // }
    // return () => {
    //   if (t) clearTimeout(t)
    // }

    setTimeout(() => {
      if(isGalleryOpen){
  setHiddenTriggered(true)
  setDelayedShow(true)
      }
        
    }, 500);


  }, [isGalleryOpen])

  const visible = isGalleryOpen || delayedShow

  return (
    <div className="flex flex-col w-full justify-center items-center bg-white h-screen ">

      {/* ITEMS SHOULD BE INCLUDED IN MENUBAR */}

      <div className="w-8/12 border flex justify-around">

        <div>
          Suggestions
        </div>

        <div>
          Projects Media
        </div>

        <div>
          Markerting Media
        </div>
      </div>
      {/* ITEMS SHOULD BE INCLUDED IN MENUBAR} */}


      {/* MAIN CONTENT SHOULD BE INCLUDED BELOW  */}
      <div className="w-10/12 h-full mt-18">
        {/* container for media menu options */}

        <div className={`${hiddenTriggered?'hidden':'w-full h-full flex items-top justify-center'}  `}>
          <div className={`lg:w-5/12 md:w-7/12 xs:w-full w-full bg-white h-10/12`}>
            <motion.div
              className="w-full h-full"
              animate={{
                opacity: isGalleryOpen ? 0 : 1,
                transition: { duration: 0.5 },
              }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, display: 'none' }}
            >
              <Suggestions />
            </motion.div>
          </div>

          <div className={`${hiddenTriggered ? '' : 'block lg:w-7/12 md:w-5/12 lg:block  bg-white h-9/12 overflow-hidden'} `}>
            <motion.div
              className="w-full h-full"
              animate={{
                opacity: isGalleryOpen ? 0 : 1,
                scale: isGalleryOpen ? 0.9 : 1,
                transition: { duration: 0.5 },
              }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, display: 'none', scale: 0.9 }}
            >
              <Gallery isGalleryOpen={isGalleryOpen} setisGalleryOpen={setisGalleryOpen} />
            </motion.div>
          </div>
        </div>


        {/* <div className={`${isGalleryOpen ? 'block' : `${delayedShow ? 'block' : 'hidden'}` }`}>
          ...loading
        </div> */}

          {delayedShow &&
                 <div className={` ${delayedShow ? 'block w-full h-full  ' : 'hidden'}`}>
            <motion.div
            animate={{
              opacity: delayedShow ? 1 : 0,
            
              }}

              initial={{ opacity: 0 }}

              transition={{
                duration:0.5
              }}
            >
              <GalleryMain/>
            </motion.div>
            
          </div>
          }
       
 
      </div>


    

    </div>
  )
}

export default page