import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String },
    description: String,
    price: { type: Number },
    rating: { type: Number },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
  },
  {
    timestamps: true,
  }
);

export const Product = models?.Product || model("Product", ProductSchema);
