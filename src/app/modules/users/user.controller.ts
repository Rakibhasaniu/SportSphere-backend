import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const register = catchAsync(async(req:Request,res:Response) => {
    const result = await UserServices.registerUserIntoDB(req.body);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"User registered successfully",
        data:result
    })
})

export const UserController={
    register
}