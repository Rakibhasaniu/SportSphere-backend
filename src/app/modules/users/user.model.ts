import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from '../../config';
import TUser from './user.interface';


const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);




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