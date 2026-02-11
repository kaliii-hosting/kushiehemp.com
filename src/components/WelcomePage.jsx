import { useState } from 'react'

function WelcomePage({ onVerified }) {
  const [hoveredButton, setHoveredButton] = useState(null)
  const [denied, setDenied] = useState(false)

  const handleYes = () => {
    onVerified()
  }

  const handleNo = () => {
    setDenied(true)
  }

  return (
    <div className="welcome-page">
      {/* Video Background */}
      <div className="video-bg">
        <video autoPlay muted loop>
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Glass Container */}
      <div className="welcome-container">
        {/* Logo */}
        <div className="welcome-logo">
          <img
            className="welcome-logo-img"
            src="https://fchtwxunzmkzbnibqbwl.supabase.co/storage/v1/object/public/kushie01/logos/Kushie_White_logo_1753092351582_38ok1bd.png"
            alt="Kushie Hemp"
          />
        </div>

        {/* Age Verification Banner */}
        <div className="welcome-banner">
          <div className="welcome-banner-content">
            <div className="welcome-banner-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h1 className="welcome-banner-title">Age Verification Required</h1>
            <p className="welcome-banner-text">
              You must be 21 years of age or older to enter this website.
              By clicking "Yes, I'm 21+" you confirm that you are of legal age
              to purchase hemp products in your state.
            </p>

            {!denied ? (
              <div className="welcome-banner-actions">
                <button
                  className="welcome-btn welcome-btn-primary"
                  onClick={handleYes}
                  onMouseEnter={() => setHoveredButton('yes')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Yes, I'm 21+
                </button>
                <button
                  className="welcome-btn welcome-btn-secondary"
                  onClick={handleNo}
                  onMouseEnter={() => setHoveredButton('no')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  No, I'm Under 21
                </button>
              </div>
            ) : (
              <div className="welcome-denied">
                <div className="welcome-denied-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                </div>
                <p className="welcome-denied-text">
                  Sorry, you must be 21 or older to access this site.
                </p>
                <button
                  className="welcome-btn welcome-btn-secondary"
                  onClick={() => setDenied(false)}
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer text */}
        <div className="welcome-footer">
          <p>Premium Hemp Products &middot; Lab Tested &middot; Free Shipping $75+</p>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
