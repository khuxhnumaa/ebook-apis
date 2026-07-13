import express from 'express'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import globalErrorHandler from './middlewares/globalErrorHandler.js'
import userRoute from './user/userRouter.js'
import bookRouter from './book/bookRouter.js'

const exp_app = express()
exp_app.use(express.json());
//Route
exp_app.get('/',(req,res,next)=>{
    
    res.json({message: "Welcome to the Express App!"})
})
exp_app.use("/api/users",userRoute);
exp_app.use("/api/books",bookRouter)





//router before middleware
exp_app.use("/api/users/",userRoute);

//middleware
exp_app.use(globalErrorHandler);

export default exp_app;
