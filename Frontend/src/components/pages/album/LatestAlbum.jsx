import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listLatestAlbum } from '../../../store/albumSlice';
import { Link } from 'react-router-dom';

const LatestAlbum = () => {
    const dispatch = useDispatch();
    const { latestAlbum } = useSelector((state) => state.album);

    useEffect(() => {
        dispatch(listLatestAlbum());
    }, [dispatch]);

    return (
        <>
            <div className="text-white px-4 md:px-8 py-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-white text-2xl font-bold my-5 mx-5 capitalize">New album and song</h1>
                    <div className='flex gap-4 my-5 mx-5'>
                        {latestAlbum && latestAlbum.length > 0 ? (
                            latestAlbum.map((item) => (
                                <Link key={item._id} to={`/album/${item?.name}`}>
                                    <div className="min-w-[200px] p-3 rounded-lg cursor-pointer hover:bg-stone-900 transition duration-300">
                                        <div className="mb-4">
                                            <div className="w-40 h-40 rounded-lg overflow-hidden">
                                                <img className="w-full h-full object-cover" src={item?.image} alt={item?.name} />
                                            </div>
                                            <p className="text-slate-200 font-bold ml-3 mt-2 mb-1 truncate">{item?.name}</p>
                                            {/* <p className="text-slate-500  ml-3 text-sm truncate">{item?.desc}</p> */}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No albums available</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LatestAlbum
