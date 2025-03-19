import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchAlbumByGenre } from '../../../store/genreSlice';
import GenreBasedSong from './GenreBasedSong';

const GenreDetails = () => {
    const { genre } = useParams();
    const dispatch = useDispatch();
    const { albumByGenre } = useSelector((state) => state.genre);

    useEffect(() => {
        dispatch(fetchAlbumByGenre(genre));
    }, [dispatch, genre]);

    console.log("The name of the genre is:", genre);
    console.log("The album of that genre is:", albumByGenre);

    return (
        <>
        <h1 className="text-white text-2xl font-bold my-5 mx-5 capitalize">{genre}</h1>
            <div className='flex gap-4 my-5 mx-5'>
                {albumByGenre && albumByGenre.length > 0 ? (
                    albumByGenre.map((item) => (
                        <Link key={item._id} to={`/album/${albumByGenre.name}`}>
                            <div className="min-w-[200px] p-3 rounded-lg cursor-pointer hover:bg-stone-900 transition duration-300">
                                <div className="mb-4">
                                    <div className="w-40 h-40 rounded-lg overflow-hidden">
                                        <img className="w-full h-full object-cover" src={item?.image} alt={item?.name} />
                                    </div>
                                    <p className="text-slate-200 font-bold ml-3 mt-2 mb-1 truncate">{item?.name}</p>
                                    <p className="text-slate-500  ml-3 text-sm truncate">{item?.desc}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No albums available</p>
                )}
            </div>
            <GenreBasedSong />
        </>
    );
};

export default GenreDetails;
