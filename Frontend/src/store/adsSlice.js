import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/enumStatus/Status";
import { API, APIAuthenticated } from "../http";

const adsSlice=createSlice({
    name:"ads",
    initialState:{
        ads:[],
        status:STATUS.LOADING,
        singleAds:null,
        adsForFreeUsers:null,
        trackView:null,
        adsSkips:null,
        adsClick:null,
    },
    reducers:{
        setAds(state,action){
            state.ads=action.payload
        },
        setAdsForFreeUser(state,action){
            state.adsForFreeUsers=action.payload
        },
        setTrackAdsView(state, action) {
            state.trackView = (state.trackView || 0) + 1; 
        },
        
        setTrackAdsSkips(state,action){
            state.adsSkips=action.payload
        },
        setTrackAdsClick(state,action){
            state.adsClick=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        },
        setSingleAds(state,action){
            state.singleAds=action.payload
        },
        setDeleteAds(state, action) {
            const index = state.ads.findIndex(ad => ad._id === action.payload.adsId); 
            if (index !== -1) {
                state.ads.splice(index, 1); 
            }
        },
        setUpdateAds(state, action) {
            const index = state.ads.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.ads[index] = {
                    ...state.ads[index], 
                    ...action.payload.adsData 
                };
            }
        }
        
    }
})

export const {setAds,setStatus,setSingleAds,setDeleteAds,setUpdateAds, setAdsForFreeUser, setTrackAdsView, setTrackAdsSkips, setTrackAdsClick}=adsSlice.actions
export default adsSlice.reducer


//add ads
export function createAds(adsData){
    return async function createAdsThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response= await APIAuthenticated.post("/api/ads", adsData,{
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            })
            console.log(response)
            if(response.status===200){
                dispatch(setStatus(STATUS.SUCCESS));
            }else{
                dispatch(setStatus(STATUS.ERROR));
            }
        }catch(err){
            dispatch(setStatus(STATUS.ERROR));
        } 
    }
}


//list all the ad
export function listAllAds(){
    return async function listAllAdsThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await API.get("/api/ads");
        if(response.status===200){
            const {data} =response.data;
            dispatch(setAds(data));
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

//list the single ads
export function listSingleAds(id){
    return async function listSingleAdsThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.get(`/api/ads/${id}`);
        if(response.status===200){
            const {data} =response.data;
            dispatch(setSingleAds(data));
            dispatch(setStatus(STATUS.SUCCESS));
        }
        else{
            dispatch(setStatus(STATUS.ERROR));  
        }
        }catch(err){
        dispatch(setStatus(STATUS.ERROR));  
        }  
    }
}

//delete the ads
export function deleteAds(adsId){
    return async function deleteAdsThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.delete(`/api/ads/${adsId}`);
        console.log(response);
        if(response.status===200){
            dispatch(setDeleteAds({adsId}));
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

//update ads
export function updateAds({id, adsData}){
    return async function updateAdsThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        const response= await APIAuthenticated.patch(`/api/ads/${id}`, adsData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        if(response.status===200){
            const { data } = response.data;
            dispatch(setUpdateAds({ id, data })); 
            dispatch(setStatus(STATUS.SUCCESS));
        }else{
            dispatch(setStatus(STATUS.ERROR));
        }
    } 
}

//list all the freeuser
export function getAdsForFreeUsers(){
    return async function getAdsForFreeUsersThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.get("/api/ads/freeAds");
        if(response.status===200){
            const {data} =response.data;
            dispatch(setAdsForFreeUser(data));
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

//track ads view
export function trackAdWatchTime({ id, watchTime }) {
    return async function trackAdWatchTimeThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/ads/track-watchTime", {
                id,
                watchTime
            });

            if (response.status === 200) {
                dispatch(setTrackAdsView(response.data)); 
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}


//track ads skips
export function trackAdSkip(id) {
    return async function trackAdSkipThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/ads/track-skip", { id });

            if (response.status === 200) {
                dispatch(setTrackAdsSkips(response.data));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}


//track-click
export function trackAdClick(id) {
    return async function trackAdClickThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/ads/track-click", { id });

            if (response.status === 200) {
                dispatch(setTrackAdsClick(response.data));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
