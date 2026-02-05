import { useState } from 'react'

const categories = [
  { id: 'flower', name: 'Flower', icon: 'F', count: 12, color: '#22c55e' },
  { id: 'edibles', name: 'Edibles', icon: 'E', count: 8, color: '#f97316' },
  { id: 'concentrates', name: 'Concentrates', icon: 'C', count: 6, color: '#eab308' },
  { id: 'cartridges', name: 'Cartridges', icon: 'V', count: 15, color: '#3b82f6' },
  { id: 'disposables', name: 'Disposables', icon: 'D', count: 10, color: '#8b5cf6' },
  { id: 'pods', name: 'Pods', icon: 'P', count: 7, color: '#ec4899' },
]

const quickLinks = [
  { id: 'batteries', name: 'Batteries', icon: 'B' },
  { id: 'prerolls', name: 'Infused Prerolls', icon: 'R' },
  { id: 'bundles', name: 'Bundles & Deals', icon: 'S' },
  { id: 'new', name: 'New Arrivals', icon: 'N' },
]

function Sidebar() {
  const [activeCategory, setActiveCategory] = useState('cartridges')

  return (
    <div className="left-side">
      <div className="side-wrapper">
        <div className="side-title">Categories</div>
        <div className="side-menu">
          {categories.map((category) => (
            <a
              key={category.id}
              href="#"
              className={activeCategory === category.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                setActiveCategory(category.id)
              }}
            >
              <div
                className="product-icon"
                style={{ backgroundColor: category.color }}
              >
                {category.icon}
              </div>
              {category.name}
              <span className="updates">{category.count}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="side-wrapper">
        <div className="side-title">Quick Links</div>
        <div className="side-menu">
          {quickLinks.map((link) => (
            <a key={link.id} href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h18v18H3zM12 8v8M8 12h8" />
              </svg>
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div className="side-wrapper">
        <div className="side-title">Support</div>
        <div className="side-menu">
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
            </svg>
            FAQs
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            Lab Results
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
