import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Popup from './components/Popup'

function App() {
  const [isLightMode, setIsLightMode] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState('subscription')
  const [activeDropdown, setActiveDropdown] = useState(null)

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
        />

        <div className="wrapper">
          <Sidebar />

          <MainContent
            searchFocused={searchFocused}
            openPopup={openPopup}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
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
    </div>
  )
}

export default App
