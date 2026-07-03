import type { NextFunction, Request, Response } from "express";
import type { HttpError } from "http-errors";

const globalErrorHandler = (err: HttpError, req : Request,res: Response,next: NextFunction)=>{
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message,
        errorStack: process.env.NODE_ENV === 'development' ? err.stack : "",

    });
}

export default globalErrorHandler;