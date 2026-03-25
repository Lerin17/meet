import React from 'react'
import NavbarItems from './NavbarItems'

const Nav = () => {
  return (
  <div className='w-full bg-white fixed  top-0 left-0 z-50  flex items-center justify-center border-b border-black h-[65px]'>
      
      <div className='  w-full flex justify-center'>
        <div>
          <NavbarItems
          name='Home'
          href='home/'
          label='home bottom'
          />
        </div>


        <div>
          <NavbarItems
          name='Gallery'
          href='home/'
          label='home bottom'
          />
        </div>


        <div>
          <NavbarItems
          name='Map'
          href='home/'
          label='home bottom'
          />
        </div>

        <div>
          <NavbarItems
          name='About'
          href='home/'
          label='home bottom'
          />
        </div>
      </div>


      </div>
  )
}

export default Nav
