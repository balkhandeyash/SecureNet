// Footer.js
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="-high-resolution-logo-transparent_(2).png"
              alt="SecureNet Logo"
              className="footer-logo"
            />
            <p>
              SecureNet is a cybersecurity leader, dedicated to protecting
              digital assets with state-of-the-art solutions. We specialize in
              providing cutting-edge security for businesses and individuals.
            </p>
          </div>
        </div>

        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>
            Email:{" "}
            <a href="mailto:info@securenet.com" style={{ color: "#fff" }}>
              info@securenet.com
            </a>
          </p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Cyber Street, Secure City</p>
        </div>

        <div className="footer-section subscribe">
          <h2>Subscribe to Our Newsletter</h2>
          <p>
            Stay informed with the latest security trends, news, and updates by
            subscribing to our newsletter.
          </p>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
            />
            <button
              type="submit"
              style={{ width: "100%", backgroundColor: "#ff8c00" }}
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="footer-section social">
          <h2>Connect with Us</h2>
          <p>
            Follow us on social media to stay connected and receive real-time
            updates:
          </p>
          {/* Update the social media links with content or alternative text */}
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fab fa-facebook fa-lg"
              aria-label="Facebook"
            ></a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fab fa-twitter fa-lg"
              aria-label="Twitter"
            ></a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fab fa-linkedin fa-lg"
              aria-label="LinkedIn"
            ></a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fab fa-instagram fa-lg"
              aria-label="Instagram"
            ></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 SecureNet. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
