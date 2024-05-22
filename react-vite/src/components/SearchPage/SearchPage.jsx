import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ShopCardMaker from '../ShopCardMaker/ShopCardMaker';

function SearchPage() {
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log("USE EFFECT RUNNING")
    const queryString = location.search;
    fetch(`/api/search${queryString}`)
      .then(response => {
        // Check if response is OK and log the response status
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(results => {
        console.log("API Results:", results);
        setFilteredShops(results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [location.search]);

    // const shopMapper =
    // filteredShops.map((shop, i) => {
    //   return (
    //     <div key={i} className="shop-container">
    //       <img src='img.png'></img>
    //       <div className="shop-text">{shop.name}</div>
    //       <div className="shop-text">{'Rating: ' + shop.avg_rating + ' Number of Reviews: ' + shop.num_reviews}</div>
    //       <div className="shop-text">
    //         {'Price Range: ' + shop.price_range}
    //         <div>
    //           {'categories: ' + shop.categories}
    //         </div>
    //       </div>
    //       <button className="shop-text" onClick={() => alert('Function coming soon')}>Get Directions</button>
    //     </div>
    //   )
    // });



    return (
        !loading && filteredShops.length > 0 ? (<div>
            <ShopCardMaker shopsArr={filteredShops}/>
        </div>) : (<h1>Sorry no results!</h1>)
    )
}

export default SearchPage;
