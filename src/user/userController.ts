import type { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import createHttpError from "http-errors";
import userModel from "./userModel.js";
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

    // let newUser: User | null = null;
    //now store password -> hash(async)
    
    const newUser = await userModel.create({
        name,
        email,
        password:hashPassword,
    });
    
    
    
    //token Generation-JWT system
    // const token = sign({sub:newUser._id},config.jwtSecret as string,{ expiresIn: 60 * 60 });
    const token = jwt.sign(
        { sub: newUser._id },
        config.jwtSecret as string,
        {expiresIn: "7d"}
      );


    //response
    res.status(201).json({accessToken: token});
};

const loginUser = async (req:Request,res:Response,next:NextFunction)=>{

    const {email, password}= req.body;
    if(email || !password){
        return next(createHttpError(400,"all feilds are required"));
    }

    const user = await userModel.findOne({email});

    if(!user){
        return next(createHttpError(401,"User not found"));
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return next(createHttpError(400,"Username or password is incorrect"));
    }
    const token = jwt.sign(
        { sub: user._id },
        config.jwtSecret as string,
        {expiresIn: "7d"}
      );
    res.json({accessToken: token});


    res.json({message:"Login success"});
}
export {createUser};
export {loginUser};