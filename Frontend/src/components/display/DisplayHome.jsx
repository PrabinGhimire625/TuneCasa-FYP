import React from 'react'
import { assets } from '../../assets/frontend-assets/assets'
import AlbumItem from '../pages/albumItem/AlbumItem'
import AllSong from '../pages/Home/AllSong'
import AllAlbum from '../pages/Home/AllAlbum'
import DisplayArtist from '../pages/artist/DisplayArtist'
import ArtistBook from '../pages/artistBooking/ArtistBook'
import {Link} from "react-router-dom"

const DisplayHome = () => {
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
        <Link to={`/allPlaylist`}> <div className="px-4 py-2 bg-stone-950 text-white rounded-md hover:bg-gray-900 focus:outline-none">Playlists</div></Link>
        <div className="px-4 py-2 bg-stone-950 text-white rounded-md hover:bg-gray-900 focus:outline-none">Songs</div>
        <div className="px-4 py-2 bg-stone-950 text-white rounded-md hover:bg-gray-900 focus:outline-none">Albums</div>
        <Link to="displayArtist"> <div className="px-4 py-2 bg-stone-950 text-white rounded-md hover:bg-gray-900 focus:outline-none">Artists</div></Link>
       <Link to="/allGenre"> <div className="px-4 py-2 bg-stone-950 text-white rounded-md hover:bg-gray-900 focus:outline-none">Genre</div></Link>
      </div>

      <div className="flex gap-6">
            {/* Book The Artist - 40% */}
            <div className="relative w-[40%] bg-gradient-to-br from-[#1e1e1e] to-[#292929] p-6 rounded-lg shadow-lg backdrop-blur-md border border-gray-700 flex justify-center items-center">
              <ArtistBook />
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
