import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './pages/landing/Landing'
import store from './store/store'
import { Provider } from 'react-redux'
import Users from './pages/sidebar/Tables/users/Users'
import Login from './pages/form/auth/Login'
import Profile from './pages/form/auth/Profile'
import Navbar from './globals/navbar/Navbar'
import AllSong from './pages/form/song/AllSong'
import ListAlbum from './pages/form/album/ListAlbum'
import AllPlaylist from './pages/playlist/AllPlaylist'
import AddGenre from './pages/form/genre/AddGenre'
import ListGenre from './pages/form/genre/ListGenre'
import EditGenre from './pages/form/genre/EditGenre'
import CreateAds from './pages/form/ads/CreateAds'
import ListAds from './pages/form/ads/ListAds'
import Dashboard from './pages/dashboard/Dashboard'
import Sidebar from './pages/sidebar/Sidebar'
import ArtistRequest from './pages/artistRequest/ArtistRequest'
import DisplayArtist from './pages/artist/DisplayArtist'
import SingleArtist from './pages/artist/SingleArtist'
import SongAnalystic from './pages/form/song/SongAnalystic'
import AllSubscription from './pages/subscription/AllSubscription'
import SingleSubscription from './pages/subscription/SingleSubscription'
import SingleSongAnalytics from './pages/form/song/SingleSongAnalytics'
import SingleEvent from './pages/form/event/SingleEvent'
import SingleAds from './pages/form/ads/SingleAds'
import Notification from './pages/notification/Notification';
import SingleAlbum from './pages/form/album/SingleAlbum';
import Settings from './pages/setting/Settings';


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
       <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex items-start min-h-screen ">
          <Sidebar />
          <div className="flex-1 h-screen overflow-y-scroll bg-gray-900">
            <Navbar />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/dashboard'element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path="/users" element={<ProtectedRoute> <Users /></ProtectedRoute>} />
              <Route path='/displayArtist' element={<ProtectedRoute><DisplayArtist /></ProtectedRoute>} />
              <Route path='/singleArtist/:id' element={<ProtectedRoute> <SingleArtist /></ProtectedRoute>} />
              <Route path='/artistRequest' element={<ProtectedRoute> <ArtistRequest /></ProtectedRoute>} />
              <Route path='/allSong' element={<ProtectedRoute> <AllSong /></ProtectedRoute>} />
              <Route path='/songAnalystic' element={<ProtectedRoute> <SongAnalystic /></ProtectedRoute>} />
              <Route path='/:id' element={<ProtectedRoute> <SingleSongAnalytics /></ProtectedRoute>} />
              <Route path='/allAlbum' element={<ProtectedRoute> <ListAlbum /></ProtectedRoute>} />
              <Route path='/album/:name' element={<ProtectedRoute> <SingleAlbum /></ProtectedRoute>} />

              <Route path='/allPlaylist' element={<ProtectedRoute> <AllPlaylist /></ProtectedRoute>} />
              <Route path='/addGenre' element={<ProtectedRoute> <AddGenre /></ProtectedRoute>} />
              <Route path='/allGenre' element={<ProtectedRoute> <ListGenre /></ProtectedRoute>} />
              <Route path='/allSubscription' element={<ProtectedRoute> <AllSubscription /></ProtectedRoute>} />
              <Route path='/singleSubscription/:id' element={<ProtectedRoute> <SingleSubscription /></ProtectedRoute>} />
              <Route path='/createAds' element={<ProtectedRoute> <CreateAds /></ProtectedRoute>} />
              <Route path='/listAds' element={<ProtectedRoute> <ListAds /></ProtectedRoute>} />
              <Route path='/singleAds/:id' element={<ProtectedRoute> <SingleAds /></ProtectedRoute>} />
              <Route path='/editGenre/:id' element={<ProtectedRoute> <EditGenre /></ProtectedRoute>} />
              <Route path='/singleEvent/:id' element={<ProtectedRoute> <SingleEvent /></ProtectedRoute>} />
              <Route path='/notification' element={<ProtectedRoute> <Notification /></ProtectedRoute>} />
              <Route path='/settings' element={<ProtectedRoute> <Settings /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
