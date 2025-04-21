import React from 'react'
import { assets } from '../../assets/frontend-assets/assets'
import AlbumItem from '../pages/albumItem/AlbumItem'
import AllSong from '../pages/Home/AllSong'
import AllAlbum from '../pages/Home/AllAlbum'
import DisplayArtist from '../pages/artist/DisplayArtist'
import ArtistBook from '../pages/artistBooking/ArtistBook'
import { Link, useNavigate } from "react-router-dom"
import Footer from '../../globals/components/footer/Footer'
import DisplayAlbum from '../pages/album/DisplayAlbum'
import TopListeningSong from '../pages/recommendation/TopListeningSong'
import LatestSystemSong from '../pages/recommendation/LatestSystemSong'
import LatestAlbum from '../pages/album/LatestAlbum'

const DisplayHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='w-full px-4 md:px-6 pt-4 rounded bg-[#121212] text-white overflow-auto'>
        {/* Navigation arrows */}


        {/* Navigation menu */}
        <div className="w-full px-4 md:px-6 pt-4 rounded bg-[#121212] text-white overflow-auto">


          {/* Navigation menu with left gap */}
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="p-2 sm:p-4 flex flex-wrap justify-start items-center gap-2 sm:gap-4 mt-2 mx-auto max-w-7xl">
              <Link to={`/publicPlaylist`}>
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-stone-950 text-white text-xs sm:text-sm md:text-base rounded-md hover:bg-gray-900 transition-colors">
                  Playlists
                </div>
              </Link>



              <Link to="/allAlbum">
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-stone-950 text-white text-xs sm:text-sm md:text-base rounded-md hover:bg-gray-900 transition-colors">
                  Albums
                </div>
              </Link>

              <Link to="/allGenre">
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-stone-950 text-white text-xs sm:text-sm md:text-base rounded-md hover:bg-gray-900 transition-colors">
                  Genre
                </div>
              </Link>
              
              <Link to="/artistList">
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-stone-950 text-white text-xs sm:text-sm md:text-base rounded-md hover:bg-gray-900 transition-colors">
                  Event
                </div>
              </Link>


              <Link to="/artistList">
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-stone-950 text-white text-xs sm:text-sm md:text-base rounded-md hover:bg-gray-900 transition-colors">
                  Artists
                </div>
              </Link>

             
            </div>
          </div>
        </div>


        {/* Main content section */}
        <div className="">

          {/* Book The Artist */}
          {/* <div className="flex-1">
    <ArtistBook />
  </div> */}

          {/* Popular and Trending songs */}
          <div className="">
            <AllSong />
          </div>
        </div>

        {/* Albums section */}
        <div className='mb-6'>
          <DisplayAlbum />
        </div>

        {/* Artists section */}
        <div className='mb-6'>
          <DisplayArtist />
        </div>

        <div className='mb-6'>
          <TopListeningSong />
        </div>

        <div className='mb-6'>
          <LatestSystemSong />
        </div>
        <div className='mb-6'>
          <LatestAlbum />
        </div>

        <div className='mb-6'>
          <Footer />
        </div>


      </div>
    </>
  )
}

export default DisplayHome
