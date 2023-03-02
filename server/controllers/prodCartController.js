const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const Cart = require("../models/Cart");
const {
  addToCart,
  decreaseProductCount,
  incQuantity,
  incProductStock,
} = require("../helpers/cartHelpers");

module.exports = {
  allProducts: async (req, res, next) => {
    try {
      let products = await Product.find();
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  },

  getCartProducts: async (req, res, next) => {
    try {
      let cart = await Cart.find();
      res.status(StatusCodes.OK).json(cart);
    } catch (error) {
      next(error);
    }
  },

  addToCart: async (req, res, next) => {
    let { stock, ...cartData } = req.body;
    try {
      let checkProdExist = await Cart.find({ proId: cartData._id });
      if (checkProdExist.length === 0) {
        let newProduct = addToCart(cartData);
        let decreaseStock = decreaseProductCount(cartData._id);
        Promise.all([newProduct, decreaseStock]).then(() => {
          return res
            .status(StatusCodes.CREATED)
            .json({ success: true, msg: "product inserted to cart" });
        });
      } else {
        let incCartQuantity = incQuantity(cartData._id);
        let decreaseStock = decreaseProductCount(cartData._id);
        Promise.all([incCartQuantity, decreaseStock]).then(() => {
          return res
            .status(StatusCodes.CREATED)
            .json({ success: true, msg: "product inserted to cart" });
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteCartProduct: async (req, res, next) => {
    let { proId, quantity } = req.body;
    console.log(req.body);
    try {
      await Cart.findOneAndDelete({ proId });
      incProductStock(proId, quantity).then((d) => console.log(d));

      res.send("kdj");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
