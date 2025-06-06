import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
            'Please provide a valid email address'
        ]
    },
    password: {type: String, required: true },
    image: {type: String},
    role: {type: String,
    enum: ["user", "admin", "artist"], 
        default: "user", 
    },
    otp : {
        type : Number,
        select : false
    },
    isOtpVerified : {
        type : Boolean,
        default : false,
        select : false
    }

});

// Custom password validation with a pre-save hook
userSchema.pre('save', function(next) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{6,})/;
    if (!regex.test(this.password)) {
        return next(new Error('Password must be at least 6 characters long, contain at least one uppercase letter, and one special character'));
    }
    next(); 
});

const User = mongoose.model("User", userSchema);
export default User;
