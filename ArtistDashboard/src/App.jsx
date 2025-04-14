import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from './protectedRoutes/ProtectedRoute'; 
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
import SongAnalytics from "./pages/Tables/SongAnalytics";
import SingleSongAnalytics from "./pages/Tables/SingleSongAnalytics";
import Checkout from "./pages/checkout/Checkout";
import SingleCheckout from "./pages/checkout/SingleCheckout";
import Footer from "./globals/components/Footer";
import SingleSong from "./pages/SinglePages/SingleSong";
import SongByAlbum from "./pages/Tables/SongByAlbum";
import UpComingEvent from "./pages/event/UpComingEvent";
import SingleEvent from "./pages/event/SingleEvent";
import { FolderLock } from "lucide-react";
import FollowerList from "./pages/follower/FollowerList";
import TrendingSong from "./pages/mostPlaySong/TrendingSong";
import AccountSetting from "./pages/support/AccountSetting";
import ContactSupport from "./pages/support/ContactSupport";
import HelpCenter from "./pages/support/HelpCenter";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Notification from "./pages/notification/Notification";

function App() {
  return (
    <Provider  store={store}>
      <BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} />
        <div className="flex items-start min-h-screen bg-gray-900">
          <Sidebar/>
          <div className="flex-1 h-screen overflow-y-scroll bg-gray-900">
            <Navbar/>
            <div className="pt-8 pl-5  sm:pl-12">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />

                <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} />
                <Route path="/editProfile/:id" element={<ProtectedRoute> <EditProfile /></ProtectedRoute>}/>
                <Route path="/forgetPassword" element={<ProtectedRoute> <ForgetPassword /></ProtectedRoute>}/>
                <Route path="/verifyOtp" element={<ProtectedRoute> <VerifyOtp /></ProtectedRoute>}/>
                <Route path="/resetPassword" element={<ProtectedRoute> <ResetPassword /></ProtectedRoute>}/>
              

                <Route path="/add-song" element={<ProtectedRoute> <AddSong /></ProtectedRoute>} />
                <Route path="/allSong" element={<ProtectedRoute> <ListSong /></ProtectedRoute>}/>
                <Route path="/singleSong/:id" element={<ProtectedRoute> <SingleSong /></ProtectedRoute>} />
                <Route path="/editSong/:id" element={<ProtectedRoute> <EditSong /></ProtectedRoute>} />

                <Route path="/add-album" element={<ProtectedRoute> <AddAlbum /></ProtectedRoute>} />
                <Route path="/list-album" element={<ProtectedRoute> <ListAlbum /></ProtectedRoute>} />
                <Route path="/editAlbum/:id"element={<ProtectedRoute> <EditAlbum /></ProtectedRoute>} />
                <Route path="/album/:name" element={<ProtectedRoute> <SongByAlbum /></ProtectedRoute>} />

                <Route path="/add-event" element={<ProtectedRoute> <AddEvent /></ProtectedRoute>} />
                <Route path="/list-event"element={<ProtectedRoute> <ListEvent /></ProtectedRoute>} />
                <Route path="/singleEvent/:id" element={<ProtectedRoute> <SingleEvent /></ProtectedRoute>} />
                <Route path="/editEvent/:id" element={<ProtectedRoute> <EditEvent /></ProtectedRoute>} />

                <Route path="/songAnalytics" element={<ProtectedRoute> <SongAnalytics /></ProtectedRoute>} />
                <Route path="/singleSongAnalytics/:id" element={<ProtectedRoute> <SingleSongAnalytics /></ProtectedRoute>} />

                <Route path="/checkout" element={<ProtectedRoute> <Checkout /></ProtectedRoute>} />
                <Route path="/:id" element={<ProtectedRoute> <SingleCheckout /></ProtectedRoute>} />
             
                <Route path="/upcomingEvents" element={<ProtectedRoute> <UpComingEvent /></ProtectedRoute>}/>
                <Route path="/followerList" element={<ProtectedRoute> <FollowerList /></ProtectedRoute>} />
                <Route path="/trendingSong" element={<ProtectedRoute> <TrendingSong /></ProtectedRoute>} />

                <Route path="/accountSetting" element={<ProtectedRoute> <AccountSetting /></ProtectedRoute>} />
                <Route path="/contactSupport" element={<ProtectedRoute> <ContactSupport /></ProtectedRoute>}/>
                <Route path="/helpCenter" element={<ProtectedRoute> <HelpCenter /></ProtectedRoute>} />
                <Route path="/notification" element={<ProtectedRoute> <Notification /></ProtectedRoute>} />

                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </div>
          </div>
         
        </div>
         <Footer/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
