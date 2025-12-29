import { HomeProvider, useHomeContext } from "@/Context/HomeContext";
import React from "react";


const DocumentComponent = () => {
const {setshowUnitInfo, currentUnitItems, setCurrentUnitItems} = useHomeContext()

const MockMap = ['1', '2', '4', '5' ,'6']

  const Item = (numb:any) => (
 
        <div 
        onClick={() => 
          {setshowUnitInfo(prev => !prev)
            if(currentUnitItems[0] == null){
setCurrentUnitItems([numb, null])
return
            } else if(currentUnitItems[1]){
              setCurrentUnitItems(prev => ([numb, prev[0]]))
            }
            
          }}

        
        className=" flex flex-col p-4 m-4 cursor-pointer">
        <div className="text-2xl font-bold hover:border-b transition-all font-monospace font-Milli"> {`'J9'${numb.numb} A & B`}:</div>

        <ol>
          <li>Ø   Funded for gable blockwork and scaffolding.</li>
          <li>   scaffolding is complete, gable block work at 90%</li>

          <li></li>
        </ol>
      </div>

    
  )


  return (
    <div className="h-[800px] overflow-auto bg-white">
      <div className="   flex flex-col p-4 m-4 text-[E2F1F8] font-mill">
        <div className="text-2xl flex font-bold"> 
          
          J91 A & B:</div>

        <div className="text-gray-600 font-italic text-sm">
            - Funded for gable blockwork and scaffolding.
        </div>

        <ol className="text-base">
          <li>
            *  <span className="font-bold text-gray-700">Scaffolding</span> is complete, <span className="font-bold text-gray-700">gable block work</span> is at 90%
          </li>

          <li></li>
        </ol>
      </div>

      {
        MockMap.map((num:string) => (
           <Item
           numb = {num}
           >
            </Item>
        ))
      }

    

    </div>
  );
};

export default DocumentComponent;
