import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);

  const handleSendOTP = async () => {
    try {
      if (!username) {
        alert("Please enter your username.");
        return;
      }
  
      setSendingOTP(true);
  
      const response = await axios.post(
        "https://securenet-backend.vercel.app/login-otp",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        const email = response.data.email;
  
        alert("OTP sent successfully. Check your email.");
        setOtpSent(true);
      } else {
        alert("You don't have any registered email for this username.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again later.");
    } finally {
      setSendingOTP(false); // Re-enable the "Send OTP" button regardless of the outcome
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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

      if (!captchaValue) {
        alert("Please complete the reCAPTCHA verification.");
        return;
      }

      if (response.status === 200) {
        console.log("login Success");
        sessionStorage.setItem("token", response.data.token); // Use sessionStorage
        setToken(response.data.token);
        navigate("/dashboard");
      } else if (response.status === 401) {
        console.error("Invalid credentials");
        alert("Invalid credentials. Please try again.");
      } else {
        console.error("Login failed:", response.statusText);
        alert("Login failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      console.log(error.response.data);
      alert("Error during login");
    }
  };

  // eslint-disable-next-line
  const logout = () => {
    sessionStorage.removeItem("token"); // Clear token from sessionStorage
    setToken(null);
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
            <div className="form-group-recaptcha">
              {/* Google reCAPTCHA */}
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>
            <div className="form-group">
              {/* Button to send OTP */}
              <button type="button" onClick={handleSendOTP} disabled={sendingOTP} >
                Send OTP
              </button>
            </div>
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
