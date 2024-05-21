import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setEmail("demo@aa.io");
    setPassword("password");
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className='login-container'>
      <h1 id='login-title'>Login</h1>
      <form onSubmit={handleSubmit} className="login-form-container">
        <label className='login-label'>
          Email
        </label>
        <input
          type="text"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p>{errors.email}</p>}
        <label className='login-label'>
          Password
        </label>
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p>{errors.password}</p>}
        <button className='login-button' type="submit">Log In</button>
        <button className="login-button" type="button" onClick={handleDemoLogin}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
