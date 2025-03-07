import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listAllGenre } from "../../../store/genreSlice";
import { Link } from 'react-router-dom'; // Import Link

const Genre = () => {
    const dispatch = useDispatch();
    const { genre } = useSelector((state) => state.genre); // Default to empty array to avoid errors
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
        <div className="w-full p-6 bg-stone-900 text-white">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Moods and Genres</h2>
                <div className="flex space-x-2">
                    <button onClick={scrollLeft} className="px-3 bg-stone-800 py-1 rounded-full">{"<"}</button>
                    <button onClick={scrollRight} className="px-3 bg-stone-800 py-1 rounded-full">{">"}</button>
                </div>
            </div>

            {/* Scrollable Genre List */}
            <div className="relative mt-5">
                <div ref={scrollRef} className="overflow-x-auto pb-2 scrollbar-visible" style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}>
                    <div className="flex flex-wrap gap-4">
                        {genre.map((item, index) => (
                            <Link 
                                to={`/genrebasedSong/${item._id}`} // Dynamic route based on genre ID
                                key={index}
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
    );
};

export default Genre;
