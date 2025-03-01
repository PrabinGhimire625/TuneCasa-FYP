import {configureStore} from "@reduxjs/toolkit"
import songSlice from "./songSlice"
import albumSlice from "./albumSlice"
import authSlice from "./authSlice"
import genreSlice from "./genreSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        song: songSlice,
        album:albumSlice,
        genre:genreSlice,
       
    }
})

export default store