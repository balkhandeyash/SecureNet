// LandingPage.js

import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import "react-circular-progressbar/dist/styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alertMessage] = useState(null);

  useEffect(() => {
    //fetchData();
    fetchJobs();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.request({
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/search",
        params: {
          query: "Python developer in Texas, USA",
          page: "1",
          num_pages: "1",
        },
        headers: {
          "X-RapidAPI-Key":
            "d5426ca53amshe5ccee5cb130524p125d11jsn9a55bc5d61af",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        //setJobDetails(data); // Set job details to state
      } else {
        console.error("Error fetching job data");
        //setAlertMessage("Error fetching job data");
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
      //setAlertMessage("Error fetching job data");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://securenet-backend.vercel.app/applyJobs");
      //console.log(response.data);
    } catch (error) {}
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://securenet-backend.vercel.app/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle success, show a success message or redirect
        alert("Message sent successfully!");
        console.log("Message sent successfully!");
      } else {
        // Handle error, show an error message
        alert(response.error);
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="landing-page">
        {/* CircularProgress Component */}
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100px", // Adjust the width as needed
              height: "100px", // Adjust the height as needed
              background: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              animation: "fadeInOut 1.5s infinite alternate",
            }}
          >
            <CircularProgress
              sx={{
                color: "#3498db", // Adjust the color as needed
              }}
            />
          </Box>
        )}

        <h1>Welcome to Our Project</h1>
        <p className="description">
        Discover our practical information security project, crafted to protect sensitive business data from unauthorized access and manipulation. Our project incorporates fundamental technologies like JWT, PassportJS, CryptoJS, and NodeMailer for encryption, decryption, and authentication. With three security layers—username/password, Google reCAPTCHA, and OTP verification—we prioritize straightforward measures to enhance data security. Employing CryptoJS ensures message security, leading to encrypted data storage in the database for added protection.
        </p>

        <div className="divider"></div>

        <div className="developers-section">
          <h2>Meet Our Team</h2>
          <div className="developers-row">
          <div className="developer">
              <img src="Vijay.jpeg" alt="Developer 1" />
              <p className="pname">Dr. V. B. Gadicha</p>
              <p className="names">Mentor</p>
            </div>
          </div>
          <div className="developers-row">
            <div className="developer">
              <img src="Yash.png" alt="Developer 1" />
              <p className="pname">Yash R. Balkhande</p>
              <p className="names">System Architect</p>
            </div>
            <div className="developer">
              <img src="Gayatri.jpeg" alt="Developer 2" />
              <p className="pname">Gayatri S. Bhamburkar</p>
              <p className="names">Documentation Head</p>
            </div>
            <div className="developer">
              <img src="Shreyash.png" alt="Developer 3" />
              <p className="pname">Shreyash N. Waghmare</p>
              <p className="names">Lead Developer</p>
            </div>
            <div className="developer">
              <img src="vedant.jpeg" alt="Developer 4" />
              <p className="pname">Vedant P. Nehare</p>
              <p className="names">Quality Analyst</p>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="about-us-section">
          <h2>About Us</h2>
          <p>
          Welcome to SecureNet your go-to destination for seamless job posting and hiring solutions! We understand the critical role that talent plays in the success of any organization, and we are committed to connecting employers with the right candidates while empowering individuals to find their dream careers. At SecureNet, we are more than just a job posting and hiring platform – we are your partners in talent acquisition and career advancement. Our platform is designed to simplify and streamline the entire hiring process, making it efficient, effective, and enjoyable for both employers and job seekers.We strive to bridge the gap between employers and candidates by providing a user-friendly, innovative platform that caters to the unique needs of both parties. 
          </p><p>We believe that every person deserves the opportunity to showcase their skills, and every business deserves access to the best talent. User-Friendly Interface : Our platform boasts an intuitive and easy-to-navigate interface, ensuring a seamless experience for both employers and job seekers. Diverse Job Listings : Whether you're a seasoned professional or a recent graduate, our platform offers a wide array of job listings across industries, ensuring that everyone can find the perfect fit.
          </p>
        </div>

        <div className="divider"></div>

        <div className="contact-us-section">
          <h2>Contact Us</h2>
          <p>
            Feel free to reach out to us for any inquiries or feedback. You can
            provide your contact information or use the form below.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" disabled={loading}>
              Send Message
            </button>
          </form>

          {alertMessage && (
            <div
              className={
                alertMessage.includes("success")
                  ? "success-alert"
                  : "error-alert"
              }
            >
              {alertMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LandingPage;
