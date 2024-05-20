// import { useState } from "react";
// import { thunkLogin } from "../../redux/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
import "./LandingPage.css";

function LandingPage() {
  // const dispatch = useDispatch();
  let shopsList = ['temp shop seeder', 'temp shop seeder', 'temp shop seeder', 'temp shop seeder', 'temp shop seeder', 'temp shop seeder']
  const shopMapper =
    // temporary code until seeder data is used, swap inputs with seeder info
    // add to map input later { shop, id }
    shopsList.map((shop, i) => {
      return (
        <div key={i} className="shop-container">
          <img src='temp.png'></img>
          <div className="shop-text">Coffee shop name</div>
          <div className="shop-text">Rating & num review</div>
          <div className="shop-text">Price Range & Categories</div>
          <button className="shop-text">Get Directions</button>
          <div className="shop-text">Open until (time)</div>
        </div>
      )
    });

  return (
    <>
      <div id="category-section-container">
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
      </div>

      <div id="shop-section-contianer">
        <h1># all Coffee Shops</h1>
        <div className="shop-list-container">
          <>
            {shopMapper}
          </>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
