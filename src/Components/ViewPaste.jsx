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
        <div className='max-w-4xl mx-auto px-4 py-4'>
       <input 
         className='w-full p-3 rounded-xl bg-gray-950 border border-gray-700 text-lg font-semibold'
         type="text"
         placeholder='Enter title here'
         value={paste.title}
         disabled
         onChange={(e) => setTitle(e.target.value)} 
        />

    </div>
    <div className='mt-8'>
        <textarea 
           className='w-full rounded-xl p-4 bg-gray-950 border border-gray-700 resize-none'
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
