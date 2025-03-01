import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listAllGenre } from "../../../store/genreSlice";

const Genre = () => {
    const dispatch = useDispatch();
    const { genre } = useSelector((state) => state.genre); // Default to empty array to avoid errors
    const scrollRef = useRef(null);

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
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Moods and Genres</h2>
                <div className="flex space-x-2">
                    <button onClick={scrollLeft} className="px-3 bg-stone-800 py-1 rounded-full">{"<"}</button>
                    <button onClick={scrollRight} className="px-3 bg-stone-800 py-1 rounded-full">{">"}</button>
                </div>
            </div>

            <div className="relative mt-5">
                <div ref={scrollRef} className="overflow-x-auto pb-2 scrollbar-visible" style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}>
                    <div className="flex space-x-4">
                        {genre.map((item, index) => (
                            <div key={index} className="bg-stone-800 text-white px-4 py-2 rounded-md text-center">
                                {item.name} {/* Assuming genre items have a `name` property */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Genre;
