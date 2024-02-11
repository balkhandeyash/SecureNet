// Header.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { logout } from "./AuthService"; 

function Header() {
  const location = useLocation();

  const isLoginRegisterPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const shouldRenderDropdown = !isLoginRegisterPage; // Render dropdown only if not on login/register/landing page

  const handleLogout = () => {
    // Call the logout function to clear the token
    logout();
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src="-high-resolution-logo-transparent_(2).png" alt="Logo" />
          <span>SecureNet</span>
        </div>
        {isLoginRegisterPage ? (
          <div className="navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
            </ul>
          </div>
        ) : null}
        {isLoginRegisterPage ? (
          <div className="user-options">
            <div className="login-signup">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        ) : null}
        {shouldRenderDropdown ? (
          <div className="dropdown">
            <button className="dropbtn">&#9660;</button>
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <Link to="/dashboard">Job Openings</Link>
              {/* <Link to="#">Notifications</Link>  */}
              <Link to="#">Post a Job</Link>
              <Link to="/" onClick={handleLogout}>Logout</Link> {/* Add onClick event to call handleLogout */}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Header;
