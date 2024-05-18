// import { useState } from "react";
// import { thunkLogin } from "../../redux/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
import "./LandingPage.css";

function LoginFormModal() {
  // const dispatch = useDispatch();
  return (
    <>
      <h1>Categories</h1>
      <div className="all-category-container">
        <div className="category-container">American</div>
        <div className="category-container">French</div>
        <div className="category-container">Italian</div>
      </div>

    </>
  );
}

export default LoginFormModal;
