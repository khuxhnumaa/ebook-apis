import mongoose from 'mongoose';
import { config } from './config.js';




const connectDB = async()=>{
    
    try{
        
        mongoose.connection.on("connected", () =>{
            console.log("Connected succesfully to database")
        });

        mongoose.connection.on('error',(err)=>{
            console.log("error in connecting to db. ",err);
        });

        await mongoose.connect(config.databaseurl as string);
}
    catch(err){
        console.error("Failed to connect with database: ",err)

        process.exit(1);
    }
};

export default connectDB;