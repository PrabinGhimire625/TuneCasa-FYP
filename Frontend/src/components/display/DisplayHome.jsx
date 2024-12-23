import React from 'react'
import { albumsData, artistData,assets } from '../../assets/frontend-assets/assets'
import AlbumItem from '../pages/albumItem/AlbumItem'
import Artist from '../pages/artist/Artist'

const DisplayHome = () => {
  const categories = ["Playlists", "Songs", "Albums", "Artists", "Book artist"];
  return (
    <>
     <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0'>

     <div className='flex items-center gap-2'>
               <img
                 className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
                 src={assets.arrow_left}
                 alt=''
                 onClick={() => navigate(-1)} // Navigate backward
               />
               <img
                 className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
                 src={assets.arrow_right}
                 alt=''
                 onClick={() => navigate(1)} // Navigate forward
               />
      </div>

      <div className=" p-4 flex space-x-4 mt-2">
      {categories.map((category, index) => (
        <button
          key={index}
          className="px-4 py-2 bg-stone-950  text-white rounded-md hover:bg-gray-900 focus:outline-none"
        >
          {category}
        </button>
      ))}
    </div>
     
     
     <div className=''>
        <div className='mb-4 '>
            <h1 className='my-5 font-bold text-2xl'>Popular albums and singer</h1>
            <div className='flex overflow-auto'>
            {albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
            </div>
        </div>
      </div>
      

      <div className=" text-white p-6">
      <div className="mb-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Popular Artist</h2>
      <button className="text-sm text-gray-400 hover:text-white">More</button>
    </div>
    <div className="flex overflow-auto space-x-4 scrollbar-hide">
      {artistData.map((item, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          {/* Circular Image */}
          <div className="w-56 h-56 rounded-full overflow-hidden bg-gray-700">
            <img
              src={item.image}
              alt={`Artist ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Artist Name */}
          <h3 className="text-lg font-medium text-center">{item.name}</h3>
        </div>
      ))}
    </div>
  </div>
      </div>


    </div>
    </>
  )
}

export default DisplayHome
