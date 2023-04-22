import React from "react";
import "./Navbar.css";
import Tilt from "react-parallax-tilt";
import { Outlet, Link } from "react-router-dom";
import logo from "../../img/newAI-removebg-preview.png";

export const Navbar = ({ handleSignOut }) => {
  return (
    <div>
      <div className="navbar">
        <Tilt>
          <div>
            <img src={logo} alt="logo" width="100" height="100" />
          </div>
        </Tilt>

        <div className="link-list" onClick={handleSignOut}>
          Signout
        </div>
      </div>
      <Outlet />
    </div>
  );
};
