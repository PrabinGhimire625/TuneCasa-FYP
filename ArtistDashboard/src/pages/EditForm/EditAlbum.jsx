import React, { useEffect } from 'react'
import { assets } from '../../assets/artist-assets/assets'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listSingleAlbum } from '../../store/albumSlice';


const EditAlbum = () => {
  const {id}=useParams();
  console.log(id);
  const dispatch=useDispatch();
  const {singleAlbum, status} = useSelector((state)=>state.album);
  console.log(singleAlbum);
  console.log(status)

  useEffect(() => {
    if (id) {
      dispatch(listSingleAlbum(id));
    }
  }, [id, dispatch]);
  

  return (
    <>
      <form className='flex flex-col items-start gap-8 text-gray-600'>
        <h1 className='text-white text-3xl font-bold '>Edit the album details</h1>
        <div className='flex gap-8'>
         
          {/* upload image */}
          <div className='flex flex-col gap-4'>
            <p>Upload image</p>
            <input type="file" name='image' id='image' accept='image/*' hidden />
            <label htmlFor="image">
              <img 
                src={assets.upload_area} 
                className='w-24 cursor-pointer' 
                alt="Uploaded preview or placeholder" 
              /> 
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-2.5'>
          <p>Album name</p>
          <input  name='name' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]' placeholder='Type Here' type="text" required/>
        </div>

        <div className='flex flex-col gap-2.5'>
          <p>Album description</p>
          <textarea  name='desc' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]' placeholder='Type Here' type="text" required/>
        </div>


        <div className='flex flex-col gap-3'>
          <p>Background color</p>
          <input  type='color' name='bgColour'/>
        </div>

        <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>Add</button>
      </form>
    </>
  )
}

export default EditAlbum
