'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useUtilityContext } from '@/Context/UtilityContext'


const Uploadbar = () => {
  const router = useRouter()
  
    const {routePath} = useUtilityContext()

const goToUploadPage = () => {
    router.push('/Upload')
}

  return (

   <div onClick = {()=>goToUploadPage()} className={`${routePath === '/HouseUnit'?'fixed bg-black flex items-center justify-center text-white w-1/2 h-16 bottom-0 uppercase font-helvetica':'fixed bg-black flex items-center justify-center text-white w-full h-16 bottom-0 uppercase font-helvetica'} `}>
    Upload
</div>
  )
}

export default Uploadbar