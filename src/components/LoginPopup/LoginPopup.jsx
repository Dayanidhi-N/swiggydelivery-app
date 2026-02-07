import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowAuthPopup, authMode, setAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { login, signup } = useAuth();

  let buttonText;
  if (loading) {
    buttonText =
      authMode === "Sign Up" ? "Creating account..." : "Logging in...";
  } else {
    buttonText = authMode === "Sign Up" ? "Create account" : "Login";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (authMode === "Sign Up") {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      setShowAuthPopup(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        {/* Title & Close Button */}
        <div className="login-popup-title">
          <h2>{authMode}</h2>
          <img
            onClick={() => setShowAuthPopup(false)}
            src={assets.cross_icon}
            alt="Close button"
            role="button"
            aria-label="Close login popup"
          />
        </div>

        {/* Inputs */}
        <div className="login-popup-inputs">
          {authMode === "Sign Up" && (
            <input type="text" placeholder="Your name" required />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {buttonText}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            By continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>

        {authMode === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setAuthMode("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setAuthMode("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
