import { getAllCategories } from "../../redux/categories";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function SearchBar() {
    const [category, setCategory] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState('')
    const [priceRange, setPriceRange] = useState({"1": false, "2": false, "3": false, "4": false, "5": false})
    const allCategories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
    const fetchCategories = async () => {
      await dispatch(getAllCategories());
      setIsLoaded(true);
    };
    fetchCategories();
  }, [dispatch]);

   const handlePriceRangeToggle = (e) => {
    const value = e.target.value;
    setPriceRange((prevPriceRange) => ({
      ...prevPriceRange,
      [value]: !prevPriceRange[value]
    }));
  };

  const clear = (e) => {
    e.preventDefault()
    setCategory("")
    setName("")
    setPriceRange({"1": false, "2": false, "3": false, "4": false, "5": false})
    navigate('/')
  }

// Search
  const handleSearch= async (e) => {
    e.preventDefault()
    let priceRangeArr = Object.keys(priceRange).filter(num => priceRange[num] === true)

    const query = {}
    if (priceRangeArr.length > 0) query.priceRange = priceRangeArr.join(',')
    if(name.length > 0) query.name = name
    if(category.length > 0) query.category = category

    const params = new URLSearchParams(query)


    navigate(`/search?${params.toString()}`)
  }


    return (
    isLoaded && (
      <div className="search-bar-div">
        <form onSubmit={(e) => handleSearch(e)} className="search-bar">
            <div>
          <input placeholder="Shop Name" value={name} onChange={(e)=> setName(e.target.value)}></input>
          </div>
          <div >
          <label className="category-label">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
                <option value="" >All Categories</option>
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
            <button type="button" onClick={(e) => handlePriceRangeToggle(e)} value="1" id="left-button" className={priceRange["1"] ? "dollar-filled left-button" : "dollar left-button"}>
              &#36;
            </button>
             <button type="button" onClick={(e) => handlePriceRangeToggle(e)} value="2" className={priceRange["2"] ? "dollar-filled" : "dollar"}>
              &#36; &#36;
            </button>
             <button type="button" onClick={(e) => handlePriceRangeToggle(e)} value="3" className={priceRange["3"] ? "dollar-filled" : "dollar"}>
              &#36; &#36; &#36;
            </button>
             <button type="button" onClick={(e) => handlePriceRangeToggle(e)} value="4" id="right-button" className={priceRange["4"] ? "dollar-filled right-button" : "dollar right-button"}>
              &#36; &#36; &#36; &#36;
            </button>
          </div>
          <button id="search-submit" type="submit">Search</button>
          <button id="search-submit" type="submit" onClick={(e) => clear(e)}>Clear</button>
        </form>
      </div>
    )
  );
}

export default SearchBar
