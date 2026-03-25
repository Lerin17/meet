import React from 'react'

interface NavbarItem {
  label: string;
  href: string;
  name: string;
}

const NavbarItems = (props:NavbarItem) => {
  return (
    <div className='px-3 text-black font-helvetica font-xs'>
        {props.name} 
    </div>
  )
}

export default NavbarItems
