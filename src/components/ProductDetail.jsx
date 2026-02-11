import { useState } from 'react'

function ProductDetail({ product, onClose, onAddToCart }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) return null

  // Gather all images
  const images = []
  if (product.images && Array.isArray(product.images)) {
    product.images.forEach((img) => {
      if (typeof img === 'string') {
        images.push({ url: img, alt: product.name })
      } else if (img.url) {
        images.push({ url: img.url, alt: img.altText || product.name })
      }
    })
  }
  if (images.length === 0 && product.image) {
    images.push({
      url: product.image,
      alt: product.imageAlt || product.name || 'Product',
    })
  }

  const currentImage = images[selectedImageIndex] || null
  const hasMultipleImages = images.length > 1

  const price = product.price || 0
  const compareAtPrice = product.compareAtPrice || product.originalPrice || null
  const inStock = product.inStock !== undefined ? product.inStock : product.availableForSale
  const description = product.description || ''
  const name = product.name || product.title || 'Product'

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  return (
    <div className="product-detail-inline">
      {/* Back button */}
      <button className="product-detail-back" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Products
      </button>

      <div className="product-detail-card">
        {/* Image Section */}
        <div className="product-detail-image-section">
          <div className="product-detail-main-image">
            {currentImage ? (
              <img src={currentImage.url} alt={currentImage.alt} />
            ) : (
              <div className="product-detail-no-image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span>No image available</span>
              </div>
            )}

            {/* Stock badge */}
            <div className="product-detail-stock-badge">
              <span className={`stock-dot ${inStock ? 'in-stock' : 'out-of-stock'}`} />
              <span className={inStock ? 'in-stock' : 'out-of-stock'}>
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Sale badge */}
            {compareAtPrice && compareAtPrice > price && (
              <div className="product-detail-sale-badge">
                Save ${(compareAtPrice - price).toFixed(2)}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {hasMultipleImages && (
            <div className="product-detail-thumbnails">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`product-detail-thumb ${selectedImageIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={img.url} alt={img.alt} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="product-detail-info-section">
          {/* Product type */}
          {(product.productType || product.vendor) && (
            <span className="product-detail-type">
              {product.productType || product.vendor}
            </span>
          )}

          {/* Title */}
          <h2 className="product-detail-title">{name}</h2>

          {/* Price */}
          <div className="product-detail-price">
            <span className="product-detail-current-price">${price.toFixed(2)}</span>
            {compareAtPrice && compareAtPrice > price && (
              <span className="product-detail-compare-price">${compareAtPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div className="product-detail-description">{description}</div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="product-detail-tags">
              {product.tags.slice(0, 6).map((tag, index) => (
                <span key={index} className="product-detail-tag">{tag}</span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="product-detail-actions">
            <button
              className={`content-button product-detail-add-btn ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {addedToCart ? 'Added to Cart!' : inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {product.shopifyUrl && (
              <button
                className="content-button status-button open product-detail-store-btn"
                onClick={() => window.open(product.shopifyUrl, '_blank')}
              >
                View on Store
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
