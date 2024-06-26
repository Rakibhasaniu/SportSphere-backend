import { Schema } from 'mongoose';

type TSales = {
  product: Schema.Types.ObjectId;
  quantity: number;
  buyerName: string;
  saleDate: Date;
};

export default TSales;
