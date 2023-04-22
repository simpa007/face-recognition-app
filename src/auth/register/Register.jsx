import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ loadUser, handleRegister }) {
  const [namefield, setNameField] = useState("");
  const [emailfield, setEmailField] = useState("");
  const [passwordfield, setPasswordField] = useState("");
  const nav = useNavigate();

  // const handleHomeRouter = () => {
  //   nav("/register");
  // };
  const handleNameChange = (e) => {
    setNameField(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailField(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordField(e.target.value);
  };
  const handleSubmit = (e) => {
    const json = {
      name: namefield,
      email: emailfield,
      password: passwordfield,
    };
    axios
      .post("http://localhost:4000/register", json)
      .then((user) => {
        // loadUser(user.data);
        // console.log(user.data);
        // handleSignIn();
        if (user.data.id) {
          console.log(user.data);
          loadUser(user.data);
          handleRegister();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
  };
  return (
    <div className="form register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            autoComplete="off"
            placeholder="Name"
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            autoComplete="off"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            autoComplete="off"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" class="btn">
          Register
        </button>
        <div className="account">
          <p>
            Already have an acount?
            <span>
              <Link to="/" className="register">
                Sign in
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
