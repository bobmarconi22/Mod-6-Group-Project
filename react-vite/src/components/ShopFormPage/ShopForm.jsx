import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShop } from "../../redux/shop";
import { Navigate, useNavigate } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import "./ShopForm.css";

function ShopFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState({
    Monday: { open: "Open", close: "Close" },
    Tuesday: { open: "Open", close: "Close" },
    Wednesday: { open: "Open", close: "Close" },
    Thursday: { open: "Open", close: "Close" },
    Friday: { open: "Open", close: "Close" },
    Saturday: { open: "Open", close: "Close" },
    Sunday: { open: "Open", close: "Close" },
  });
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [streetOne, setStreetOne] = useState("");
  const [streetTwo, setStreetTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("United States of America");
  const [postal, setPostal] = useState("");
  const [website, setWebsite] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const allCategories = ["Category1", "Category2", "Category3"]; // Example categories

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
    if (
      Object.values(hours).some(
        (day) => day.open === "Open" || day.close === "Close"
      )
    )
      err.hours = "Please specify Opening and Closing hours for every day!";
    if (!website) err.website = "Website is required!";
    if (!priceRange || isNaN(priceRange) || priceRange < 1 || priceRange > 5)
      err.priceRange = "Please select an average price!";
    if(!streetOne) err.streetOne = 'Please enter a Street Address'
    if(!city) err.city = 'Please enter a City'
    if(!state) err.state = 'Please select a State'
    if (!country) err.country = 'Please select a Country'
    if (!postal) err.postal = 'Please enter a Postal Code'
    setErrors(err);

    if (Object.keys(err).length === 0) {
      const newSpot = {
        name,
        owner_id: sessionUser.id,
        description,
        hours: hours.json(),
        website,
        phone_number: phoneNumber,
        price_range: priceRange,
        Address: {
          shop_id: newSpot.id,
          address_line1: streetOne,
          address_line2: streetTwo,
          city,
          state,
          postal_code: postalCode,
          country
        },
        categories: categories

      }
      if (serverResponse.errors) {
        setErrors(serverResponse.errors);
      } else {
        navigate("/");
      }
    }
  };

  const handleOpenChange = (day, value) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        open: value,
      },
    }));
  };

  const handleCloseChange = (day, value) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        close: value,
      },
    }));
  };

  const handleCategoriesChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    if (selectedCategories.length <= 3) {
      setCategories(selectedCategories);
    }
  };

  return ( !sessionUser && <h1 style={{textAlign: 'center'}}>Please Log In or Sign Up</h1> ||
    <div>
      <h1>Create A Shop</h1>
      {Object.values(errors).map((message, idx) => (
        <p key={idx}>{message}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          Hours
          <div>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              required
            >
              {Object.keys(hours).map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={hours[selectedDay].open}
              onChange={(e) => handleOpenChange(selectedDay, e.target.value)}
              required
            >
              <option value="Open" disabled>
                Open
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
            -
            <select
              value={hours[selectedDay].close}
              onChange={(e) => handleCloseChange(selectedDay, e.target.value)}
              required
            >
              <option value="Close" disabled>
                Close
              </option>
              {times
                .filter(
                  (time) =>
                    times.indexOf(time) > times.indexOf(hours[selectedDay].open)
                )
                .map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
            </select>
          </div>
        </label>
        {Object.keys(hours).map((day) => (
          <div key={day}>
            <p>
              {day}: {hours[day].open} - {hours[day].close}
            </p>
          </div>
        ))}
        {errors.hours && <p>{errors.hours}</p>}
        <h2>Address</h2>
        <label>
          Street Address 1
          <input
            type="text"
            value={streetOne}
            onChange={(e) => setStreetOne(e.target.value)}
            required
          />
        </label>
        {errors.streetOne && <p>{errors.streetOne}</p>}
        <label>
          Street Address 2
          <input
            type="text"
            value={streetTwo}
            onChange={(e) => setStreetTwo(e.target.value)}
          />
        </label>
        {errors.streetTwo && <p>{errors.streetTwo}</p>}
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && <p>{errors.city}</p>}
        <label>
          State
          <select value={state} onChange={(e) => setState(e.target.value)} required>
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
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        {errors.country && <p>{errors.country}</p>}
        <label>
          Postal Code
          <input
            type="number"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            required
          />
        </label>
        {errors.postal && <p>{errors.postal}</p>}
        <h2>Additional Information</h2>
        <label>
          Website
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </label>
        {errors.website && <p>{errors.website}</p>}
        <label>
          <div>
            Price Range:
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={value <= priceRange ? "dollar-filled" : "dollar"}
                onClick={() => setPriceRange(value)}
              >
                &#36;
              </span>
            ))}
          </div>
        </label>
        {errors.priceRange && <p>{errors.priceRange}</p>}
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        {errors.description && <p>{errors.description}</p>}
        <label>
          Categories
          <select
            multiple
            value={categories}
            onChange={handleCategoriesChange}
          >
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        {errors.categories && <p>{errors.categories}</p>}
        <button type="submit">Create Shop</button>
      </form>
    </div>
    );
}

export default ShopFormPage;
