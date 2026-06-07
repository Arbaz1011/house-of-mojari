import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  sku: string;
  customizable: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    category: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    sku: { type: String, required: true, unique: true, uppercase: true },
    customizable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ title: "text", description: "text", sku: "text" });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
