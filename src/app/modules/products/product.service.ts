import { TProduct } from "./product.interface";
import { Product } from "./product.model";


const addProductIntoDB = async(payload:TProduct) => {
    const result = await Product.create(payload);
    return result;


}
const getAllProductFromDB = async() => {
    const result = await Product.find();
    return result;


}
const updateProductFromDB = async(id:string,payload:any) => {
    // const result = await Product.findById(id)
    // console.log(result)
    const result = await Product.findByIdAndUpdate(id,payload,{new:true});
    return result;
}
const deleteOne = async (id: string) => {
    const result = await Product.findByIdAndDelete(id)
  
    return result
  }
export const ProductServices = {
    addProductIntoDB,
    getAllProductFromDB,
    updateProductFromDB,
    deleteOne


}