import React from 'react'
import { useNavigate } from 'react-router-dom'

const Artist = ({id,image,name}) => {
    const navigate=useNavigate();
  return (
    <>
    <div onClick={()=>navigate(`/artist/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-stone-900'>
        <img className='rounded' src={image} alt="" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
    </div>
    </>
  )
}

export default Artist
