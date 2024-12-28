import {configureStore} from "@reduxjs/toolkit"
import songSlice from "./songSlice"
import albumSlice from "./albumSlice"
import authSlice from "./authSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        song: songSlice,
        album:albumSlice,
    }
})

export default store