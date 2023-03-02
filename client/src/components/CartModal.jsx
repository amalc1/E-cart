import React, { useContext } from "react";
import { CartStore } from "../context/CartContext";
import { BsCaretUpFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";
import { deleteProductCart } from "../api/productsNcart";

const CartModal = () => {
  const { cartModal, setCartModal, cart } = useContext(CartStore);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleDelete = (proId, quantity) => {
    deleteProductCart(proId, quantity).then((d) => console.log(d));
  };
  return (
    <>
      {cartModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start gap-2 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl pl-14 mx-auto font-semibold">Cart</h3>
                  <button
                    className="p-1 px-3 ml-auto bg-red-500 rounded border-0 text-white  float-right leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setCartModal(false)}
                  >
                    X
                    {/* <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X 
                    </span> */}
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 w-full  h-30 mx-auto">
                    {cart?.map((item, index) => (
                      <div
                        key={index}
                        className="flex space-x-5 justify-between items-center mb-3"
                      >
                        <img
                          src={PF + item?.thumb}
                          className="w-20 h-20"
                          alt=""
                        />
                        <p>{item.product_name}</p>
                        <div className="px-10 flex flex-col justify-center items-center">
                          <button>
                            <BsCaretUpFill />
                          </button>
                          <button></button>
                          <p>{item.quantity}</p>
                          <button>
                            <FaCaretDown />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            handleDelete(item?.proId, item?.quantity)
                          }
                        >
                          <AiOutlineDelete className="h-7 w-7 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default CartModal;
