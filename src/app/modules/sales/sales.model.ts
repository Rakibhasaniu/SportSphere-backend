import { Schema, model } from 'mongoose';
import TSales from './sales.interface';

const salesSchema = new Schema<TSales>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
        message: 'Quantity must be greater than zero',
      },
    },
    buyerName: {
      type: String,
      required: true,
    },
    saleDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Sales = model<TSales>('Sale', salesSchema);
