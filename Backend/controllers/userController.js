import User from "../models/userModel.js";
import Artist from "../models/artistModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../services/sendEmail.js";
import { sendEmailToAdmin, sendEmailToArtist } from '../services/SendAdminEmail.js';
import axios from "axios";
import { oauth2Client } from "../config/googleConfig.js";
import { sendMessageToArtistEmail } from "../services/SendAdminEmail.js";
import moment from "moment/moment.js";
import notifiactionModel from "../models/notifiactionModel.js"


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

  const newUser = new User({ username, email, password: hashPassword, role });
  await newUser.save();
  res
    .status(200)
    .json({ message: `${role} registered successfully`, data: newUser });

};

//user login
export const login = async (req, res) => {
  const { email, password } = req.body;
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
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h", });
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

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    );

    const { email, name, picture } = userResponse.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name,
        email,
        image: picture,
        role: "user"
      });
    }

    // Match the payload structure of normal login
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT
    });

    return res.status(200).json({ message: 'Login successful', token, data: user });

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
    } else {
      c
      res.status(404).json({ message: "Error fetching user profile", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", errorMessage: err.message });
  }
};

//fetch all user
export const fetchAllUser = async (req, res) => {
  const allUser = await User.find();
  if (allUser.length > 0) {
    res.status(200).json({ message: "Successfully fetch all the users", data: allUser });
  } else {
    res.status(404).json({ message: "User not found" });
  }
}


//fetch single user
export const fetchSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await User.findById(id);
    if (singleUser) {
      const artist = await Artist.findOne({ userId: singleUser._id }).select('bio');
      res.status(200).json({
        message: "Successfully fetched single user",
        data: {
          user: singleUser,
          bio: artist ? artist.bio : null
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
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (user) {
    res.status(200).json({ message: "Successfully delete the users"});
  } else {
    res.status(404).json({ message: "User not found" });
  }
}


//update the user profile
export const updateUser = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  const userId = req.params.id;
  const imageFile = req.files?.image?.[0];
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
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User updated successfully", data: updatedUser });
};


//forget password
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log("Request Body:", req.body);

  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }
  const userExist = await User.findOne({ email: email });

  console.log("User Exist Check:", userExist);

  if (!userExist) {
    return res.status(404).json({ message: "Email is not registered" });
  }

  // Generate and save OTP
  const otp = Math.floor(1000 + Math.random() * 9000);
  userExist.otp = otp;
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
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Please provide both email and OTP" });
  }
  const userExists = await User.find({ email: email }).select("+otp +isOtpVerified");

  if (userExists.length === 0) {
    return res.status(404).json({ message: "Email is not registered" });
  }

  if (userExists[0].otp !== parseInt(otp, 10)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  userExists[0].otp = undefined;
  userExists[0].isOtpVerified = true;
  await userExists[0].save();

  res.status(200).json({ message: "OTP verified successfully" });
}

//reset password
export const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please provide email,newPassword,confirmPassword"
    })
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "newPassword and confirmPassword doesn't match"
    })
  }

  const userExists = await User.find({ email: email }).select("+isOtpVerified")
  if (userExists.length == 0) {
    return res.status(404).json({
      message: "User email not registered"
    })
  }
  console.log(userExists)
  if (userExists[0].isOtpVerified != true) {
    return res.status(403).json({
      message: "You cannot perform this action"
    })
  }

  userExists[0].password = bcrypt.hashSync(newPassword, 10)
  userExists[0].isOtpVerified = false;
  await userExists[0].save()

  res.status(200).json({
    message: "Password changed successfully"
  })
}

