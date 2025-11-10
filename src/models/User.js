import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },

        dob: {
            type: Date,
        },

        birthTime: {
            type: String, // HH:MM:SS format
        },

        birthPlace: {
            village: {
                type: String,
                trim: true,
                minlength: 2,
                maxlength: 100,
            },
            taluka: {
                type: String,
                trim: true,
                minlength: 2,
                maxlength: 100,
            },
            district: {
                type: String,
                trim: true,
                minlength: 2,
                maxlength: 100,
            },
            state: {
                type: String,
                trim: true,
                minlength: 2,
                maxlength: 100,
            },
        },

        isOnborded: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Prevent duplicate model compilation in dev
const UserModel =
    mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
