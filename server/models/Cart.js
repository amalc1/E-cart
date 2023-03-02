const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  proId: { type: String },
  product_name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  thumb: { type: String },
});

const Cart = mongoose.model("cart", CartSchema);

module.exports = Cart;
