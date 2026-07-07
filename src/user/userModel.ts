import mongoose from 'mongoose'

import type { User } from "./userTypes.js";


const userSchema = new mongoose.Schema<User>({
    name:{
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
        
        }
    },
    {timestamps:true}
);
//collection users - to give any other name use third parameter as 'User',userSchema,'newname'
export default mongoose.model<User>('User',userSchema) ;
