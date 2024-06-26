import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { TLoginUser, TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcrypt';
import { createToken } from "./user.utils";
import { config } from "../../config";


const registerUserIntoDB:any =async(payload:TUser) => {
    const result = await User.create(payload);
    return result;
}

const loginUser = async(payload:TLoginUser) => {
    const {username,password}=payload;
    const user = await User.findOne({username});
    if(!user){
        throw new AppError(httpStatus.FORBIDDEN,'User Not Found');
    }
    const matchedPassword = await bcrypt.compare(password,user.password);
    if(!matchedPassword){
        throw new AppError(httpStatus.FORBIDDEN,'Password Not Matched');
    }

    const jwtPayload = {
        id:user?._id,
        username:user?.username

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