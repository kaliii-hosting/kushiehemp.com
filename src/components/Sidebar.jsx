const categories = [
  { id: 'flower', name: 'Flower', count: 12 },
  { id: 'edibles', name: 'Edibles', count: 8 },
  { id: 'concentrates', name: 'Concentrates', count: 6 },
  { id: 'cartridges', name: 'Cartridges', count: 15 },
  { id: 'disposables', name: 'Disposables', count: 10 },
  { id: 'pods', name: 'Pods', count: 7 },
]

const quickLinks = [
  { id: 'batteries', name: 'Batteries' },
  { id: 'prerolls', name: 'Infused Prerolls' },
  { id: 'bundles', name: 'Bundles & Deals' },
  { id: 'new', name: 'New Arrivals' },
]

// Clean monochrome SVG icons per category
const categoryIcons = {
  flower: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4-3-8-6-8-11a4 4 0 018 0 4 4 0 018 0c0 5-4 8-8 11z" />
      <path d="M12 11v6" />
    </svg>
  ),
  edibles: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  concentrates: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.55a1 1 0 00.9 1.45h12.76a1 1 0 00.9-1.45l-5.069-10.127A2 2 0 0114 9.527V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16.5h10" />
    </svg>
  ),
  cartridges: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="16" rx="2" ry="2" />
      <path d="M10 18v4" />
      <path d="M14 18v4" />
      <line x1="7" y1="8" x2="17" y2="8" />
    </svg>
  ),
  disposables: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="18" rx="3" ry="3" />
      <path d="M12 20v2" />
      <circle cx="12" cy="14" r="1.5" />
      <line x1="8" y1="7" x2="16" y2="7" />
    </svg>
  ),
  pods: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8a4 4 0 014 4v6a8 8 0 01-16 0V7a4 4 0 014-4z" />
      <line x1="8" y1="9" x2="16" y2="9" />
    </svg>
  ),
}

const quickLinkIcons = {
  batteries: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
      <line x1="23" y1="10" x2="23" y2="14" />
      <line x1="11" y1="10" x2="11" y2="14" />
      <line x1="9" y1="12" x2="13" y2="12" />
    </svg>
  ),
  prerolls: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20L20 4" />
      <circle cx="18" cy="6" r="3" />
      <path d="M2 22l2-2" />
    </svg>
  ),
  bundles: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  new: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
}

function Sidebar({ activeCategory, onCategoryChange }) {
  const handleCategoryClick = (e, categoryId) => {
    e.preventDefault()
    // Toggle: click same category again to deselect (show all)
    if (activeCategory === categoryId) {
      onCategoryChange(null)
    } else {
      onCategoryChange(categoryId)
    }
  }

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
              onClick={(e) => handleCategoryClick(e, category.id)}
            >
              {categoryIcons[category.id]}
              {category.name}
              <span className="updates">
                {category.count}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="side-wrapper">
        <div className="side-title">Quick Links</div>
        <div className="side-menu">
          {quickLinks.map((link) => (
            <a
              key={link.id}
              href="#"
              className={activeCategory === link.id ? 'active' : ''}
              onClick={(e) => handleCategoryClick(e, link.id)}
            >
              {quickLinkIcons[link.id]}
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div className="side-wrapper">
        <div className="side-title">Support</div>
        <div className="side-menu">
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
            </svg>
            FAQs
          </a>
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            Lab Results
          </a>
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
