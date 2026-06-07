import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  order: number;
  active: boolean;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    link: { type: String },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Banner: Model<IBanner> =
  mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);
