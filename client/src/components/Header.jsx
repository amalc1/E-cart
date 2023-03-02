import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getCartData } from "../api/productsNcart";
import { CartStore } from "../context/CartContext";
import { UserData } from "../context/UserContext";
import LogoutDropDown from "./LogoutDropDown";

const Header = () => {
  const [userLogged, setUserLogged] = useState(false);
  const { userDetails, setUserDetails, productRefresh } = useContext(UserData);
  const { cart, setCart, setCartModal } = useContext(CartStore);
  useEffect(() => {
    let userLogged = JSON.parse(localStorage.getItem("user"));
    setUserDetails(userLogged);
    if (userLogged) {
      setUserLogged(true);
      getCartData().then((d) => {
        setCart(d.data);
        console.log(d.data);
      });
    }
  }, [productRefresh]);

  return (
    <div>
      <nav className="w-full bg-blue-500 shadow p-2">
        <div className="justify-between px-4 mx-auto max-w-7xl items-center flex ">
          <div>
            <div className="flex items-center justify-between py-3 md:py-3 md:block">
              <h2 className="text-2xl font-bold text-white">E kart</h2>
            </div>
          </div>
          <div>
            <div className="flex-1 justify-self-center block">
              <ul className="items-center justify-center space-y-8 gap-2 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:text-indigo-200 cursor-pointer">
                  <div className=" text-white ">
                    <span className="relative inline-block">
                      <AiOutlineShoppingCart
                        className="h-6 w-6 inline-block mr-5"
                        onClick={() => setCartModal(true)}
                      />
                      {userDetails?.user ? (
                        <span className="absolute top-0 right-0 bg-red-500 text-white font-bold text-xs rounded-full px-1">
                          {cart?.length}
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </li>

                <li className="text-white hover:text-indigo-200  cursor-pointer ">
                  {userDetails?.user ? (
                    <LogoutDropDown />
                  ) : (
                    <Link to="/login">
                      <RiAccountCircleFill className="h-6 w-6" />
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
