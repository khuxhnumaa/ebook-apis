import express from 'express'
import { createUser } from './userController.js'
const userRoute = express.Router()

// userRoute.post('/register',(req,res)=>{
//     res.json({message: "User registered successfully!"})
// })
userRoute.post('/register', createUser)
export default userRoute;