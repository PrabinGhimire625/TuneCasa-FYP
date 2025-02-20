import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAllAlbum } from '../../../store/albumSlice';
import AlbumItem from '../albumItem/AlbumItem';
import { Link } from 'react-router-dom';

const AllAlbum = () => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => state.album); 

  useEffect(() => {
    dispatch(listAllAlbum()); 
  }, [dispatch]);

  return (
    <>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Popular Albums</h1>
        
        <div className="flex overflow-auto">
          {albums && albums.length > 0 ? (
            albums.map((item) => (
              <Link to={`/album/${encodeURIComponent(item.name)}`} key={item._id}>
                <AlbumItem name={item.name} desc={item.desc} id={item.id} image={item.image} />
              </Link>
            ))
          ) : (
            <p>No albums available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllAlbum;
