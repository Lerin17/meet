import { useHomeContext } from '@/Context/HomeContext'
import { motion, MotionValue, useMotionValue, useTransform, } from 'framer-motion'
import React, { use } from 'react'



const DocumentCard = () => {

  

  const {scrollValue, setscrollValue,  progressX, virtualScrollValue} = useHomeContext()


  const opacityChange = useTransform(progressX, [0, 2400], [1, 0.5])
 const scaleChange = useTransform(progressX, [600, 2400], [1, 0.98])
 

//  const verticalMotion = useMotionValue(0);
const verticalChange: MotionValue<number> = useTransform(progressX, (value:any) => -value * 0.4);
  return (
    <motion.div 

    animate={virtualScrollValue < 600 ? {
        height:  'screen'
    }:{
        height: '10vh',
        zIndex: 10
    }}

    transition={{
        ease: "easeInOut",
        duration:0.4,
        delay:0.1
    }}

    style={{
      opacity:opacityChange,
      scale:scaleChange,
      
// y:verticalChange
  
      
// background: 'linear-gradient(172deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 0) 100%)'
    }}
    className='flex justify-center  static   left-2 p-4 w-full h-auto  border rounded shadow-lg space-y-4 w-full h-screen  overflow-hidden text-slate-100'>

        <div className='flex flex-col w-10/12'>
          <div className='text-8xl border text-bold flex justify-end w-full mt-10 mb-16'>
            <div className='w-fit '>
                        #12
            </div>
       
      </div>

      <div className='c w-full '>
        <div>
            Attendees
        </div>

        <div className='mt-4'>
            <ul className="list-disc ml-5 space-y-1 flex text-xs">
                <li>Alice Johnson</li>
                <li>Benjamin Lee</li>
                <li>Carlos Martinez</li>
                <li>Diana Smith</li>
                <li>Emily Chen</li>
                <li>Faisal Khan</li>
                <li>Gabriela Ruiz</li>
                <li>Hiro Tanaka</li>
                <li>Isabella Rossi</li>
                <li>Jonah Brown</li>
            </ul>
        </div>

        <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, dignissimos tenetur, perspiciatis similique natus eos architecto dolorem officia in rerum veritatis! Minima, consectetur odio esse aliquam autem corporis impedit assumenda.
        </div>
      </div>

    
    <motion.div  className='w-full flex text-sm'>
        <div className='border-t-2 border-b mx-1 w-full py-3'>
            Meeting Moderator:
        </div>

        <div className='border-t-2 border-b mx-1 w-full py-3'>
            Lerin
        </div>
    </motion.div>

     <div className='w-full flex'>
        <div className='border-t-2 border-b mx-1 w-full pt-10 pb-1'>
            Meeting Moderator:
        </div>

        <div className='border-t-2 border-b mx-1 w-full pt-10 pb-1'>
            Lerin
        </div>
    </div>

      <div className='w-full flex'>
        <div className=' mx-1 w-full pt-2 pb-1'>
            Meeting Moderator:
        </div>

        <div className=' mx-1 w-full pt-2 pb-1'>
            Lerin
        </div>
    </div>

      
        </div>
      
    </motion.div>
  )
}

export default DocumentCard
