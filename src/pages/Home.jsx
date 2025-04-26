import { useState, useEffect } from 'react';
import '../styles/Home.css';
import { FaUserPlus, FaSearch, FaCloud, FaLock, FaMobileAlt, FaSyncAlt } from 'react-icons/fa';

const Home = () => {
 
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  // Animation effect for elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    return () => {
      hiddenElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      quote: "Contact Keeper has transformed how I manage my client relationships. It's intuitive and powerful!",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Michael Chen",
      role: "Freelance Developer",
      quote: "The best contact management solution I've used. Clean interface and all the features I need.",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Jessica Williams",
      role: "Marketing Director",
      quote: "Our team's productivity jumped 30% after switching to Contact Keeper. Highly recommended!",
      avatar: "/api/placeholder/60/60"
    }
  ];

  const NavLink = ({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
 
  return (
    <div className="home">
      {/* Header */}
      <header className="header">
      <div className="logo">
  <img src="/keeper.jpg" alt="Contact Keeper Logo" className="logo-image" />
  <h2>Contact Keeper</h2>
</div>

  <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
    <NavLink href="/" className="nav-link active">Home</NavLink>
    <NavLink href="/features" className="nav-link">Features</NavLink>
    <NavLink href="/pricing" className="nav-link">Pricing</NavLink>
    <NavLink href="/support" className="nav-link">Support</NavLink>
  </nav>
  <div className={`auth-buttons ${mobileMenuOpen ? 'mobile-open' : ''}`}>
    <NavLink href="/login" className="btn login-btn">Log In</NavLink>
    <NavLink href="/register" className="btn signup-btn">Sign Up</NavLink>
  </div>
  <button 
    className="mobile-menu-btn" 
    onClick={toggleMobileMenu}
    aria-label="Toggle navigation menu"
  >
    {mobileMenuOpen ? '✕' : '☰'}
  </button> 
</header>

      {/* Hero Section */}
      <section className="hero"> 
        <div className="hero-content">
          <div className="hero-text hidden"> 
            <span className="badge">New Features Available</span>
            <h1>Manage Your Contacts <span className="highlight">Effortlessly</span></h1>
            <p>Keep your contacts organized, accessible, and secure with our innovative contact management platform.</p>
            <div className="hero-buttons">
              <NavLink href="/register" className="btn primary">Get Started Free</NavLink>
              <NavLink href="#features" className="btn secondary">Explore Features</NavLink>
            </div>
            <div className="users-count">
              <div className="avatars">
                <img src="/api/placeholder/30/30" alt="User avatar" className="avatar" />
                <img src="/api/placeholder/30/30" alt="User avatar" className="avatar" />
                <img src="/api/placeholder/30/30" alt="User avatar" className="avatar" />
              </div>
              <span>Join 10,000+ users worldwide</span>
            </div>
          </div>
          <div className="hero-image hidden">
            <div className="app-preview">
              <div className="app-window">
                <div className="app-header">
                  <div className="window-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <div className="window-title">Contact Keeper</div>
                </div>
                <div className="app-content">
                  <div className="contact-card">
                    <div className="contact-avatar"></div>
                    <div className="contact-info">
                      <div className="contact-name">John Doe</div>
                      <div className="contact-details">john@example.com</div>
                    </div>
                  </div>
                  <div className="contact-card">
                    <div className="contact-avatar"></div>
                    <div className="contact-info">
                      <div className="contact-name">Jane Smith</div>
                      <div className="contact-details">jane@example.com</div>
                    </div>
                  </div>
                  <div className="contact-card">
                    <div className="contact-avatar"></div>
                    <div className="contact-info">
                      <div className="contact-name">Alex Johnson</div>
                      <div className="contact-details">alex@example.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item hidden">
            <h3>10K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item hidden">
            <h3>1M+</h3>
            <p>Contacts Stored</p>
          </div>
          <div className="stat-item hidden">
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
          <div className="stat-item hidden">
            <h3>4.9/5</h3>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title hidden">Powerful Features <span className="highlight">For Everyone</span></h2>
        <p className="section-subtitle hidden">Everything you need to manage your contacts effectively</p>
        
        <div className="features-grid">
          <div className="feature-card hidden">
            <div className="icon">
              <FaUserPlus />
            </div>
            <h3>Smart Contact Management</h3>
            <p>Add, edit, and organize your contacts with customizable fields and categories.</p>
          </div>
          <div className="feature-card hidden">
            <div className="icon">
              <FaCloud />
            </div>
            <h3>Cloud Synchronization</h3>
            <p>Your contacts are securely stored and accessible from any device, anywhere.</p>
          </div>
          <div className="feature-card hidden">
            <div className="icon">
              <FaSearch />
            </div>
            <h3>Advanced Search</h3>
            <p>Find contacts quickly with our powerful search and filter functionality.</p>
          </div>
          <div className="feature-card hidden">
            <div className="icon">
              <FaLock />
            </div>
            <h3>Top-notch Security</h3>
            <p>End-to-end encryption ensures your contact information stays private.</p>
          </div>
          <div className="feature-card hidden">
            <div className="icon">
              <FaMobileAlt />
            </div>
            <h3>Mobile Friendly</h3>
            <p>Access your contacts on the go with our responsive mobile application.</p>
          </div>
          <div className="feature-card hidden">
            <div className="icon">
              <FaSyncAlt />
            </div>
            <h3>Import & Export</h3>
            <p>Easily import contacts from other services or export them when needed.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title hidden">How It <span className="highlight">Works</span></h2>
        <p className="section-subtitle hidden">Start managing your contacts in three simple steps</p>
        
        <div className="steps">
          <div className="step hidden">
            <div className="step-number">1</div>
            <h3>Create an Account</h3>
            <p>Sign up for free and set up your profile in just a few seconds.</p>
          </div>
          <div className="step hidden">
            <div className="step-number">2</div>
            <h3>Add Your Contacts</h3>
            <p>Import existing contacts or add new ones with our easy-to-use interface.</p>
          </div>
          <div className="step hidden">
            <div className="step-number">3</div>
            <h3>Access Anywhere</h3>
            <p>Sync across all your devices and access your contacts anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title hidden">What Our <span className="highlight">Users Say</span></h2>
        
        <div className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`testimonial-item ${index === currentTestimonial ? 'active' : ''}`}
            >
              <div className="testimonial-content">
                <div className="quote">"</div>
                <p>{testimonial.quote}</p>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content hidden">
          <h2>Ready to Get <span className="highlight">Started?</span></h2>
          <p>Join thousands of satisfied users managing their contacts effectively.</p>
          <NavLink href="/register" className="btn cta-btn">Try For Free</NavLink>
          <p className="no-credit-card">No credit card required | Free plan available</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-company">
            <h3>Contact Keeper</h3>
            <p>The modern solution for contact management.</p>
            <div className="social-links">
              <a href="#" className="social-link">FB</a>
              <a href="#" className="social-link">TW</a>
              <a href="#" className="social-link">IG</a>
              <a href="#" className="social-link">LI</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <NavLink href="/features">Features</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
              <NavLink href="/security">Security</NavLink>
              <NavLink href="/integrations">Integrations</NavLink>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <NavLink href="/about">About Us</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/careers">Careers</NavLink>
              <NavLink href="/press">Press</NavLink>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <NavLink href="/help">Help Center</NavLink>
              <NavLink href="/documentation">Documentation</NavLink>
              <NavLink href="/contact">Contact Us</NavLink>
              <NavLink href="/status">Status</NavLink>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <NavLink href="/privacy">Privacy Policy</NavLink>
              <NavLink href="/terms">Terms of Service</NavLink>
              <NavLink href="/cookies">Cookie Policy</NavLink>
              <NavLink href="/gdpr">GDPR</NavLink>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Contact Keeper. All rights reserved.</p>
          <div className="language-selector">
            <select>
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;