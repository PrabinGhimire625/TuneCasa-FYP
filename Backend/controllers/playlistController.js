import Playlist from "../models/playlistModel.js";

//create playlist
export const createPlaylist = async (req, res) => {
  try {
    const { title, description, privacy, songs } = req.body;
    const userId=req.user.id;

    const newPlaylist = new Playlist({
      title,
      description,
      privacy,
      userId,
      songs: songs || [], // Initialize with an empty array if no songs are provided
    });

    const savedPlaylist = await newPlaylist.save();
    res.status(200).json({message:"Playlist is created successfully", data:savedPlaylist});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get all playlist
export const getAllPlaylist=async(req,res)=>{
  const allPlaylist=await Playlist.find();
  if(allPlaylist.length<1){
      return res.status(404).json({message:"allPlaylist not found"});   
  }
  res.status(200).json({message: "Successfull get all the Playlist",data:allPlaylist});
}

//get single playlist
export const getSinglePlaylist=async(req, res)=>{
  const id= req.params.id;
  const singlePlaylist= await Playlist.findById(id);
  if(!singlePlaylist){
    return res.status(400).json({message:"Playlist not found"});
  }
  res.status(200).json(({message: " Successfully get the single playlist", data:singlePlaylist}));
}

//delete playlist 
export const deletePlaylist=async(req, res)=>{
  const id=req.params.id;
  const playlist=await Playlist.findByIdAndDelete(id);
  if(!playlist){
    return res.status(400).json({message:"Playlist not found"});
  }
  res.status(200).json(({message: " Playlist deleted successfully"}));
}

