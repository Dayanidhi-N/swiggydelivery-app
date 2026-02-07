import { createContext, useEffect } from "react";
import { food_list } from "../assets/assets";
import { useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addTOCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => {
        return { ...prev, [itemId]: 1 };
      });
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;

      const newCart = { ...prev };

      if (newCart[itemId] === 1) {
        delete newCart[itemId];
      } else {
        newCart[itemId] -= 1;
      }
      return newCart;
    });
  };
  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((foodItem) => foodItem._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const hasItems = Object.keys(cartItems).length > 0;
  const deliveryFees = 100;

  const contextValue = {
    food_list,
    addTOCart,
    removeFromCart,
    cartItems,
    setCartItems,
    deleteFromCart,
    getCartAmount,
    deliveryFees,
    hasItems,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
