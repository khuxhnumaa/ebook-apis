import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createUser = async (req:Request,res:Response, next:NextFunction)=>{

   
    const {name, email,password} = req.body;

    //validation
    if(!name || !email || !password){
        const err = createHttpError(400,"All field are required");
        // return res.json({message: "All field are required"});

        return next(err);
    }
    //process

    //response


    res.send({message: "User created successfully"})
};

export {createUser};