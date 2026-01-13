"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { IHouseType, defaultHouses } from "./HouseUnitContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { u } from "framer-motion/client";
import { db } from "@/lib/firebase";
import { get } from "http";
import { number } from "framer-motion";

interface IpreviousweeklyStates {
    week:string,
    phaseName:string,
    statusSummary:string,
    progressPercentage:number
    comments:string[]
}

interface Ihouses {
  houseCode:string,
  buildingType:string,
  lastAction:string,
  currentProgress:number
  phase:string
  percentComplete:number
  isCompleted:boolean
  deliveryStop: string
}

interface UnitInventory {
    UnitOrder:'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G '| 'H' | 'I'| 'J',
    Unittype:IHouseType
}

interface IUnit {
  unitId: string,
  legacy?: {
    source: 'manual' | 'imported',
    ingestionDate?: string,
    confidence:'high' | 'medium' | 'low'
  },
  dataQuality?: {
    missingFields: string[],
  },
  excludedDates: string[],
  requiresReview: boolean,
  notes?: string[],

  identity: {
    name: string,
    buildingType: [
      {
        code:'J',
        label:'3_Bedroom_terrace_duplex'
      }
    ],

    numberOfBedrooms: number,
    location: {
      city: string,
      district: string,
      estate: string,
      axis: string,
    }
  },

  state: {
    currentPhase: 'Foundation' | 'DPC' | 'Ground_Floor' | 'First_Floor' | 'Roofing' | 'Finishing' | 'Completed' | 'Handover',
    constructionStatus: string,
    occupancyStatus: string,
    lastUpdated: string,
    progress: {
      Description: string,
      ProgressValue: number,
      overallProgressPercentage: number,
    },
    deliveryStop:string,
    isCompleted: boolean,
    fundedStatus: 'funded' | 'not_funded' | 'partially_funded',
    lastUpdatedAt: string,
    nextMilestone: {
      milestoneName: string,
      expectedCompletionDate: string | null,
    },

    previousStates: IpreviousweeklyStates[]

    team: {
      supervisingEngineer: string,
      projectManager: string,
      siteSupervisor?: string,
      contractor: string,
    }
  }


  houses: Ihouses[];

  events:[],

  risks:Irisks[],


}


interface Irisks {
  level: 'low' | 'medium' | 'high',
  type: string,
  note: string,
  dateIdentified?: string,
}

const Phases = [
  'Foundation',
  'DPC',]


export type Unit = {
  id: string;
  unitNumber: string;
  address: string;
  areaSqFt: number;
  status: "available" | "occupied" | "maintenance" | any;
  price: number;
  images?: string[];
  inventory:Iinventory[],


};

interface IUnitTimeLine  {
    date:string,
    currentAction:string,
    context: string
}

type UnitContextStatus = {
    currentStatus:string,
    fundedStatus:string,
    timeLine:any
    teamComments?:string[]
}

interface IHousestatus {
    currentStatus:string,
    timeLine:IUnitTimeLine[]
}

type TUnittype = IHouseType & IHousestatus

interface Iinventory {
    UnitOrder:'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G '| 'H' | 'I'| 'J',
    Unittype:TUnittype
}

type UnitContextType = {
  units: Unit[];
  addUnit: (u: Unit) => void;
  updateUnit: (id: string, patch: Partial<Unit>) => void;
  removeUnit: (id: string) => void;
  getUnit: (id: string) => Unit | undefined;
};

const STORAGE_KEY = "units_data";

const UnitContext = createContext<UnitContextType | undefined>(undefined);

// helper: represent timeline as week numbers (string).
// `date` will contain the week number in the year (e.g. "32").
const getWeekNumber = (d: Date): number => {
  const start = new Date(d.getFullYear(), 0, 1);
  const diff = d.getTime() - start.getTime();
  const day = Math.floor(diff / (24 * 60 * 60 * 1000));
  return Math.ceil((day + 1) / 7);
};



const createUnitTimeLine = (unitName:string) => {

const getUnit: Unit | undefined = defaultUnits.find(item => item.id === unitName)

if(!getUnit ){
    return []
}

  const TimeLineArray = getUnit.inventory.map(item => ({
    Id: item.UnitOrder,
    sequence: [

    ]
  }))

  return TimeLineArray
}

interface  Isequence {
currentActions:string[],
currentActionStatus:string,
context:string,
teamComments:string[]
}

interface Itimeline {
    unitName:'J39',
    sequence:Isequence[]
}

const Data = {
    'J3A':{
        sequence:[
        {
        currentActions:['funded for gableblock and scaffolding'],
        currentActionStatus:'Scaffolding is complete, gable block work is ongoing, at 90%',
        date:'32',
        context:'',
        teamComments:['Qs Kola mentioned the scaffolding job was delayed due to weather']
    },
     {
        currentActions:['funded for gableblock and scaffolding'],
        currentActionStatus:'Scaffolding is complete, gable block work is ongoing, at 90%',
        date:'31',
        context:'',
        teamComments:['Qs Kola mentioned the scaffolding job was delayed due to weather']
    }
        ]
    }
}

