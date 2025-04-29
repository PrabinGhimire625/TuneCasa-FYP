import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listAllGenre } from "../../../store/genreSlice";
import { Link } from 'react-router-dom'; 
import LatestAlbum from "../album/LatestAlbum";
import Footer from "../../../globals/components/footer/Footer";

const Genre = () => {
    const dispatch = useDispatch();
    const { genre } = useSelector((state) => state.genre); 
    const scrollRef = useRef(null);
    console.log("All the genres:", genre);

    useEffect(() => {
        dispatch(listAllGenre());
    }, [dispatch]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="text-white px-4 md:px-8 py-10">
                <div className="max-w-7xl mx-auto">
            <LatestAlbum/>
            {/* Scrollable Genre List */}
            <div className="ml-10 mt-5">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold">Moods and Genres</h2>
               
            </div>
                <div ref={scrollRef} className="overflow-x-auto pb-2 scrollbar-visible" style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}>
                    <div className="flex flex-wrap gap-4">
                        {genre.map((item, index) => (
                            <Link 
                                to={`/genreDetails/${encodeURIComponent(item.name)}`} 
                                key={item._id}
                                className="flex items-center bg-stone-800 text-white px-6 py-3 rounded-md w-48"
                            >
                                {/* Vertical Color Strip */}
                                <div 
                                    className="w-2 h-full rounded-l-md" 
                                    style={{ backgroundColor: item.bgColour }}
                                ></div>

                                {/* Genre Name */}
                                <p className="ml-3 text-lg font-semibold">{item.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
          
        </div>
    );
};

export default Genre;
