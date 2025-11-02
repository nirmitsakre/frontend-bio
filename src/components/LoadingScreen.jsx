import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-icon">
          <div className="leaf leaf-1">🍃</div>
          <div className="leaf leaf-2">🍃</div>
          <div className="leaf leaf-3">🍃</div>
        </div>
        <h2 className="loading-title">Japan Biodiversity Dashboard</h2>
        <p className="loading-subtitle">Loading natural wonders...</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
