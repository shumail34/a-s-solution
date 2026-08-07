import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ finishLoading }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Keep it on screen for a minimum duration to look professional
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        finishLoading();
      }, 600); // 600ms fade out transition
    }, 2000); // 2 second display

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className={`splash-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo-container">
          <img src="/Gemini_Generated_Image_f81rftf81rftf81r-removebg-preview.png" alt="A&S Solutions" className="splash-logo" />
        </div>
        <div className="splash-loader">
          <div className="splash-loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
