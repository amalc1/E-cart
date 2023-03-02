const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/auth");
const {
  allProducts,
  addToCart,
  getCartProducts,
  deleteCartProduct,
} = require("../controllers/prodCartController");

router.route("/all").get(allProducts);
router.route("/cart").get(checkAuth, getCartProducts);
router.route("/del-cart").post(checkAuth, deleteCartProduct);
router.route("/to-cart").post(checkAuth, addToCart);

module.exports = router;
