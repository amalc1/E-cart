import { createContext, useState } from "react";

export const CartStore = createContext("");

function CartContext({ children }) {
  const [cart, setCart] = useState([]);
  const [cartModal, setCartModal] = useState(false);
  return (
    <CartStore.Provider value={{ cart, setCart, cartModal, setCartModal }}>
      {children}
    </CartStore.Provider>
  );
}

export default CartContext;
