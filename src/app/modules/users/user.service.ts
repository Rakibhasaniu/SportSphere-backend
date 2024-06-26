import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import bcrypt from 'bcrypt';
import { createToken } from "./user.utils";
import { config } from "../../config";
import TUser, { TUserLogin } from "./user.interface";
import { User } from "./user.model";


const registerUserIntoDB =async(payload:TUser) => {
    const result = await User.create(payload);
    return result;
}

const loginUser = async(payload:TUserLogin) => {
    const {email,password}=payload;
    const user = await User.findOne({email});
    if(!user){
        throw new AppError(httpStatus.FORBIDDEN,'User Not Found');
    }
    const matchedPassword = await bcrypt.compare(password,user.password);
    if(!matchedPassword){
        throw new AppError(httpStatus.FORBIDDEN,'Password Not Matched');
    }

    const jwtPayload = {
        role:user?.role,
        email:user?.email

    }
    const accessToken = createToken(jwtPayload,config.access_secret as string,'30d')
    const refreshToken = createToken(jwtPayload,config.refresh_secret as string,'30d')
    return{
        accessToken,
        refreshToken
    }
   

}

export const UserServices = {
    registerUserIntoDB,
    loginUser

}