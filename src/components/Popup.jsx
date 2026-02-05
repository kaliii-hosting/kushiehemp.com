function Popup({ isVisible, popupType, onClose }) {
  const getContent = () => {
    switch (popupType) {
      case 'subscription':
        return {
          title: 'Subscribe & Save 20%',
          content: (
            <>
              <div className="pop-up__subtitle">
                Join our membership program and enjoy exclusive benefits:
                <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                  <li>20% off your first order</li>
                  <li>15% off all recurring orders</li>
                  <li>Free shipping on all orders</li>
                  <li>Early access to new products</li>
                  <li>Exclusive member-only deals</li>
                </ul>
              </div>
              <div className="checkbox-wrapper">
                <input className="checkbox" type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I agree to the <a href="#">Terms and Conditions</a>
                </label>
              </div>
              <div className="checkbox-wrapper">
                <input className="checkbox" type="checkbox" id="newsletter" defaultChecked />
                <label htmlFor="newsletter">
                  Subscribe to our newsletter for updates and promotions
                </label>
              </div>
            </>
          ),
          primaryButton: 'Subscribe Now',
          secondaryButton: 'Maybe Later',
        }
      case 'addToCart':
        return {
          title: 'Added to Cart',
          content: (
            <div className="pop-up__subtitle">
              Your item has been added to the cart. Would you like to continue
              shopping or proceed to checkout?
            </div>
          ),
          primaryButton: 'View Cart',
          secondaryButton: 'Continue Shopping',
        }
      case 'quickView':
        return {
          title: 'Quick View',
          content: (
            <div className="pop-up__subtitle">
              <p><strong>Premium Hemp Cartridge</strong></p>
              <p style={{ marginTop: '10px' }}>
                Our premium hemp cartridges are crafted with the finest ingredients
                and undergo rigorous lab testing to ensure purity and potency.
              </p>
              <p style={{ marginTop: '10px' }}>
                <strong>Strength:</strong> 1000mg<br />
                <strong>Strain:</strong> Hybrid<br />
                <strong>Flavor:</strong> Natural Hemp
              </p>
            </div>
          ),
          primaryButton: 'Add to Cart',
          secondaryButton: 'View Details',
        }
      case 'productDetail':
        return {
          title: 'Product Details',
          content: (
            <div className="pop-up__subtitle">
              <p>
                All our products are sourced from organic hemp farms and undergo
                third-party lab testing for quality assurance.
              </p>
              <p style={{ marginTop: '10px' }}>
                <strong>Certificate of Analysis (COA)</strong> available for every
                batch. Click below to view the lab results for this product.
              </p>
            </div>
          ),
          primaryButton: 'View Lab Results',
          secondaryButton: 'Close',
        }
      default:
        return {
          title: 'Information',
          content: <div className="pop-up__subtitle">Loading...</div>,
          primaryButton: 'OK',
          secondaryButton: 'Cancel',
        }
    }
  }

  const content = getContent()

  return (
    <div className={`pop-up ${isVisible ? 'visible' : ''}`}>
      <div className="pop-up__title">
        {content.title}
        <svg
          className="close"
          onClick={onClose}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>
      {content.content}
      <div className="content-button-wrapper">
        <button className="content-button status-button open" onClick={onClose}>
          {content.secondaryButton}
        </button>
        <button className="content-button status-button" onClick={onClose}>
          {content.primaryButton}
        </button>
      </div>
    </div>
  )
}

export default Popup
