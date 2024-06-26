import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import SearchBar from "./SearchBar";

function Navigation() {
  return (
    <div className="nav-bar-background">
      <div className="nav-bar">
        <NavLink to="/">
          <img id="nav-logo" src="/logo.png" />
        </NavLink>
        <SearchBar />
        <div>
          {/* <span className="nav-text">BrewReview for Business</span> */}
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
