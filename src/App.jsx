import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import MyOrder from "./pages/MyOrder/MyOrder";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authMode, setAuthMode] = useState("Login");

  useEffect(() => {
    document.body.style.overflow = showAuthPopup ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAuthPopup]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
        limit={2}
        transition={Slide}
      />
      {showAuthPopup && (
        <LoginPopup
          setShowAuthPopup={setShowAuthPopup}
          authMode={authMode}
          setAuthMode={setAuthMode}
        />
      )}
      <div className="app">
        <Navbar setShowAuthPopup={setShowAuthPopup} setAuthMode={setAuthMode} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/placeorder" element={<PlaceOrder />}></Route>
          <Route
            path="/myorder"
            element={<MyOrder setShowAuthPopup={setShowAuthPopup} />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
