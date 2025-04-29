import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { listSingleSong, deleteSong } from '../../store/songSlice'
import { Pencil, Trash2 } from 'lucide-react'
import ListSong from '../Tables/ListSong'
import { toast } from 'react-toastify'

const SingleSong = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { singleSong } = useSelector((state) => state.song)

  useEffect(() => {
    if (id) {
      dispatch(listSingleSong(id))
    }
  }, [dispatch, id])

  const handleEdit = () => {
    navigate(`/editSong/${id}`)
  }

  const handleDelete = async () => {
    if (id) {
      try {
        await dispatch(deleteSong(id)); 
        toast.success("Song deleted");
        navigate("/allSong");
      } catch (error) {
        toast.error("Error deleting song");
      }
    }
  };
  

  if (!singleSong) return <p className="text-white p-4">Loading song details...</p>

  return (
    <div className="mx-auto p-6 text-white bg-gray-900">
     <div className="flex   md:flex-row p-6 rounded-2xl shadow-xl bg-gray-900 gap-6">
      <div className="flex max-w-4xl   md:flex-row p-6 rounded-2xl  gap-6">
        <img
          src={singleSong.image || 'https://via.placeholder.com/300'}
          alt={singleSong.name}
          className="w-full md:w-72 h-72 object-cover rounded-xl border border-zinc-700"
        />

        <div className="flex-1 ml-10">
          <h2 className="text-3xl font-bold mb-2">{singleSong.name}</h2>
          <p className="text-gray-400 mb-1"><strong>Album:</strong> {singleSong.album}</p>
          <p className="text-gray-400 mb-1"><strong>Genre:</strong> {singleSong.genre}</p>
          <p className="text-gray-400 mb-4"><strong>Description:</strong> {singleSong.desc}</p>
          <p className="text-gray-400 mb-4"><strong>Duration:</strong> {singleSong.duration}</p>

          <audio controls className="w-full mt-2 rounded-md">
            <source src={singleSong.file} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          {/* Static Button */}
          <Link to="/songAnalytics"> <button
            className="mt-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
          >
            View Song Analytics
          </button></Link>

          {/* Action buttons */}
          <div className="flex gap-4 mt-6">
            <button onClick={handleEdit} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">
              <Pencil size={18} /> Edit
            </button>
            <button onClick={handleDelete} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md">
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>
      </div>
      </div>
      <ListSong/>
    </div>
  )
}

export default SingleSong
