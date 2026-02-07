import React, { useEffect, useState, useContext } from "react";
import "./MyOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const MyOrder = ({ setShowAuthPopup }) => {
  const { food_list } = useContext(StoreContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  /* FETCH ORDERS */

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
      );

      const querySnapshot = await getDocs(q);

      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Latest first (basic reverse)
      setOrders(ordersData.reverse());
    };

    fetchOrders();
  }, [user]);

  /* NOT LOGGED IN */

  if (!user) {
    return (
      <div className="orders-empty-page">
        <h2>Please login to see your orders</h2>
        <button onClick={() => setShowAuthPopup(true)}>Login</button>
      </div>
    );
  }

  /* NO ORDERS */
  if (orders.length === 0) {
    return (
      <div className="orders-empty-page">
        <h2>You haven’t placed any orders yet</h2>
        <p>Looks like your plate is empty 🍽️</p>
        <button onClick={() => navigate("/")}>Order Food</button>
      </div>
    );
  }

  const latestPhone = orders[0]?.deliveryDetails?.phone || "Not Available";

  return (
    <div className="profile orders-page-bg">
      <div className="profile-container">
        <div className="profile-orders">
          <h2>Your Orders</h2>

          <div className="orders-table">
            {/* HEADER */}
            <div className="orders-header">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Qty</p>
              <p>Total</p>
              <p>Status</p>
            </div>

            <hr />

            {/* ORDERS LOOP */}
            {orders.map((order, orderIndex) => (
              <div key={order.id} className="order-card">
                {/* SL NO / ORDER NUMBER */}
                <div className="order-number">Order #{orderIndex + 1}</div>

                {/* ITEMS */}
                {order.items.map((item, index) => {
                  const food = food_list.find((f) => f._id === item.id);

                  return (
                    <div key={index} className="orders-header orders-item">
                      <img src={food?.image} alt="food" />
                      <p>{item.name}</p>
                      <p>₹{item.price ?? 0}</p>
                      <p>{item.quantity ?? 0}</p>
                      <p>₹{item.total ?? 0}</p>
                      <p className="status">{order.status}</p>
                    </div>
                  );
                })}

                {/* ORDER TOTAL */}
                <div className="order-total">
                  <p>
                    Order Total :<span> ₹{order.pricing.total ?? 0}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            RIGHT → PROFILE CARD
        ========================== */}
        <div className="profile-card">
          <img src={assets.user_logo} alt="avatar" className="profile-avatar" />

          <h3>{orders[0]?.deliveryDetails?.name || "Food User"}</h3>
          <p>{user?.email}</p>

          <div className="profile-info">
            <div>
              <span>Phone</span>
              <p>+91 {latestPhone}</p>
            </div>

            <div>
              <span>Total Orders</span>
              <p>{orders.length}</p>
            </div>
          </div>

          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
