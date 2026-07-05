import express from 'express'

const userRoute = express.Router()

userRoute.post('/register',(req,res)=>{
    res.json({message: "User registered successfully!"})
})
export default userRoute;