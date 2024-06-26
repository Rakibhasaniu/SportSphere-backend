import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { config } from "../../config";

const register = catchAsync(async(req:Request,res:Response) => {
    const result = await UserServices.registerUserIntoDB(req.body);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"User registered successfully",
        data:result
    })
})
const login = catchAsync(async(req:Request,res:Response) => {
    const result = await UserServices.loginUser(req.body);
    const {accessToken,refreshToken} = result;
    res.cookie('refreshToken',refreshToken,{
        secure:config.node_env === 'production',
        httpOnly:true
    })

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"User login successfully",
        data:{
            accessToken
        }
    })
})

export const UserController={
    register,
    login
}