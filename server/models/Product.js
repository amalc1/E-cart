const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: { type: String },
  price: { type: Number },
  stock: { type: Number },
  thumb: { type: String },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
