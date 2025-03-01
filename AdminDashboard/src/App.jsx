import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import store from './store/store'
import { Provider } from 'react-redux'
import Tables from './pages/sidebar/Tables/Table'
import Users from './pages/sidebar/Tables/users/Users'
import Login from './pages/form/auth/Login'
import Profile from './pages/form/auth/Profile'
import Navbar from './globals/navbar/Navbar'
import ForgetPassword from '../../ArtistDashboard/src/pages/Auth/forgetPassword/ForgetPassword'
import AllSong from './pages/form/song/AllSong'
import ListAlbum from './pages/form/album/ListAlbum'
import AllPlaylist from './pages/playlist/AllPlaylist'
import AddGenre from './pages/form/genre/AddGenre'
import ListGenre from './pages/form/genre/ListGenre'
import EditGenre from './pages/form/genre/EditGenre'

function App() {

  return (
   <Provider store={store}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/tables' element={<Tables/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/allSong' element={<AllSong/>}/>
      <Route path='/allAlbum' element={<ListAlbum/>}/>
      <Route path='/allPlaylist' element={<AllPlaylist/>}/>
      <Route path='/addGenre' element={<AddGenre/>}/>
      <Route path='/allGenre' element={<ListGenre/>}/>
      <Route path='/editGenre/:id' element={<EditGenre/>}/>


    </Routes>
    </BrowserRouter>
   </Provider>
  )
}

export default App
