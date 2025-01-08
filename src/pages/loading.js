// src/components/Loading.js
import React from 'react';
import './Loading.css'; // Ensure this path is correct
import logo from './safina_invest_logo.png'; // Update the path to your logo

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" className="logo" />
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loading;
