'use client'

import React from 'react'


interface ButtonProps {
    text:string,
    color:'red' | 'blue' | 'green' | 'yellow',
    onClick: () => void
    className?: string
    isActive?: boolean
    size?: 'small' | 'medium' | 'large'
}

export const BUTTON = (props: ButtonProps) => {
  return (
    <div className={` ${props.className} ${props.color === 'blue' ? 'bg-blue-600' : props.color === 'red' ? 'gradientred' : props.color === 'green' ? 'bg-green-300' : 'bg-yellow-300'} h-[29px] px-4 py-2 flex items-center justify-center mx-2 uppercase font-helvetica font-bold`} onClick={()=>props.onClick()}>
      {props.text}
    </div>
  )
}

export const BUTTON2 = (props: ButtonProps) => {
    return ( <div className={` ${props.className} ${props.color === 'blue' ? 'bg-blue-600' : props.color === 'red' ? 'gradientred' : props.color === 'green' ? 'bg-green-300' : 'bg-yellow-300'} ${props.isActive ? 'border-b-2 border-black' : ''} h-[29px] px-4 py-2 flex items-center justify-center mx-2 uppercase font-helvetica font-bold cursor-pointer text-3xl`} onClick={()=>props.onClick()}>
      {props.text}
    </div>)
}
