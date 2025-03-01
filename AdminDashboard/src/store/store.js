import {configureStore} from "@reduxjs/toolkit";
import  authSlice from "./authSlice"
import dataSlice from "./dataSlice"
import songSlice from "./songSlice"
import albumSlice from "./albumSlice"
import playlistSlice from "./playlistSlice"
import genreSlice from "./genreSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        data:dataSlice,
        song:songSlice,
        album:albumSlice,
        playlist:playlistSlice,
        genre:genreSlice

    }
})

export default store