import express from 'express'
import { createUser, loginUser } from './userController.js'
const userRoute = express.Router()

// userRoute.post('/register',(req,res)=>{
//     res.json({message: "User registered successfully!"})
// })
userRoute.post('/register', createUser);

userRoute.post("/login",loginUser);

export default userRoute;