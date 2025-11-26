import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="Footer">
      <div className="footer-content">
        <p className="footer-left">
          © {new Date().getFullYear()} Resume Builder. All rights reserved.
        </p>

        <div className="footer-right">
          <a href="/terms">Terms & Conditions</a>
          <span>|</span>
          <a href="/privacy">Privacy Policy</a>
          <span>|</span>
          <a href="/cookie">Cookie Policy</a>
          <span>|</span>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
