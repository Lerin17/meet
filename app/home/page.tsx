"use client";

import { useHomeContext } from "@/Context/HomeContext";
import { UnitItemMockArray } from "@/Utility/MockData";
import React, { use } from "react";
import Tiptap from "../Components/home/editor/Tiptap";
import MetaInfo from "../Components/home/MetaInfo";
import UnitInfo from "../Components/UnitInfo";

import { Box } from "@mui/material";
import { Drawer } from "@mui/material";
import DocumentCard from "../Components/home/DocumentCard";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { pre } from "framer-motion/client";
import { on } from "events";
import DocumentComponent from "../Components/home/Document";
import ProgressAnimation from "../Components/LottieFiles/loadbar";

export type UnitItemProps = {
  id: string;
  description?: string;
  updatedAt?: string;
};

const UnitItemComponent = (UnitItem: UnitItemProps) => {
  return (
    <div>
      <h3 className="font-bold mt-2">{UnitItem.id}</h3>
      <p>{UnitItem.description}</p>
      <p className="text-gray-500 text-xs">{UnitItem.updatedAt}</p>
    </div>
  );
};
const page = () => {
  const {
    showKeypoints,
    showSummary,
    setShowKeypoints,
    setShowSummary,
    setVirtualScrollValue,
    virtualScrollValue,
    progressX,
    showUnitInfo,
  } = useHomeContext();

  const progress = virtualScrollValue / 400;

  const gradient = useTransform(
    progressX,
    [0, 600, 2400],
    [
      `linear-gradient(
      to bottom,
      rgba(8, 20, 55, 1) 0%,
      rgba(12, 32, 85, 1) 40%,
      rgba(18, 52, 130, 1) 70%,
      rgba(20, 60, 150, 0.95) 82%,
      rgba(22, 70, 165, 0.8) 88%,
      rgba(24, 82, 185, 0.55) 93%,
      rgba(26, 95, 200, 0.3) 97%,
      rgba(28, 110, 215, 0.12) 99%,
      rgba(28, 110, 215, 0) 100%
    )`,
      `linear-gradient(
      to bottom,
      rgba(212, 154, 21, 1) 0%,
      rgba(75, 187, 27, 1) 40%,
      rgba(18, 52, 130, 1) 70%,
      rgba(20, 60, 150, 0.95) 82%,
      rgba(22, 70, 165, 0.8) 88%,
      rgba(24, 82, 185, 0.55) 93%,
      rgba(26, 95, 200, 0.3) 97%,
      rgba(28, 110, 215, 0.12) 99%,
      rgba(28, 110, 215, 0) 100%
    )`,
      `linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    )`,
    ]
  );
  // MotionValue<number>

  console.log(progressX, "xeexee111");

  const opacityChange = useTransform(progressX, [0, 2400], [1, 0.4]);

  React.useEffect(() => {
    if (virtualScrollValue == 0) {
      return;
    } else {
      progressX.set(virtualScrollValue);
    }
  }, [virtualScrollValue]);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [iscard, setisCard] = React.useState(true);

  // React.useEffect(() => {

  //   return () => window.removeEventListener('wheel', handleWheel);
  // }, []);
  console.log(window.screenY, "exex");

  React.useEffect(() => {
    // if( iscard === false){
    //   document.body.style.overflow = "auto";
    //   return
    // }

    if (virtualScrollValue >= 2400 || iscard === false) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleWheel);
    };
  }, [virtualScrollValue]);

  const handleWheel = (e: WheelEvent) => {
    if (virtualScrollValue >= 2400) {
      if (iscard === true) {
        setisCard(false);
      }
      return;
    }
    // e.preventDefault();
    const delta = e.deltaY;

    // console.log(delta, "delta");
    setVirtualScrollValue((prev) => {
      const next = prev + delta;

      console.log(next, "next");

      console.log(virtualScrollValue, "progresscxx");

      console.log(Math.max(0, Math.min(next, 2400)), "exex");

      return Math.max(0, Math.min(next, 2400));
    });
  };

  window.addEventListener("wheel", handleWheel, { passive: false });

  return (
    <motion.div
      className={`    bg-gradient-to-b from-sky-700 to-white     </li>
 text-black relative `}
    >


     
      {/* CARD */}

      {/* <motion.div
        className="border-4"
          style={{
            background: gradient,
          }}
        >
          {<DocumentCard />}
        </motion.div> */}
      {/* CARD */}

      {/* <div onClick={() => setDrawerOpen(true)} className="">
        Drawer Button Test
      </div> */}

      {/* Drawer */}
      <div>
        <Drawer
          key={"Drawer"}
          onClick={(e: React.MouseEvent) => {}}
          className="border"
          anchor="left"
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
        >
          <div
            key={"DrawerContent"}
            className="w-full h-full p-4 bg-gray-900 text-white"
          >
            P15 Details
            <button
              onClick={() => {
                console.log("closexexe");
              }}
            >
              Close
            </button>
            <div>close drawer by clicking outside</div>
          </div>
        </Drawer>
      </div>
      {/* Drawer */}

      <motion.div className="items-center h-screen w-full flex flex-col ">
        <div className=" w-full flex justify-center ">
          <MetaInfo />
        </div>

        {/* <div className="border-b justify-start w-10/12 flex mt-4">
          <div
            onClick={() => setShowSummary(true)}
            className="px-2 cursor-pointer hover:bg-gray-800"
          >
            Summary
          </div>

          <div
            onClick={() => setShowSummary(false)}
            className="px-2 cursor-pointer hover:bg-gray-800"
          >
            Document
          </div>
        </div> */}

        {showSummary ? (
          <div
            key={"Summary Body"}
            className="w-10/12 mt-4 p-4  sm:flex-col md:flex-col lg:flex-row lg:flex gap-4 justify-between "
          >

        

            <div className="lg:w-8/12 md:w-full sm:w-full flex flex-col xs:mt-10 lg:mt-0 md:mt-0  md:text-xs lg:text-base sm:text-xs text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              laboriosam optio beatae culpa, praesentium nihil doloribus iure
              fuga reprehenderit aspernatur, cumque ea, corporis possimus ipsum
              ipsa quas omnis incidunt consequuntur! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Illum laboriosam optio beatae culpa,
              praesentium nihil doloribus iure fuga reprehenderit aspernatur,
              cumque ea, corporis possimus ipsum ipsa quas omnis incidunt
              consequuntur! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Illum laboriosam optio beatae culpa, praesentium nihil
              doloribus iure fuga reprehenderit aspernatur, cumque ea, corporis
              possimus ipsum ipsa quas omnis incidunt consequuntur!
            </div>

            <div
              className="lg:w-6/12 md:w-full sm:w-full  sm:text-xs text-xs sm:mt-10 mt-10 xs:mt-10 lg:mt-0 md:mt-0  md:text-xs lg:text-base "
              key={"Key Points"}
            >
              <div className="flex " key={"Summary Navbar"}>
                <div
                  onClick={() => {
                    setShowKeypoints(true);
                  }}
                  className={`px-1 cursor-pointer hover:bg-gray-700 ${
                    showKeypoints ? "font-bold" : ""
                  }`}
                >
                  Key Points
                </div>

                <div
                  onClick={() => {
                    setShowKeypoints(false);
                  }}
                  className={`px-1 cursor-pointer hover:bg-gray-700 ${
                    !showKeypoints ? "font-bold" : ""
                  }`}
                >
                  Unit Updates
                </div>
              </div>

              {showKeypoints ? (
                <div>
                  <ol className="list-decimal ml-6 space-y-2  ">
                    <li>
                      Meeting summary: reviewed project status and key
                      deliverables.
                    </li>
                    <li>
                      Decisions: prioritize Feature A for next release and
                      freeze scope for v1.0.
                    </li>
                    <li>
                      Action items:
                      <ol className="list-decimal ml-6">
                        <li>
                          Alex — draft spec for Feature A (due 2025-12-08)
                        </li>
                        <li>
                          Maya — update release timeLineData (due 2025-12-10)
                        </li>
                        <li>
                          Jordan — set up test environment and QA plan (due
                          2025-12-12)
                        </li>
                      </ol>
                    </li>
                    <li>
                      Risks / blockers: potential API dependency delay; evaluate
                      fallback options.
                    </li>
                    <li>
                      Milestones: Beta by 2025-12-20; Release candidate by
                      2026-01-05.
                    </li>
                    <li>
                      Dependencies: confirm third-party integrations and
                      allocate QA resources.
                    </li>
                    <li>
                      Follow-ups: schedule 30-minute check-in next week (owner:
                      Lerin).
                    </li>
                    <li>
                      Documentation: share meeting minutes and recording with
                      stakeholders (owner: Recorder).
                    </li>
                  </ol>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col mt-2">
                    {UnitItemMockArray.map((item: UnitItemProps) => (
                      <UnitItemComponent
                        id={item.id}
                        description={item.description}
                        updatedAt={item.updatedAt}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-10/12  ">
            {/* <div className="flex w-full ">
              <div className="px-2 mx-1">
                ALL
              </div>

              <div className="px-2 mx-1" >
                SVG
              </div>

              <div className="px-2 mx-1">
                CITY VIEW
              </div>

              <div className="px-2 mx-1">
                SVH
              </div>
            </div> */}
            <div
              key={"Document Body"}
              className="    sm:flex-col md:flex-col lg:flex-row lg:flex gap-4 justify-between  "
            >
              {/* <div>
                nav
            </div> */}

              <div className="lg:w-8/12 md:w-8/12 sm:w-full w-full  ">
                <div className="border-b text-stone-100">(001)</div>

                {/* <Tiptap /> */}

                <div className=" relative">
                  {/* <div className="bg-gradient-to-t from-white to-stone-100 absolute bottom-0 z-20 w-full">
                    xxe
                  </div> */}
                  <DocumentComponent />
                </div>
              </div>

              <div className="w-4/12 flex">
              {/* start of first loader */}
              {/* <motion.div
              className=" overflow-hidden"
              animate = {showUnitInfo ? {
                display:'none '
              }:{
                display: 'block'
              }}

              transition={showUnitInfo ?{
                delay:1
              }:{
                delay:1
              }}
              >

              

                <motion.div
                  className=""
                  initial={{
                    x:0
                  }}
                  animate={
                    showUnitInfo ? {
                      opacity: '0%',
                      x: 100,
                      // scaleX:'75%'
                    }:{
                      opacity:'100%',
                      x:0
                    }

                    
                  }

                  transition={{
                    ease:'easeInOut',
                    delay:3
                  }}
                >
                  <UnitInfo />
                </motion.div>
              </motion.div> */}
              {/* end of first loader */}

              {/* second One */}
          <motion.div
              className=" overflow-hidden"
              animate = {showUnitInfo ? {
                display:'none '
              }:{
                display: 'block'
              }}

              transition={{
                delay:0.5
              }}
              >

              

                <motion.div
                  className=""
                  initial={{
                    x:0
                  }}
                  animate={
                    showUnitInfo ? {
                      opacity: '0%',
                      x: 100,
                      // scaleX:'75%'
                    }:{
                      opacity:'100%',
                      x:0
                    }

                  }

                  transition={{
                    ease:'easeInOut'
                  }}
                >
                  <UnitInfo />
                </motion.div>
              </motion.div>
              </div>
              
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default page;
