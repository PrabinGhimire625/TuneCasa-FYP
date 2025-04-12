import {configureStore} from "@reduxjs/toolkit"
import songSlice from "./songSlice"
import albumSlice from "./albumSlice"
import authSlice from "./authSlice"
import genreSlice from "./genreSlice"
import eventSlice from "./eventSlice"
import analyticSlice from "./analyticSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        song: songSlice,
        album:albumSlice,
        genre:genreSlice,
        event:eventSlice,
        analytics:analyticSlice,
       
    }
})

export default store