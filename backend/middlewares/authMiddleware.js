import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler (async(req, res, next) => {
    let token;

    //read jwt from jwt cookie
    token = req.cookies.jwt;

    //check if token is valid
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select("-password");
            // console.log('authenticated');
            next();
        } catch (error) {
            throw new Error("Not authorized. token failed")
        }
    }else{
        res.status(401);
        throw new Error("Not authorized. no token.")
    }
})

//check for admin

const authorizeAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send("Not authorized as an admin");
    }
}


export {authenticate, authorizeAdmin}


