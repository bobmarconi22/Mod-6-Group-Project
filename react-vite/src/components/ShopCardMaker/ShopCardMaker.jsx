import { useNavigate } from "react-router-dom";
import BeanRating from "./BeanRating";

function ShopCardMaker({ shopsArr }) {
  const navigate = useNavigate();
  // console.log("shopsARR=====>", shopsArr)
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let dayOfWeek = days[new Date().getDay()]
  // console.log(dayOfWeek)

  const shopMapper =
    shopsArr.map((shop, i) => {
      // console.log(shop.avg_rating)
      let avg_rating = shop.avg_rating
      return (
        <div key={shop.id} className="shop-container" onClick={() => navigate(`/shops/${shop.id}`)}>
          <img src='img.png'></img>
          <div className="shop-text">{shop.name}</div>
          <div className="shop-text">
            <span>{BeanRating({ avg_rating })} </span>
            <span>{` (${shop.num_reviews})`}</span>
          </div>
          <div className="shop-text">
            {'$'.repeat(shop.price_range)}
            <div>
              {shop.categories.map((category, i) => {
                return (<div key={i} className="category-tag">{category}</div>)

              })}
            </div>
          </div>
          <button className="shop-text" onClick={() => alert('Function coming soon')}>Get Directions</button>
          {/* open time is difficult to use for front end given this format */}
          <div className="shop-text">Open today from {shop.hours[dayOfWeek]}</div>
        </div>
      )
    });

  return (
    <>
      {shopMapper}
    </>
  )
}

export default ShopCardMaker
