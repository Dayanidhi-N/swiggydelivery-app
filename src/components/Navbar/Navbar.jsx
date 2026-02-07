import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { useAuth } from "../../Context/AuthContext";

const Navbar = ({ setShowAuthPopup, setAuthMode }) => {
  const [menu, setMenu] = useState("home");
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { getCartAmount } = useContext(StoreContext);
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <Link to={"/"} onClick={() => setMenu("home")}>
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <Link
          to="/myorder"
          onClick={() => setMenu("myorder")}
          className={menu === "myorder" ? "active" : ""}
        >
          My Orders
        </Link>

        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          {getCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {user ? (
          <div
            className="nav-profile"
            onMouseEnter={() =>
              window.innerWidth > 768 && setShowDropdown(true)
            }
            onMouseLeave={() =>
              window.innerWidth > 768 && setShowDropdown(false)
            }
          >
            {/* Avatar */}
            <img
              src={assets.profile_icon}
              alt="profile"
              onClick={() => {
                if (window.innerWidth > 768) {
                  setShowDropdown((prev) => !prev); // Desktop dropdown
                } else {
                  setShowMobileProfile(true); // Mobile slide menu
                }
              }}
            />

            {/* Dropdown */}
            {showDropdown && (
              <div className="profile-dropdown">
                <Link
                  to="/myorder"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  My Orders
                </Link>

                <Link
                  to="/"
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              setAuthMode("Login");
              setShowAuthPopup(true);
            }}
          >
            Login
          </button>
        )}

        {/* ===== Mobile Profile Slide Menu ===== */}
        <div
          className={`mobile-profile-menu ${showMobileProfile ? "active" : ""}`}
        >
          <div
            className="mobile-profile-overlay"
            onClick={() => setShowMobileProfile(false)}
          ></div>

          {/* Slide Panel */}
          <div className="mobile-profile-panel">
            <h3>My Account</h3>

            <Link to="/myorder" onClick={() => setShowMobileProfile(false)}>
              My Orders
            </Link>

            <Link
              to="/"
              onClick={() => {
                logout();
                setShowMobileProfile(false);
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
