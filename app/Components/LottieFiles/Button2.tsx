import React from 'react'
import Button1 from './Button'

interface Button2Props {
  text?: string;
}

const Button2 = ({ text }: Button2Props) => {
  return (
    <div className='flex relative justify-center items-center cursor-pointer h-[72px] w-full'>
        <div
      style={{
        color:'#0071BC'
      }}
      className='absolute z-10  text-[0071BC] font-archivo font-medium text-md'>
        {text || 'Input'}
      </div>
      <Button1 progress={50} />

    </div>
  )

}

export default Button2
