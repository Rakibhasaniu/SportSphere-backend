import { Product } from "./src/app/modules/products/product.model";

const getProductsValues = async () => {
    // Defines an asynchronous function named getProductsValues
    // The async keyword indicates that the function will return a promise
  
    const result = await Product.aggregate([
      // Calls the aggregate method on the Product model and awaits its result
      // This method is used to perform a sequence of operations on the product data
  
      {
        $facet: {
          // The $facet stage is used to process multiple aggregation pipelines within a single stage
          // It enables the aggregation of data along multiple dimensions
  
          sportType: [
            { $unwind: '$sportType' },
            // The $unwind stage deconstructs the sportType array field from the input documents
            // Each element of the sportType array will become a separate document
  
            { $group: { _id: '$sportType' } },
            // The $group stage groups documents by the sportType field
            // It creates a new document for each unique sportType with the sportType value as the _id
          ],
  
          brand: [
            { $unwind: '$brand' },
            // Similar to the previous facet, this unwinds the brand array field
  
            { $group: { _id: '$brand' } },
            // Groups documents by the brand field
          ],
  
          material: [
            { $unwind: '$material' },
            // Unwinds the material array field
  
            { $group: { _id: '$material' } },
            // Groups documents by the material field
          ],
  
          size: [
            { $unwind: '$size' },
            // Unwinds the size array field
  
            { $group: { _id: '$size' } },
            // Groups documents by the size field
          ],
  
          color: [
            { $unwind: '$color' },
            // Unwinds the color array field
  
            { $group: { _id: '$color' } },
            // Groups documents by the color field
          ],
  
          style: [
            { $unwind: '$style' },
            // Unwinds the style array field
  
            { $group: { _id: '$style' } },
            // Groups documents by the style field
          ],
        },
      },
    ]);
  
    return result;
    // Returns the result of the aggregation operation
  };
  