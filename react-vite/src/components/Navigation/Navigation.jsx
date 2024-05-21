import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from '../Reviews/CreateReviewModal'
import "./Navigation.css";


function Navigation() {
  return (
    <div className="nav-bar">
      <NavLink to="/">
        <img id='nav-logo' src="../../public/favicon.ico" />
      </NavLink>
      <input placeholder="places to visit" className="search-bar"></input>
      <div>
        {/* <span className="nav-text">BrewReview for Business</span> */}
        <OpenModalButton
            buttonText="Write a Review"
            modalComponent={<CreateReviewModal />}
        />
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
