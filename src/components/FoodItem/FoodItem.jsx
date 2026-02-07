import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";

const FoodItem = ({ id, name, price, description, image }) => {
  const { addTOCart, removeFromCart, cartItems } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => {
              addTOCart(id);
              toast.success("Item added 🛒");
            }}
            src={assets.add_icon_white}
            alt="Quantity"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => {
                removeFromCart(id);
                toast.info("Item removed ❌");
              }}
              src={assets.remove_icon_red}
              alt="addFood"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => {
                addTOCart(id);
                toast.success("Item added 🛒");
              }}
              src={assets.add_icon_green}
              alt="addFood"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Ratings" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
