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
    // console.log(req.user)
    
    const result = await ProductServices.getAllProductFromDB(req);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Product Retrieve Successfully",
        data:result
    })
})
const getSingleProduct  = catchAsync(async(req:Request,res:Response)=> {
    // console.log(req.user)
    const id = req.params.id;
    
    const result = await ProductServices.getSingleProductFromDB(id);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Product Retrieve Successfully",
        data:result
    })
})
const updateProduct  = catchAsync(async(req:Request,res:Response)=> {
    const id=req.params.id
    // console.log(id)
    
    const result = await ProductServices.updateProductFromDB(id,req.body);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Product Updated Successfully",
        data:result
    })
})
const deleteOne  = catchAsync(async(req:Request,res:Response)=> {
    const id=req.params.id
    // console.log(id)
    
    const result = await ProductServices.deleteOne(id);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Product Deleted Successfully",
        data:result
    })
})
const deleteManyProducts = catchAsync(async (req: Request, res: Response) => {
    const id = req.body.ids;
    // console.log(id)
  
    const result = await ProductServices.deleteProducts(id)
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Products deleted successfully',
      data: result,
    })
  })
// const getProductByValues  = catchAsync(async(req:Request,res:Response)=> {
//     // const id=req.params.id
//     // console.log(id)
    
//     const result = await ProductServices.getProductsValues();

//     sendResponse(res,{
//         success:true,
//         statusCode:201,
//         message:"Product Fetched by values Successfully",
//         data:result
//     })
// })



export const ProductController = {
    addProduct,
    getAllProduct,
    updateProduct,
    getSingleProduct,
    deleteOne,
    // getProductByValues,
    deleteManyProducts

}