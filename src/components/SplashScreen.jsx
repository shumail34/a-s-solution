import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import logo from '../assets/logo.webp';

const SplashScreen = ({ finishLoading }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        finishLoading();
      }, 400);
    }, 600);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className={`splash-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo-container">
          <img src={logo} alt="A&S Solutions" className="splash-logo" width="160" height="160" fetchPriority="high" decoding="async" />
        </div>
        <div className="splash-loader">
          <div className="splash-loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
