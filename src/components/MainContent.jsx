import { useState } from 'react'
import { products, featuredProducts } from '../data/products'

function MainContent({ searchFocused, openPopup, activeDropdown, setActiveDropdown }) {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'All Products' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sale', label: 'On Sale' },
  ]

  const toggleDropdown = (productId, e) => {
    e.stopPropagation()
    setActiveDropdown(activeDropdown === productId ? null : productId)
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <a href="#" className="menu-link-main">
          Premium Hemp Products
        </a>
        <div className="header-menu">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href="#"
              className={`main-header-link ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab(tab.id)
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>

      <div className={`content-wrapper ${searchFocused ? 'overlay' : ''}`}>
        <div className="content-wrapper-header">
          <div className="content-wrapper-context">
            <h3 className="img-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Premium Hemp Collection
            </h3>
            <div className="content-text">
              Discover our curated selection of premium hemp products. All items are
              lab-tested for purity and potency. Free shipping on orders over $75.
              Subscribe and save 20% on your first order.
            </div>
            <button
              className="content-button"
              onClick={() => openPopup('subscription')}
            >
              Subscribe Now
            </button>
          </div>
          <img
            className="content-wrapper-img"
            src="https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=300&h=200&fit=crop"
            alt="Hemp Products"
          />
        </div>

        <div className="content-section">
          <div className="content-section-title">Featured Products</div>
          <ul>
            {products.slice(0, 5).map((product) => (
              <li key={product.id} className="adobe-product">
                <div
                  className="product-icon"
                  style={{ backgroundColor: product.color }}
                >
                  {product.icon}
                </div>
                <div className="products">
                  {product.name}
                </div>
                <span className="status">
                  <span className={`status-circle ${product.inStock ? 'green' : ''}`} />
                  {product.inStock ? 'In Stock' : 'Low Stock'}
                </span>
                <span className="price">
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                  ${product.price}
                </span>
                <div className="button-wrapper">
                  <button
                    className={`content-button status-button ${!product.inStock ? 'open' : ''}`}
                    onClick={() => openPopup('addToCart')}
                  >
                    Add to Cart
                  </button>
                  <div className="menu" />
                  <button
                    className={`dropdown ${activeDropdown === product.id ? 'is-active' : ''}`}
                    onClick={(e) => toggleDropdown(product.id, e)}
                  >
                    <ul>
                      <li onClick={() => openPopup('quickView')}>
                        <a href="#">Quick View</a>
                      </li>
                      <li>
                        <a href="#">Add to Wishlist</a>
                      </li>
                      <li>
                        <a href="#">View Lab Results</a>
                      </li>
                    </ul>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="content-section">
          <div className="content-section-title">Popular Categories</div>
          <div className="apps-card">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="app-card"
                onClick={() => openPopup('productDetail')}
              >
                <span>
                  <div
                    className="card-icon"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.icon}
                  </div>
                  {product.name}
                </span>
                <div className="app-card__subtext">{product.description}</div>
                <div className="app-card-buttons">
                  <button className="content-button status-button">
                    Shop Now
                  </button>
                  <div className="menu" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="content-section-title">Best Sellers</div>
          <ul>
            {products.slice(5, 10).map((product) => (
              <li key={product.id} className="adobe-product">
                <div
                  className="product-icon"
                  style={{ backgroundColor: product.color }}
                >
                  {product.icon}
                </div>
                <div className="products">
                  {product.name}
                </div>
                <span className="status">
                  <span className={`status-circle ${product.inStock ? 'green' : ''}`} />
                  {product.inStock ? 'In Stock' : 'Low Stock'}
                </span>
                <span className="price">
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                  ${product.price}
                </span>
                <div className="button-wrapper">
                  <button
                    className={`content-button status-button ${!product.inStock ? 'open' : ''}`}
                    onClick={() => openPopup('addToCart')}
                  >
                    Add to Cart
                  </button>
                  <div className="menu" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MainContent
