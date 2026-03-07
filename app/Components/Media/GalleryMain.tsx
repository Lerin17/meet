"use client";

import React from 'react'
import BufferAnimation from '../LottieFiles/Bufferloader';

import Masonry from "react-masonry-css";
import Image from "next/image";

// MUI imports
import { Drawer, SwipeableDrawer, Button, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};
const GalleryMain = () => {

    const [loadertimeout, setloadertimeout] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    React.useEffect(() => {
        
            setTimeout(() => {
                if(!loadertimeout){
                    console.log("timeout triggered")
                    setloadertimeout(true);
                }
            }, 800)

    return () => setloadertimeout(false);
    }, [loadertimeout]);

   
  return (
    <div className='w-full h-full'>
        <button className='bg-black w-20 h-20 flex items-center justify-center shadow-md cursor-pointer rounded-full'  onClick={toggleDrawer} style={{ position: 'fixed', top: 40, left: 10, zIndex: 1000 }}>
            <svg className='fill-current text-white' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7zm-3-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm3 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm3 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>
        </button>

        {isMobile ? (
            <SwipeableDrawer
                anchor="bottom"
                open={drawerOpen}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
            >
                <div style={{ height: '200px', padding: '20px' }}>
                    <h2>Bottom Drawer Content</h2>
                    <p>This is the mobile bottom drawer.</p>
                </div>
            </SwipeableDrawer>
        ) : (
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
            >
                <div className='text-black' style={{ width: '500px', padding: '20px' }}>
                   
                        <div className='font-milligram'>
                            Filter Assets
                        </div>

                      <div className='flex w-full justify-between'>
                        <div>
                        Projects
                        </div>

                        <div>
                            All
                        </div>

                         <div>
                        Markerting
                        </div>
                    </div>

                    <div className='mt-10'>
                        <div
                        className='font-milligram text-xl'
                        >Search</div>
                        <input type="text" placeholder="Search..." className="w-full p-2.5 mb-3 border-b border-gray-300" />

                        <div className='italic text-blue-400'>
                            suggestions
                        </div>
                    </div>
                    


                    <div className='mt-10 border-b border-gray-300 '>
                         <div>Sort</div>
                    
                    <Accordion>
                        <AccordionSummary expandIcon={<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>}>
                            <Typography>Projects</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {['Estate 1', 'Estate 2', 'Estate 3', 'Estate 4', 'Estate 5'].map((estate) => (
                                    <ListItem key={estate} disablePadding>
                                        <ListItemButton onClick={() => console.log(estate)}>
                                            <Typography>{estate}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    </div>
                   
                    
                  


                    <div className='mt-10' >
                        Packs
                    </div>

                </div>
            </Drawer>
        )}


    {/* BUFFER ANIMATION IS DISPLAYED GOR 0.9 SECS AND THEN THE GALLERY IS DISPLAYED. THIS IS TO PREVENT THE GALLERY FROM BEING DISPLAYED BEFORE THE IMAGES ARE LOADED. */}

{/* 
    <div className={`  ${!loadertimeout ? 'block w-full h-full  flex items-top justify-center' : 'hidden'}`}>
       <BufferAnimation/>
    </div> */}

     {/* BUFFER ANIMATION IS DISPLAYED GOR 0.9 SECS AND THEN THE GALLERY IS DISPLAYED. THIS IS TO PREVENT THE GALLERY FROM BEING DISPLAYED BEFORE THE IMAGES ARE LOADED. */}

<div className={` ${loadertimeout ? 'block w-full h-full  flex items-top justify-center' : 'block'}`}>
<Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-4"
      columnClassName="flex flex-col gap-4"
    >
      {["https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif", "https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif", "https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif","https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif", "https://res.cloudinary.com/dxjys4qpi/image/upload/v1758505279/Lerin%27s%20Portfolio/Client%202/awolhfzkyhzjuhvfb4xp_kjtrph.avif" ,"https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif", "https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif", "https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif","https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif","https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif", "https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif", "https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif","https://res.cloudinary.com/dxjys4qpi/image/upload/v1757757697/Lerin%27s%20Portfolio/Client%204%20%28Apo%20Drive%29/MIN/LIGHT_1_lo7lte_tbthzk.avif"].map((src, i) => (
        <div key={i} className="relative w-full">
          <Image src={src} alt="" width={500} height={600} className="rounded-sm" />
        </div>
      ))}
    </Masonry>
</div>
     
    </div>
  )
}

export default GalleryMain
