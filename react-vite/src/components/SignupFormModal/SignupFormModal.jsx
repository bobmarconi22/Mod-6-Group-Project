import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrorObj = {}

    if (password !== confirmPassword) {
       newErrorObj.confirmPassword = "Confirm Password field must be the same as the Password field"
    }
    if(password.length < 8) {
       newErrorObj.password = "Password must be at least 8 characters long."
    }
    if(password.length > 255) {
       newErrorObj.password = "Password must be at least 255 characters long."
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)) {
       newErrorObj.email = "Must be a valid email."
    }
     if (email.length > 255) {
       newErrorObj.email = "Email must be less than 255 characters long."
    }
    if (firstName.length < 2) {
       newErrorObj.firstName = "First name must be at least 2 characters long."
    }
    if (username.length > 40) {
       newErrorObj.username = "Username must be less than 40 characters long."
    }
     if (username.length < 2) {
       newErrorObj.username = "Username must be at least 2 characters long."
    }
    if (firstName.length > 25) {
       newErrorObj.firstName = "First name must be less than 25 characters long."
    }
    if (lastName.length < 2) {
       newErrorObj.lastName = "Last name must be at least 2 characters long."
    }
    if (lastName.length > 25) {
       newErrorObj.lastName = "Last name must be less than 25 characters long."
    }
    if (city < 2) {
       newErrorObj.lastName = "Last name must be at least 2 characters long."
    }
    if (city > 25) {
       newErrorObj.city = "City must be less than 25 characters long."
    }
    const phoneRegex = /^[\d+-]+$/;
    if(!phoneRegex.test(phoneNumber)) {
       newErrorObj.phoneNumber = "Phone number may only have numbers, '+', and '-'"
    }
    if(phoneNumber.length < 7 || phoneNumber.length > 18) {
       newErrorObj.phoneNumber = "Phone number must be at least 7 characters long and less than 18"
    }

    if(Object.keys(newErrorObj).length > 0) {
      return setErrors(newErrorObj)
    }




    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        'first_name': firstName,
        'last_name': lastName,
        'phone_number': phoneNumber,
        city,
        state,
        password
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="signup-input"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p style={{color:'#FF253F'}}>{errors.email}</p>}
        <label>Username</label>
        <input
          className="signup-input"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p style={{color:'#FF253F'}}>{errors.username}</p>}
        <label>First Name</label>
        <input
          className="signup-input"
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName && <p style={{color:'#FF253F'}}>{errors.firstName}</p>}
        <label>Last Name</label>
        <input
          className="signup-input"
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && <p style={{color:'#FF253F'}}>{errors.lastName}</p>}
        <label>Phone Number</label>
        <input
          className="signup-input"
          placeholder={'Phone Number'}
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phoneNumber && <p style={{color:'#FF253F'}}>{errors.phoneNumber}</p>}
        <label>City</label>
        <input
          className="signup-input"
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        {errors.city && <p style={{color:'#FF253F'}}>{errors.city}</p>}

        <select
          className="signup-input"
          value={state}
          onChange={(e) => setState(e.target.value)}
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
        {errors.state && <p>{errors.state}</p>}
        <label>Password</label>
        <input
          className="signup-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p style={{color:'#FF253F'}}>{errors.password}</p>}
        <label>Conform Password</label>
        <input
          className="signup-input"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && <p style={{color:'#FF253F'}}>{errors.confirmPassword}</p>}
        <button id='signup-submit-button' type="submit">Sign Up</button>
      </form>
    </div >
  );
}

export default SignupFormModal;
