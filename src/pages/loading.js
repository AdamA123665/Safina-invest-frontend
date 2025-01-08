import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <img src="/safina_invest_logo.png" alt="Company Logo" className="logo" />
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
