import express from 'express'

import createHttpError from 'http-errors'
import globalErrorHandler from './middlewares/globalErrorHandler.js'
import userRoute from './user/userRouter.js'

const exp_app = express()

//Route
exp_app.get('/',(req,res,next)=>{
    // throw new Error("something went wrong");

    const error = createHttpError(400,"something went wrong");

    throw error;
    // res.json({message: "Welcome to the Express App!"})
})
//router before middleware
exp_app.use("/api/users/",userRoute);

//middleware
exp_app.use(globalErrorHandler);

export default exp_app;
