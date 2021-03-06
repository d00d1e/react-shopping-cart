const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

// render static file in build folder, entry point at index.html
app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"))

// connect mongoose to db
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// Product Model
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

// get list of products from db
app.get("/api/products", async (req, res) => {
  const products = await Product.find({}); // return all products
  res.send(products);
});

// create and save new product to db
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

// delete product from db
app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

// Order Model
const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

// add orders to database
app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required." });
  }
  const order = await Order(req.body).save();
  res.send(order);
});

// get all orders from database
app.get("/api/orders", async(req, res) => {
  const orders = await Order.find({}); // get all orders, no filter
  res.send(orders);
});

// delete order from database
app.delete("/api/orders/:id", async(req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});

// listener on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:3000"))