// const timeLine =[
//      'JS',
    
// ]

const generateTimeline = (entries = 4): IUnitTimeLine[] => {
  const now = new Date();
  const currentWeek = getWeekNumber(now);
  return Array.from({ length: entries }).map((_, i) => {
    let week = currentWeek - i;
    if (week < 1) {
      week = 52 + week; // wrap to previous year (simple approximation)
    }
    return { date: String(week), currentAction: '', context: '' };
  });
};

console.log("Generated timeline:", generateTimeline(4));

const J91:Unit =  {
    id: "u-1",
    images: [],
    unitNumber: "J19",
    address: "SVG, Road 3",
    areaSqFt: 850,
    status: "available",
    price: 1500,
    inventory: [
      { UnitOrder: 'A', Unittype: { ...defaultHouses[0], currentStatus: "available", timeLine: generateTimeline(4) } },
      { UnitOrder: 'B', Unittype: { ...defaultHouses[1], currentStatus: "available", timeLine: generateTimeline(3) } },
      { UnitOrder: 'C', Unittype: { ...defaultHouses[2], currentStatus: "available", timeLine: generateTimeline(2) } },
    ],
  }

const defaultUnits: Unit[] = [
  {
    id: "u-1",
    images: [],
    unitNumber: "J19",
    address: "SVG, Road 3",
    areaSqFt: 850,
    status: "available",
    price: 1500,
    inventory: [
      { UnitOrder: 'A', Unittype: { ...defaultHouses[0], currentStatus: "available", timeLine: generateTimeline(4) } },
      { UnitOrder: 'B', Unittype: { ...defaultHouses[1], currentStatus: "available", timeLine: generateTimeline(3) } },
      { UnitOrder: 'C', Unittype: { ...defaultHouses[2], currentStatus: "available", timeLine: generateTimeline(2) } },
    ],
  },  
  {
    id: "u-2",
    images: [],
    unitNumber: "102",
    address: "123 Main St, Springfield",
    areaSqFt: 1100,
    status: "occupied",
    price: 2100,
    inventory: [
      { UnitOrder: 'A', Unittype: { ...defaultHouses[1], currentStatus: "available", timeLine: generateTimeline(4) } },
      { UnitOrder: 'B', Unittype: { ...defaultHouses[2], currentStatus: "available", timeLine: generateTimeline(3) } },
      { UnitOrder: 'C', Unittype: { ...defaultHouses[0], currentStatus: "available", timeLine: generateTimeline(2) } },
      { UnitOrder: 'D', Unittype: { ...defaultHouses[1], currentStatus: "available", timeLine: generateTimeline(1) } },
    ],
  },
  {
    id: "u-3",
    unitNumber: "201",
    images: [],
    address: "456 Oak Ave, Springfield",
    areaSqFt: 600,
    status: "maintenance",
    price: 1100,
    inventory: [
      { UnitOrder: 'A', Unittype: { ...defaultHouses[2], currentStatus: "available", timeLine: generateTimeline(3) } },
      { UnitOrder: 'B', Unittype: { ...defaultHouses[0], currentStatus: "available", timeLine: generateTimeline(2) } },
    ],
  },
  {
    id: "u-4",
    unitNumber: "202",
    images: [],
    address: "456 Oak Ave, Springfield",
    areaSqFt: 900,
    status: "available",
    price: 1700,
    inventory: [
      { UnitOrder: 'A', Unittype: { ...defaultHouses[0], currentStatus: "available", timeLine: generateTimeline(5) } },
      { UnitOrder: 'B', Unittype: { ...defaultHouses[2], currentStatus: "available", timeLine: generateTimeline(4) } },
      { UnitOrder: 'C', Unittype: { ...defaultHouses[1], currentStatus: "available", timeLine: generateTimeline(3) } },
      { UnitOrder: 'D', Unittype: { ...defaultHouses[0], currentStatus: "available", timeLine: generateTimeline(2) } },
      { UnitOrder: 'E', Unittype: { ...defaultHouses[1], currentStatus: "available", timeLine: generateTimeline(1) } },
    ],
  },
  {
    id: "u-5",
    unitNumber: "301",
    images: [],
    address: "789 Pine Rd, Springfield",
    areaSqFt: 1500,
    status: "occupied",
    price: 3200,
    inventory: [
      { UnitOrder: 'A', Unittype: { ...defaultHouses[2], currentStatus: "available", timeLine: generateTimeline(3) } },
      { UnitOrder: 'B', Unittype: { ...defaultHouses[1], currentStatus: "available", timeLine: generateTimeline(2) } },
      { UnitOrder: 'C', Unittype: { ...defaultHouses[0], currentStatus: "available", timeLine: generateTimeline(1) } },
    ],
  },
  {
    id: "u-6",
    unitNumber: "302",
    images: [],
    address: "789 Pine Rd, Springfield",
    areaSqFt: 800,
    status: "available",
    price: 1400,
    inventory: [
      { UnitOrder: 'A', Unittype: { ...defaultHouses[0], currentStatus: "available", timeLine: generateTimeline(3) } },
      { UnitOrder: 'B', Unittype: { ...defaultHouses[2], currentStatus: "available", timeLine: generateTimeline(2) } },
    ],
  },
  
];

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [constTimeLineArray, setconstTimeLineArray] = React.useState([]);

