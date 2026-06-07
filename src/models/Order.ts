import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderProduct {
  productId: string;
  title: string;
  sku: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface IOrder extends Document {
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  products: IOrderProduct[];
  total: number;
  status: string;
}

const OrderProductSchema = new Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  sku: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String },
    products: [OrderProductSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
