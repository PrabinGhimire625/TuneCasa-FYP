import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Display from "./components/display/Display"
import Sidebar from "./components/pages/sidebar/Sidebar"
import Navbar from "./globals/components/navbar/Navbar"
import SingleAlbum from "./components/pages/singleAlbum/SingleAlbum"
import DisplaySingleAlbum from "./components/pages/singleAlbum/DisplaySingleAlbum"
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


function App() {
  return (
    <>       
      <Provider store={store}>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Display/>}/>
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
            <Route path="/album/:id" element={<DisplaySingleAlbum/>}/>
          </Routes>
      </BrowserRouter>

      </Provider>

    </>
  )
}

export default App
