import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { SalesServices } from "./sales.service";
import sendResponse from "../../utils/sendResponse";

const addSales  = catchAsync(async(req:Request,res:Response)=> {
    const payload = req.body;
    const result = await SalesServices.createSalesIntoDB(payload);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Sales Created successfully",
        data:result
    })
})
const getSales  = catchAsync(async(req:Request,res:Response)=> {
    // const payload = req.body;
    const query = req?.query?.priority as string | null;
    // console.log(query)
    const result = await SalesServices.getSalesFromDB(query);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Sales Retrieve successfully",
        data:result
    })
})
const deleteSales  = catchAsync(async(req:Request,res:Response)=> {
    const id = req.params.id;
    const result = await SalesServices.deleteSales(id);

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Sales Deleted successfully",
        data:result
    })
})

export const SalesController = {
    addSales,
    getSales,
    deleteSales

}