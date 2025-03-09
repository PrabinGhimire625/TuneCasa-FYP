import nodemailer from 'nodemailer';
import dotenv from "dotenv"
import Artist from '../models/artistModel.js';
dotenv.config();
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:3000';


// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  
  }
});

//send email to the admin
export const sendEmailToAdmin = (artist) => {
  const { username, email } = artist.userId; // Extract username and email from populated userId

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Artist Registration Pending Approval',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007bff;">New Artist Registration</h2>
        <p>A new artist has registered. Here are their details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Username:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${username}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Bio:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${artist.bio}</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">Please review the registration and approve or reject the artist:</p>
        <a href="${BASE_URL}/api/admin/approve-artist/${artist._id}" 
           style="display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">
          Approve
        </a>
        <a href="${BASE_URL}/api/admin/reject-artist/${artist._id}" 
           style="display: inline-block; background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Reject
        </a>
        <footer style="margin-top: 30px; font-size: 12px; color: #777;">
          <p>This email was sent from the Artist Registration System.</p>
        </footer>
      </div>
    `,
  };

  // Send the email to the admin
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email to admin:', error);
    } else {
      console.log('Email sent to admin:', info.response);
    }
  });
};

// Send email to Artist with registration status (approved or rejected)
export const sendEmailToArtist = async (artist, status) => {
    try {
      // Ensure userId is populated before accessing email
      await artist.populate('userId', 'email username'); 
  
      const { username, email } = artist.userId; 
      const statusMessage = status === 'approved'
        ? 'Congratulations, your registration as an artist has been approved!'
        : 'Sorry, your registration as an artist has been rejected.';
  
      const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: 'Your Artist Registration Status',
        text: `${statusMessage}
  
  We appreciate your interest in joining our platform!`,
      };
  
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email to artist:', error);
        } else {
          console.log('Email sent to artist:', info.response);
        }
      });
    } catch (error) {
      console.log('Error in sendEmailToArtist:', error);
    }
  };
  

  // Function to send email to the artist
  export const sendMessageToArtistEmail = async (user, artist, message) => {
    try {
      const { username, email } = user; // User's details (sender)
      const artistEmail = artist.userId.email; // Artist's email from populated userId

      // Email content with improved styling
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: artistEmail, // Dynamic artist's email
        subject: `🎵 New Message from ${username} - TuneCasa`,
        html: `
          <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #007bff; text-align: center;">🎶 You Have a New Message! 🎶</h2>
              
              <div style="border-bottom: 2px solid #007bff; padding-bottom: 15px; margin-bottom: 15px;">
                <h3 style="color: #333; margin: 0;">📌 Sender Details</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${username}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${message.phone}" style="color: #007bff; text-decoration: none;">${message.phone || "N/A"}</a></p>
                <p style="margin: 5px 0;"><strong>Address:</strong> ${message.address || "Not Provided"}</p>
              </div>
  
              <div>
                <h3 style="color: #333; margin: 0;">💬 Message</h3>
                <p style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; font-style: italic;">
                  ${message.message}
                </p>
              </div>
  
              <p style="margin-top: 20px; text-align: center;">
                📩 <strong>Reply to this email</strong> to continue the conversation.
              </p>
  
              <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #777;">
                <p>⚡ This email was sent via <strong>TuneCasa</strong> - Connecting Artists & Fans.</p>
              </footer>
            </div>
          </div>
        `,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions)
    } catch (error) {
      console.log("Error sending email:", error);
    }
  };
  