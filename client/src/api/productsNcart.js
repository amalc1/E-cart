import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    config.headers.token = `Bearer ${token ? token : ""}`;
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const getProducts = () => API.get("/products/all");
export const getCartData = () => API.get("/products/cart");
export const deleteProductCart = (proId, quantity) =>
  API.post("/products/del-cart", { proId, quantity });
export const addToCartAPI = (data) => API.post("/products/to-cart", data);
