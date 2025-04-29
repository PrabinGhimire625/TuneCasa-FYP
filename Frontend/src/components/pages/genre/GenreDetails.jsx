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
        <div className="text-white p-4 md:p-6 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold capitalize mb-6">{genre} </h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
                {albumByGenre && albumByGenre.length > 0 ? (
                    albumByGenre.map((item) => (
                        <Link key={item._id} to={`/album/${item._id}`}>
                            <div className="shadow-[0_0_10px_2px_rgba(255,255,255,0.1)] rounded-lg transition duration-300 p-3 group">
                                <div className="w-full h-40 sm:h-44 md:h-48 rounded-md overflow-hidden">
                                    <img
                                        src={item?.image}
                                        alt={item?.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-white font-semibold mt-3 truncate">{item?.name}</p>
                                <p className="text-sm text-gray-400 truncate">{item?.desc}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-300">No albums available</p>
                )}
            </div>
            {/* Divider */}
            <div className="my-10 border-t border-stone-700" />
            {/* Genre Songs Section */}
            <div>
                <h2 className="text-xl font-bold">Popular {genre} Songs</h2>
                <GenreBasedSong />
            </div>
        </div>
    );
};

export default GenreDetails;
