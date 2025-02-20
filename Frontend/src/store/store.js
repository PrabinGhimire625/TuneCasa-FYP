import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import songSlice from "./songSlice"
import albumSlice from "./albumSlice"
import playerSlice from "./playerSlice"
import artistSlice from "./artistSlice"
import playlistSlice from "./playlistSlice"

const store=configureStore({
    reducer : {
        auth : authSlice,
        song:songSlice,
        album:albumSlice,
        player:playerSlice,
        artist:artistSlice,
        playlist:playlistSlice
        
    }
})

export default store