 
 import React from 'react'
 
 const page = ({
  params,
  searchParams,
 }: {
  params: { id: string };
  searchParams: { print?: string };
 }) => {

  const isPrint = searchParams.print === "true";

   return (
     <div className='text-white'>
       <div className='bg-red-500 mt-10 p-5'>
       do or do not {params.id}
       </div>
     </div>
   )
 }
 
 export default page
 
 
 
 
 



