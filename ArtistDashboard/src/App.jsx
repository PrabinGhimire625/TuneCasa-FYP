import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling
import AddSong from "./pages/AddForm/AddSong";
import AddAlbum from "./pages/AddForm/AddAlbum";
import ListAlbum from "./pages/Tables/ListAlbum";
import ListSong from "./pages/Tables/ListSong";
import Sidebar from "./globals/components/Sidebar";
import Navbar from "./globals/components/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import {Provider} from "react-redux"
import store from "./store/store"
import EditAlbum from "./pages/EditForm/EditAlbum";
import Login from "./pages/Auth/login/Login"
import Register from "./pages/Auth/signup/Register"
import ForgetPassword from "./pages/Auth/forgetPassword/ForgetPassword";
import VerifyOtp from "./pages/Auth/forgetPassword/VerifyOtp";
import ResetPassword from "./pages/Auth/forgetPassword/ResetPassword";
import Profile from "./pages/Auth/profile/Profile";
import EditProfile from "./pages/Auth/profile/EditProfile";
import EditSong from "./pages/EditForm/EditSong";
import AddEvent from "./pages/AddForm/AddEvent";
import ListEvent from "./pages/Tables/ListEvent";
import EditEvent from "./pages/EditForm/EditEvent";

function App() {
  return (
    <Provider  store={store}>
      <BrowserRouter>
      <ToastContainer />
        <div className="flex items-start min-h-screen">
          <Sidebar/>
          <div className="flex-1 h-screen overflow-y-scroll bg-gray-900">
            <Navbar/>
            <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editProfile/:id" element={<EditProfile/>}/>
                <Route path="/forgetPassword" element={<ForgetPassword/>}/>
                <Route path="/verifyOtp" element={<VerifyOtp/>}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/>
                <Route path="/add-song" element={<AddSong />} />
                <Route path="/add-album" element={<AddAlbum />} />
                <Route path="/add-event" element={<AddEvent />} />
                <Route path="/list-song" element={<ListSong />} />
                <Route path="/list-album" element={<ListAlbum />} />
                <Route path="/list-event" element={<ListEvent />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/editAlbum/:id" element={<EditAlbum />} />
                <Route path="/editSong/:id" element={<EditSong />} />
                <Route path="/editEvent/:id" element={<EditEvent />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
