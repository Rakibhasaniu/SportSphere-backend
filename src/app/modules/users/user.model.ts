import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import { config } from "../../config";



const userSchema = new Schema<TUser>({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function (next){
    const user = this;
    user.password=await bcrypt.hash(user.password,Number(config.salt_round))
    next();
})
userSchema.post('save',async function(doc,next){
    doc.password='';
    next();
})

export const User = mongoose.model('user',userSchema)