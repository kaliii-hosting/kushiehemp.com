import { useState } from 'react'
import { useCart } from '../context/CartContext'
import ProductDetail from './ProductDetail'

function MainContent({ searchFocused, selectedProduct, onProductClick, onCloseDetail, onAddToCartFromDetail, sidebarCategory, onClearSidebarCategory, products, loading, usingFallback }) {
  const [activeTab, setActiveTab] = useState('all')
  const { addToCart, setIsCartOpen } = useCart()

  const tabs = [
    { id: 'all', label: 'All Products' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sale', label: 'On Sale' },
  ]

  // Truncate name to first 4 words
  const truncateName = (name) => {
    if (!name) return 'Product'
    const words = name.split(' ')
    if (words.length <= 4) return name
    return words.slice(0, 4).join(' ') + '...'
  }

  // Resolve display name for the active sidebar filter
  const getCategoryDisplayName = (catId) => {
    if (!catId) return null
    // Strain filter: "strain:indica" -> "Indica"
    if (catId.startsWith('strain:')) {
      const key = catId.slice(7)
      return key.charAt(0).toUpperCase() + key.slice(1)
    }
    // Compound filter: "compound:thca" -> "THCA"
    if (catId.startsWith('compound:')) {
      return catId.slice(9).toUpperCase()
    }
    // ProductType-based filter: find matching product to get original casing
    const match = products.find((p) => {
      const type = (p.productType || p.category || '').toLowerCase().trim()
      return type === catId
    })
    if (match) return (match.productType || match.category || catId).trim()
    return catId
  }

  // Filter products based on sidebar category OR active tab
  const filteredProducts = products.filter((product) => {
    // Sidebar category takes priority when set
    if (sidebarCategory) {
      // Strain-based filter: match product.strain
      if (sidebarCategory.startsWith('strain:')) {
        const strainKey = sidebarCategory.slice(7)
        return (product.strain || '').toLowerCase() === strainKey
      }

      // Compound-based filter: match against product tags (thca/thcp)
      if (sidebarCategory.startsWith('compound:')) {
        const compoundKey = sidebarCategory.slice(9)
        const productTags = (product.tags || []).map((t) => t.toLowerCase().trim())
        return productTags.includes(compoundKey)
      }

      // ProductType-based filter (from Categories)
      const cat = (product.category || product.productType || '').toLowerCase().trim()
      return cat === sidebarCategory
    }

    // Otherwise use the header tab filter
    switch (activeTab) {
      case 'sale':
        return product.compareAtPrice && product.compareAtPrice > product.price
      case 'new':
        return products.indexOf(product) >= Math.max(0, products.length - 10)
      case 'popular':
        return products.indexOf(product) < 10
      case 'all':
      default:
        return true
    }
  })

  const handleAddToCart = (product, e) => {
    e.stopPropagation()
    addToCart(product)
    setIsCartOpen(true)
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    // Clear sidebar selection when using header tabs
    if (onClearSidebarCategory) {
      onClearSidebarCategory()
    }
  }

  // Determine what title to show
  const getSectionTitle = () => {
    if (sidebarCategory) {
      return getCategoryDisplayName(sidebarCategory) || sidebarCategory
    }
    return tabs.find((t) => t.id === activeTab)?.label || 'All Products'
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <a href="#" className="menu-link-main">
          Kushie Hemp Store
        </a>
        <div className="header-menu">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href="#"
              className={`main-header-link ${!sidebarCategory && activeTab === tab.id ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleTabClick(tab.id)
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>

      <div className={`content-wrapper ${searchFocused ? 'overlay' : ''}`}>
        {/* Hero Banner */}
        <div className="content-wrapper-header">
          <div className="content-wrapper-context">
            <h3 className="img-content">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Premium Hemp Collection
            </h3>
            <div className="content-text">
              Discover our curated selection of premium hemp products. All items are
              lab-tested for purity and potency. Free shipping on orders over $75.
            </div>
            <button className="content-button" onClick={() => handleTabClick('all')}>
              Shop All Products
            </button>
          </div>
          <img
            className="content-wrapper-img"
            src="https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=300&h=200&fit=crop"
            alt="Hemp Products"
          />
        </div>

        {/* Sync Status */}
        {!loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', opacity: 0.6, marginTop: '20px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: usingFallback ? '#f97316' : '#22c55e', display: 'inline-block' }} />
            {usingFallback
              ? 'Showing local catalog (Shopify sync pending)'
              : `Synced from Shopify — ${products.length} products`}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="content-section">
            <div className="content-section-title">Loading Products...</div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', opacity: 0.5 }}>
              <div className="loading-spinner" />
            </div>
          </div>
        )}

        {/* Product Detail (inline, replaces grid) */}
        {selectedProduct && !loading && (
          <div className="content-section">
            <ProductDetail
              product={selectedProduct}
              onClose={onCloseDetail}
              onAddToCart={onAddToCartFromDetail}
            />
          </div>
        )}

        {/* Products Grid */}
        {!selectedProduct && !loading && filteredProducts.length > 0 && (
          <div className="content-section">
            <div className="content-section-title">
              {getSectionTitle()}
              <span style={{ fontSize: '12px', opacity: 0.5, marginLeft: '10px', fontWeight: 'normal' }}>
                {filteredProducts.length} items
              </span>
              {sidebarCategory && (
                <button
                  onClick={onClearSidebarCategory}
                  style={{
                    marginLeft: '12px',
                    background: 'none',
                    border: '1px solid var(--border-color)',
                    color: 'var(--theme-color)',
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontFamily: 'var(--body-font)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#3a6df0'; e.target.style.borderColor = '#3a6df0' }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = 'var(--border-color)' }}
                >
                  Clear filter ✕
                </button>
              )}
            </div>
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => onProductClick(product)}
                >
                  {/* Product Image */}
                  <div className="product-card-image">
                    {product.image ? (
                      <img src={product.image} alt={product.imageAlt || product.name} />
                    ) : (
                      <div className="product-card-placeholder">
                        <span>{product.icon}</span>
                      </div>
                    )}
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <div className="product-card-badge">SALE</div>
                    )}
                    {!product.inStock && (
                      <div className="product-card-badge out-of-stock">SOLD OUT</div>
                    )}
                  </div>
                  {/* Product Info */}
                  <div className="product-card-info">
                    <div className="product-card-name">{truncateName(product.name)}</div>
                    <div className="product-card-price">
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="original-price">${product.compareAtPrice.toFixed(2)}</span>
                      )}
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                    <button
                      className={`content-button status-button product-card-btn ${!product.inStock ? 'open' : ''}`}
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Add to Cart' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedProduct && !loading && filteredProducts.length === 0 && (
          <div className="content-section">
            <div className="content-section-title">
              {getSectionTitle()}
              {sidebarCategory && (
                <button
                  onClick={onClearSidebarCategory}
                  style={{
                    marginLeft: '12px',
                    background: 'none',
                    border: '1px solid var(--border-color)',
                    color: 'var(--theme-color)',
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontFamily: 'var(--body-font)',
                  }}
                >
                  Clear filter ✕
                </button>
              )}
            </div>
            <p style={{ color: 'var(--inactive-color)', fontSize: '14px' }}>
              No products found in this category. Try selecting a different one.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MainContent
