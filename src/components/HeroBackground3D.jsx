import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import './HeroBackground3D.css';

const ParticleSystem = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const numParticles = isMobile ? 30 : 80;
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.1, // Slight upward bias
          alpha: Math.random() * 0.5 + 0.1,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          pulseOffset: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(0, 255, 255,' : 'rgba(200, 200, 255,'
        });
      }
    };

    const drawParticles = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Pulsing alpha
        const currentAlpha = p.alpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.2;
        const finalAlpha = Math.max(0, Math.min(1, currentAlpha));
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${finalAlpha})`;
        ctx.fill();
        
        // Subtle glow for some particles
        if (p.radius > 1.2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color === 'rgba(0, 255, 255,' ? '#00ffff' : '#ffffff';
        } else {
          ctx.shadowBlur = 0;
        }
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animationFrameId = requestAnimationFrame(drawParticles);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles-canvas" />;
};

const HeroBackground3D = () => {
  const containerRef = useRef(null);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for mouse
  const springConfig = { damping: 40, stiffness: 100, mass: 1.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse values into 3D rotations (Max movement: 8deg)
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const rotateX = useTransform(smoothMouseY, [-1, 1], [8, -8]);
  const translateZ = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

  // Scroll position values
  const { scrollY } = useScroll();
  const scrollSpring = useSpring(scrollY, { damping: 50, stiffness: 200 });
  const scrollRotate = useTransform(scrollSpring, [0, 1000], [0, 15]);
  const scrollYMove = useTransform(scrollSpring, [0, 1000], [0, -100]);
  const scrollScale = useTransform(scrollSpring, [0, 1000], [1, 1.1]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to [-1, 1]
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      // Only apply heavy mouse effects on desktop
      if (innerWidth >= 768) {
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="hero-3d-container" ref={containerRef}>
      {/* Background Atmosphere Layers */}
      <div className="bg-layer animated-gradient"></div>
      <div className="bg-layer noise-texture"></div>
      <div className="bg-layer radial-lights"></div>
      
      {/* Particle System */}
      <ParticleSystem />

      {/* Cinematic Fog & Blur */}
      <div className="cinematic-fog"></div>

      {/* Floating 3D Logo Layer */}
      <motion.div 
        className="logo-3d-wrapper"
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          rotateZ: scrollRotate,
          y: scrollYMove,
          scale: scrollScale
        }}
      >
        {/* Glow behind the logo */}
        <div className="logo-glow pulsing-glow"></div>
        
        {/* The Actual Logo */}
        <motion.img 
          src="/3d-logo.webp" 
          alt="A&S Solutions 3D Logo" 
          className="hero-3d-logo floating-animation breathing-scale opacity-pulse"
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 0.15, scale: 1, filter: 'blur(2px)' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* Cinematic Elements */}
        <div className="volumetric-rays"></div>
        <div className="holographic-lines"></div>
      </motion.div>
    </div>
  );
};

export default HeroBackground3D;
