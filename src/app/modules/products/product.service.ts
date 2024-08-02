import { SortOrder, Types } from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import { Request } from "express";


const addProductIntoDB = async(payload:TProduct) => {
    const result = await Product.create(payload);
    return result;


}
const getAllProductFromDB = async(query:Record<string,unknown>) => {
  // const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;
  // const limit = Number(req.query.limit) ? Number(req.query.limit) : 5;
  // const searchTerm = req.query.searchTerm || "";
  // const sort = req.query.sort ? req.query.sort.toString() : "price";
  // // let genre = req.query.genre || "All";

  // const searchCriteria = {
  //   $or: [
  //     { name: { $regex: searchTerm, $options: "i" } },
  //     { sportsType: { $regex: searchTerm, $options: "i" } },
  //     { condition: { $regex: searchTerm, $options: "i" } },
  //     { brand: { $regex: searchTerm, $options: "i" } },
      
  //   ]
  // };
  // let sortBy: { [key: string]: SortOrder  } = {};
  // const sortParts = sort.split(':');
  // if (sortParts.length === 2) {
  //   sortBy[sortParts[0]] = sortParts[1] as SortOrder;
  // } else {
  //   sortBy[sort] = "asc";
  // }
  // console.log(sortBy)
  const queryObj = {...query};
  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query.searchTerm as string;
  }
  const searchQuery =Product.find({
    $or:['name','sportsType','brand'].map((field) => ({
      [field]:{$regex:searchTerm,$options:'i'}
    }))
  });

  const excludeFields = ['searchTerm','sort','limit','page']

  excludeFields.forEach((el) => delete queryObj[el]);
    const filter =  searchQuery.find(queryObj);

    let sort = '-createdAt'
    if(query?.sort){
      sort=query?.sort as string;
    }
    const sortQuery =  filter.sort(sort)
    let page=1;
    let limit = 10;
    let skip=0;
    if(query?.limit){
      limit = Number(query.limit);
    }
    if(query?.page){
      page = Number(query.page) ;
      skip=(page - 1)*limit;
    }
    const paginate =  sortQuery.skip(skip)
    
    const limitQuery = await paginate.limit(limit)

    return limitQuery;
    // return result;
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