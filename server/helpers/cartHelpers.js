const Cart = require("../models/Cart");
const Product = require("../models/Product");
var { ObjectId } = require("mongoose");

module.exports = {
  addToCart: (cartData) => {
    let { product_name, price, thumb, _id } = cartData;
    return new Promise(async (resolve, reject) => {
      const item = new Cart({
        proId: _id,
        product_name,
        price,
        thumb,
        quantity: 1,
      });
      try {
        await item.save();
        resolve({ success: true });
      } catch (error) {
        reject({ reject: error.message });
      }
    });
  },

  decreaseProductCount: (proId) => {
    return new Promise(async (resolve, reject) => {
      try {
        Product.findOneAndUpdate(
          { _id: proId },
          { $inc: { stock: -1 } },
          { new: true }
        )
          .then((doc) => {
            console.log(doc);
            resolve({ success: true });
          })
          .catch((err) => resolve({ err: err.message }));
      } catch (error) {
        resolve({ error: error.message });
      }
    });
  },

  incQuantity: (proId) => {
    return new Promise((resolve, reject) => {
      try {
        Cart.findOneAndUpdate(
          { proId },
          { $inc: { quantity: 1 } },
          { new: true }
        ).then((d) => {
          console.log(d);
          resolve({ succes: true });
        });
      } catch (error) {
        reject({ error: error.message });
      }
    });
  },

  incProductStock: (proId, quantity) => {
    console.log(proId, quantity);
    return new Promise((resolve, reject) => {
      try {
        Product.findOneAndUpdate(
          { _id: ObjectId(proId) },
          { $inc: { stock: quantity } },
          { new: true }
        )
          .then((doc) => {
            console.log(doc);
            resolve({ success: true });
          })
          .catch((err) => resolve({ err: err.message }));
      } catch (error) {
        resolve({ error: error.message });
      }
    });
  },
};
