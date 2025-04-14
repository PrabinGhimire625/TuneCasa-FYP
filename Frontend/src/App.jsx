import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/pages/sidebar/Sidebar";
import Navbar from "./globals/components/navbar/Navbar";
import SingleAlbum from "./components/pages/singleAlbum/SingleAlbum";
import Form from "./components/pages/auth/Form";
import Login from "./components/pages/auth/login/Login";
import Register from "./components/pages/auth/signup/Register";
import Profile from "./components/pages/auth/profile/Profile";
import EditProfile from "./components/pages/auth/profile/editProfile/EditProfile";
import store from "./store/store";
import { Provider } from "react-redux";
import ForgetPassword from "./components/pages/auth/forgetPassword/ForgetPassword";
import VerifyOtp from "./components/pages/auth/forgetPassword/VerifyOtp";
import ResetPassword from "./components/pages/auth/forgetPassword/ResetPassword";
import Player from "./components/pages/player/Player";
import DisplayHome from "./components/display/DisplayHome";
import ArtistDetails from "./components/pages/artist/ArtistDetails";
import SingleSong from "./components/pages/singleSong/SingleSong";
import SinglePlaylist from "./components/pages/playlist/SinglePlaylist";
import EditPlaylist from "./components/pages/playlist/EditPlaylist";
import Playlist from "./components/pages/playlist/Playlist";
import Genre from "./components/pages/genre/Genre";
import Library from "./components/pages/library/Library";
import LikeSong from "./components/pages/Like/LikeSong";
import AllPlaylist from "./components/pages/playlist/AllPlaylist";
import GenreBasedSong from "./components/pages/genre/GenreBasedSong";
import Payment from "./components/pages/payment/Payment";
import Plan from "./components/pages/payment/Plan";
import Checkout from "./components/pages/payment/Checkout";
import VerifyPayment from "./components/pages/payment/VerifyPayment";
import MainSubscription from "./components/pages/payment/MainSubscription ";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./components/pages/auth/googleLogin/GoogleLogin";
import DisplayArtist from "./components/pages/artist/DisplayArtist";
import SingleArtist from "./components/pages/artist/SingleArtist";
import ListAds from "../../AdminDashboard/src/pages/form/ads/ListAds";
import GenreDetails from "./components/pages/genre/GenreDetails";
import ArtistList from "./components/pages/artist/ArtistList";
import SingleEvent from "./components/pages/artist/SingleEvent";
import Footer from "./globals/components/footer/Footer";
import AllAlbum from "./components/pages/Home/AllAlbum";
import AboutUs from "./components/pages/AboutUs/AboutUs";
import Settings from "./components/pages/setting/Setting";
import Following from "./components/pages/artist/Following";
import Notification from "./components/pages/Notification/Notification";
import TopListeningSong from "./components/pages/recommendation/TopListeningSong";
import LatestArtistSong from "./components/pages/recommendation/LatestArtistSong";
import LatestSystemSong from "./components/pages/recommendation/LatestSystemSong";



function App() {
  return (
    <>  
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 relative">
              {/* Sidebar - hidden on mobile, visible on larger screens */}
              <div className="hidden md:block">
                <Sidebar />
              </div>
              
              {/* Main content area */}
              <div className="flex-1 h-screen overflow-y-auto bg-[#121212] pb-[100px] px-4 md:px-6 flex  justify-center">
                <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/form" element={<Form />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile /> } />

                <Route path="/editProfile/:id" element={<EditProfile />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/verifyOtp" element={<VerifyOtp />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/allAlbum" element={<AllAlbum />} />
                <Route path="/album/:name" element={<ProtectedRoute> <SingleAlbum /></ProtectedRoute>} />
                <Route path="/singleSong/:id" element={<SingleSong />} />
                <Route path="/artistDetails/:id"  element={ <ProtectedRoute> <ArtistDetails /></ProtectedRoute>}/>

                <Route path="/artistList" element={<ArtistList />} />
                <Route path="/displayArtist" element={<DisplayArtist />} />
                <Route path="/singlePlaylist/:id" element={<ProtectedRoute> <SinglePlaylist /></ProtectedRoute>} />
                <Route path="/editplaylist/:id" element={<EditPlaylist />} />
                {/* <Route path="/playlist" element={<Playlist />} /> */}
                <Route path="/playlist" element={<ProtectedRoute> <Playlist /></ProtectedRoute>}/>
                <Route path="/allPlaylist" element={<AllPlaylist />} />
  
                <Route path="/allGenre" element={<Genre />} />
                <Route path="/genreDetails/:genre" element={<GenreDetails />} />
                <Route path="/genreBasedSong/:genre" element={<GenreBasedSong />} />
                <Route path="/library" element={<ProtectedRoute> <Library /></ProtectedRoute>} />
                <Route path="/likeSong"  element={<ProtectedRoute> <LikeSong /></ProtectedRoute>}/>
                <Route path="/payment" element={<Payment />} />
                <Route path="/mainSubcription" element={<MainSubscription />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/checkout/:planName" element={<Checkout />} />
                <Route path="/verifyPayment" element={<VerifyPayment />} />
                <Route path="/singleArtist/:id" element={<SingleArtist />} />
                <Route path="/singleEvent/:id" element={<SingleEvent />} />
                <Route path="/listAds" element={<ListAds />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/setting" element={<Settings />} />
                <Route path="/following" element={<Following />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/topListeningSong" element={<TopListeningSong />} />
                <Route path="/latestArtistSong" element={<LatestArtistSong />} />
                <Route path="/latestSystemSong" element={<LatestSystemSong />} />
                
                {/* GoogleLogin Route */}
                <Route 
                  path="/googleLogin" 
                  element={
                    <GoogleOAuthProvider clientId="687900192771-rqsgh5k9r6kvqt7kmiatsh9cov55a5qv.apps.googleusercontent.com">
                      
                      <GoogleLogin 
                        onSuccess={(response) => console.log("Google login success", response)} 
                        onError={(error) => console.log("Google login error", error)} 
                      />
                    </GoogleOAuthProvider>
                  } 
                />
              </Routes>
              </div>
              
            </div>
          
            
            {/* Player fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 z-50">
              <Player />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}


export default App;
