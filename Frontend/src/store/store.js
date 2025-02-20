import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import songSlice from "./songSlice"
import albumSlice from "./albumSlice"
import playerSlice from "./playerSlice"
import artistSlice from "./artistSlice"

const store=configureStore({
    reducer : {
        auth : authSlice,
        song:songSlice,
        album:albumSlice,
        player:playerSlice,
        artist:artistSlice
    }
})

export default store