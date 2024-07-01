import { Types } from "mongoose";
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
const getSingleProductFromDB = async(id:string) => {
    const result = await Product.findById(id);
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
  const getProductsValues = async () => {
    const result = await Product.aggregate([
        { $match: { _id: { $type: "objectId" } } },
      {
        $facet: {
          sportType: [
            { $unwind: '$sportType' },
            { $group: { '_id': '$sportType' } },
          ],
          brand: [{ $unwind: '$brand' }, { $group: { _id: '$brand' } }],
          material: [{ $unwind: '$material' }, { $group: { _id: '$material' } }],
          size: [{ $unwind: '$size' }, { $group: { _id: '$size' } }],
          color: [{ $unwind: '$color' }, { $group: { _id: '$color' } }],
          
        },
      },
    ]);
    return result;
  };
  const deleteProducts = async (ids: { ids: [Types.ObjectId] }) => {
    const result = await Product.deleteMany({ _id: { $in: ids } })
  
    return result
  }
export const ProductServices = {
    addProductIntoDB,
    getAllProductFromDB,
    updateProductFromDB,
    deleteOne,
    getSingleProductFromDB ,
    getProductsValues,
    deleteProducts


}