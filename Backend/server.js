import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import songRouter from "./routes/songRoute.js";
import albumRouter from "./routes/albumRoute.js"
import userRouter from "./routes/userRoute.js"
import playlistRouter from "./routes/playlistRoute.js"
import genreRouter from "./routes/genreRoute.js"
import eventRouter from "./routes/eventRoute.js"
import likeRouter from "./routes/likeRoute.js"
import subscriptionRouter from "./routes/subscriptionRoute.js"
import songAnalyticsRoutes from "./routes/songAnalyticsRoutes.js"
import adsRouter from "./routes/adRoutes.js"
import connectDB from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminSeeder from "./adminSeeder.js";

import './cron/expireSubscription.js'; // Import the cron job file


dotenv.config()

//app config
const app=express();
const port=process.env.PORT || 3000;

connectDB(); //to connect the mongodb
connectCloudinary(); //to connect the cloudinary
adminSeeder();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//import routes
app.use("/api",userRouter)
app.use("/api/song",songRouter)
app.use("/api/album",albumRouter)
app.use("/api/playlist",playlistRouter)
app.use("/api/genre",genreRouter)
app.use("/api/event",eventRouter)
app.use("/api/like",likeRouter)
app.use("/api/subscription",subscriptionRouter)
app.use("/api/ads",adsRouter)
app.use("/api/song-analytics",songAnalyticsRoutes)

app.listen(port,()=>{
    console.log(`Server is running on the PORT ${port}`)
})


