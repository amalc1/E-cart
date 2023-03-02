import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCartAPI, getProducts } from "../api/productsNcart";
import { UserData } from "../context/UserContext";

const MainContent = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let [products, setProducts] = useState([]);
  const { productRefresh, setProductRefresh } = useContext(UserData);

  const navigate = useNavigate();
  useEffect(() => {
    getProducts().then((prod) => setProducts(prod.data));
  }, [productRefresh]);

  const addToCart = async (proId) => {
    try {
      let seletedProduct = products.filter((item) => item._id === proId);
      let response = await addToCartAPI(...seletedProduct);
      if (response.data.success) {
        setProductRefresh((v) => !v);
      }
    } catch (error) {
      if (error.response.data.authenticatedError) {
        console.log(error.response.data);
        navigate("/signup");
      }
    }
  };

  if (!products)
    return (
      <div className="flex items-center justify-center mt-20">
        <div
          className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );

  const productsList = products.map((item, index) => (
    <div key={index} className=" flex justify-center items-center">
      <div className="block  w-5/6 h-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
          {item.product_name}
        </h5>
        <img
          src={PF + item.thumb}
          className="w-full h-60 object-cover p-8"
          alt=""
        />
        <div className="flex flex-col justify-center gap-1">
          <p className=" text-gray-700 text-center dark:text-gray-400">
            {item.price} RS
          </p>
          <div className="flex justify-center gap-2">
            <p className="italic text-center text-gray-700  dark:text-gray-400">
              <span className="font-bold">{item.stock}</span> pieces left
            </p>
          </div>
          {products?.stock >= 1 ? (
            ""
          ) : (
            <button
              onClick={() => addToCart(item._id)}
              className=" hover:bg-blue-300 bg-red-100 text-black rounded px-2 py-1 flex mx-auto w-1/2   text-lg -tracking-wider border-transparent"
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="mx-auto max-w-5xl mt-10 grid grid-cols-3 gap-y-10 ">
      {productsList}
    </div>
  );
};

export default MainContent;
