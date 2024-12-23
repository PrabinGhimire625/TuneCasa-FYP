import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import songRouter from "./routes/songRoute.js";
import albumRouter from "./routes/albumRoute.js"
import userRouter from "./routes/userRoute.js"
import connectDB from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminSeeder from "./adminSeeder.js";
dotenv.config()

//app config
const app=express();
const port=process.env.PORT || 3000;

connectDB(); //to connect the mongodb
connectCloudinary(); //to connect the cloudinary
adminSeeder();

//middleware
app.use(express.json());
app.use(express.urlencoded()); 
app.use(cors());

//import routes
app.use("/api/user",userRouter)
app.use("/api/song",songRouter)
app.use("/api/album",albumRouter)

app.listen(port,()=>{
    console.log(`Server is running on the PORT ${port}`)
})


