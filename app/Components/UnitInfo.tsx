import { useHomeContext } from '@/Context/HomeContext'
import React from 'react'


const UnitInfo = () => {

const {} = useHomeContext()

const Title = () => {
    return (
<div className="text-xl font-bold  text-white">
            Updates
        </div>
    )
}

const TopText = () => {
    return (

        <div className='text-gray-100 font-bold'>
            <div className='flex items-end'>
                <div className="text-4xl font-bold">
            J91
          </div>
          <div className='px-1 pb-1'>
            A&B
          </div>
                
            </div>

            <div>
                <div>
                    Currently Funded for First Floor Block Work
                </div>

                <div>
                    First Floor Block Work at 50%
                </div>
            </div>

        </div>
    )
}

const Sequence = () => {
    return (
         <div className='flex flex-col '>
            
            <div className='text-sm text-sky-700 py-2 italic'>
                last three actions
            </div>
            <div className='w-10/12 ml-3 mt-2 text-stone-800'>
            *
              <span className='font-bold text-sm 0'>
                Engr Kenah
                </span> was tasked with conducting an inspection on the newly installed chambers
            </div>

            <div className=' ml-6 mt-2 text-stone-700'>
                *
                The First floor block was completed as of 12th Decemeber
            </div>

            <div className=' ml-10 mt-2 text-stone-500'>
                *
                  The First floor block was completed as of 12th Decemeber
            </div>
        </div>
    )
}

  return (
<div className=" justify-between hidden sm:block">

    <div className="flex flex-col justify-between w-full border-b">
        
        <div className='border-b border-stone-300'>
            <Title/>
        </div>

        
<div className='mt-4'>
<TopText/>
</div>
    

<div className='mt-4 border-t'>
<Sequence/>
</div>


       


        <div className='mt-10 border-t'>
            <div className='bg-green-400 w-full'>
            Line Bar
        </div>
            <div>
                                Total time in rotation:
            </div>

            <div>
                Seqeunce Data
            </div>
        </div>

   
    </div>

  
</div>
  )
}


const UnitInfoFormat = <div className="w-4/12 justify-between hidden sm:block">

    <div className="flex justify-between w-full border-b">
        <div className="text-3xl font-bold">
            P15
        </div>

        <div className="text-xs">
            6 units
        </div>
    </div>

    <div className="w-full flex">
        <div className="bg-gray-800 rounded mx-2">
            Timeline
        </div>
        <div className="bg-gray-800 rounded mx-2">
            Timeline
        </div>
        <div className="bg-gray-800 rounded mx-2">
            Timeline
        </div>
    </div>

    <div className="mt-4">
        <div>
            Completed: 70%
        </div>

        <div>
            Actions: Last edit 2 days ago
        </div>

        <div>
            Supervisor: Engr Tobi
        </div>
    </div>

</div>
export default UnitInfo
