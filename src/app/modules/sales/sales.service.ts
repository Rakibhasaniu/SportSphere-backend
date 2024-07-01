import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Product } from "../products/product.model";
import TSales from "./sales.interface";
import mongoose from "mongoose";
import { Sales } from "./sales.model";
import { Request } from "express";
import { User } from "../users/user.model";



const createSalesIntoDB = async(req:Request,payload:TSales) => {
  // console.log(req.user)
  const user = await User.find({email:req.user.email})
  // console.log(user)
    const product = await Product.findById(payload.product);
    if(!product){
        throw new AppError(httpStatus.NOT_FOUND,"Product not found");
    }

    if(product.quantity<payload.quantity){
        throw new AppError(httpStatus.NOT_FOUND,"Insufficient quantity")
    }
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        payload.buyerName=user[0].name;
        const result = await Sales.create(payload);
        if(!result){
            throw new AppError(httpStatus.NOT_ACCEPTABLE,'Failed To Create Sales')
        }
        const updateProduct = await Product.findByIdAndUpdate(product._id, {
            $inc: { quantity: -payload.quantity },
          });
          if(!updateProduct){
            throw new AppError(httpStatus.NOT_ACCEPTABLE,'Failed To Update Product Quantity')
          }

          await session.commitTransaction();
          await session.endSession();
          return result;
    } catch (err:any) {
        await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.CONFLICT,'Failed to add sales');
    }
}

const getSalesFromDB = async(query:string | null) => {
    let date = null;
    // console.log("Query:", query);
    if (query && query === 'daily') {
      date = new Date();
      date.setDate(date.getDate() - 1);
    } else if (query && query === 'weekly') {
      date = new Date();
      date.setDate(date.getDate() - 7);
    } else if (query && query === 'monthly') {
      date = new Date();
      date.setMonth(date.getMonth() - 1);
    } else if (query && query === 'yearly') {
      date = new Date();
      date.setFullYear(date.getFullYear() - 1);
    }
    // console.log("Calculated Date:", date); 
    let queryParam = {};
    if (date) {
      queryParam = {
        saleDate: {
          $gte: date,
          $lte: new Date(),
        },
      };
    }
    // console.log(queryParam)
    const sales = await Sales.find(queryParam).populate('product');
    // console.log("Sales Result:", sales); 
    return sales;
}

const deleteSales = async(id:string) => {
  const sales = await Sales.findByIdAndDelete(id);
  return sales;
}

export const SalesServices = {
    createSalesIntoDB,
    getSalesFromDB,
    deleteSales,

}