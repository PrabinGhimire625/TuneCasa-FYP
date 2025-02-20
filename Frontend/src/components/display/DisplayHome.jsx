import React from 'react'
import { assets } from '../../assets/frontend-assets/assets'
import AlbumItem from '../pages/albumItem/AlbumItem'
import AllSong from '../pages/Home/AllSong'
import AllAlbum from '../pages/Home/AllAlbum'
import DisplayArtist from '../pages/artist/DisplayArtist'

const DisplayHome = () => {
  const categories = ["Playlists", "Songs", "Albums", "Artists", "Book artist"];
  return (
    <>
     <div className='w-[100%]  px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0'>

     <div className='flex items-center gap-2'>
               <img
                 className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
                 src={assets.arrow_left}
                 alt=''
                 onClick={() => navigate(-1)} 
               />
               <img
                 className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
                 src={assets.arrow_right}
                 alt=''
                 onClick={() => navigate(1)} 
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

    <div className="flex gap-6">
  {/* Book The Artist - 40% */}
  <div className="relative w-[40%] bg-gradient-to-br from-[#1e1e1e] to-[#292929] p-6 rounded-lg shadow-lg backdrop-blur-md border border-gray-700 h-[250px]">
  {/* Heading with Icon */}
  <div className="flex items-center gap-3">
    <div className="p-2 bg-blue-500 rounded-full">
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m0 9a9 9 0 110-18 9 9 0 010 18z" />
      </svg>
    </div>
    <h2 className="text-2xl font-extrabold text-white">Book The Artist</h2>
  </div>

  {/* Description */}
  <p className="text-gray-300 mt-2">Reserve your favorite artist for an unforgettable event!</p>

  {/* Button with Glow Effect */}
  <button className="mt-6 px-6 py-3 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-xl">
    🎤 Book Now
  </button>
</div>


  {/* Popular and Trending songs - 60% */}
  <div className="w-[60%] bg-[#1e1e1e] p-4 rounded-lg shadow-md">
      <AllSong/>
  </div>


</div>

     <div className=''>
        <AllAlbum/>
      </div>

      <div>
        <DisplayArtist/>
      </div>


    </div>
    </>
  )
}

export default DisplayHome
