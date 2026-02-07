import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    food_list,
    removeFromCart,
    cartItems,
    addTOCart,
    deleteFromCart,
    getCartAmount,
    deliveryFees,
    hasItems,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="food" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <div className="cart-quantity">
                    <img
                      onClick={() => {
                        removeFromCart(item._id);
                        toast.info("Item removed ❌");
                      }}
                      src={assets.remove_icon_red}
                      alt="removeFood"
                    />
                    <p>{cartItems[item._id]}</p>
                    <img
                      onClick={() => {
                        addTOCart(item._id);
                        toast.success("Item added 🛒");
                      }}
                      src={assets.add_icon_green}
                      alt="addFood"
                    />
                  </div>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p>
                    <RiDeleteBinLine
                      className="delete-icon"
                      onClick={() => {
                        deleteFromCart(item._id);
                        toast.error("Item removed from cart 🗑️");
                      }}
                    />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{hasItems ? deliveryFees : 0}</p>
              {/* <p>₹ 100</p> */}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              {/* <b>₹{getCartAmount() + 100}</b> */}
              <b>₹{hasItems ? getCartAmount() + deliveryFees : 0}</b>
            </div>
          </div>
          <button onClick={() => navigate("/placeorder")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>if you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
