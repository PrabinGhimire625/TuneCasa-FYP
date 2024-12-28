import User from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../services/sendEmail.js";

//register
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // const imageFile=req.files.image[0];
    //console.log(imageFile)

    // const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hanshPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hanshPassword,role });
    await newUser.save();
    res
      .status(200)
      .json({ message: `${role} registered successfully`, data: newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//login
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


//Profile
export const profile = async (req, res) => {
  const id = req.user.id; 
  try {
    const profileData = await User.findById(id);
    if (profileData) {
      res.status(200).json({
        message: "Successfully fetched the user profile",
        data: profileData,
      });
    } else {
      res.status(404).json({ message: "Error fetching user profile", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", errorMessage: err.message });
  }
};

//edit profile
// export const editProfile=async(req,res)=>{
//   const {username,password,image}=req.body

// }

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
export const fetchSingleUser=async(req, res)=>{
  const id=req.params.id;
  const singleUser=await User.findById(id);
  if(singleUser){
    res.status(200).json({message:"Successfully fetch single users",data:singleUser});
  }else{
    res.status(404).json({message:"User not found"});
   }
}

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

export const updateUser = async (req, res) => {
  try {
    const { username } = req.body;
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
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//forget password
export const forgetPassword=async(req,res)=>{
  try {
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
  } catch (err) {
    console.error("Error in forgotPassword:", err); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
}

//verify otp
export const verifyOtp=async(req, res)=>{
  try {
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
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
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

