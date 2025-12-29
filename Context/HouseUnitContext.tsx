import React, { createContext, useContext, useState, ReactNode } from 'react';
import {client} from '../lib/sanity';

export type HouseType = 'apartment' | 'house' | 'condo' | 'townhouse';

 interface IFloor {
    FloorLevel: 'groundfloor'|'firstfloor'|'secondfloor' | 'thirdfloor'
    NoofBedroom:number
    FloorArea:number
    NoofWindows?:number
    NoofDoors?:number,
    Bedrooms:IBedroom[]
 }

interface IBedroom {
    BedroomTitle:string,
    FloorArea:number,
    NoofWindows:number,
    NoBathroom:number
}

interface IAsset {
    url:string,
    type:string,
    alt?:string
}

 const getNumberofBedrooms = () => {
    return (
        4
    )
 }

 const HouseInverntoryArray = ['4 bedroom Detached Duplex', '3 Bedroom Terrace Duplex', '2 Bedroom Detached Duplex']

export interface IHouseType {
    HouseName:string,
    NoBedrooms:number,
    NoGuestBedrooms:number,
    Maidroom:boolean,
    floors:IFloor[],
    assets:IAsset[],
    CodeName:string
    
}

// Default set of houses to seed contexts or UI lists
export const defaultHouses: IHouseType[] = [
    {
        HouseName: '4 Bedroom Detached Duplex',
        NoBedrooms: 4,
        NoGuestBedrooms: 1,
        Maidroom: true,
        CodeName: 'DD4B',
        floors: [
            { 
                FloorLevel: 'groundfloor', 
                NoofBedroom: 2, 
                FloorArea: 900, 
                NoofWindows: 4, 
                NoofDoors: 2,
                Bedrooms: [
                    { BedroomTitle: 'Master Bedroom', FloorArea: 250, NoofWindows: 2, NoBathroom: 1 },
                    { BedroomTitle: 'Guest Bedroom', FloorArea: 180, NoofWindows: 1, NoBathroom: 1 },
                ]
            },
            { 
                FloorLevel: 'firstfloor', 
                NoofBedroom: 2, 
                FloorArea: 850, 
                NoofWindows: 3, 
                NoofDoors: 1,
                Bedrooms: [
                    { BedroomTitle: 'Bedroom 3', FloorArea: 200, NoofWindows: 1, NoBathroom: 1 },
                    { BedroomTitle: 'Bedroom 4', FloorArea: 190, NoofWindows: 1, NoBathroom: 1 },
                ]
            },
        ],
        assets: [
            { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', type: 'image', alt: 'Modern detached duplex exterior' },
            { url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop', type: 'image', alt: 'Spacious living room interior' },
            { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop', type: 'image', alt: 'Luxury kitchen with island' },
        ],
    },
    {
        HouseName: '3 Bedroom Terrace Duplex',
        NoBedrooms: 3,
        NoGuestBedrooms: 0,
        Maidroom: false,
        CodeName: 'TD3B',
        floors: [
            { 
                FloorLevel: 'groundfloor', 
                NoofBedroom: 2, 
                FloorArea: 700, 
                NoofWindows: 3,
                Bedrooms: [
                    { BedroomTitle: 'Master Bedroom', FloorArea: 220, NoofWindows: 2, NoBathroom: 1 },
                    { BedroomTitle: 'Bedroom 2', FloorArea: 160, NoofWindows: 1, NoBathroom: 1 },
                ]
            },
            { 
                FloorLevel: 'firstfloor', 
                NoofBedroom: 1, 
                FloorArea: 500, 
                NoofWindows: 2,
                Bedrooms: [
                    { BedroomTitle: 'Bedroom 3', FloorArea: 180, NoofWindows: 1, NoBathroom: 1 },
                ]
            },
        ],
        assets: [
            { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', type: 'image', alt: 'Terrace duplex facade' },
            { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop', type: 'image', alt: 'Cozy bedroom interior' },
        ],
    },
    {
        HouseName: '2 Bedroom Apartment',
        NoBedrooms: 2,
        NoGuestBedrooms: 0,
        Maidroom: false,
        CodeName: 'AP2B',
        floors: [
            { 
                FloorLevel: 'groundfloor', 
                NoofBedroom: 1, 
                FloorArea: 450, 
                NoofWindows: 2,
                Bedrooms: [
                    { BedroomTitle: 'Master Bedroom', FloorArea: 200, NoofWindows: 1, NoBathroom: 1 },
                ]
            },
            { 
                FloorLevel: 'firstfloor', 
                NoofBedroom: 1, 
                FloorArea: 420, 
                NoofWindows: 1,
                Bedrooms: [
                    { BedroomTitle: 'Bedroom 2', FloorArea: 170, NoofWindows: 1, NoBathroom: 1 },
                ]
            },
        ],
        assets: [
            { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop', type: 'image', alt: 'Modern apartment living space' },
            { url: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4e1?w=800&h=600&fit=crop', type: 'image', alt: 'Apartment bedroom' },
        ],
    },
];

interface HouseUnitContextType {
    houseType: HouseType;
    setHouseType: (type: HouseType) => void;

}



const HouseUnitContext = createContext<HouseUnitContextType | undefined>(undefined);

export const HouseUnitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [houseType, setHouseType] = useState<HouseType>('house');



    return (
        <HouseUnitContext.Provider value={{ houseType, setHouseType }}>
            {children}
        </HouseUnitContext.Provider>
    );
};

export const useHouseUnit = () => {
    const context = useContext(HouseUnitContext);
    if (!context) {
        throw new Error('useHouseUnit must be used within HouseUnitProvider');
    }
    return context;
};