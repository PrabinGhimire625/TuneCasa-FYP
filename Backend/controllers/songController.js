import {v2 as cloudinary} from "cloudinary"
import songModel from "../models/songModel.js";

//add songs
export const addSong = async (req, res) => {
        const { name, desc, album } = req.body;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        // Upload audio as "video" resource type
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        // Format duration in minutes and seconds
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        // Prepare song data
        const songData = {
            name, 
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        };

        const song = await songModel.create(songData);
        res.status(200).json({ message: "Song is successfully added!", data: song });
}

//get all the song
export const getAllSong=async(req,res)=>{
        const allSongs=await songModel.find();
        if(allSongs.length<1){
            return res.status(404).json({message:"Songs not found"});   
        }
        res.status(200).json({message: "Successfull get all the songs",data:allSongs});
}

//fetch single song
export const fetchSingleSong=async(req,res)=>{
    const id=req.params.id;
    const singleSong=await songModel.findById(id);
    if(!singleSong){
        return res.status(404).json({message:"Songs not found"});   
    }
    res.status(200).json({message:"Successfully fetch the single song",data:singleSong});
}

//delete song
export const deleteSong=async(req,res)=>{
    const {id}=req.params;
    const deleteSingleSong=await songModel.findByIdAndDelete(id);
     if (!deleteSingleSong) {
        return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({message:"Successfully delete the song"});
}

//update song
// export const updateSong = async (req, res) => {
//     const { id } = req.params;
//     const { name, desc, album } = req.body;

//     // Retrieve the current song data to retain existing files if not replaced
//     const existingSong = await songModel.findById(id);
//     if (!existingSong) {
//         return res.status(404).json({ message: "Song not found" });
//     }

//     let audioUrl = existingSong.file;
//     let imageUrl = existingSong.image;
//     let duration = existingSong.duration;

//     // Check if a new audio file is provided, then upload and update it
//     if (req.files.audio && req.files.audio[0]) {
//         const audioFile = req.files.audio[0];
//         const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
//         audioUrl = audioUpload.secure_url;
//         duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;
//     }

//     // Check if a new image file is provided, then upload and update it
//     if (req.files.image && req.files.image[0]) {
//         const imageFile = req.files.image[0];
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
//         imageUrl = imageUpload.secure_url;
//     }

//     // Update the song data
//     const updatedSong = await songModel.findByIdAndUpdate(
//         id,
//         { name, desc, album, image: imageUrl, file: audioUrl, duration },
//         { new: true } // Return the updated document
//     );

//     res.status(200).json({ message: "Song updated successfully", data: updatedSong });
// };

