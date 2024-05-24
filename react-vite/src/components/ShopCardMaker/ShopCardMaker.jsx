import { useNavigate } from "react-router-dom";

function ShopCardMaker({shopsArr}) {
  const navigate = useNavigate();
  console.log("shopsARR=====>",shopsArr)
  const shopMapper =
    shopsArr.map((shop, i) => {
      return (
        <div key={shop.id} className="shop-container" onClick={() => navigate(`/shops/${shop.id}`)}>
          <img src='img.png'></img>
          <div className="shop-text">{shop.name}</div>
          <div className="shop-text">{'Rating: ' + shop.avg_rating + ' Number of Reviews: ' + shop.num_reviews}</div>
          <div className="shop-text">
            {'Price Range: ' + shop.price_range}
            <div>
              {'categories: ' + shop.categories}
            </div>
          </div>
          <button className="shop-text" onClick={() => alert('Function coming soon')}>Get Directions</button>
          {/* open time is difficult to use for front end given this format */}
          {/* <div className="shop-text">{shop.hours}</div> */}
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
