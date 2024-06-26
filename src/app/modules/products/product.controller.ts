import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponse";


const addProduct  = catchAsync(async(req:Request,res:Response)=> {
    const product = req.body;
    const result = await ProductServices.addProductIntoDB(product);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Product added successfully",
        data:result
    })
})
const getAllProduct  = catchAsync(async(req:Request,res:Response)=> {
    
    const result = await ProductServices.getAllProductFromDB();

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Product Retrieve Successfully",
        data:result
    })
})
const updateProduct  = catchAsync(async(req:Request,res:Response)=> {
    const id=req.params.id
    console.log(id)
    
    const result = await ProductServices.updateProductFromDB(id,req.body);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Product Updated Successfully",
        data:result
    })
})

export const ProductController = {
    addProduct,
    getAllProduct,
    updateProduct

}