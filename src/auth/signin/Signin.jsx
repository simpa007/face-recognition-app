import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";
import { Link } from "react-router-dom";
export default function Signin({ handleSignIn, loadUser }) {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const handleEmailField = (e) => {
    setEmailField(e.target.value);
  };
  const handlePasswordField = (e) => {
    setPasswordField(e.target.value);
  };
  const handleSubmit = (e) => {
    // console.log(emailField, passwordField);

    const json = {
      email: emailField,
      password: passwordField,
    };
    axios
      .post("http://localhost:4000/signin", json)
      .then((user) => {
        if (user.data.id) {
          console.log(user);
          loadUser(user.data);
          handleSignIn();
        }
      })
      .catch((error) => console.log(error, "Something went wrong"));
    e.preventDefault();
  };
  return (
    <>
      <div className="form">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoComplete="off"
              placeholder="Email"
              onChange={handleEmailField}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              autoComplete="off"
              placeholder="Password"
              onChange={handlePasswordField}
            />
          </div>
          <button type="submit" class="btn">
            Sign in
          </button>
          <div className="account">
            <p>
              Don't have an acount?
              <span>
                <Link to="/register" className="sign-in">
                  Register
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
