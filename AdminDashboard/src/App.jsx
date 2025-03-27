import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex items-start min-h-screen ">
          <Sidebar />
          <div className="flex-1 h-screen overflow-y-scroll bg-gray-900">
            <Navbar />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/dashboard' element={<Dashboard />} />

              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/users' element={<Users />} />
              <Route path='/displayArtist' element={<DisplayArtist />} />
              <Route path='/singleArtist/:id' element={<SingleArtist />} />
              <Route path='/artistRequest' element={<ArtistRequest />} />
              <Route path='/allSong' element={<AllSong />} />
              <Route path='/songAnalystic' element={<SongAnalystic />} />
              <Route path='/singleSongAnalytics/:id' element={<SingleSongAnalytics />} />
              <Route path='/allAlbum' element={<ListAlbum />} />
              <Route path='/allPlaylist' element={<AllPlaylist />} />
              <Route path='/addGenre' element={<AddGenre />} />
              <Route path='/allGenre' element={<ListGenre />} />
              <Route path='/allSubscription' element={<AllSubscription />} />
              <Route path='/singleSubscription/:id' element={<SingleSubscription />} />
              <Route path='/createAds' element={<CreateAds />} />
              <Route path='/listAds' element={<ListAds />} />
              <Route path='/editGenre/:id' element={<EditGenre />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
