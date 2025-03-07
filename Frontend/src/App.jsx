import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/pages/sidebar/Sidebar"
import Navbar from "./globals/components/navbar/Navbar"
import SingleAlbum from "./components/pages/singleAlbum/SingleAlbum"
import Form from "./components/pages/auth/Form"
import Login from "./components/pages/auth/login/Login"
import Register from "./components/pages/auth/signup/Register"
import Profile from "./components/pages/auth/profile/Profile"
import EditProfile from "./components/pages/auth/profile/editProfile/EditProfile"
import store from "./store/store"
import { Provider } from "react-redux"
import ForgetPassword from "./components/pages/auth/forgetPassword/ForgetPassword"
import VerifyOtp from "./components/pages/auth/forgetPassword/VerifyOtp"
import ResetPassword from "./components/pages/auth/forgetPassword/ResetPassword"
import Player from "./components/pages/player/Player"
import DisplayHome from "./components/display/DisplayHome"
import ArtistDetails from "./components/pages/artist/ArtistDetails"
import SingleSong from "./components/pages/singleSong/SingleSong"
import SinglePlaylist from "./components/pages/playlist/SinglePlaylist"
import EditPlaylist from "./components/pages/playlist/EditPlaylist"
import Playlist from "./components/pages/playlist/Playlist"
import Genre from "./components/pages/genre/Genre"
import Library from "./components/pages/library/Library"
import LikeSong from "./components/pages/Like/LikeSong"
import AllPlaylist from "./components/pages/playlist/AllPlaylist"
import GenreBasedSong from "./components/pages/genre/GenreBasedSong"
import Payment from "./components/pages/payment/Payment"
import Plan from "./components/pages/payment/Plan"
import Checkout from "./components/pages/payment/Checkout"
import VerifyPayment from "./components/pages/payment/VerifyPayment"


function App() {
  return (
    <>       
      <Provider store={store}>
        <BrowserRouter>
        <Navbar/>
        <div className="flex items-start min-h-screen">
          <Sidebar/>
          <div className="flex-1 h-screen overflow-y-scroll bg-[#121212]">
            <Routes>
              <Route path="/" element={<DisplayHome/>}/>
              <Route path="/form" element={<Form/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/editProfile/:id" element={<EditProfile/>}/>
              <Route path="/forgetPassword" element={<ForgetPassword/>}/>
              <Route path="/verifyOtp" element={<VerifyOtp/>}/>
              <Route path="/resetPassword" element={<ResetPassword/>}/>
              <Route path="/navbar" element={<Navbar/>}/>
              <Route path="/sidebar" element={<Sidebar/>}/>
              <Route path="/album/:name" element={<SingleAlbum/>}/>
              <Route path="/singleSong/:id" element={<SingleSong/>}/>
              <Route path="/artistDetails/:id" element={<ArtistDetails/>}/>
              <Route path="/singlePlaylist/:id" element={<SinglePlaylist/>}/>
              <Route path="/editplaylist/:id" element={<EditPlaylist/>}/>
              <Route path="/playlist" element={<Playlist/>}/>
              <Route path="/allPlaylist" element={<AllPlaylist/>}/>
              <Route path="/allGenre" element={<Genre/>}/>
              <Route path="/genreBasedSong/:id" element={<GenreBasedSong/>}/>
              <Route path="/library" element={<Library/>}/>
              <Route path="/likeSong" element={<LikeSong/>}/>
              <Route path="/payment" element={<Payment/>}/>
              <Route path="/plan" element={<Plan/>}/>
              <Route path="/checkout/:planName" element={<Checkout/>}/>
              <Route path="/verifyPayment" element={<VerifyPayment/>}/>
            </Routes>
          </div>
        </div>
   
       
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
