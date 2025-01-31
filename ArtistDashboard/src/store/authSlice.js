import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/Status";
import { API, APIAuthenticated } from "../http/index";
import axios from "axios";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        data:[],
        status : STATUS.LOADING,
        token:"",
        profile:""   
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
        setUpdateUserProfile(state,action){
            const index=state.data.findIndex(item=>item.id===action.payload.id);
            if(index!==-1){c
                state.data[index]={
                    ...state.data[index],
                    ...action.payload.data
                }
            }
        }
    }
})


export const {setUserData,setStatus,resetStatus,setToken,setProfile,setUpdateUserProfile}=authSlice.actions
export default authSlice.reducer

//signup
export function register(data) {
    return async function registerUserThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.post("/api/artist/register", data);
            console.log(response);
            if (response.status === 200) {
                dispatch(setUserData(response.data.data)); 
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
            const response=await API.post("/api/artist/login",data);
            if(response.status===200){
                const {token,data}=response.data;
                console.log(data)
                console.log(token)
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

//user profile
export function artistProfile(){
    return async function artistProfileThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response=await APIAuthenticated.get("/api/artist/profile");
            console.log(response);
            if(response.status===200){
                const {data}=response.data;
                console.log(data);
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
export function updateArtistProfile({ id, userData }) {
    return async function updateArtistProfileThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));  // Reset status to loading

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
