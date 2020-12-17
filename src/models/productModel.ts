import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  image: string;
  brand: string;
  price: Number;
  category: string;
  countInStock: Number;
  desc: string;
  rating: Number;
  numReviews: Number;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  desc: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
});

const productModel = mongoose.model<IProduct>("Product", productSchema);

export default productModel;
