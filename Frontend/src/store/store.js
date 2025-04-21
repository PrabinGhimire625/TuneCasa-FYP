import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import songSlice from "./songSlice"
import albumSlice from "./albumSlice"
import playerSlice from "./playerSlice"
import artistSlice from "./artistSlice"
import playlistSlice from "./playlistSlice"
import genreSlice from "./genreSlice"
import likeSlice from "./likeSlice"
import subscriptionSlice from "./subscriptionSlice"
import eventSlice from "./eventSlice"
import adsSlice from "./adsSlice"
import notificationSlice from "./notificationSlice"
import analyticSlice from "./analyticSlice"
import searchSlice from "./searchSlice"


const store=configureStore({
    reducer : {
        auth : authSlice,
        song:songSlice,
        album:albumSlice,
        player:playerSlice,
        artist:artistSlice,
        playlist:playlistSlice,
        genre:genreSlice,
        like:likeSlice,
        subscription:subscriptionSlice,
        event:eventSlice,
        ads:adsSlice,
        notifications:notificationSlice,
        analytics:analyticSlice,
        search:searchSlice,
    }
})

export default store