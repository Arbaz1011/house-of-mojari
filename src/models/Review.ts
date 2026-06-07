import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  approved: boolean;
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: String, required: true },
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ReviewSchema.index({ productId: 1 });

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
