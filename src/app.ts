import express from 'express'

const exp_app = express()

//Route
exp_app.get('/',(req,res,next)=>{
    res.json({message: "Welcome to the Express App!"})
})

export default exp_app;
