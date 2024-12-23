// import React, { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteAlbum, listSingleAlbum } from '../../store/albumSlice'; // Ensure this action is defined

// const SingleAlbum = () => {
//   const { id } = useParams();
//   console.log(id)
//   const dispatch = useDispatch();
//   const { singleAlbum } = useSelector((state) => state.album);
//   console.log(singleAlbum);
//   const navigate=useNavigate();

//   useEffect(() => {
//     if (id) {
//       dispatch(listSingleAlbum(id));
//     }
//   }, [id, dispatch]);


//   const handleDeleteAlbum=(id)=>{
//       dispatch(deleteAlbum(id));
//       alert("Successfully delete the album")
//       navigate("/list-album");
//   }


//   return (
//     <>
//       <div>
//         <p className='font-bold text-lg'>Single Album</p>
//         <br />
//         <div>
//           <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
//             <b>Image</b>
//             <b>Name</b>
//             <b>Description</b>
//             <b>Background color</b>
//             <b>Action</b>
//             <b>Edit</b>
//           </div>

//           <div className='grid grid-cols-[1fr-1fr-1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 '>
//             <img className='w-12' src={singleAlbum?.image} alt="" />
//             <p>{singleAlbum?.name}</p>
//             <p>{singleAlbum?.desc}</p>
//             <p>{singleAlbum?.bgColour}</p>
//             <p className='cursor-pointer ' onClick={()=>handleDeleteAlbum(id)}>X</p>
//             <p className='cursor-pointer'>Edit</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleAlbum;
