import React from 'react'
import { useEffect } from 'react';
import {useDispatch} from "react-redux"
import { fetchAlbumByGenre } from '../../../store/genreSlice';

const GenreBasedSong = () => {
    const dispatch=useDispatch();
    const { genre } = useSelector((state) => state.genre);
    useEffect(()=>{
        dispatch(fetchAlbumByGenre())
    },[dispatch])

    console.log(genre);

  
    return (
        <>
            <div className="flex gap-10 p-10">
                <div className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-purple-600 to-blue-400 w-40 h-40 justify-between">
                </div>
                <div>
                    <p className="text-white font-semibold"></p>
                    <p className="text-gray-300 text-sm">Auto playlist</p>
                </div>
            </div>
        </>
    )
}

export default GenreBasedSong
