import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';

function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-active' : ''}`}>
      <div className="nav-content">
        <Link to="/" className="logo-container reveal stagger-1" onClick={handleLinkClick}>
          <img src={logo} alt="A&S Solution Logo" className="nav-logo" />
          <span className="brand-name">A&S Solution</span>
        </Link>
        
        <div className={`nav-links-wrapper ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li className="reveal stagger-2">
              {isHome ? <a href="#services" onClick={handleLinkClick}>Services</a> : <Link to="/#services" onClick={handleLinkClick}>Services</Link>}
            </li>
            <li className="reveal stagger-3">
              <Link to="/solutions" onClick={handleLinkClick}>Solutions</Link>
            </li>
            <li className="reveal stagger-4">
              {isHome ? <a href="#about" onClick={handleLinkClick}>About</a> : <Link to="/#about" onClick={handleLinkClick}>About</Link>}
            </li>
            <li className="reveal stagger-5">
              <a 
                href="https://wa.me/923104672445" 
                className="contact-btn" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={handleLinkClick}
                style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
