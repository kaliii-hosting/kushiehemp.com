import { useState } from 'react'

function Header({ isLightMode, toggleTheme, searchFocused, setSearchFocused }) {
  const [cartCount] = useState(3)
  const [notificationCount] = useState(2)

  return (
    <div className="header">
      <div className="logo">
        <div className="logo-icon">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 6c-1.5 4-4 7-8 9 4 2 6.5 5 8 9 1.5-4 4-7 8-9-4-2-6.5-5-8-9z" />
          </svg>
        </div>
        Kushie Hemp
      </div>

      <div className="header-menu">
        <a href="#" className="menu-link is-active">Shop</a>
        <a href="#" className="menu-link notify">New Arrivals</a>
        <a href="#" className="menu-link">Lab Results</a>
        <a href="#" className="menu-link">About Us</a>
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
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </div>

        <div className="cart-badge">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="m1 1 4 4 2.68 11.12a2 2 0 0 0 2 1.88h9.72a2 2 0 0 0 2-1.46l1.38-6.54H6" />
          </svg>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>

        <div className="notification">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          {notificationCount > 0 && (
            <span className="notification-number">{notificationCount}</span>
          )}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
        </svg>

        <img
          className="profile-img"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=100&h=100&fit=crop&crop=face"
          alt="Profile"
        />
      </div>
    </div>
  )
}

export default Header
