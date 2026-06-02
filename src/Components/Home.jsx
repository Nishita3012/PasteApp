import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPaste } from '../Redux/pasteSlice';

const Home = () => {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const  [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
          if(pasteId){
            const paste = allPastes.find((p) => p._id === pasteId);
            if(paste){
                setTitle(paste.title);
                setValue(paste.content);
            }
          }
    }, [pasteId, allPastes])

    function createPaste(){
       const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(36),
        createdAt: new Date().toISOString(),
       }

       if(pasteId){
        //   update
        dispatch(updateToPaste(paste))
       }
       else{
        // create
        dispatch(addToPastes(paste))
       }

      //    after creation or updation
      setTitle('');
      setValue('');
      setSearchParams({});
    }

  return (
    <div>
        <div className='flex flex-col sm:flex-row gap-4 justify-between'>
       <input 
         className='w-full sm:w-[70%] p-3 rounded-xl bg-gray-950'
         type="text"
         placeholder='Enter title here'
         value={title}
         onChange={(e) => setTitle(e.target.value)} 
        />

        <button 
           onClick={createPaste}
           className='w-full sm:w-auto p-3 rounded-xl bg-gray-950"'>
            {
                pasteId ? "Update My Paste" : "Create My Paste"
            }
        </button>
    </div>
    <div className='mt-8'>
        <textarea 
           className='w-full rounded-xl mt-4 p-4 bg-gray-950'
           value={value}
           placeholder='enter content here'
           onChange={(e)=> setValue(e.target.value)}
           rows={20}
        />
    </div>
    </div>
  )
}

export default Home
