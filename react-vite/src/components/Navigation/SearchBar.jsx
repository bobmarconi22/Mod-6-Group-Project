import { getAllCategories } from "../../redux/category";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function SearchBar() {
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [priceRange, setPriceRange] = useState({"1": false, "2": false, "3": false, "4": false, "5": false})
    const allCategories = useSelector((state) => state.categories.categories);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( () => {
    const fetchCategories = async () => {
      await dispatch(getAllCategories());
      setIsLoaded(true);
    };
    fetchCategories();
  }, [dispatch]);



    const handleCategoriesChange = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories(categories.filter((x) => x !== e.target.value));
    } else {
      setCategories((prevCategories) => [...prevCategories, e.target.value]);
    }
  };

   const handlePriceRangeToggle = (e) => {
    const value = e.target.value;
    setPriceRange((prevPriceRange) => ({
      ...prevPriceRange,
      [value]: !prevPriceRange[value]
    }));
  };

// Search by name
  const handleSearchByName = (e) => {
    e.preventDefault()
  }
// Search by filters
  const handleFilterSearch = (e) => {
    e.preventDefault()
  }

    return (
    isLoaded && (
      <div className="search-bar">
        <form onSubmit={(e) => handleSearchByName(e)}>
            <div>
          <input placeholder="Search by name of shop"></input>
          </div>
          <button type="submit">Search by Shop Name</button>
          </form>
          <form on onSubmit={(e) => handleFilterSearch(e)}>
          <div>

          <label>
            Categories
            <select
              value={categories}
              onChange={(e) => handleCategoriesChange(e)}
            >
              {Object.entries(allCategories).map((category, index) => (
                <option
                  key={index}
                  value={category[1].name}
                >
                  {category[1].name}
                </option>
              ))}
            </select>
          </label>

          </div>
          <div className="price-range-div">
            <button type="button" onClick={(e) => handlePriceRangeToggle(e)} value="1" className={priceRange["1"] ? "dollar-filled" : "dollar"}>
              &#36;
            </button>
             <button type="button" onClick={(e) => handlePriceRangeToggle(e)} value="2" className={priceRange["2"] ? "dollar-filled" : "dollar"}>
              &#36; &#36;
            </button>
             <button type="button" onClick={(e) => handlePriceRangeToggle(e)} value="3" className={priceRange["3"] ? "dollar-filled" : "dollar"}>
              &#36; &#36; &#36;
            </button>
             <button type="button" onClick={(e) => handlePriceRangeToggle(e)} value="4" className={priceRange["4"] ? "dollar-filled" : "dollar"}>
              &#36; &#36; &#36; &#36;
            </button>
             <button type="button" onClick={(e) => handlePriceRangeToggle(e)} value="5" className={priceRange["5"] ? "dollar-filled" : "dollar"}>
              &#36; &#36; &#36; &#36; &#36;
            </button>
          </div>
          <button type="submit">Filter Shops</button>
        </form>
      </div>
    )
  );
}

export default SearchBar
