import type { NextFunction, Request, Response } from "express";
//for files - form data is send ~ multi part form data
const createBook = async(
    req: Request,res: Response, next: NextFunction)=>{


        res.json({})
    };

export {createBook};