//artist registration
export const registerArtist = async (req, res) => {
  const { username, email, password, bio } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashPassword, role: 'artist' });
  await newUser.save();

  const newArtist = new Artist({ userId: newUser._id, bio, status: 'pending' });
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
  if (artist.status !== 'approved') {
    return res.status(403).json({ message: 'Your registration has not been approved yet.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token, data: { username: user.username, email: user.email, bio: artist.bio } });
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
  artist.status = 'approved';
  await artist.save();

  sendEmailToAdmin(artist);
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
  artist.status = 'rejected';
  await artist.save();
  sendEmailToAdmin(artist);
  sendEmailToArtist(artist, 'rejected');
  res.status(200).json({ message: 'Artist has been rejected successfully and notifications sent.' });

};

//artist profile
export const artistProfile = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const artist = await Artist.findOne({ userId: user._id });

    if (artist) {
      res.status(200).json({
        message: "Successfully fetched the artist profile",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          bio: artist.bio,
          image: user.image
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
    const artists = await User.find({ role: "artist" }).select("username image");

    if (!artists || artists.length === 0) {
      return res.status(404).json({ message: "No artists found" });
    }
    res.status(200).json({ message: "Artists fetched successfully", data: artists });
  } catch (error) {
    console.error("Error fetching artists:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch latest 5 artists
export const fetchLatestArtists = async (req, res) => {
  const artists = await User.find({ role: "artist" })
    .select("username image")
    .sort({ createdAt: -1 })
    .limit(5);

  if (!artists || artists.length === 0) {
    return res.status(404).json({ message: "No artists found" });
  }

  res.status(200).json({ message: "Latest artists fetched successfully", data: artists });
};

//send the message to the artist via mail
export const sendMessageToArtist = async (req, res) => {
  const userId = req.user.id;
  const { artistId, message, phone, address } = req.body;
  try {
    const user = await User.findById(userId).select("username email");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const artist = await Artist.findOne({ userId: artistId }).populate("userId", "email");
    if (!artist || !artist.userId?.email) {
      return res.status(404).json({ success: false, message: "Artist not found or email not available" });
    }
    const fullMessage = {
      message: message,
      phone: phone || "N/A",
      address: address || "Not Provided",
    };

    await sendMessageToArtistEmail(user, artist, fullMessage);
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

// Count all artists
export const countAllArtists = async (req, res) => {
  const artistCount = await User.countDocuments({ role: "artist" });
  res.status(200).json({ message: "Artist count fetched successfully", data: artistCount });
};

// Count all user+artist
export const countAllUsers = async (req, res) => {
  const totalUser = await User.countDocuments();
  res.status(200).json({ message: "TotalUser count fetched successfully", data: totalUser });
};

// Count all userCount
export const countUserOnly = async (req, res) => {
  const userCount = await User.countDocuments({ role: "user" });
  res.status(200).json({ message: "userCount count fetched successfully", data: userCount });
};

//follow artist
export const followArtist = async (req, res) => {
  try {
    const artist = await Artist.findOne({ userId: req.params.id });
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const userId = req.user.id;

    const alreadyFollowing = artist.followers.some(
      (followerId) => followerId.toString() === userId
    );

    if (alreadyFollowing) {
      return res.status(400).json({ message: "Already following this artist" });
    }
    artist.followers.push(userId);
    await artist.save();
    await notifiactionModel.create({
      userId: req.params.id,
      artistUserId: req.params.id,
      content: `🎧 A new fan just followed you!`,
      type: "follow",
      isRead: false,
    });

    res.status(200).json({ message: "Successfully followed the artist and notification sent" });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//unfollow artist
export const unfollowArtist = async (req, res) => {
  try {
    const artist = await Artist.findOne({ userId: req.params.id });
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const userId = req.user.id;

    const wasFollowing = artist.followers.some(
      (followerId) => followerId.toString() === userId
    );

    if (!wasFollowing) {
      return res.status(400).json({ message: "You are not following this artist" });
    }

    artist.followers = artist.followers.filter(
      (followerId) => followerId.toString() !== userId
    );
    await artist.save();

    res.status(200).json({ message: "Successfully unfollowed the artist" });
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get total followers count of an artist
export const getArtistFollowersCount = async (req, res) => {
  try {
    const artist = await Artist.findOne({ userId: req.params.id })
      .populate({
        path: "followers",
        select: "username",
      });

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const followerCount = artist.followers.length;

    res.status(200).json({
      message: "Followers fetched successfully",
      totalFollowers: followerCount,
      followers: artist.followers,
    });
  } catch (error) {
    console.error("Fetch followers error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get following
export const getArtistsUserIsFollowing = async (req, res) => {
  try {
    const userId = req.user.id;
    const artists = await Artist.find({
      followers: { $in: [userId] },
      status: "approved"
    }).populate("userId", "username email image");
    const followCount = artists.length;

    res.status(200).json({
      message: "Artists user is following fetched successfully",
      data: artists,
      count: followCount
    });
  } catch (error) {
    console.error("Fetch artists user is following error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get usergrowth  by date range
export const getUserGrowthByDateRange = async (req, res) => {
  try {
    // Get first and last registered user to determine the range
    const firstUser = await User.findOne().sort({ createdAt: 1 });
    const lastUser = await User.findOne().sort({ createdAt: -1 });

    if (!firstUser || !lastUser) {
      return res.status(404).json({
        success: false,
        error: "No users found in the database.",
      });
    }

    const startDate = moment(firstUser.createdAt).startOf("month");
    const endDate = moment(lastUser.createdAt).startOf("month");

    const monthsDiff = endDate.diff(startDate, "months");
    const monthlyGrowth = [];

    let cumulativeCount = 0;

    for (let i = 0; i <= monthsDiff; i++) {
      const monthStart = moment(startDate).add(i, "months").startOf("month").toDate();
      const monthEnd = moment(startDate).add(i + 1, "months").startOf("month").toDate();

      const count = await User.countDocuments({
        createdAt: {
          $gte: monthStart,
          $lt: monthEnd,
        },
      });

      cumulativeCount += count;

      monthlyGrowth.push({
        month: moment(monthStart).format("YYYY-MM"),
        count: cumulativeCount,
      });
    }

    return res.status(200).json({
      success: true,
      data: monthlyGrowth,
    });
  } catch (error) {
    console.error("Error calculating monthly user growth:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
};

// Get total followers of an artist
export const countFollower = async (req, res) => {
  try {
    const artist = await Artist.findOne({ userId: req.user.id })
      .populate({
        path: "followers",
        select: "username email image",
      });

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const followerCount = artist.followers.length;

    res.status(200).json({
      message: "Followers fetched successfully",
      data: {
        totalFollowers: followerCount,
        followers: artist.followers,
      },
    });

  } catch (error) {
    console.error("Fetch followers error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

