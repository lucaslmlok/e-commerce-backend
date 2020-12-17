import express, { Request, Response } from "express";

import Order from "../models/orderModel";
import { IRequest, isAuth } from "../util";

const router = express.Router();

router.get("/", isAuth, async (req: IRequest, res: Response) => {
  const user = req.user;

  const orders = await Order.find({
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
    },
  }).sort("-orderDate");

  if (orders) {
    res.send(orders);
  } else {
    return res.status(500).send({ msg: "Error in Getting Orders" });
  }
});

router.post("/", isAuth, async (req: IRequest, res: Response) => {
  const user = req.user;
  const { cartItems, shipping, payment, price } = req.body;

  const newOrder = await Order.create({
    items: cartItems.map((v) => {
      v.productId = v.product;
      delete v.product;
      delete v.countInStock;
      return v;
    }),
    price,
    shipping,
    payment,
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
    },
    orderDate: new Date().toString(),
    status: "success",
  });

  if (newOrder) {
    res.status(201).send({
      msg: "Order Placed Successfully",
      data: newOrder,
    });
  }
  return res.status(500).send({ msg: "Error in Placing Order" });
});

export default router;
