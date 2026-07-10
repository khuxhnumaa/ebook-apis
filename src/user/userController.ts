import type { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import createHttpError from "http-errors";
import userModel from "./userModel.js";
// import { sign } from "jsonwebtoken";
import { User } from "./userTypes.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
const createUser = async (req:Request,res:Response, next:NextFunction)=>{

   
    const {name, email,password} = req.body;

    //validation
    if(!name || !email || !password){
        const err = createHttpError(400,"All field are required");
        // return res.json({message: "All field are required"});

        return next(err);
    }
    //check if user already exist or not in database - GET
    //Database call

    try{
        const user = await userModel.findOne({ email });
        if(user){
            const error = createHttpError(400,"This email is already taken");
    
            return next(error);
        }
    }
    catch(error){
        return next(createHttpError(500,"Error while getting user"))
    }
    const hashPassword = await bcrypt.hash(password,10);

    let newUser = User;
    //now store password -> hash(async)
    try{
        newUser = await userModel.create({
            name,
            email,
            password:hashPassword,
        });
    }
    catch(err){
        return next(createHttpError(500,"Error while hashing password"));
    }
    
    //token Generation-JWT system
    // const token = sign({sub:newUser._id},config.jwtSecret as string,{ expiresIn: 60 * 60 });
    const token = jwt.sign(
        { sub: newUser._id },
        config.jwtSecret as string,
        {expiresIn: "7d"}
      );


    //response
    res.json({accessToken: token});
};

export {createUser};