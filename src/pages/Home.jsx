import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

function LazyVideo({ src, ...props }) {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={isInView ? `${src}#t=0.1` : undefined}
      preload="metadata"
      {...props}
    />
  );
}

function Home() {
  const heroVisualRef = useRef(null);

  useEffect(() => {
    const observerOptions = { rootMargin: '300px 0px 300px 0px', threshold: 0.01 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
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

  const [activeVideo, setActiveVideo] = useState(null);
  
function TransparentVideo({ src, className }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Speed up video animation playback rate to 1.6x for energetic, modern motion
    video.playbackRate = 1.6;

    let animId;
    let isVisible = true;
    let ctx;
    try {
      ctx = canvas.getContext('2d', { willReadFrequently: true });
    } catch (e) {
      ctx = canvas.getContext('2d');
    }

    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          video.playbackRate = 1.6;
          video.play().catch(() => {});
          cancelAnimationFrame(animId);
          processFrame();
        } else {
          video.pause();
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const processFrame = () => {
      if (!isVisible) return;

      if (video.videoWidth && video.videoHeight) {
        // Full native video resolution (zero pixelation, razor-sharp 4K/1080p quality)
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        const cropX = video.videoWidth * 0.10;
        const cropY = video.videoHeight * 0.10;
        const cropW = video.videoWidth * 0.80;
        const cropH = video.videoHeight * 0.80;

        ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        const width = canvas.width;
        const height = canvas.height;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

            const marginX = Math.min(x, width - x) / (width * 0.15);
            const marginY = Math.min(y, height - y) / (height * 0.15);
            const edgeAlpha = Math.max(0, Math.min(1, Math.min(marginX, marginY)));

            if (brightness < 45) {
              data[i + 3] = 0;
            } else if (brightness < 80) {
              const alpha = Math.floor(((brightness - 45) / 35) * 255);
              data[i + 3] = Math.floor(alpha * edgeAlpha);
            } else {
              data[i + 3] = Math.floor(255 * edgeAlpha);
            }
          }
        }

        ctx.putImageData(frame, 0, 0);
      }
      animId = requestAnimationFrame(processFrame);
    };

    const handlePlay = () => {
      video.playbackRate = 1.6;
      cancelAnimationFrame(animId);
      processFrame();
    };

    video.addEventListener('play', handlePlay);

    return () => {
      observer.disconnect();
      video.removeEventListener('play', handlePlay);
      cancelAnimationFrame(animId);
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: '1px', height: '1px' }}
      />
      <canvas ref={canvasRef} className={className} />
    </>
  );
}

function NativeHeroVideo({ src, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.6;
    }
  }, []);

  return (
    <video 
      ref={videoRef}
      src={src} 
      autoPlay 
      loop 
      muted 
      playsInline 
      className={className}
    />
  );
}

// Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error('Failed to send message. Please try again.');
      
      setFormStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: err.message });
    }
  };

  const projects = [
    {
      id: "attari-solar",
      title: "Attari Solar System",
      subtitle: "Modern Solar Solutions Landing Page",
      desc: "A modern, responsive landing page for a solar energy solutions provider in Pakistan. Designed mobile-first with high performance, SEO optimization, and a strong WhatsApp call-to-action to generate high-converting solar leads.",
      techStack: ["HTML5", "CSS3", "JavaScript", "SEO", "Responsive"],
      videoSrc: "/project-video.mp4",
      liveDemo: "https://attarisolarsystem.store/"
    },
    {
      id: "home-care",
      title: "HomeCare Market",
      subtitle: "AI Home Maintenance Platform",
      desc: "A smart marketplace connecting clients with verified plumbers, cleaners, and electricians. Supports web and mobile, and features an AI chatbot recommendation engine, role-based access, and secure booking.",
      techStack: ["React", "Django", "Flutter", "SQLite3", "AI Chatbot"],
      videoSrc: "/website.mp4",
      liveDemo: "https://homecare-market.vercel.app/"
    },
    {
      id: "eloviax",
      title: "Eloviax",
      subtitle: "Premium E-commerce Salt Lamps Showroom",
      desc: "A top-quality e-commerce showroom for Himalayan salt lamps. Built with a luxury dark mode, cinematic scroll animations (GSAP & Lenis), search-optimized (SEO) product catalog, Web3Forms contact, and WhatsApp integration.",
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "GSAP"],
      videoSrc: "/eloviax.mp4",
      liveDemo: "https://eloviax.com/"
    },
    {
      id: "outreachpro",
      title: "OutreachPro",
      subtitle: "Email Automation System",
      desc: "A full-stack SaaS platform for cold email outreach, lead generation, and campaign management. Supports custom SMTP campaigns, lead verification, tracking analytics, JWT auth, background queues, and billing.",
      techStack: ["Next.js", "Django REST", "PostgreSQL", "Nodemailer", "JWT Auth"],
      videoSrc: "/outreachpro.mp4",
      liveDemo: "https://email-automation-system-omega.vercel.app/"
    },
    {
      id: "estatepro",
      title: "EstatePro Hub",
      subtitle: "SaaS Platform for real estate",
      desc: "EstatePro Hub is a modern, full-stack real estate platform connecting buyers, sellers, and administrators. Buyers can search, filter, and save favorite properties while submitting inquiries. Sellers can create listings, manage leads, and view property performance analytics. Admins maintain platform control with user management, listing moderation, and system-wide insights. Designed with a high-performance React UI and robust Express REST API, it delivers a seamless real estate experience.",
      techStack: ["React", "Node.js", "PostgreSQL", "Express REST", "Serverless"],
      videoSrc: "/estatepro.mp4",
      liveDemo: "https://estatepro-hub.vercel.app/"
    },
    {
      id: "meta-ads",
      title: "Meta Ads Campaign Results",
      subtitle: "Data-Driven Marketing & Lead Generation",
      desc: "An overview of our high-converting Meta Ads campaigns, showcasing our ability to optimize ad spend, generate qualified leads, and significantly scale business revenue through targeted social media marketing and advanced analytics.",
      techStack: ["Meta Ads Manager", "Data Analytics", "Lead Gen", "ROI Optimization"],
      videoSrc: "/meta-ads.mp4"
    }
  ];

  return (
    <>
      <header className="hero">
        <div className="hero-visual reveal stagger-2" ref={heroVisualRef}>
          <div className="sphere-glow"></div>
          <div className="hero-video-container">
            <NativeHeroVideo 
              src="/hero-black-bg.mp4" 
              className="hero-video"
            />
          </div>
        </div>

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
            {projects.map((project, index) => (
              <div key={project.id} className={`project-card glass-card reveal stagger-${(index % 4) + 1}`}>
                <div className="project-thumbnail" onClick={() => setActiveVideo(project.videoSrc)}>
                  <LazyVideo 
                    src={project.videoSrc} 
                    muted 
                    playsInline
                    className="thumbnail-video"
                  ></LazyVideo>
                  <div className="thumbnail-overlay">
                    <span className="play-icon-large">▶</span>
                  </div>
                </div>
                
                <div className="project-info">
                  <div className="tech-stack">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                  
                  <h3>{project.title}</h3>
                  <h4 className="project-subtitle">{project.subtitle}</h4>
                  <p>{project.desc}</p>
                  
                  <div className="project-actions">
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="action-link">
                        Live Demo ↗
                      </a>
                    )}
                    <button className="action-btn" onClick={() => setActiveVideo(project.videoSrc)}>
                      <span className="play-icon-small">▶</span> Watch Video
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setActiveVideo(null)}>✕</button>
            <video 
              src={activeVideo} 
              autoPlay 
              controls 
              className="modal-video"
            ></video>
          </div>
        </div>
      )}

      <section id="team" className="team-section reveal">
        <div className="section-header reveal">
          <h2 className="section-title">Meet The Team</h2>
          <p className="section-desc">The innovators behind A&S Solutions.</p>
        </div>
        <div className="container">
          <div className="team-grid">
            {[
              { name: "Arslan Khalid", role: "CEO & AI Architect", image: "/ceo.webp" },
              { name: "Muhammad Shumail", role: "CTO & Lead Developer", image: "/cto.webp" }
            ].map((member, index) => (
              <div key={index} className={`team-card glass-card reveal stagger-${index + 1}`}>
                <div className="team-image">
                  <img src={member.image} alt={member.name} loading="lazy" width="320" height="320" />
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

      {/* Contact Section */}
      <section id="contact" className="contact-section reveal">
        <div className="section-header reveal">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-desc">Ready to scale your business with AI and modern solutions? Let's talk.</p>
        </div>
        <div className="container">
          <div className="contact-wrapper glass-card reveal stagger-1">
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  required 
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              {formStatus.success && <div className="form-success">Message sent successfully! We'll get back to you soon.</div>}
              {formStatus.error && <div className="form-error">{formStatus.error}</div>}
              
              <button type="submit" className="cta-button" disabled={formStatus.loading}>
                {formStatus.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
