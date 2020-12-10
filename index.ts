import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import data from "./data";
import config from "./config";
import userRoute from "./routes/userRoute";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => {
    console.log(err.reason);
  });

const app = express();
const PORT = 5000;
app.use(bodyParser.json());

app.use("/api/users", userRoute);

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((prod) => prod._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product not found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
