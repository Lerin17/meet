'use client'

import {client} from '../lib/sanity';

import { useMotionValue } from "framer-motion";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Unit } from './UnitContext';

type HomeContextValue = {
    // true = show keypoints, false = show unit updates
    showKeypoints: boolean;
    setShowKeypoints: (v: boolean) => void;
    toggleKeypoints: () => void;

    // true = show summary, false = show document
    showSummary: boolean;
    setShowSummary: (v: boolean) => void;
    toggleSummary: () => void;

    scrollValue: number ;
    setscrollValue: (v: number) => void;

    virtualScrollValue: number;
    setVirtualScrollValue:React.Dispatch<React.SetStateAction<number>>
    progressX: any

    showUnitInfo:boolean
    setshowUnitInfo: React.Dispatch<React.SetStateAction<boolean>>

    // Array for current and new unit items displayed in UnitInfo
    currentUnitItems: [Unit | null, Unit | null];
    setCurrentUnitItems: React.Dispatch<React.SetStateAction<[any, any]>>
};

const HomeContext = createContext<HomeContextValue | undefined>(undefined);

export function HomeProvider({ children }: { children: ReactNode }) {
    const [showKeypoints, setShowKeypoints] = useState<boolean>(true);
    const [showSummary, setShowSummary] = useState<boolean>(false);
    const [scrollValue, setscrollValue] = useState <number>(0);
    const [virtualScrollValue, setVirtualScrollValue] = React.useState<number>(0);
    const [showUnitInfo, setshowUnitInfo] = React.useState<boolean>(false);

    const [openUnitMenu, setopenUnitMenu] = useState<boolean>(false);

    const [currentUnitItems, setCurrentUnitItems] = useState<[any | null, any | null]>([null, null]);
   
    const red = async () => {
const data = await client.fetch(`*[_type == "post"]`)
console.log('Fetched posts in HouseUnitProvider: Sanity Data', data)
}

red()


     const progressX = useMotionValue(0);

    const toggleKeypoints = () => setShowKeypoints((s) => !s);
    const toggleSummary = () => setShowSummary((s) => !s);

    return (
        <HomeContext.Provider
            value={{
                showKeypoints,
                setShowKeypoints,
                toggleKeypoints,
                showSummary,
                setShowSummary,
                toggleSummary,
                scrollValue,
                setscrollValue,
                virtualScrollValue, 
                setVirtualScrollValue,
                 progressX,
                 showUnitInfo,
                 setshowUnitInfo,
                 currentUnitItems,
                 setCurrentUnitItems
            }}
        >
            {children}
        </HomeContext.Provider>
    );
}

export function useHomeContext(): HomeContextValue {
    const ctx = useContext(HomeContext);
    if (!ctx) {
        throw new Error("useHomeContext must be used within a HomeProvider");
    }
    return ctx;
}