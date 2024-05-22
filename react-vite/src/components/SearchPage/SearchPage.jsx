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


    return (
        !loading && filteredShops.length > 0 ? (<div>
            <ShopCardMaker shopsArr={filteredShops}/>
        </div>) : (<h1>Sorry no results!</h1>)
    )
}

export default SearchPage;
