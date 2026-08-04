import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const Home = lazy(() => import('./pages/Home'));
const Solutions = lazy(() => import('./pages/Solutions'));

const RouteLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    width: '100%',
    gap: '15px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.2rem',
    fontFamily: 'sans-serif'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid rgba(255, 255, 255, 0.1)',
      borderTop: '3px solid #00d2ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <span>Loading...</span>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const SplashScreen = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isFading, setIsFading] = React.useState(false);

  React.useEffect(() => {
    const timer1 = setTimeout(() => setIsFading(true), 2500);
    const timer2 = setTimeout(() => setIsVisible(false), 3000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--bg)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: isFading ? 0 : 1,
      transition: 'opacity 0.5s ease-in-out',
      pointerEvents: 'all'
    }}>
      <img 
        src="/Gemini_Generated_Image_f81rftf81rftf81r-removebg-preview.png" 
        alt="A and S Solutions Splash" 
        style={{
          width: '450px',
          maxWidth: '85%',
          height: 'auto',
          objectFit: 'contain',
          animation: 'pulse 1.5s infinite ease-in-out',
          marginBottom: '40px'
        }} 
      />
      
      <div style={{
        width: '240px',
        maxWidth: '70%',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--primary)',
          borderRadius: '4px',
          transformOrigin: 'left',
          animation: 'loadProgress 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}></div>
      </div>
      <style>{`
        @keyframes loadProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <SplashScreen />
      <div className="noise"></div>
      <div className="blob-container">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="content">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923104672445"
        className="floating-whatsapp"
        title="Chat with us on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="35" height="35" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <SpeedInsights route={location.pathname} />
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
