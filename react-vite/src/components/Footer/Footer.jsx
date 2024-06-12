import { useNavigate } from "react-router-dom";
import "./Footer.css";


function Footer() {
  const navigate = useNavigate()
  return (
    <div className="footer">
      <p onClick={() => navigate('/about')} id="about-us-link">About Us</p>
      <p>2024  appAcademy  Group  Project  --  BrewReview</p>
    </div>
  );
}

export default Footer;
