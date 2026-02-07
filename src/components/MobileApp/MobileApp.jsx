import "./MobileApp.css";
import { assets } from "../../assets/assets";

const MobileApp = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br /> Swiggy App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Mobileapp" />
        <img src={assets.app_store} alt="Mobileapp" />
      </div>
    </div>
  );
};

export default MobileApp;
