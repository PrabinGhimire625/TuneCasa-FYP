// const AddSongPlaylist = () => {
//     return (
//       <div className=" text-white min-h-screen p-6 flex gap-6">
//         {/* Left Section: Playlist Info */}
//         <div className="flex justify-center w-1/3">
//           <div className="flex flex-col items-center gap-6">
//             {/* Playlist Cover */}
//             <div className="bg-gray-800 w-64 h-64 flex items-center justify-center rounded-lg shadow-lg">
//               <p className="text-gray-400 text-xl">Playlist Cover</p>
//             </div>
//             {/* Playlist Info */}
//             <div className="text-center">
//               <h1 className="text-3xl font-bold text-white">Hi, Playlist</h1>
//               <p className="text-gray-400 text-lg">Playlist • Public • 2025</p>
//               <p className="text-gray-400 text-lg">0 tracks • 0 seconds</p>
//             </div>
//           </div>
//         </div>
  
//         {/* Right Section: Suggestions */}
//         <div className="w-1/2 mt-16">
//           <h2 className="text-xl font-bold mb-4">Suggestions</h2>
//           <div className="grid gap-4">
//             {[...Array(7)].map((_, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center bg-stone-900 p-3 rounded-lg"
//               >
//                 <div>
//                   <p className="font-semibold">Song {index + 1}</p>
//                   <p className="text-gray-400">Artist • Album</p>
//                 </div>
//                 <button className="bg-transparent text-white p-2 rounded-full hover:bg-gray-700">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 4v16m8-8H4"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default AddSongPlaylist;
  