import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/enumStatus/Status";
import { API, APIAuthenticated } from "../http";
import axios from "axios";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        data:[],
        status : STATUS.LOADING,
        token:"",
        profile:"",
        artist:[],
        singleUser:null
    },
    reducers:{
        setUserData(state,action){
            state.data=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        },
        resetStatus(state){
            state.status=STATUS.LOADING
        },
        setToken(state,action){
            state.token=action.payload;
            console.log(state.token);
        },
        setProfile(state,action){
            state.profile=action.payload
        },
        setSingleUser(state,action){
            state.singleUser=action.payload
        },
        setArtistData(state, action){
            state.artist=action.payload
        },
        setUpdateUserProfile(state,action){
            const index=state.data.findIndex(item=>item.id===action.payload.id);
            if(index!==-1){
                state.data[index]={
                    ...state.data[index],
                    ...action.payload.data
                }
            }
        }
    }
})

export const {setUserData,setArtistData,setStatus,resetStatus,setToken,setProfile,setUpdateUserProfile, setSingleUser}=authSlice.actions
export default authSlice.reducer

//signup
export function register(data) {
    return async function registerUserThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.post("/api/user/register", data);
            if (response.status === 200) {
                dispatch(setUserData(response.data.data)); // Store user data after registration
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}

//login
export function login(data){
    return async function loginThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response=await API.post("/api/login",data);
            if(response.status===200){
                const {token,data}=response.data;
                dispatch(setProfile(data));
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(setToken(token));
                localStorage.setItem('token',token);
            }else{
                dispatch(setStatus(STATUS.ERROR));
            }
        }catch(err){
            dispatch(setStatus(STATUS.ERROR));
        }  
    }
}

// export function googleLogin(code) {
//     return async function googleLoginThunk(dispatch) {
//       dispatch(setStatus(STATUS.LOADING));
//       try {
//         const response = await API.get(`api/auth/google?code=${code}`);
//         if (response.status === 200) {
//             console.log(data)
//             console.log(token)
//           const { data, token } = response.data;
//             dispatch(setProfile(data));
//             dispatch(setStatus(STATUS.SUCCESS));
//             dispatch(setToken(token));
//             localStorage.setItem('token',token);
//         } else {
//           dispatch(setStatus(STATUS.ERROR));
//         }
//       } catch (err) {
//         dispatch(setStatus(STATUS.ERROR));
//       }
//     };
//   }

//user profile
export function userProfile(){
    return async function userProfileThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response=await APIAuthenticated.get("/api/user/profile");
            if(response.status===200){
                const {data}=response.data;
                dispatch(setProfile(data));
                dispatch(setStatus(STATUS.SUCCESS));  
            }else{
                dispatch(setStatus(STATUS.ERROR));
            }
        }catch(err){
            dispatch(setStatus(STATUS.ERROR));
        }  
    }
}


//update user
export function updateUserProfile({ id, userData }) {
    return async function updateUserProfileThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
        const response = await APIAuthenticated.patch(`/api/user/profile/${id}`, userData, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        });
  
        if (response.status === 200) {
          const { data } = response.data;
          dispatch(setUpdateUserProfile({ id, data })); 
          dispatch(setStatus(STATUS.SUCCESS));
        } else {
          dispatch(setStatus(STATUS.ERROR));
          throw new Error("Update failed");
        }
      } catch (err) {
        dispatch(setStatus(STATUS.ERROR));
        console.error("Error updating profile:", err);
        throw err;
      }
    };
}
  
//fetch single user
export function fetchSingleUser(id){
    return async function fetchSingleUserThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response=await APIAuthenticated.get(`/api/user/${id}`);
            if(response.status===200){
                const {data}=response.data;
                dispatch(setSingleUser(data));
                dispatch(setStatus(STATUS.SUCCESS));
            }else{
                dispatch(setStatus(STATUS.ERROR));
            }
        }catch(err){
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}


//fetch single user
export function sendMessageToArtist(artistId, message, phone, address) {
    return async function (dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
        const response = await APIAuthenticated.post(`/api/messages/send-message-to-artist`, {
          artistId,
          message,  // Direct message string
          phone,
          address
        });
        
        if (response.status === 200) {
          const { data } = response.data;
          dispatch(setStatus(STATUS.SUCCESS));
          // Optionally, you can dispatch additional actions here to store the response data if needed
        } else {
          dispatch(setStatus(STATUS.ERROR));
        }
      } catch (err) {
        console.error("Error sending message:", err);
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  }
  

