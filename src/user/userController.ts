import type { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import createHttpError from "http-errors";
import userModel from "./userModel.js";

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
    const user = await userModel.findOne({ email });
    if(user){
        const error = createHttpError(400,"This email is already taken");

        return next(error);
    }
    //now store password -> hash(async)
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = await userModel.create({
        name,
        email,
        password:hashPassword,
    });
    //token Generation-JWT system

    

    //response
    res.send({id: newUser._id})
};

export {createUser};