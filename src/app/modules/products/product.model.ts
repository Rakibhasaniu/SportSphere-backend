import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sportsType: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
  },

},
{
  timestamps:true
})

export const Product = mongoose.model('product', productSchema)
