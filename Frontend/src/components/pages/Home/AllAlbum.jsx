import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAllAlbum } from '../../../store/albumSlice';
import AlbumItem from '../albumItem/AlbumItem';
import { Link } from 'react-router-dom';
import Footer from '../../../globals/components/footer/Footer';

const AllAlbum = () => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => state.album); 

  useEffect(() => {
    dispatch(listAllAlbum()); 
  }, [dispatch]);

  return (
    <div className="text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="my-5 font-bold text-2xl">Popular Albums</h1>

        {/* Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {albums && albums.length > 0 ? (
            albums.map((item) => (
              <Link to={`/album/${encodeURIComponent(item.name)}`} key={item._id}>
                <AlbumItem
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  image={item.image}
                />
              </Link>
            ))
          ) : (
            <p>No albums available</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AllAlbum;
