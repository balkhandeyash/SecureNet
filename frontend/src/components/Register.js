//Copy code
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import Box from "@mui/material/Box";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent
  const [loading, setLoading] = useState(false); // Track loading state for registration
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      // Check if email is provided
      if (!email) {
        alert("Please enter your email address.");
        return;
      }

      // Send OTP to the provided email
      const response = await axios.post(
        "https://securenet-backend.vercel.app/send-otp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("OTP sent successfully. Check your email.");
        setOtpSent(true);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again later.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when registration starts

    try {
      // Validate email and OTP if OTP has been sent
      if (otpSent && (!email || !otp)) {
        alert("Please enter your email and OTP.");
        return;
      }

      // Perform registration logic with email, username, password, captcha, and OTP
      const response = await axios.post(
        "https://securenet-backend.vercel.app/register",
        {
          name,
          username,
          password,
          email,
          captchaValue,
          otp,
        }
      );

      console.log("Server Response:", response);

      if (response.status === 201) {
        alert("Registration Successful");
        localStorage.setItem("token", response.data.token);
        navigate("/login");
      } else if (response.status === 400) {
        alert("Registration failed: " + response.data.error);
      } else {
        alert("Registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false); // Set loading to false when registration completes
    }
  };

  return (
    <div>
      <div className="register-body">
        <div className="form-container">
          <div className="form-header">
            <h2>Register</h2>
          </div>

          {loading && (
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100px",
                height: "100px",
                background: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              <CircularProgress
                sx={{
                  color: "#3498db",
                }}
              />
            </Box>
          )}
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
            <div className="form-group-recaptcha">
              {/* Google reCAPTCHA */}
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>
            <button type="submit" className="button">
              Register
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
