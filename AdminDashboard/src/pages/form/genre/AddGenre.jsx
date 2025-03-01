import React, { useState } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import { STATUS } from '../../../globals/enumStatus/Status';
import { useDispatch, useSelector } from 'react-redux';
import { addGenre } from '../../../store/genreSlice';

const AddGenre = () => {
    const dispatch=useDispatch();
    const {status, genre}=useSelector((state)=>state.genre);
  
    const [genreData, setGenreData]=useState(({
      name:"",
      desc:"",
    }))
  
  
    const handleChange=(e)=>{
      const {name, value}=e.target;
      setGenreData({
        ...genreData,
        [name]:value
      })
    }
  
    const handleSubmit=async(e)=>{
      e.preventDefault();
      dispatch(addGenre(genreData));
      if (status === STATUS.SUCCESS) {
        alert('Successfully added the genre');
        // navigate('/tables');
    } else {
        alert('Failed to add the genre!');
    }
    }
  

    
    return (
        <>
            <div className="flex h-screen bg-stone-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
                    <div className="p-4">
                        <div className="w-full p-6 text-white bg-stone-800 rounded-lg shadow-xl">
                            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Add genre</h3>
                            <form onSubmit={handleSubmit} className='flex flex-col items-start gap-8 text-gray-600'>
                                       
                                       <div className='flex flex-col gap-2.5 text-white'>
                                         <p>Genre name</p>
                                         <input onChange={handleChange} name='name' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]' placeholder='Type Here' type="text" required/>
                                       </div>
                               
                                       <div className='flex flex-col gap-3 text-white'>
                                         <p>Background color</p>
                                         <input onChange={handleChange} type='color' name='bgColour'/>
                                       </div>
                               
                                       <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>Add</button>
                                     </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddGenre
