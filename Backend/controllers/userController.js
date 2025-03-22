import User from "../models/userModel.js";
import Artist from "../models/artistModel.js";
import {v2 as cloudinary} from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../services/sendEmail.js";
import { sendEmailToAdmin,sendEmailToArtist } from '../services/SendAdminEmail.js';
import axios from "axios";
import { oauth2Client } from "../config/googleConfig.js"; 
import { sendMessageToArtistEmail } from "../services/SendAdminEmail.js";


//user registration
export const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPassword,role });
    await newUser.save();
    res
      .status(200)
      .json({ message: `${role} registered successfully`, data: newUser });
  
};

//user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h",});
   // res.cookie("token", token);
    res.status(200).json({ message: "Login successful", token, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

//googlelogin
export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ message: 'Authorization code missing' });
    }

    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user information from Google API
    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    );

    const { email, name, image } = userResponse.data;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, image });
    }

    const { _id } = user;

    // Generate JWT for the user
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });

    // Send response with JWT and user information
    return res.status(200).json({ message: 'Success', token, user });
  } catch (err) {
    console.error('Google login error:', err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};


//user Profile
export const profile = async (req, res) => {
  const id = req.user.id; 
  try {
    const profileData = await User.findById(id);
    if (profileData) {
      res.status(200).json({
        message: "Successfully fetched the user profile",
        data: profileData,
      });
    } else {c
      res.status(404).json({ message: "Error fetching user profile", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", errorMessage: err.message });
  }
};

//fetch all user
export const fetchAllUser=async(req,res)=>{
  const allUser=await User.find(); 
 if(allUser.length>0){
  res.status(200).json({message:"Successfully fetch all the users",data:allUser});
 }else{
  res.status(404).json({message:"User not found"});
 }
}


//fetch single user
export const fetchSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user by ID
    const singleUser = await User.findById(id);
    
    if (singleUser) {
      // Find the artist by the user's ID and populate the bio field
      const artist = await Artist.findOne({ userId: singleUser._id }).select('bio');
      
      res.status(200).json({
        message: "Successfully fetched single user",
        data: {
          user: singleUser,
          bio: artist ? artist.bio : null // Include bio inside the data object
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


//delete user
export const deleteUser=async(req,res)=>{
  const {id}=req.params;
  const user=await User.findByIdAndDelete(id);
  if(user){
    res.status(200).json({message:"Successfully delete the users",data:user});
  }else{
    res.status(404).json({message:"User not found"});
  }
}

//update user
// export const updateUser=async(req,res)=>{
//   const {id}=req.params;
//   const {username,email}=req.body;
//   const user=await User.findByIdAndUpdate(id,{username,email},{ new: true, runValidators: true });
//   if(user){
//     res.status(200).json({message:"Successfully update the users data",data:user});
//   }else{
//     res.status(404).json({message:"User not found"});
//   }
// }

//update the user profile
export const updateUser = async (req, res) => {
    const { username } = req.body;
    console.log(username);
    const userId = req.params.id;
    const imageFile = req.files?.image?.[0]; 
   
    // Prepare the update object
    const updateData = {};
    if (username) {
      updateData.username = username; 
    }
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url; 
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData }, // Use $set to update specific fields
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", data: updatedUser });
};


//forget password
export const forgetPassword=async(req,res)=>{
    const { email } = req.body;
    console.log("Request Body:", req.body);

    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    // Check if the email is registered
    const userExist = await User.findOne({ email: email }); // Changed to findOne

    console.log("User Exist Check:", userExist); // Log to see the found user

    if (!userExist) { // Check if userExist is null or undefined
      return res.status(404).json({ message: "Email is not registered" });
    }

    // Generate and save OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    userExist.otp = otp; // Assuming you have a field `otp` in your user model
    await userExist.save();

    // Send OTP via email
    await sendEmail({
      email: email,
      subject: "Your OTP forgotPassword",
      message: `Your OTP is ${otp}. Do not share this with anyone.`,
    });

    res.status(200).json({ message: "OTP sent successfully", data: email });
}

//verify otp
export const verifyOtp=async(req, res)=>{

    const { email, otp } = req.body;
    

    if (!email || !otp) {
      return res.status(400).json({ message: "Please provide both email and OTP" });
    }

    // Check if the OTP is correct for the email
    const userExists = await User.find({ email: email }).select("+otp +isOtpVerified");

    if (userExists.length === 0) {
      return res.status(404).json({ message: "Email is not registered" });
    }

    if (userExists[0].otp !== parseInt(otp, 10)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Dispose of OTP after successful verification
    userExists[0].otp = undefined;
    userExists[0].isOtpVerified = true;
    await userExists[0].save();

    res.status(200).json({ message: "OTP verified successfully" });
}

//reset password
export const resetPassword=async(req,res)=>{
  const {email,newPassword,confirmPassword} = req.body
  if(!email || !newPassword || !confirmPassword){
      return res.status(400).json({
          message : "Please provide email,newPassword,confirmPassword"
      })
  }
  if(newPassword !== confirmPassword){
      return res.status(400).json({
          message : "newPassword and confirmPassword doesn't match"
      })
  }

  const userExists = await User.find({email:email}).select("+isOtpVerified")
  if(userExists.length == 0){
      return res.status(404).json({
          message : "User email not registered"
      })
  }
  console.log(userExists)
  if(userExists[0].isOtpVerified != true){
      return res.status(403).json({
          message : "You cannot perform this action"
      })
  }

  userExists[0].password = bcrypt.hashSync(newPassword,10)
  userExists[0].isOtpVerified = false;
  await userExists[0].save()

  res.status(200).json({
      message : "Password changed successfully"
  })
}

//artist registration
export const registerArtist = async (req, res) => {
  const { username, email, password, bio } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({username,email,password: hashPassword,role: 'artist'});
      await newUser.save();

      const newArtist = new Artist({userId: newUser._id,bio,status: 'pending' });
      await newArtist.save();

      const populatedArtist = await Artist.findById(newArtist._id).populate('userId', 'username email');
      sendEmailToAdmin(populatedArtist);

      res.status(200).json({ message: 'Artist registration is pending approval.' });
};

//artist login
export const artistLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const artist = await Artist.findOne({ userId: user._id });

    if (!artist) {
      return res.status(404).json({ message: 'Artist profile not found' });
    }

    // Check if the artist is approved
    if (artist.status !== 'approved') {
      return res.status(403).json({ message: 'Your registration has not been approved yet.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id },process.env.JWT_SECRET,{ expiresIn: '1h' });

    res.status(200).json({message: 'Login successful',token,data: {username: user.username,email: user.email, bio: artist.bio}});
};

//fetch all pending artist
export const fetchPendingArtists = async (req, res) => {
  try {
    const pendingArtists = await Artist.find({ status: "pending" }).populate("userId", "username email");

    if (!pendingArtists.length) {
      return res.status(404).json({ message: "No pending artists found" });
    }

    res.status(200).json({ success: true, data: pendingArtists });
  } catch (error) {
    console.error("Error fetching pending artists:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Approve artist
export const approveArtist = async (req, res) => {
  const { artistId } = req.params;
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    // Update artist status to approved
    artist.status = 'approved';
    await artist.save();

    sendEmailToAdmin(artist);

    // Send email to artist with approval message
    sendEmailToArtist(artist, 'approved');
    res.status(200).json({ message: 'Artist has been approved successfully and notifications sent.' });
};

// Reject artist
export const rejectArtist = async (req, res) => {
  const { artistId } = req.params;
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    // Update artist status to rejected
    artist.status = 'rejected';
    await artist.save();

    sendEmailToAdmin(artist);

    // Send email to artist with rejection message
    sendEmailToArtist(artist, 'rejected');
    res.status(200).json({ message: 'Artist has been rejected successfully and notifications sent.' });
  
};

//artist profile
export const artistProfile = async (req, res) => {
  const id = req.user.id; // The user ID from the JWT token
  try {
    // Find the user associated with the artist profile
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the artist profile by userId
    const artist = await Artist.findOne({ userId: user._id });
    
    if (artist) {
      res.status(200).json({
        message: "Successfully fetched the artist profile",
        data: {
          id:user._id,
          username: user.username,
          email: user.email,
          bio: artist.bio,
          image:user.image
        },
      });
    } else {
      res.status(404).json({ message: "Artist profile not found", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", errorMessage: err.message });
  }
};



// Fetch all artist
export const fetchAllArtists = async (req, res) => {
  try {
    const artists = await User.find({ role: "artist" }).select("username image");  // Assuming image is stored in the user model
    
    if (!artists || artists.length === 0) {
      return res.status(404).json({ message: "No artists found" });
    }
    
    // Send the artist details (name and image)
    res.status(200).json({ message: "Artists fetched successfully", data: artists });
  } catch (error) {
    console.error("Error fetching artists:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch latest 8 artists
export const fetchLatestArtists = async (req, res) => {
    const artists = await User.find({ role: "artist" })
      .select("username image")
      .sort({ createdAt: -1 }) // Sort by latest created first
      .limit(5); // Get only 8 artists
    
    if (!artists || artists.length === 0) {
      return res.status(404).json({ message: "No artists found" });
    }

    res.status(200).json({ message: "Latest artists fetched successfully", data: artists });
};


export const sendMessageToArtist = async (req, res) => {
  const userId = req.user.id;
  const { artistId, message, phone, address } = req.body;  // Extract phone and address from the request body
  console.log( phone, address)
  console.log(" message", message)

  try {
    // Fetch user data with necessary fields (username, email)
    const user = await User.findById(userId).select("username email");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Fetch artist details by userId from the artist table, populate to get the artist's email
    const artist = await Artist.findOne({ userId: artistId }).populate("userId", "email");
    if (!artist || !artist.userId?.email) {
      return res.status(404).json({ success: false, message: "Artist not found or email not available" });
    }

    // Add phone and address to the message object to be sent
    const fullMessage = {
      message: message,  // Just use the 'text' from the message object
      phone: phone || "N/A",  // Use provided phone or default to "N/A"
      address: address || "Not Provided",  // Use provided address or default to "Not Provided"
    };

    // Call the function to send an email dynamically to the artist with the updated message
    await sendMessageToArtistEmail(user, artist, fullMessage);

    // Log successful email sending
    console.log(`✅ Message sent to artist (${artist.userId.email}) from user (${user.email})`);

    // Respond with success and include details of what was sent
    res.status(200).json({
      success: true,
      message: "Message sent to artist successfully!",
      data: {
        sender: {
          username: user.username,
          email: user.email,
          phone: phone || "N/A",
          address: address || "Not Provided"
        },
        artist: {
          artistId: artist._id,
          artistEmail: artist.userId.email
        },
        message: fullMessage
      }
    });

  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ success: false, message: "Error sending message", error: error.message });
  }
};
