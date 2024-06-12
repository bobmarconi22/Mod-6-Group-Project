import { useNavigate } from "react-router-dom";
import BeanRating from "./BeanRating";
import './ShopCardMaker.css';

function ShopCardMaker({ shopsArr }) {
  const navigate = useNavigate();
  // console.log("shopsARR=====>", shopsArr)
  let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  let dayOfWeek = days[new Date().getDay()]
  // console.log(dayOfWeek)

  const shopMapper =
    shopsArr.map((shop, i) => {
      // console.log(shop.avg_rating)
      let avg_rating = shop.avg_rating
      return (
        <div key={shop.id} className="shop-container" style={{height: '500px', width: '500px', display: 'flex'}} onClick={() => navigate(`/shops/${shop.id}`)}>
          <div className="img-div">
          <img src={shop.preview_image?.img_link}></img>
          </div>
          <div className="shop-text title">{shop.name}</div>
          <div className="shop-text rating-container">
            <span className="beans">{BeanRating({ avg_rating })} </span>
            <span>{`(${shop.num_reviews})`}</span>
          </div>
          <div>{'$'.repeat(shop.price_range)}</div>
          <div className="shop-text categories-container">
            {shop.categories.map((category, i) => {
              return (<div key={i} className="category-tag">{category}</div>)

            })}

          </div>
          <p className="shop-text open-today-text">Open today from {shop.hours[dayOfWeek]}</p>
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
