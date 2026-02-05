import { useState } from 'react'

function App() {
  const [isLightMode, setIsLightMode] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [activeDropdowns, setActiveDropdowns] = useState({})

  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
  }

  const toggleDropdown = (id) => {
    setActiveDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className={isLightMode ? 'light-mode' : ''}>
      <div className="video-bg">
        <video autoPlay muted loop>
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={`app ${searchFocused ? 'wide' : ''}`}>
        {/* Header */}
        <div className="header">
          <div className="menu-circle"></div>
          <div className="header-menu">
            <a className="menu-link is-active" href="#">Home</a>
            <a className="menu-link notify" href="#">Products</a>
            <a className="menu-link" href="#">Lab Results</a>
            <a className="menu-link" href="#">Contact</a>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          <div className="header-profile">
            <div className="dark-light" onClick={toggleTheme}>
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </div>
            <div className="notification">
              <span className="notification-number">3</span>
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="5" />
              <path d="M3 21v-2a7 7 0 017-7h4a7 7 0 017 7v2" />
            </svg>
            <img className="profile-img" src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=100&h=100&fit=crop&crop=face" alt="" />
          </div>
        </div>

        <div className="wrapper">
          {/* Left Sidebar */}
          <div className="left-side">
            <div className="side-wrapper">
              <div className="side-title">Categories</div>
              <div className="side-menu">
                <a href="#">
                  <svg viewBox="0 0 512 512">
                    <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0" />
                      <path d="M192 192h128v128H192zm0 0M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0" />
                    </g>
                  </svg>
                  All Products
                  <span className="updates" data-count="32"></span>
                </a>
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  Flower
                  <span className="updates" data-count="12"></span>
                </a>
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                  </svg>
                  Edibles
                  <span className="updates" data-count="8"></span>
                </a>
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                  </svg>
                  Concentrates
                </a>
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Cartridges
                  <span className="updates" data-count="15"></span>
                </a>
              </div>
            </div>
            <div className="side-wrapper">
              <div className="side-title">Products</div>
              <div className="side-menu">
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  Disposables
                </a>
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                  Pods
                </a>
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                    <line x1="20" y1="9" x2="23" y2="9" />
                    <line x1="20" y1="14" x2="23" y2="14" />
                    <line x1="1" y1="9" x2="4" y2="9" />
                    <line x1="1" y1="14" x2="4" y2="14" />
                  </svg>
                  Batteries
                </a>
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Infused Prerolls
                </a>
              </div>
            </div>
          </div>

          {/* Main Container */}
          <div className="main-container">
            <div className="main-header">
              <a className="menu-link-main" href="#">Kushie Hemp Store</a>
              <div className="header-menu">
                <a className="main-header-link is-active" href="#">Featured</a>
                <a className="main-header-link" href="#">Best Sellers</a>
                <a className="main-header-link" href="#">New Arrivals</a>
                <a className="main-header-link" href="#">On Sale</a>
              </div>
            </div>
            <div className={`content-wrapper ${searchFocused ? 'overlay' : ''}`}>
              {/* Header Banner */}
              <div className="content-wrapper-header">
                <div className="content-wrapper-context">
                  <h3 className="img-content">
                    <svg viewBox="0 0 512 512" fill="currentColor">
                      <path d="M467 0H45C20.186 0 0 20.186 0 45v422c0 24.814 20.186 45 45 45h422c24.814 0 45-20.186 45-45V45c0-24.814-20.186-45-45-45zm-6.5 75a7.5 7.5 0 010 15h-30a7.5 7.5 0 010-15zm-75 0a7.5 7.5 0 010 15h-30a7.5 7.5 0 010-15zm-75 0a7.5 7.5 0 010 15h-30a7.5 7.5 0 010-15zm-90.5 7.5a7.5 7.5 0 01-7.5 7.5H90.39l51.7 51.7a7.5 7.5 0 010 10.606 7.5 7.5 0 01-10.607 0l-51.7-51.7V225.5a7.5 7.5 0 01-15 0V75a7.5 7.5 0 017.5-7.5H220a7.5 7.5 0 017.5 7.5zm162.853 257.853l-100 100c-14.628 14.629-38.478 14.629-53.106 0l-50-50c-14.628-14.628-14.628-38.477 0-53.106l100-100c14.629-14.628 38.478-14.628 53.106 0l50 50c14.629 14.63 14.629 38.478 0 53.106z" />
                    </svg>
                    Premium Hemp Products
                  </h3>
                  <div className="content-text">
                    Discover our curated selection of premium hemp products. Lab-tested for purity and potency. Free shipping on orders over $75. Subscribe and save 20% on your first order.
                  </div>
                  <button className="content-button" onClick={() => setShowPopup(true)}>Start Shopping</button>
                </div>
                <img className="content-wrapper-img" src="https://assets.codepen.io/3364143/glass.png" alt="" />
              </div>

              {/* Featured Products Section */}
              <div className="content-section">
                <div className="content-section-title">Featured Products</div>
                <ul>
                  <li className="adobe-product">
                    <svg viewBox="0 0 52 52" style={{ background: '#3b82f6' }}>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">V</text>
                    </svg>
                    <div className="products">Delta-8 Cartridge</div>
                    <span className="status"><span className="status-circle green"></span>In Stock</span>
                    <div className="button-wrapper">
                      <button className="content-button status-button">$34.99</button>
                      <div className="menu"></div>
                      <button className={`dropdown ${activeDropdowns['p1'] ? 'is-active' : ''}`} onClick={() => toggleDropdown('p1')}>
                        <ul>
                          <li><a href="#">View Details</a></li>
                          <li><a href="#">Add to Cart</a></li>
                          <li><a href="#">Lab Results</a></li>
                        </ul>
                      </button>
                    </div>
                  </li>
                  <li className="adobe-product">
                    <svg viewBox="0 0 52 52" style={{ background: '#8b5cf6' }}>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">D</text>
                    </svg>
                    <div className="products">Indica Disposable</div>
                    <span className="status"><span className="status-circle green"></span>In Stock</span>
                    <div className="button-wrapper">
                      <button className="content-button status-button">$29.99</button>
                      <div className="menu"></div>
                      <button className={`dropdown ${activeDropdowns['p2'] ? 'is-active' : ''}`} onClick={() => toggleDropdown('p2')}>
                        <ul>
                          <li><a href="#">View Details</a></li>
                          <li><a href="#">Add to Cart</a></li>
                          <li><a href="#">Lab Results</a></li>
                        </ul>
                      </button>
                    </div>
                  </li>
                  <li className="adobe-product">
                    <svg viewBox="0 0 52 52" style={{ background: '#f97316' }}>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">E</text>
                    </svg>
                    <div className="products">CBD Gummies 500mg</div>
                    <span className="status"><span className="status-circle green"></span>In Stock</span>
                    <div className="button-wrapper">
                      <button className="content-button status-button">$24.99</button>
                      <div className="menu"></div>
                      <button className={`dropdown ${activeDropdowns['p3'] ? 'is-active' : ''}`} onClick={() => toggleDropdown('p3')}>
                        <ul>
                          <li><a href="#">View Details</a></li>
                          <li><a href="#">Add to Cart</a></li>
                          <li><a href="#">Lab Results</a></li>
                        </ul>
                      </button>
                    </div>
                  </li>
                  <li className="adobe-product">
                    <svg viewBox="0 0 52 52" style={{ background: '#22c55e' }}>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">F</text>
                    </svg>
                    <div className="products">OG Kush Flower</div>
                    <span className="status"><span className="status-circle"></span>Low Stock</span>
                    <div className="button-wrapper">
                      <button className="content-button status-button open">$39.99</button>
                      <div className="menu"></div>
                      <button className={`dropdown ${activeDropdowns['p4'] ? 'is-active' : ''}`} onClick={() => toggleDropdown('p4')}>
                        <ul>
                          <li><a href="#">View Details</a></li>
                          <li><a href="#">Add to Cart</a></li>
                          <li><a href="#">Lab Results</a></li>
                        </ul>
                      </button>
                    </div>
                  </li>
                  <li className="adobe-product">
                    <svg viewBox="0 0 52 52" style={{ background: '#eab308' }}>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">C</text>
                    </svg>
                    <div className="products">Live Resin Concentrate</div>
                    <span className="status"><span className="status-circle green"></span>In Stock</span>
                    <div className="button-wrapper">
                      <button className="content-button status-button">$49.99</button>
                      <div className="menu"></div>
                      <button className={`dropdown ${activeDropdowns['p5'] ? 'is-active' : ''}`} onClick={() => toggleDropdown('p5')}>
                        <ul>
                          <li><a href="#">View Details</a></li>
                          <li><a href="#">Add to Cart</a></li>
                          <li><a href="#">Lab Results</a></li>
                        </ul>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Category Cards Section */}
              <div className="content-section">
                <div className="content-section-title">Shop by Category</div>
                <div className="apps-card">
                  <div className="app-card">
                    <span>
                      <svg viewBox="0 0 52 52" style={{ background: '#3b82f6' }}>
                        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">V</text>
                      </svg>
                      Vape Cartridges
                    </span>
                    <div className="app-card__subtext">
                      Premium vape cartridges available in various strains and potencies. Compatible with standard 510 batteries.
                    </div>
                    <div className="app-card-buttons">
                      <button className="content-button status-button">Shop Now</button>
                      <div className="menu"></div>
                    </div>
                  </div>
                  <div className="app-card">
                    <span>
                      <svg viewBox="0 0 52 52" style={{ background: '#8b5cf6' }}>
                        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">D</text>
                      </svg>
                      Disposables
                    </span>
                    <div className="app-card__subtext">
                      Convenient all-in-one disposable vapes. No charging or refilling required. Perfect for on-the-go use.
                    </div>
                    <div className="app-card-buttons">
                      <button className="content-button status-button">Shop Now</button>
                      <div className="menu"></div>
                    </div>
                  </div>
                  <div className="app-card">
                    <span>
                      <svg viewBox="0 0 52 52" style={{ background: '#f97316' }}>
                        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">E</text>
                      </svg>
                      Edibles
                    </span>
                    <div className="app-card__subtext">
                      Delicious hemp-infused gummies and treats. Precise dosing for consistent effects every time.
                    </div>
                    <div className="app-card-buttons">
                      <button className="content-button status-button">Shop Now</button>
                      <div className="menu"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Sellers Section */}
              <div className="content-section">
                <div className="content-section-title">Best Sellers</div>
                <ul>
                  <li className="adobe-product">
                    <svg viewBox="0 0 52 52" style={{ background: '#ec4899' }}>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">P</text>
                    </svg>
                    <div className="products">Sativa Pod Refill</div>
                    <span className="status"><span className="status-circle green"></span>In Stock</span>
                    <div className="button-wrapper">
                      <button className="content-button status-button">$27.99</button>
                      <div className="menu"></div>
                    </div>
                  </li>
                  <li className="adobe-product">
                    <svg viewBox="0 0 52 52" style={{ background: '#14b8a6' }}>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">R</text>
                    </svg>
                    <div className="products">Infused Preroll 5-Pack</div>
                    <span className="status"><span className="status-circle green"></span>In Stock</span>
                    <div className="button-wrapper">
                      <button className="content-button status-button">$44.99</button>
                      <div className="menu"></div>
                    </div>
                  </li>
                  <li className="adobe-product">
                    <svg viewBox="0 0 52 52" style={{ background: '#64748b' }}>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">B</text>
                    </svg>
                    <div className="products">Universal 510 Battery</div>
                    <span className="status"><span className="status-circle green"></span>In Stock</span>
                    <div className="button-wrapper">
                      <button className="content-button status-button">$19.99</button>
                      <div className="menu"></div>
                    </div>
                  </li>
                  <li className="adobe-product">
                    <svg viewBox="0 0 52 52" style={{ background: '#f43f5e' }}>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">S</text>
                    </svg>
                    <div className="products">Starter Bundle Kit</div>
                    <span className="status"><span className="status-circle green"></span>In Stock</span>
                    <div className="button-wrapper">
                      <button className="content-button status-button">$79.99</button>
                      <div className="menu"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className={`overlay-app ${showPopup ? 'is-active' : ''}`} onClick={() => setShowPopup(false)}></div>

      {/* Popup */}
      <div className={`pop-up ${showPopup ? 'visible' : ''}`}>
        <div className="pop-up__title">
          Welcome to Kushie Hemp
          <svg className="close" onClick={() => setShowPopup(false)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div className="pop-up__subtitle">
          Subscribe to our newsletter and get <strong>20% off</strong> your first order! Plus, enjoy free shipping on all orders over $75.
          <br /><br />
          All our products are:
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>Lab-tested for purity and potency</li>
            <li>Made from premium hemp</li>
            <li>Compliant with federal regulations</li>
            <li>Shipped discreetly to your door</li>
          </ul>
        </div>
        <div className="checkbox-wrapper">
          <input className="checkbox" type="checkbox" id="check1" />
          <label htmlFor="check1">I agree to the <a href="#">Terms and Conditions</a></label>
        </div>
        <div className="checkbox-wrapper">
          <input className="checkbox" type="checkbox" id="check2" defaultChecked />
          <label htmlFor="check2">Subscribe to our newsletter</label>
        </div>
        <div className="content-button-wrapper">
          <button className="content-button status-button open" onClick={() => setShowPopup(false)}>Maybe Later</button>
          <button className="content-button status-button" onClick={() => setShowPopup(false)}>Subscribe Now</button>
        </div>
      </div>
    </div>
  )
}

export default App
