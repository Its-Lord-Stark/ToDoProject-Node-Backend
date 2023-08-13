import mongoose from "mongoose";

const scheme = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        required:true,
        type: String,
        unique: true,
    },
    password: {
        type:String,
        select: false,
        
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const User = mongoose.model("User", scheme);