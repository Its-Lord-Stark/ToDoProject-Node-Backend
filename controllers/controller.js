import { ErrorHandler } from "../middlewares/error.js";


import {
    User
} from "../models/user.js"
import bcrypt from "bcrypt";
import {
    sendCookie
} from "../utils/features.js";




export const newRegister = async (req, res,next) => {

    try {
        const {
            name,
            email,
            password
        } = req.body;
    
        let user = await User.findOne({
            email: email
        });
    
        if (user) {
            return next(new ErrorHandler("User already exist",400))
    
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
    
        sendCookie(user, res, 201, "Registered Succesfully");
    
        
    } catch (error) {
        return next(error);
    }
   
}


export const login = async (req, res,next) => {

    try {
        const {
            email,
            password
        } = req.body;
    
        const user = await User.findOne({
            email
        }).select("+password");
    
        if (!user) {
           return next(new ErrorHandler("Invalid user",400))
    
        }
    
        // const hashedPassword = await bcrypt.hash(password, 10);
    
        const isMatch = await bcrypt.compare(password, user.password);
    
    
        if (!isMatch) {
            next(new ErrorHandler("Password dees not match",400))
    
        }
    
        sendCookie(user, res, 201, `Welcome back ${user.name}`);
    
    } catch (error) {
        return next(error);
    }

  

}

export const logout = async (req, res,next) => {

    res.status(200).cookie("token", "", {
        expire: Date.now()
    }).json({
        success: true,
        messages: "Logged Out Succesfully"
    })



}


export const getMyProfile = (req, res,next) => {

    return res.status(200).json({
        success: true,
        user: req.user,
    })



}








