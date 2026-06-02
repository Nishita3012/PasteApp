import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPaste } from '../Redux/pasteSlice';

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes .filter((p) => p._id === id)[0];


  return (
     <div>
        <div className='flex flex-row gap-7 place-content-between'>
       <input 
         className='p-1 rounded-2xl bg-gray-950 mt-2 w-[66%] pl-5'
         type="text"
         placeholder='Enter title here'
         value={paste.title}
         disabled
         onChange={(e) => setTitle(e.target.value)} 
        />

        {/* <button 
           onClick={createPaste}
           className='p-2 rounded-2xl bg-gray-950 mt-2'>
            {
                pasteId ? "Update My Paste" : "Create My Paste"
            }
        </button> */}
    </div>
    <div className='mt-8'>
        <textarea 
           className='rounded-2xl mt-4 min-w-125 p-4 bg-gray-950'
           value={paste.content}
           placeholder='enter content here'
           disabled
           onChange={(e)=> setValue(e.target.value)}
           rows={20}
        />
    </div>
    </div> 
  )
}

export default ViewPaste
