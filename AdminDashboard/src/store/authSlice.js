import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/enumStatus/Status";
import { API, APIAuthenticated } from "../http/index";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        data:[],
        status:STATUS.LOADING,
        token:"",
        profile:"",
        singleUser:null
    },
    reducers : {
        setUserdata(state,action){
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
        },
        setProfile(state,action){
            state.profile=action.payload          
        },
        setSingleUser(state,action){
            state.singleUser=action.payload
        },
      // Optimistically delete the user
setDeleteUser(state, action) {
    const index = state.data.findIndex((user) => user._id === action.payload.id);
    if (index !== -1) {
      state.data.splice(index, 1);
    }
  }
  
        
    }
})

export const {setUserdata,setStatus, resetStatus,setToken,setProfile,setSingleUser, setDeleteUser}=authSlice.actions
export default authSlice.reducer

//login user
export function login(data){
    return async function loginThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response=await API.post("/api/login",data);
            if(response.status===200){
                const {token,data}=response.data;
                if (data.role !== 'admin') {
                    throw new Error('Only admins can log in.');
                  }
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(setUserdata(data));
                dispatch(setToken(token));
                localStorage.setItem('token',token);
            }else{
                dispatch(setStatus(STATUS.ERROR));
            }
        }catch(err){
            console.log(err);
            dispatch(setStatus(STATUS.ERROR));
        }  
    }
}

//user profile
export function ArtistProfile(){
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
           console.log(err);
            dispatch(setStatus(STATUS.ERROR));
        }  
    }
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



//delete user
export function deleteUser(id) {
    return async function deleteUserThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/api/user/${id}`);
            if (response.status === 200) {
                dispatch(setDeleteUser({id}));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}