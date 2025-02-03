import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { deleteAlbum, listAllAlbum } from "../../store/albumSlice"
import { Link } from 'react-router-dom';

const ListAlbum = () => {
    const dispatch=useDispatch();
    const {albums}=useSelector((state)=>state.album);

    

    useEffect(()=>{
      dispatch(listAllAlbum());
    },[dispatch])


    const handleDeleteAlbum=(albumId)=>{
      dispatch(deleteAlbum(albumId));
    }






  
  return (
    <>
      <div className='text-white'>
        <p className='font-bold text-2xl text-white'>All Album List</p>
        <br />
        <div>
          <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100 text-black'>
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Background color</b>
         
          </div>
          {
            albums.map((item, index)=>{
              return(

                <div key={index} className='grid grid-cols-[1fr-1fr-1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 '>
                  <Link to={`/editAlbum/${item._id}`} className="contents">
                    <img className='w-12 cursor-pointer' src={item?.image} alt="" />
                    <p className="cursor-pointer">{item.name}</p>
                    <p className="cursor-pointer">{item.desc}</p>
                    <p className="cursor-pointer">{item.bgColour}</p>
                  </Link>
                  <button onClick={() => handleDeleteAlbum(item._id)}>x</button>
                </div>
                
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default ListAlbum
