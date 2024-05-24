import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createShopThunk,
  loadShopDetailsThunk,
  updateShopThunk,
} from "../../redux/shops";
import { useNavigate, useParams } from "react-router-dom";
import "./ShopForm.css";
import { getAllCategories } from "../../redux/categories";
import { loadShopsThunk } from "../../redux/shops";

function ShopFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const allCategories = useSelector((state) => state.categories.categories);
  const shop = useSelector((state) => state.shops.ShopDetails);
  const [isLoaded, setIsLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState({
    Monday: { open: "", close: "" },
    Tuesday: { open: "", close: "" },
    Wednesday: { open: "", close: "" },
    Thursday: { open: "", close: "" },
    Friday: { open: "", close: "" },
    Saturday: { open: "", close: "" },
    Sunday: { open: "", close: "" },
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const [streetOne, setStreetOne] = useState("");
  const [streetTwo, setStreetTwo] = useState("");
  const [city, setCity] = useState("");

  const [state, setState] = useState("");
  const [country, setCountry] = useState("United States of America");
  const [postal, setPostal] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getAllCategories());
      setIsLoaded(true);
    };
    if (id) {
      dispatch(loadShopDetailsThunk(id)).then((shop) => {
        setName(shop.name);
        setDescription(shop.description);
        setWebsite(shop.website);
        setPhoneNumber(shop.phone_number);
        setPriceRange(shop.price_range);
        setStreetOne(shop.address.address_line1);
        setStreetTwo(shop.address.address_line2);
        setCity(shop.address.city);
        setState(shop.address.state);
        setPostal(shop.address.postal_code);
        setCountry(shop.address.country);
        setCategories(shop.categories);

        Object.keys(shop.hours).forEach((day) => {
          setHours((prevHours) => ({
            ...prevHours,
            [day[0].toUpperCase() + day.slice(1)]: {
              ...prevHours[day[0].toUpperCase() + day.slice(1)],
              open: shop.hours[day].split(" - ")[0],
              close: shop.hours[day].split(" - ")[1],
            } || 'Closed',
          }));
        });

        setEdit(true);
        setIsLoaded(true);
      });
    } else {
      fetchCategories();
      dispatch(loadShopsThunk());
    }
  }, [dispatch]);

  const times = [
    "12:00am",
    "12:30am",
    "1:00am",
    "1:30am",
    "2:00am",
    "2:30am",
    "3:00am",
    "3:30am",
    "4:00am",
    "4:30am",
    "5:00am",
    "5:30am",
    "6:00am",
    "6:30am",
    "7:00am",
    "7:30am",
    "8:00am",
    "8:30am",
    "9:00am",
    "9:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "1:00pm",
    "1:30pm",
    "2:00pm",
    "2:30pm",
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
    "5:00pm",
    "5:30pm",
    "6:00pm",
    "6:30pm",
    "7:00pm",
    "7:30pm",
    "8:00pm",
    "8:30pm",
    "9:00pm",
    "9:30pm",
    "10:00pm",
    "10:30pm",
    "11:00pm",
    "11:30pm",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = {};
    if (!name) err.name = "Name is required!";
    if (!description) err.description = "Description is required!";
    if (!website) err.website = "Website is required!";
    if (!priceRange || isNaN(priceRange) || priceRange < 1 || priceRange > 5)
      err.priceRange = "Please select an average price!";
    if (!streetOne) err.streetOne = "Please enter a Street Address";
    if (!city) err.city = "Please enter a City";
    if (!state) err.state = "Please select a State";
    if (!country) err.country = "Please select a Country";
    if (!postal) err.postal = "Please enter a Postal Code";
    setErrors(err);

    if (Object.keys(err).length === 0) {
      const new_shop = {
        name,
        owner_id: sessionUser.id,
        description,
        website,
        phone_number: phoneNumber,
        price_range: priceRange,
        monday_open: hours.Monday.open,
        monday_close: hours.Monday.close,
        tuesday_open: hours.Tuesday.open,
        tuesday_close: hours.Tuesday.close,
        wednesday_open: hours.Wednesday.open,
        wednesday_close: hours.Wednesday.close,
        thursday_open: hours.Thursday.open,
        thursday_close: hours.Thursday.close,
        friday_open: hours.Friday.open,
        friday_close: hours.Friday.close,
        saturday_open: hours.Saturday.open,
        saturday_close: hours.Saturday.close,
        sunday_open: hours.Sunday.open,
        sunday_close: hours.Sunday.close,
        address_line1: streetOne,
        address_line2: streetTwo,
        city,
        state,
        postal_code: postal,
        country,
        categories,
        preview_image: image,
      };
      if (edit) {
        const data = await dispatch(updateShopThunk(new_shop, shop.id));
        // console.log("================>", data);
        navigate(`/shops/${data.id}`);
      } else {
        const data = await dispatch(createShopThunk(new_shop));
        navigate(`/shops/${data.id}`);
      }
    }
  };

  const handleDemoData = (e) => {
    setName('Created Coffee Shop')
    e.preventDefault();
    Object.keys(hours).forEach((day) => {
      setHours((prevHours) => ({
        ...prevHours,
        [day]: {
          ...prevHours[day],
          open: "6:30am",
          close: "6:30pm",
        },
      }));
    });
    setWebsite('www.created-shop.com')
    setPhoneNumber('4444444444')
    setPriceRange(3)
    setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.')
    setCategories(['Outdoor Seating', 'Free Wifi', 'Late Night', 'Study Area'])
    setStreetOne('123 CreateShop Road')
    setCity('Created City')
    setState('Pennsylvania')
    setPostal(123123)
    setImage('img.url')
  };

  const handleClearDays = (e) => {
    e.preventDefault();
    setSelectedDays([]);
  };

  const handleClearCategories = (e) => {
    e.preventDefault();
    setCategories([]);
  };

  const handleOpenChange = (days, value) => {
    days.forEach((day) => {
      setHours((prevHours) => ({
        ...prevHours,
        [day]: {
          ...prevHours[day],
          open: value,
        },
      }));
    });
  };

  const handleCloseChange = (days, value) => {
    days.forEach((day) => {
      setHours((prevHours) => ({
        ...prevHours,
        [day]: {
          ...prevHours[day],
          close: value,
        },
      }));
    });
  };

  const handleCategoriesChange = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories(categories.filter((x) => x !== e.target.value));
    } else {
      setCategories((prevCategories) => [...prevCategories, e.target.value]);
    }
  };

  return (
    (isLoaded && !sessionUser && (
      <h1 style={{ textAlign: "center", marginTop: "25px" }}>
        Please Log In or Sign Up
      </h1>
    )) || (
      <div>
        {edit ? (
            <h1 className="form-title">Update `{shop.name}`</h1>
        ) : (
          <>
            <h1 className="form-title">Create a Shop</h1>
            <button
              id="form-demo-button"
              onClick={(e) => handleDemoData(e)}
            >
              Demo Form Data
            </button>
          </>
        )}
        <form id="create-edit-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>General Information</h3>
            <p>Give your customers some details about your new coffee shop!</p>
          </div>
          <label>
            <p className="form-label" style={{ borderTop: "none" }}>
              Name
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <p className="form-label">Hours</p>
            <div>
              <select
                id="multiple-select"
                multiple
                value={selectedDays}
                onChange={(e) =>
                  setSelectedDays((prevDays) => [...prevDays, e.target.value])
                }
              >
                {Object.keys(hours).map((day) =>
                  hours[day] && hours[day].open ? (
                    <option key={day} value={day}>
                      {day}: {hours[day].open} - {hours[day].close}
                    </option>
                  ) : (
                    <option key={day} value={day}>
                      {day}: Closed
                    </option>
                  )
                )}
              </select>
              <select
                className="time-select"
                disabled={!selectedDays.length}
                value={
                  selectedDays.length && hours[selectedDays[0]]
                    ? hours[selectedDays[0]].open
                    : ""
                }
                onChange={(e) => handleOpenChange(selectedDays, e.target.value)}
              >
                <option value="" disabled>
                  Open
                </option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <select
                disabled={!selectedDays.length}
                className="time-select"
                value={
                  selectedDays.length && hours[selectedDays[0]]
                    ? hours[selectedDays[0]].close
                    : ""
                }
                onChange={(e) =>
                  handleCloseChange(selectedDays, e.target.value)
                }
              >
                <option className="time-select" value="" disabled>
                  Close
                </option>
                {times
                  .filter(
                    (time) =>
                      selectedDays.length &&
                      times.indexOf(time) >
                        times.indexOf(hours[selectedDays[0]].open)
                  )
                  .map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
              </select>
              <button
                className="hours-button"
                onClick={(e) => handleClearDays(e)}
              >
                Clear Days
              </button>
            </div>
          </label>
          <label>
            <p className="form-label">Website</p>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </label>
          <label>
            <div className="text-specification">
              <p className="form-label">Phone Number</p>
              <i>(optional)</i>
            </div>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label>
            <div>
              <p className="form-label">Price Range</p>
              {[1, 2, 3, 4].map((value) => (
                <span
                  key={value}
                  className={
                    value <= priceRange ? "form-dollar-filled" : "form-dollar"
                  }
                  onClick={() => setPriceRange(value)}
                >
                  &#36;
                </span>
              ))}
            </div>
          </label>
          {errors.priceRange && (
            <i style={{ color: "#FF253F", fontSize: "10px" }}>
              {errors.priceRange}
            </i>
          )}
          <div className="form-header">
            <h3>Additional Information</h3>
            <p>
              Tell customers more about your shop, be specific about things you
              offer and serve!
            </p>
          </div>
          <label>
            <div className="text-specification">
              <p className="form-label">Description</p>
              <i>Up to 200 characters</i>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            <div className="text-specification">
              <p className="form-label">Categories</p>
              <i>Select up to 8 (optional)</i>
            </div>
            <select
              multiple
              id="multiple-select"
              value={categories}
              onChange={(e) => handleCategoriesChange(e)}
            >
              {Object.entries(allCategories).map((category, index) => (
                <option
                  key={index}
                  value={category[1].name}
                  disabled={
                    categories.length === 8 &&
                    !categories.includes(category[1].name)
                  }
                >
                  {category[1].name}
                </option>
              ))}
            </select>
          </label>
          <button
            className="hours-button"
            onClick={(e) => handleClearCategories(e)}
          >
            Clear Categories
          </button>
          <div className="form-header">
            <h3>Location</h3>
            <p>Where are you located?</p>
          </div>
          <label>
            <p className="form-label">Street Address 1</p>
            <input
              type="text"
              value={streetOne}
              onChange={(e) => setStreetOne(e.target.value)}
              required
            />
          </label>
          <label>
            <div className="text-specification">
              <p className="form-label">Street Address 2</p>
              <i>(optional)</i>
            </div>
            <input
              type="text"
              value={streetTwo}
              onChange={(e) => setStreetTwo(e.target.value)}
            />
          </label>
          <label>
            <p className="form-label">City</p>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={{fontSize: '16px', marginTop: '30px'}}
              required
            >
              <option value="" disabled>
                Select your state
              </option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </label>
          <label>
            <p className="form-label">Country</p>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            <p className="form-label">Postal Code</p>
            <input
              type="number"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              required
            />
          </label>
          {!edit && (
            <>
              <div className="form-header">
                <h3>Photos</h3>
                <p>
                  Attach an image that we will display as your main photo for
                  guests to see. Be sure to make a good first impression!
                </p>
              </div>
              <label>
                <p className="form-label">Preview Photo Url</p>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </label>
            </>
          )}
          {Object.values(errors).map((message, idx) => (
            <i key={idx} style={{ color: "#FF253F", fontSize: "10px" }}>
              {message}
            </i>
          ))}
          {edit ? (
            <button type="submit" className="form-submit-button">
              Update
            </button>
          ) : (
            <button type="submit" className="form-submit-button">
              Create
            </button>
          )}
        </form>
      </div>
    )
  );
}

export default ShopFormPage;