const [UnitTimeLine, setUnitTimeLine] = React.useState<Itimeline[]>([]);

const [dynamicUnitData, setdynamicUnitData] = React.useState();

const [staticUnitData, setstaticUnitData] = React.useState();

const getUnitsFromFirestore = async () => {
  try {
    const q = query(collection(db, "Units"));
    const snapshot = await getDocs(q)

    const UnitData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


    console.log(UnitData, 'unitName')
    

  setUnits(UnitData as Unit[])    
    }
  
   catch (error) {
    console.error("Failed to fetch Units:", error);
    throw error;
  }

  }


useEffect( () => {
  console.log('cow')
getUnitsFromFirestore()


}, []);

const CastingofSlab = ['Installation of formwork', 'Placing of Reinforcement', 'FF:Placing of props for support', 'Pro']

const hashtag = 'location is superposition'


const Casting = [
  'Placing of Reinforcement',
  'Installation of formwork',
  'FF:Placing of props for support',
  'Pouring of Concrete',
  'Curing of Concrete'
]

 const PHASES = [
  {
    code: "FOUNDATION",
    label: "Foundation Phase",
    workItems: [
      "Setting_Out",
      "Excavation_Foundation_Trenches",
      "Excavation_Foundation_Trench_Buckets",
      "Blinding_Foundation_Trenches",
      "Foundation_Reinforcement_Installation",
      "Casting_Foundation_Columns",
      "Laying_Foundation_Blocks",
      "Level_Creation",
      "Compaction_and_Backfilling"
    ]
  },

  {
    code: "DPC",
    label: "DPC Phase",
    workItems: [
      "DPC_Reinforcement_Installation",
      "Casting_DPC_Slab"
    ]
  },

  {
    code: "GROUND_FLOOR",
    label: "Ground Floor Phase",
    workItems: [
      "Ground_Floor_Column_Reinforcement",
      "Ground_Floor_Formwork_Installation",
      "Casting_Ground_Floor_Columns",
      "Ground_Floor_Blockwork_to_Lintel",
      "Lintel_Reinforcement_and_Formwork",
      "Casting_Lintels"
    ]
  },

  {
    code: "FIRST_FLOOR",
    label: "First Floor Phase",
    workItems: [
      "First_Floor_Slab_Formwork_and_Supports",
      "First_Floor_Slab_Reinforcement",
      "Casting_First_Floor_Slab",
      "First_Floor_Blockwork_to_Lintel"
    ]
  },

  {
    code: "ROOFING",
    label: "Roofing Phase",
    workItems: [
      "Roof_Carpentry_Works",
      "Roof_Covering_Installation"
    ]
  },

  {
    code: "FINISHING",
    label: "Finishing Phase",
    workItems: [
      "Electrical_and_Mechanical_First_Fix",
      "Internal_and_External_Plastering",
      "Window_and_Door_Frame_Installation",
      "Floor_Screeding_Works",
      "Ceiling_Installation",
      "Electrical_and_Mechanical_Second_Fix",
      "Painting_and_Internal_Finishes",
      "External_Works_and_Landscaping",
      "Final_Cleaning_and_Handover"
    ]
  }
]




  const [units, setUnits] = useState<Unit[]>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) return JSON.parse(raw) as Unit[];
    } catch {}
    return defaultUnits;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(units));
    } catch {}
  }, [units]);

  const addUnit = (u: Unit) => setUnits((s) => [u, ...s]);

  const updateUnit = (id: string, patch: Partial<Unit>) =>
    setUnits((s) => s.map((u) => (u.id === id ? { ...u, ...patch } : u)));

  const removeUnit = (id: string) => setUnits((s) => s.filter((u) => u.id !== id));

  const getUnit = (id: string) => units.find((u) => u.id === id);

  const value: UnitContextType = {
      units,
      addUnit,
      updateUnit,
      removeUnit,
      getUnit,
  };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};

export const useUnits = (): UnitContextType => {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error("useUnits must be used within a UnitProvider");
  return ctx;
};

export default UnitContext;
