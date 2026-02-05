import { useState } from 'react'
import { featuredProducts } from '../data/products'
import useShopifyProducts from '../hooks/useShopifyProducts'

function MainContent({ searchFocused, openPopup, activeDropdown, setActiveDropdown }) {
  const [activeTab, setActiveTab] = useState('all')
  const { products, loading, error, usingFallback } = useShopifyProducts()

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

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    switch (activeTab) {
      case 'sale':
        return product.compareAtPrice || product.originalPrice
      case 'new':
        // Show last 5 products as "new arrivals"
        return products.indexOf(product) >= Math.max(0, products.length - 5)
      case 'popular':
        // Show first 5 as "popular"
        return products.indexOf(product) < 5
      case 'all':
      default:
        return true
    }
  })

  // Split products for display sections
  const featuredList = filteredProducts.slice(0, Math.ceil(filteredProducts.length / 2))
  const bestSellers = filteredProducts.slice(Math.ceil(filteredProducts.length / 2))

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

        {/* Shopify sync status indicator */}
        {!loading && (
          <div className="content-section" style={{ padding: '0 20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                opacity: 0.6,
                marginBottom: '-10px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: usingFallback ? '#f97316' : '#22c55e',
                  display: 'inline-block',
                }}
              />
              {usingFallback
                ? 'Showing local catalog (Shopify sync pending)'
                : `Synced from Shopify — ${products.length} products`}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="content-section">
            <div className="content-section-title">Loading Products...</div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '40px',
                opacity: 0.5,
              }}
            >
              <div className="loading-spinner" />
            </div>
          </div>
        )}

        {/* Featured / All Products Section */}
        {!loading && featuredList.length > 0 && (
          <div className="content-section">
            <div className="content-section-title">
              {activeTab === 'all' ? 'All Products' : tabs.find((t) => t.id === activeTab)?.label}
              {!usingFallback && (
                <span style={{ fontSize: '12px', opacity: 0.5, marginLeft: '10px', fontWeight: 'normal' }}>
                  via Shopify
                </span>
              )}
            </div>
            <ul>
              {featuredList.map((product) => (
                <li key={product.id} className="adobe-product">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      className="product-icon"
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      className="product-icon"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.icon}
                    </div>
                  )}
                  <div className="products">
                    {product.name}
                  </div>
                  <span className="status">
                    <span className={`status-circle ${product.inStock ? 'green' : ''}`} />
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="price">
                    {(product.compareAtPrice || product.originalPrice) && (
                      <span className="original-price">
                        ${(product.compareAtPrice || product.originalPrice).toFixed(2)}
                      </span>
                    )}
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="button-wrapper">
                    <button
                      className={`content-button status-button ${!product.inStock ? 'open' : ''}`}
                      onClick={() => {
                        if (product.shopifyUrl) {
                          window.open(product.shopifyUrl, '_blank')
                        } else {
                          openPopup('addToCart')
                        }
                      }}
                    >
                      {product.shopifyUrl && !usingFallback ? 'Buy Now' : 'Add to Cart'}
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
                        {product.shopifyUrl && !usingFallback && (
                          <li>
                            <a href={product.shopifyUrl} target="_blank" rel="noopener noreferrer">
                              View on Store
                            </a>
                          </li>
                        )}
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
        )}

        {/* Popular Categories */}
        <div className="content-section">
          <div className="content-section-title">Popular Categories</div>
          <div className="apps-card">
            {featuredProducts.map((product) => (
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

        {/* Best Sellers / More Products */}
        {!loading && bestSellers.length > 0 && (
          <div className="content-section">
            <div className="content-section-title">
              {activeTab === 'all' ? 'More Products' : 'More Results'}
            </div>
            <ul>
              {bestSellers.map((product) => (
                <li key={product.id} className="adobe-product">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      className="product-icon"
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      className="product-icon"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.icon}
                    </div>
                  )}
                  <div className="products">
                    {product.name}
                  </div>
                  <span className="status">
                    <span className={`status-circle ${product.inStock ? 'green' : ''}`} />
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="price">
                    {(product.compareAtPrice || product.originalPrice) && (
                      <span className="original-price">
                        ${(product.compareAtPrice || product.originalPrice).toFixed(2)}
                      </span>
                    )}
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="button-wrapper">
                    <button
                      className={`content-button status-button ${!product.inStock ? 'open' : ''}`}
                      onClick={() => {
                        if (product.shopifyUrl && !usingFallback) {
                          window.open(product.shopifyUrl, '_blank')
                        } else {
                          openPopup('addToCart')
                        }
                      }}
                    >
                      {product.shopifyUrl && !usingFallback ? 'Buy Now' : 'Add to Cart'}
                    </button>
                    <div className="menu" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default MainContent
