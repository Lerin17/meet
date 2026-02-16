"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { IHouseType, defaultHouses } from "./HouseUnitContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { i, u } from "framer-motion/client";
import { db } from "@/lib/firebase";
import { get } from "http";
import { m, number } from "framer-motion";
import { type } from "os";
import { unitsMockData } from "@/data/j/data";


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

  isJointVenture: boolean,
  JointVenturePartners?: string[],
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

// MAIN DATA STATES


const isCapitalized = (word: string) => /^[A-Z]/.test(word);

const isUnitCode = (word: string) => {
  const e = /^[A-Z]\d{1,2}$/.test(word)
  console.log('isUnitCode check for', word, e)
  return e
};


const isElement = (word:string) => {
const mocktext = ['scaffolding', 'props', 'gable', 'BW', 'col', 'lin', 'slab', 'roof', 'beam']
const check = mocktext.includes(word)

return check
}

const isPhase = (word:string) => { 
  const pool = []
return true
}

const isStatus = (word:string) => {
  const pool = ['done', 'complete', 'completed', 'awaiting',]
}

const isFloor = (word:string) => {
  const pool = ["GF","FF",'SF']

  const check = pool.includes(word)

  return check
}

const isUnit = (word:string) => {
  const stringx = word.split('_')

  const redxq= stringx[0]
const words = redxq.split('');


  const lettercode = []
const numbercode = []

const filterx =  words.map(item => {
  const con = Number(item);

  if( isNaN(Number(item))){
    lettercode.push(item)

  }else if(typeof item){
    numbercode.push(item)
  }
})



if(lettercode.length == 0 || numbercode.length == 0){
return false
}else{
  return true
}

}

const categorizer = (word:any) => {
  if(isUnitCode(word)){
    return {
      type:'unitCode',
      data:word
    }
  }else if(isFloor(word)){
    return {
      type:'floor',
      data:word
    }
  }
  
  else if(isElement(word)){
    return {
      type:'element',
      data:word
    }
  }else if(isPhase(word)){
    return {
      type:'phase',
      data:word
    }
}else{
  return {
    data:word
  }
}
}

const breakdownword = (word:string) => {
const wordparts = word.split(' ')


const xa = wordparts.map((item:any) => (
  
    categorizer(item)
  
))

console.log(xa, 'categorizer')

}


breakdownword('P17 FF Cast Completed')














  const  transformedUnitDataPayload = (data:IUnit) => {

    const transformedUnitDataPayload =  data

    const red = 'P17_FF Cast Completed'
    const tedex = 'P17 FF Cast Completed'

    
    const intercow = (x:string) => {

      const z = x.split(' ')

      const y = z.filter(item => (item[0] == ''))

      return ('wow, done')
    }

    const what = intercow(red)


    const interprete = (x:string) => {
      

      


      const floorstokens = [
        {
          token:'GF',
          meaning:'Ground Floor',
          type:'floor',
          role:'scope',
          semanticTags: ['floor:ground', 'level:0', 'vertical:lowest'],
          tags: ['structure', 'level', 'base']
        },
        {
          token:'FF',
          meaning:'First Floor',
          type:'floor',
          role:'scope',
          semanticTags: ['floor:first', 'level:1', 'vertical:upper'],
          tags: ['structure', 'level', 'upper']
        },
        {
          token:'SF',
          meaning:'Second Floor',
          type:'floor',
          role:'scope',
          semanticTags: ['floor:second', 'level:2', 'vertical:upper'],
          tags: ['structure', 'level', 'upper']
        }
       ]

       const inventorytokens = [
        {
          token:'scaffolding',
          meaning:'scaffolding',
          type:'component',
          role:'element',
          semanticTags: ['inventory:temporary', 'safety:access', 'support:structural'],
          tags: ['temporary', 'safety', 'support']
         },
         {
          token:'props',
          meaning:'acro props',
          type:'component',
          role:'element',
          semanticTags: ['inventory:temporary', 'support:structural', 'equipment:support'],
          tags: ['temporary', 'support', 'equipment']
         }
       ]

       const buildingcomponentstokens = [
         {
           token:'gable',
           meaning:'gable block',
           type:'component',
           role:'element',
           semanticTags: ['component:gable', 'structure:upper', 'material:block'],
           tags: ['masonry', 'structural', 'upper']
         },
         {
           token:'BW',
           meaning:'block work',
           type:'component',
           role:'element',
           semanticTags: ['component:blockwork', 'material:block', 'structure:wall'],
           tags: ['masonry', 'structural', 'wall']
         },
         {
           token:'col',
           meaning:'column',
           type:'component',
           role:'element',
           semanticTags: ['component:column', 'structure:vertical', 'material:concrete'],
           tags: ['structural', 'vertical', 'concrete']
         },
         {
          token:'lin',
          meaning:'lintel',
          type:'component',
          role:'element',
          semanticTags: ['component:lintel', 'structure:horizontal', 'material:concrete'],
          tags: ['structural', 'horizontal', 'concrete']
         },
         {
           token:'slab',
           meaning:'slab',
           type:'component',
           role:'element',
           semanticTags: ['component:slab', 'structure:horizontal', 'material:concrete'],
           tags: ['structural', 'horizontal', 'concrete', 'surface']
         },
         {
           token:'roof',
           meaning:'roofing',
           type:'component',
           role:'element',
           semanticTags: ['component:roof', 'structure:top', 'protection:weather'],
           tags: ['structural', 'finishing', 'weather-protection']
         },
         {
           token:'beam',
           meaning:'beam',
           type:'component',
           role:'element',
           semanticTags: ['component:beam', 'structure:horizontal', 'material:concrete'],
           tags: ['structural', 'horizontal', 'concrete']
         }
       ]

       const statustokens = [
        {
          token:'done',
          meaning:'completed',
          type:'status',
          role:'activity',
          semanticTags: ['status:complete', 'progress:100', 'phase:end'],
          tags: ['completion', 'finished', 'approved']
        }
       ]

        const fundedtokens = [
          {
            token:'$f',
            meaning:'funded',
            type:'funded',
            role:'status',
            semanticTags: ['funding:approved', 'financial:allocated', 'status:ready'],
            tags: ['financial', 'approved', 'available']
          },
          {
            token:'$af',
            meaning:'awaiting funding',
            type:'funded',
            role:'status',
            semanticTags: ['funding:pending', 'financial:waiting', 'status:blocked'],
            tags: ['financial', 'pending', 'blocked']
          }
        ]

       const structure = 'scope' + 'subject' + 'status' + 'progressIndicator' + 'notes'

      const commonnWords = ['FF', 'BW', ]

      
    }

    const stringx = [
      "P17_FF Cast Completed",
      'P11 Awaiting FUnding',
      'P11 Joint inspection Date_2weeks',
      "scaffolding done, gable_BW 90",
      'FF_col done',
      "funded FF BW x done",
      ''
    ]
    

    return (transformedUnitDataPayload)
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
  unitDataArray?: any[];
  setunitDataArray?: React.Dispatch<React.SetStateAction<any[]>>;
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


//MAIN DATA STATES

const [unitDataArray, setunitDataArray] = React.useState<any[]>(unitsMockData);

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
      unitDataArray,
      setunitDataArray,
  };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};

export const useUnits = (): UnitContextType => {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error("useUnits must be used within a UnitProvider");
  return ctx;
};

export default UnitContext;
