import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Home() {
  const heroVisualRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    const handleMouseMove = (e) => {
      if (!heroVisualRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      heroVisualRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <header className="hero">
        <div className="container hero-wrapper">
          <div className="hero-content">
            <div className="badge reveal">Future of Digital Systems</div>
            <h1 className="hero-title reveal stagger-1">
              Build. <span className="gradient-text animated-gradient">Automate.</span> Scale.
            </h1>
            <p className="hero-subtitle reveal stagger-2">
              A&S Solutions is a technology-driven agency specializing in AI-powered web development 
              and business automation systems.
            </p>
            <div className="hero-actions reveal stagger-3">
              <Link to="/solutions" className="primary-btn pulse-hover">Explore Our Solutions</Link>
              <a href="#work" className="secondary-btn">View Work</a>
            </div>
          </div>
          <div className="hero-visual reveal stagger-2" ref={heroVisualRef}>
            <div className="sphere-glow"></div>
            <img src={logo} alt="Halftone Sphere" className="floating-logo" />
          </div>
        </div>
      </header>

      <section id="services" className="services reveal">
        <div className="section-header reveal">
          <h2 className="section-title">Core Expertise</h2>
          <p className="section-desc">We deliver systems that improve operational efficiency and support long-term growth.</p>
        </div>
        <div className="services-grid">
          {[
            { title: "AI-Powered Web Apps", desc: "Intelligent digital platforms that go beyond traditional websites.", icon: "🤖" },
            { title: "Business Automation", desc: "Enhance customer interaction and improve operational efficiency.", icon: "⚡" },
            { title: "UI/UX Design", desc: "User-focused design and digital experiences that resonate.", icon: "🎨" },
            { title: "E-commerce Support", desc: "Full-stack e-commerce solutions and optimization.", icon: "🛒" },
            { title: "Digital Marketing", desc: "Data-driven marketing strategies to scale your presence.", icon: "📈" },
            { title: "SEO Off-Page", desc: "Link building and authority growth to dominate search.", icon: "🔍" },
            { title: "Final Year Projects", desc: "Custom Web and Mobile App development.", icon: "🎓" }
          ].map((service, index) => (
            <div key={index} className={`service-card glass-card reveal stagger-${(index % 4) + 1}`}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="work-section reveal">
        <div className="section-header reveal">
          <h2 className="section-title">Our Work</h2>
          <p className="section-desc">Take a look at some of the AI-powered systems and platforms we've built.</p>
        </div>
        <div className="container">
          <div className="video-grid">
            {/* Real Video Integration */}
            <div className="video-card glass-card reveal stagger-1">
              <div className="video-wrapper">
                <video 
                  src="/project-video.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  controls
                ></video>
              </div>
              <div className="video-info">
                <h3>Landing Page Website</h3>
                <p>High-conversion, premium digital storefront design.</p>
              </div>
            </div>
            
            <div className="video-card glass-card reveal stagger-2">
              <div className="video-wrapper">
                <video 
                  src="/website.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  controls
                ></video>
              </div>
              <div className="video-info">
                <h3>Home Care maintanence services</h3>
                <p>Fully integrated digital booking and service management system.</p>
              </div>
            </div>

            <div className="video-card glass-card reveal stagger-3">
              <div className="video-wrapper">
                <video 
                  src="/health-fitness.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  controls
                ></video>
              </div>
              <div className="video-info">
                <h3>Health & Fitness</h3>
                <p>Comprehensive fitness tracking and wellness management platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="team-section reveal">
        <div className="section-header reveal">
          <h2 className="section-title">Meet The Team</h2>
          <p className="section-desc">The innovators behind A&S Solutions.</p>
        </div>
        <div className="container">
          <div className="team-grid">
            {[
              { name: "Arslan Khalid", role: "CEO & AI Architect", image: "/ceo.jpeg" },
              { name: "Muhammad Shumail", role: "CTO & Lead Developer", image: "/cto.jpeg" }
            ].map((member, index) => (
              <div key={index} className={`team-card glass-card reveal stagger-${index + 1}`}>
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about reveal">
        <div className="about-card glass-card reveal">
          <div className="about-text">
            <h2 className="reveal stagger-1">Beyond Basic Digital Presence</h2>
            <p className="reveal stagger-2">
              We work with businesses that are ready to move beyond basic digital presence 
              and adopt smarter, more efficient systems.
            </p>
            <div className="stats">
              <div className="stat-item reveal stagger-1">
                <span className="stat-num">AI</span>
                <span className="stat-label">Driven</span>
              </div>
              <div className="stat-item reveal stagger-2">
                <span className="stat-num">100%</span>
                <span className="stat-label">Automation</span>
              </div>
              <div className="stat-item reveal stagger-3">
                <span className="stat-num">∞</span>
                <span className="stat-label">Scalability</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
