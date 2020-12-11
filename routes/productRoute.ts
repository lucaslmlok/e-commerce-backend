import express, { Request, Response } from "express";

import Product from "../models/productModel";
import { getToken, isAdmin, isAuth } from "../util";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product Not Found" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.send(products);
});

router.post("/", isAuth, isAdmin, async (req: Request, res: Response) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    desc: req.body.desc,
  });
  const newProduct = await product.save();
  if (newProduct) {
    res.status(201).send({
      msg: "New Product Created",
      data: newProduct,
    });
  }
  return res.status(500).send({ msg: "Error in Creating Product" });
});

router.put("/:id", isAuth, isAdmin, async (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.desc = req.body.desc;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res.status(200).send({
        msg: "Product Updated",
        data: updatedProduct,
      });
    }
  }
  return res.status(500).send({ msg: "Error in Updating Product" });
});

router.delete("/:id", isAuth, isAdmin, async (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {
    const deletedProduct = await product.remove();
    if (deletedProduct) {
      return res.send({
        msg: "Product Deleted",
        data: deletedProduct,
      });
    }
  }
  return res.status(500).send({ msg: "Error in Deleting Product" });
});

export default router;
