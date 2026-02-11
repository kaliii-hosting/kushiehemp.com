import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Popup from './components/Popup'
import CartSidebar from './components/CartSidebar'
import WelcomePage from './components/WelcomePage'
import AuthModal from './components/AuthModal'
import AccountPage from './components/AccountPage'
import { useCart } from './context/CartContext'
import useShopifyProducts from './hooks/useShopifyProducts'

function App() {
  const [ageVerified, setAgeVerified] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState('subscription')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [sidebarCategory, setSidebarCategory] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [currentPage, setCurrentPage] = useState('shop')

  const { addToCart, setIsCartOpen } = useCart()
  const { products, loading, usingFallback } = useShopifyProducts()

  const openPopup = (type) => {
    setPopupType(type)
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const handleCloseDetail = () => {
    setSelectedProduct(null)
  }

  const handleAddToCartFromDetail = (product) => {
    addToCart(product)
    setIsCartOpen(true)
  }

  const handleAgeVerified = () => {
    setAgeVerified(true)
  }

  const handleLogoClick = () => {
    setSelectedProduct(null)
    setSidebarCategory(null)
    setSearchTerm('')
    setSearchFocused(false)
    setMobileMenuOpen(false)
    setCurrentPage('shop')
  }

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const handleMobileCategoryChange = (categoryId) => {
    setSidebarCategory(categoryId)
    setSelectedProduct(null)
    setMobileMenuOpen(false)
    setCurrentPage('shop')
  }

  const handleSidebarCategoryChange = (categoryId) => {
    setSidebarCategory(categoryId)
    setSelectedProduct(null)
    setCurrentPage('shop')
  }

  const handleProductClickFromSearch = (product) => {
    setSelectedProduct(product)
    setSearchTerm('')
    setSearchFocused(false)
    setCurrentPage('shop')
  }

  const handleSignInClick = () => {
    setShowAuthModal(true)
  }

  const handleProfileClick = () => {
    setCurrentPage('account')
    setSelectedProduct(null)
    setMobileMenuOpen(false)
  }

  const handleNavigateBackToShop = () => {
    setCurrentPage('shop')
  }

  // Show Welcome/Age Verification page first
  if (!ageVerified) {
    return <WelcomePage onVerified={handleAgeVerified} />
  }

  return (
    <div>
      <div className={`app ${searchFocused ? 'wide' : ''}`}>
        <Header
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
          products={products}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onProductClick={handleProductClickFromSearch}
          onLogoClick={handleLogoClick}
          onToggleMobileMenu={handleToggleMobileMenu}
          onSignInClick={handleSignInClick}
          onProfileClick={handleProfileClick}
        />

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${mobileMenuOpen ? 'is-active' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Slide-out Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
          <div className="mobile-menu-header">
            <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <img
                className="logo-img"
                src="https://fchtwxunzmkzbnibqbwl.supabase.co/storage/v1/object/public/kushie01/logos/Kushie%20Invoice%20logo.png"
                alt="Kushie Hemp"
              />
            </div>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Sidebar
            activeCategory={sidebarCategory}
            onCategoryChange={handleMobileCategoryChange}
            products={products}
          />
        </div>

        <div className="wrapper">
          <Sidebar
            activeCategory={sidebarCategory}
            onCategoryChange={handleSidebarCategoryChange}
            products={products}
          />

          {currentPage === 'account' ? (
            <AccountPage onNavigateBack={handleNavigateBackToShop} />
          ) : (
            <MainContent
              searchFocused={searchFocused}
              selectedProduct={selectedProduct}
              onProductClick={handleProductClick}
              onCloseDetail={handleCloseDetail}
              onAddToCartFromDetail={handleAddToCartFromDetail}
              sidebarCategory={sidebarCategory}
              onClearSidebarCategory={() => setSidebarCategory(null)}
              products={products}
              loading={loading}
              usingFallback={usingFallback}
            />
          )}
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`overlay-app ${showPopup ? 'is-active' : ''}`}
        onClick={closePopup}
      />

      {/* Popup */}
      <Popup
        isVisible={showPopup}
        popupType={popupType}
        onClose={closePopup}
      />

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Auth Modal */}
      <AuthModal
        isVisible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  )
}

export default App
