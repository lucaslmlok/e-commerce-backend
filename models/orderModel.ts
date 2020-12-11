import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  items: {
    product: string;
    name: string;
    image: string;
    price: number;
    qty: number;
  }[];
  price: {
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
  };
  shipping: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  payment: { paymentMethod: string };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderDate: string;
  status: string;
}

const orderSchema = new mongoose.Schema({
  items: [
    { id: String, name: String, image: String, price: String, qty: Number },
  ],
  price: {
    itemsPrice: Number,
    shippingPrice: Number,
    taxPrice: Number,
    totalPrice: Number,
  },
  shipping: {
    address: String,
    city: String,
    country: String,
    postalCode: Number,
  },
  payment: {
    paymentMethod: String,
  },
  user: {
    _id: String,
    name: String,
    email: String,
  },
  orderDate: Date,
  status: String,
});

const orderModel = mongoose.model<IOrder>("Order", orderSchema);

export default orderModel;
