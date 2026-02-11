import { useState } from 'react'

function WelcomePage({ onVerified }) {
  const [isChecked, setIsChecked] = useState(false)
  const [denied, setDenied] = useState(false)

  const handleToggle = () => {
    if (!isChecked) {
      setIsChecked(true)
      setDenied(false)
      // Small delay to let animation play, then verify
      setTimeout(() => {
        onVerified()
      }, 800)
    } else {
      setIsChecked(false)
      setDenied(true)
    }
  }

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        {/* Logo */}
        <div className="welcome-logo">
          <img
            className="welcome-logo-img"
            src="https://fchtwxunzmkzbnibqbwl.supabase.co/storage/v1/object/public/kushie01/logos/Kushie%20Invoice%20logo.png"
            alt="Kushie Hemp"
          />
        </div>

        {/* Age Verification Card */}
        <div className="welcome-banner">
          <div className="welcome-banner-content">
            <h1 className="welcome-banner-title">Age Verification Required</h1>
            <p className="welcome-banner-text">
              You must be 21 years of age or older to enter this website.
              Toggle the switch to confirm your age.
            </p>

            {/* Toggle Switch Section */}
            <div className="welcome-toggle-section">
              <span className={`welcome-toggle-label welcome-toggle-label--left ${!isChecked ? 'is-active' : ''}`}>
                Under 21
              </span>

              <label className="switch">
                <span className="switch__wrapper">
                  <input
                    className="switch__input"
                    type="checkbox"
                    role="switch"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                  <span className="switch__emoji">
                    <span className="switch__emoji-face switch__emoji-face--sad">
                      <span className="switch__emoji-eye"></span>
                      <span className="switch__emoji-eye"></span>
                      <span className="switch__emoji-mouth"></span>
                    </span>
                    <span className="switch__emoji-face">
                      <span className="switch__emoji-eye"></span>
                      <span className="switch__emoji-eye"></span>
                      <span className="switch__emoji-mouth"></span>
                    </span>
                  </span>
                </span>
                <span className="switch__label">Age Verification</span>
              </label>

              <span className={`welcome-toggle-label welcome-toggle-label--right ${isChecked ? 'is-active' : ''}`}>
                Over 21
              </span>
            </div>

            {denied && (
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
