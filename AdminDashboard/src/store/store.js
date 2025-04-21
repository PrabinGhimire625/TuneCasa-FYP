import {configureStore} from "@reduxjs/toolkit";
import  authSlice from "./authSlice"
import dataSlice from "./dataSlice"
import songSlice from "./songSlice"
import albumSlice from "./albumSlice"
import playlistSlice from "./playlistSlice"
import genreSlice from "./genreSlice"
import adsSlice from "./adsSlice"
import artistSlice from "./artistSlice"
import eventSlice from "./eventSlice"
import analyticSlice from "./analyticSlice"
import subscriptionSlice from "./subscriptionSlice"
import notificationSlice from "./notificationSlice"
import searchSlice from "./searchSlice"
import checkoutSlice from "./checkoutSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        data:dataSlice,
        song:songSlice,
        album:albumSlice,
        playlist:playlistSlice,
        genre:genreSlice,
        ads:adsSlice,
        artist:artistSlice,
        event:eventSlice,
        analytics:analyticSlice,
        subscription:subscriptionSlice,
        notifications:notificationSlice,
        search:searchSlice,
        checkout:checkoutSlice,
    }
})

export default store