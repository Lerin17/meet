"use client";

import React from "react";
import NavbarItems from "./NavbarItems";
import { useUtilityContext } from "@/Context/UtilityContext";
import { route } from "sanity/router";

const Nav = () => {
  const {
    componentScrollY,
    routePath,
    routeMeta,
    routeHistory,
    goBack,
    goForward,
    navigate,
  } = useUtilityContext();

  // const isDisplayNav = routePath === '/homepage' ? true
  // : routePath === '/HouseUnit' &&  ? true : false

  return (
    <div
      className={`w-full bg-white fixed top-0 left-0 z-50 flex flex-col ${routePath === "/HouseUnit" ? "items-start border-b border-transparent" : "items-center border-black border-b"}  justify-center`}
      style={{
        height: `${componentScrollY < 10 && routePath === "/homepage" ? 65 : 40}px`,
        transition: "height 0.25s ease-in-out",
          borderImage: routePath === "/HouseUnit" ? "linear-gradient(90deg, black 50%, white 50%) 1" : undefined
      }}
    >
      {/* Optional Info and Functionality */}
      {/* <div className='text-xs text-gray-500 absolute left-4 top-2'>Route: {routePath}</div>
    <div className='text-[10px] text-gray-500 absolute left-4 top-5'>{routeMeta.title}{routeMeta.subtitle ? ` · ${routeMeta.subtitle}` : ""}</div>
    <div className='text-[10px] text-gray-500 absolute left-4 top-8'>History: {routeHistory.slice(-3).join(' → ')}</div>
    <div className='absolute right-4 top-2 flex gap-1'>
      <button onClick={goBack} className='px-2 py-1 text-[10px] border rounded'>Back</button>
      <button onClick={goForward} className='px-2 py-1 text-[10px] border rounded'>Fwd</button>
    </div> */}
      {/* Optional Info and Functionality */}

      <div
        className={`${routePath === "/HouseUnit" ? "w-1/2" : "w-full"}   flex justify-center `}
      >
        <div>
          <NavbarItems name="Home" href="home/" label="home bottom" />
        </div>

        <div>
          <NavbarItems name="Gallery" href="home/" label="home bottom" />
        </div>

        <div>
          <NavbarItems name="Map" href="home/" label="home bottom" />
        </div>

        <div>
          <NavbarItems name="About" href="home/" label="home bottom" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
