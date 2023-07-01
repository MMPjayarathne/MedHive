import React from 'react';
import './componentStyles/Newsletter.css';

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <h2 className="newsletter-title">Newsletter</h2>
      <p className="newsletter-subtitle">Subscribe to stay updated</p>
      <div className="newsletter-form">
        <input
          type="email"
          className="newsletter-input"
          placeholder="Enter your email address"
        />
        <button className="newsletter-submit-button">Submit</button>
      </div>
    </div>
  );
};

export default Newsletter;