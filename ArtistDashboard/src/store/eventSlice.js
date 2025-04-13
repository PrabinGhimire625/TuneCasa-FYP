import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/Status";
import { APIAuthenticated } from "../http/index";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        event: [],
        status: STATUS.LOADING,
        singleEvent: null,
        artistUpcomingEvent:[],
    },
    reducers: {
        setEvent(state, action) {
            state.event = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setSingleEvent(state, action) {
            state.singleEvent = action.payload;
        },
        setArtistUpcommingEvent(state, action){
            state.artistUpcomingEvent=action.payload;
        },
        setDeleteEvent(state, action) {
            state.event = state.event.filter(event => event._id !== action.payload.eventId);
        },
        setUpdateEvent(state, action) {
            const index = state.event.findIndex(event => event._id === action.payload.id);
            if (index !== -1) {
                state.event[index] = {
                    ...state.event[index],
                    ...action.payload.eventData
                };
            }
        }
    }
});

export const { setEvent, setStatus, setSingleEvent, setDeleteEvent, setUpdateEvent, setArtistUpcommingEvent } = eventSlice.actions;
export default eventSlice.reducer;

//Add Event
export function addEvent(eventData) {
    return async function addEventThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/event", eventData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.status === 201) {
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

//List All Events
export function listAllEvent() {
    return async function listAllEventThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get("/api/event");
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setEvent(data));
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

//List Single Event
export function listSingleEvent(id) {
    return async function listSingleEventThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get(`/api/event/${id}`);
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setSingleEvent(data));
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

//Delete Event
export function deleteEvent(eventId) {
    return async function deleteEventThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/api/event/${eventId}`);
            if (response.status === 200) {
                dispatch(setDeleteEvent({ eventId }));
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

//Update Event
export function updateEvent({ id, eventData }) {
    return async function updateEventThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.patch(`/api/event/${id}`, eventData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setUpdateEvent({ id, eventData: data })); // Fix payload structure
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

//artist song count
export function CountArtistUpcommingEvent(){
    return async function CountArtistUpcommingEventThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.get("/api/event/artistEvent/count");
        if(response.status===200){
            const {data} =response.data;
            dispatch(setArtistUpcommingEvent(data));
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