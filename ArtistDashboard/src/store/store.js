import {configureStore} from "@reduxjs/toolkit"
import songSlice from "./songSlice"
import albumSlice from "./albumSlice"
import authSlice from "./authSlice"
import genreSlice from "./genreSlice"
import eventSlice from "./eventSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        song: songSlice,
        album:albumSlice,
        genre:genreSlice,
        event:eventSlice,
       
    }
})

export default store