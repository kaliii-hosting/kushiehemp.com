import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Popup from './components/Popup'
import CartSidebar from './components/CartSidebar'
import WelcomePage from './components/WelcomePage'
import { useCart } from './context/CartContext'
import useShopifyProducts from './hooks/useShopifyProducts'

function App() {
  const [ageVerified, setAgeVerified] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState('subscription')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [sidebarCategory, setSidebarCategory] = useState(null)

  const { addToCart, setIsCartOpen } = useCart()
  const { products, loading, usingFallback } = useShopifyProducts()

  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
  }

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

  const handleSidebarCategoryChange = (categoryId) => {
    setSidebarCategory(categoryId)
    setSelectedProduct(null)
  }

  const handleProductClickFromSearch = (product) => {
    setSelectedProduct(product)
    setSearchTerm('')
    setSearchFocused(false)
  }

  // Show Welcome/Age Verification page first
  if (!ageVerified) {
    return <WelcomePage onVerified={handleAgeVerified} />
  }

  return (
    <div className={isLightMode ? 'light-mode' : ''}>
      <div className="video-bg">
        <video autoPlay muted loop>
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={`app ${searchFocused ? 'wide' : ''}`}>
        <Header
          isLightMode={isLightMode}
          toggleTheme={toggleTheme}
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
          products={products}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onProductClick={handleProductClickFromSearch}
        />

        <div className="wrapper">
          <Sidebar
            activeCategory={sidebarCategory}
            onCategoryChange={handleSidebarCategoryChange}
          />

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

    </div>
  )
}

export default App
