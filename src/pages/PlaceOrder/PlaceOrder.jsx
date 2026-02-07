import { useState, useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    getCartAmount,
    deliveryFees,
    hasItems,
    food_list,
    cartItems,
    setCartItems,
  } = useContext(StoreContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Guard — Empty Cart UI
  if (!hasItems) {
    return (
      <div className="empty-cart-page">
        <h2>Your cart is empty 🛒</h2>
        <p>Add items to place an order</p>
        <button onClick={() => navigate("/")}>Order Food</button>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!user) {
      toast.error("Please login to place order");
      return;
    }

    try {
      // Build cart products
      const cartProducts = food_list
        .filter((food) => cartItems[food._id] > 0)
        .map((food) => ({
          id: food._id,
          name: food.name,
          price: food.price,
          quantity: cartItems[food._id],
          total: food.price * cartItems[food._id],
        }));

      // Order schema
      const orderData = {
        userId: user.uid,
        email: user.email,
        items: cartProducts,

        pricing: {
          subtotal: getCartAmount(),
          deliveryFee: deliveryFees,
          total: getCartAmount() + deliveryFees,
        },
        deliveryDetails: formData,
        status: "placed",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await addDoc(collection(db, "orders"), orderData);
      toast.success("Order placed successfully 🎉");

      setCartItems({});
      setFormData({
        name: "",
        phone: "",
        address: "",
        city: "",
      });

      // navigate("/my-orders");
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="place-order" onSubmit={handlePlaceOrder}>
        {/* LEFT — Delivery Form */}
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.name}
            pattern="^[A-Za-z ]{3,30}$"
            title="Name should contain only letters"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phone}
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Street Address"
            onChange={handleChange}
            value={formData.address}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={formData.city}
            pattern="^[A-Za-z ]{3,30}$"
            title="City should contain only letters"
            required
          />
        </div>

        {/* RIGHT — Cart Total */}
        <div className="place-order-right">
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
                <p>₹{deliveryFees}</p>
              </div>

              <hr />

              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{getCartAmount() + deliveryFees}</b>
              </div>
            </div>

            <button type="submit" disabled={loading}>
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
