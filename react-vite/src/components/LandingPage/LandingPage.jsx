// import { useState } from "react";
// import { thunkLogin } from "../../redux/session";
// import { useModal } from "../../context/Modal";
import ShopCardMaker from "../ShopCardMaker";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loadShopsThunk } from "../../redux/shops";

import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let shopsList = ['temp shop seeder', 'temp shop seeder', 'temp shop seeder', 'temp shop seeder', 'temp shop seeder', 'temp shop seeder']
  let shopsObj = useSelector((state) => state.shops)
  let shopsArr = Object.values(shopsObj)
  // console.log(shopsArr)

  // const shopMapper =
  //   // temporary code until seeder data is used, swap inputs with seeder info
  //   // add to map input later { shop, id }
  //   // need to change values after backend response is changed 5/22
  //   shopsArr.map((shop, i) => {
  //     return (
  //       <div key={i} className="shop-container" onClick={() => navigate(`/shops/${shop.id}`)}>
  //         <img src='img.png'></img>
  //         <div className="shop-text">{shop.name}</div>
  //         <div className="shop-text">{'Rating: ' + shop.avg_rating + ' Number of Reviews: ' + shop.num_reviews}</div>
  //         <div className="shop-text">
  //           {'Price Range: ' + shop.price_range}
  //           <div>
  //             {'categories: ' + shop.categories}
  //           </div>
  //         </div>
  //         <button className="shop-text" onClick={() => alert('Function coming soon')}>Get Directions</button>
  //         {/* open time is difficult to use for front end given this format */}
  //         {/* <div className="shop-text">{shop.hours}</div> */}
  //       </div>
  //     )
  //   });

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
        <h1># all Coffee Shops</h1>
        <div className="shop-list-container">
          <>
            <ShopCardMaker shopsArr={shopsArr}/>
          </>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
