import React, { useEffect, useState } from 'react';

function Solutions() {
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const observerOptions = { rootMargin: '0px 0px 0px 0px', threshold: 0.05 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    window.scrollTo(0, 0);
    return () => observer.disconnect();
  }, []);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const solutions = [
    {
      title: "Web Development",
      category: "Development",
      desc: "High-performance, responsive web applications built with modern frameworks and scalable architecture.",
      details: "We craft custom web applications tailored to your business needs. Using modern technologies like React, Next.js, and Node.js, we build fast, secure, and search-optimized platforms designed for high conversion and seamless user experience.",
      features: ["Custom Architecture", "SEO & Performance", "Scalable Infrastructure"],
      image: "/services/web_dev.png"
    },
    {
      title: "AI Integration",
      category: "Artificial Intelligence",
      desc: "Seamless integration of LLMs, AI chatbots, and predictive analytics into your software ecosystem.",
      details: "Empower your business with cutting-edge artificial intelligence. We integrate Large Language Models (LLMs), automated AI customer support agents, and predictive data analytics directly into your web applications and workflows to automate tasks and drive growth.",
      features: ["Custom LLM Integration", "Predictive Analytics", "AI Chatbots & Agents"],
      image: "/services/ai_integration.png"
    },
    {
      title: "Business Automation",
      category: "Efficiency",
      desc: "Engineering autonomous systems that handle inventory, pricing, and customer support automatically.",
      details: "We specialize in end-to-end business process automation. By integrating your ERP, CRM, and communication tools, we eliminate manual bottlenecks. Our systems handle everything from automated invoicing and inventory restocking to AI-driven customer support tickets, allowing your team to focus on strategic growth.",
      features: ["Workflow Automation", "ERP Integration", "AI Support"],
      image: "/services/business_auto.png"
    },
    {
      title: "UI/UX Design",
      category: "Experience",
      desc: "User-focused design and digital experiences that resonate with your audience and improve engagement.",
      details: "Design at A&S Solutions is about more than just aesthetics. We conduct deep user research and create interactive prototypes to ensure your product is intuitive and high-converting. Our focus on visual excellence and micro-animations ensures a premium feel that builds brand trust and loyalty.",
      features: ["Interactive Prototyping", "Visual Excellence", "User Research"],
      image: "/services/ui_ux.png"
    },
    {
      title: "E-commerce Solutions",
      category: "E-commerce",
      desc: "Self-optimizing platforms that enhance customer interaction and support long-term business growth.",
      details: "Our e-commerce platforms are built for maximum conversion. We implement dynamic pricing engines, intelligent product recommendations, and seamless checkout flows. With integrated growth analytics and automated marketing triggers, your store becomes a self-optimizing sales machine.",
      features: ["Dynamic Pricing", "Payment Integration", "Growth Analytics"],
      image: "/services/ecommerce.png"
    },
    {
      title: "Digital Marketing",
      category: "Growth",
      desc: "Data-driven marketing strategies and Authority growth to scale your digital presence.",
      details: "We leverage big data to drive your marketing success. Our strategies include precision-targeted ad campaigns, social connectivity optimization, and advanced conversion tracking. We focus on measurable growth and high ROI, ensuring every marketing dollar contributes to your bottom line.",
      features: ["Growth Hacking", "Social Connectivity", "Campaign Tracking"],
      image: "/services/marketing.png"
    },
    {
      title: "SEO Off-Page",
      category: "Search",
      desc: "Advanced link building and authority growth to dominate search rankings and drive organic traffic.",
      details: "Domain authority is the key to organic dominance. We implement advanced off-page SEO strategies, including high-quality link building, digital PR, and authority growth. Our data-driven approach ensures your site climbs the rankings and maintains its position against competitors.",
      features: ["Link Building", "Authority Growth", "Keyword Dominance"],
      image: "/services/seo.png"
    },
    {
      title: "Final Year Projects",
      category: "Academic",
      desc: "Custom Web and Mobile App development for academic excellence and production-grade portfolios.",
      details: "We empower students to graduate with production-ready products. Our academic program provides full-stack implementation support, comprehensive technical documentation, and live demo hosting. We help you build a portfolio that stands out to top-tier employers.",
      features: ["Production-Ready Code", "Technical Docs", "Academic Grade UI"],
      image: "/services/projects.png"
    }
  ];

  const steps = [
    { num: "01", title: "Discovery", desc: "We analyze your current systems and identify automation opportunities." },
    { num: "02", title: "Strategy", desc: "Designing a custom AI architecture tailored to your business goals." },
    { num: "03", title: "Development", desc: "Building your platform with clean code and scalable infrastructure." },
    { num: "04", title: "Scale", desc: "Deploying and optimizing for long-term growth and efficiency." }
  ];

  return (
    <div className="solutions-page">
      <header className="page-header">
        <div className="container">
          <div className="badge reveal">Our Full Suite</div>
          <h1 className="hero-title reveal stagger-1">
            Build. <span className="gradient-text animated-gradient">Automate.</span> Scale.
          </h1>
          <p className="hero-subtitle reveal stagger-2">
            Every solution we offer is designed to improve operational efficiency and 
            support long-term business growth.
          </p>
        </div>
      </header>

      <section className="solutions-list">
        <div className="container">
          <div className="solutions-cards-grid">
            {solutions.map((item, index) => (
              <div key={index} className="reveal stagger-1" style={{ display: 'flex', width: '100%' }}>
                <div 
                  className={`solution-card-small glass-card ${expandedCard === index ? 'expanded' : ''}`}
                  style={{ width: '100%' }}
                >
                  <div className="card-image-wrapper">
                    <div className="image-overlay"></div>
                    <img src={item.image} alt={item.title} loading="lazy" width="450" height="200" />
                  </div>
                  <div className="card-content-wrapper">
                    <div className="solution-category">{item.category}</div>
                    <h2>{item.title}</h2>
                    <p>{item.desc}</p>
                    
                    <div className="expandable-content">
                      <div className="inner-details">
                        <p className="detailed-text">{item.details}</p>
                        <ul className="solution-features small">
                          {item.features.map((feature, fIndex) => (
                            <li key={fIndex}>
                              <span className="feature-dot"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <button 
                      className="secondary-btn small-btn expand-btn"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedCard === index ? 'Show Less' : 'Learn More'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section reveal">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Our Strategic Process</h2>
            <p className="section-desc">From initial concept to scalable digital reality.</p>
          </div>
          <div className="process-grid">
            {steps.map((step, index) => (
              <div key={index} className="process-card reveal stagger-1">
                <span className="step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section reveal">
        <div className="container">
          <div className="cta-card glass-card">
            <h2>Ready to Automate Your Success?</h2>
            <p>Join the businesses that are scaling faster with AI-powered solutions.</p>
            <a 
              href="https://wa.me/923104672445" 
              className="primary-btn pulse-hover"
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              Get a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Solutions;
