import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import ReCAPTCHA from "react-google-recaptcha";

import axios from "axios"; // Import axios here

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOTP = async () => {
    try {
      // Check if username is provided
      if (!username) {
        alert("Please enter your username.");
        return;
      }

      // Send a request to the server to initiate OTP sending
      const response = await axios.post(
        "https://securenet-backend.vercel.app/login-otp",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the server successfully initiated OTP sending
      if (response.status === 200) {
        // Assuming the server sends a response like { email: "user@example.com" }
        const email = response.data.email;

        // Generate and send OTP to the provided email
        const otpResponse = await axios.post(
          "https://securenet-backend.vercel.app/send-otp",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check if OTP sending was successful
        if (otpResponse.status === 200) {
          alert("OTP sent successfully. Check your email.");
          setOtpSent(true);
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      } else {
        alert("You don't have any registered email for this username.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again later.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Validate email and OTP if OTP has been sent
      if (otpSent && (!username || !otp || !captchaValue)) {
        alert(
          "Please enter your username, OTP, and complete the reCAPTCHA verification."
        );
        return;
      }
      const response = await axios.post(
        "https://securenet-backend.vercel.app/login",
        {
          username,
          password,
          captchaValue,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if reCAPTCHA is verified
      if (!captchaValue) {
        alert("Please complete the reCAPTCHA verification.");
        return;
      }

      if (response.status === 200) {
        console.log("login Success");
        //console.log(response.data.token)
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        //console.log(response.data.token);
        navigate("/dashboard");
      } else if (response.status === 401) {
        // Invalid credentials, show error message
        console.error("Invalid credentials");
        alert("Invalid credentials. Please try again.");
      } else {
        // Other errors, show a generic error message
        console.error("Login failed:", response.statusText);
        alert("Login failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      console.log(error.response.data);
      alert("Error during login");
    }
  };

  return (
    <div>
      <div className="login-body">
        <div className="login-container">
          <div className="login-header">
            <h2>Login</h2>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } password-toggle-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <div className="form-group">
              {/* Google reCAPTCHA */}
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>
            <div className="form-group">
              {/* Button to send OTP */}
              <button type="button" onClick={handleSendOTP}>
                Send OTP
              </button>
            </div>
            {/* Display OTP input field only if OTP has been sent */}
            {otpSent && (
              <div className="form-group">
                <label htmlFor="otp">Enter OTP:</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
