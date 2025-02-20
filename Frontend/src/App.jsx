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


function App() {
  return (
    <>       
      <Provider store={store}>
        <BrowserRouter>
        <Navbar/>
        <div className="flex items-start min-h-screen">
          <Sidebar/>
          <div className="flex-1 h-screen overflow-y-scroll bg-stone-900">
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
              <Route path="/artistDetails/:id" element={<ArtistDetails/>}/>
            </Routes>
          </div>
        </div>
        <Player/>
        <audio preload="auto"></audio>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
