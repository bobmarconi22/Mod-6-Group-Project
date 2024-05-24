// import { useState } from "react";
// import { thunkLogin } from "../../redux/session";
// import { useModal } from "../../context/Modal";
import ShopCardMaker from "../ShopCardMaker";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loadShopsThunk } from "../../redux/shops";

import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();

  // let shopsList = ['temp shop seeder', 'temp shop seeder', 'temp shop seeder', 'temp shop seeder', 'temp shop seeder', 'temp shop seeder']
  let shopsObj = useSelector((state) => state.shops.allShops)
  let shopsArr = Object.values(shopsObj)

  useEffect(() => {
    dispatch(loadShopsThunk())
  }, [dispatch])

  return (
    <>
      {/* <div id="category-section-container">
        <h1>Categories</h1>
        <div className="category-list-container">
          <div className="category-box">American</div>
          <div className="category-box">French</div>
          <div className="category-box">Italian</div>
          <div className="category-box">Late Night</div>
          <div className="category-box">Espresso</div>
          <div className="category-box">Latte</div>
          <div className="category-box">Mocha</div>
          <div className="category-box">Frappe</div>
        </div>
      </div> */}

      <div id="shop-section-contianer">
        <h1>Make your next BrewReview</h1>
        <div className="shop-list-container">
          <>
            <ShopCardMaker shopsArr={shopsArr} />
          </>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
