import { useState, useRef, useEffect, useCallback } from 'react'
import { useCart } from '../context/CartContext'
import useSearchProducts from '../hooks/useSearchProducts'

function Header({ isLightMode, toggleTheme, searchFocused, setSearchFocused, products, searchTerm, setSearchTerm, onProductClick }) {
  const { cartCount, setIsCartOpen } = useCart()
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef(null)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const blurTimeoutRef = useRef(null)

  const { results, isSearching } = useSearchProducts(products || [], searchTerm, { maxResults: 8, minChars: 1 })

  const hasResults = results.length > 0
  const showDropdown = isOpen && searchTerm.length >= 1 && (hasResults || (!isSearching && searchTerm.length >= 1))

  // Reset highlighted index when results change
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [results])

  // Sync isOpen with searchFocused and searchTerm
  useEffect(() => {
    if (searchFocused && searchTerm.length >= 1) {
      setIsOpen(true)
    } else if (!searchFocused) {
      setIsOpen(false)
    }
  }, [searchFocused, searchTerm])

  // Click-outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false)
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setSearchFocused])

  // Cleanup blur timeout on unmount
  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current)
    }
  }, [])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const items = dropdownRef.current.children
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex])

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
      blurTimeoutRef.current = null
    }
    // Only set searchFocused (wide mode) if there is already text
    // This prevents the header from reshuffling on every click
    if (searchTerm.length >= 1) {
      setSearchFocused(true)
      setIsOpen(true)
    }
  }

  const handleBlur = () => {
    // Delay blur to allow mousedown on dropdown items to fire first
    blurTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      // Only exit wide mode if the search is empty
      if (!searchTerm) {
        setSearchFocused(false)
      }
    }, 200)
  }

  const handleItemClick = (product) => {
    // Clear the blur timeout so we don't close prematurely
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
      blurTimeoutRef.current = null
    }
    setIsOpen(false)
    setSearchFocused(false)
    onProductClick(product)
  }

  const handleKeyDown = useCallback((e) => {
    if (!isOpen || searchTerm.length < 1) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (hasResults) {
          setHighlightedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (hasResults) {
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          )
        }
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current)
            blurTimeoutRef.current = null
          }
          setIsOpen(false)
          setSearchFocused(false)
          onProductClick(results[highlightedIndex])
          inputRef.current?.blur()
        }
        break
      case 'Escape':
        e.preventDefault()
        setSearchTerm('')
        setIsOpen(false)
        setSearchFocused(false)
        inputRef.current?.blur()
        break
      default:
        break
    }
  }, [isOpen, searchTerm, hasResults, highlightedIndex, results, onProductClick, setSearchTerm, setSearchFocused])

  const handleInputChange = (e) => {
    const val = e.target.value
    setSearchTerm(val)
    if (val.length >= 1) {
      setIsOpen(true)
      setSearchFocused(true)
    } else {
      setIsOpen(false)
      setSearchFocused(false)
    }
  }

  const truncateName = (name) => {
    if (!name) return 'Product'
    const words = name.split(' ')
    if (words.length <= 5) return name
    return words.slice(0, 5).join(' ') + '...'
  }

  return (
    <div className="header">
      <div className="logo">
        <img
          className="logo-img"
          src="https://fchtwxunzmkzbnibqbwl.supabase.co/storage/v1/object/public/kushie01/logos/Kushie_White_logo_1753092351582_38ok1bd.png"
          alt="Kushie Hemp"
        />
      </div>

      <div className="header-menu">
        <a href="#" className="menu-link is-active">Shop</a>
        <a href="#" className="menu-link notify">New Arrivals</a>
        <a href="#" className="menu-link">Lab Results</a>
        <a href="#" className="menu-link">About Us</a>
      </div>

      <div className="search-bar" ref={searchRef}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showDropdown && hasResults}
          aria-autocomplete="list"
          aria-controls="search-predictions"
          aria-activedescendant={
            highlightedIndex >= 0 ? `search-item-${highlightedIndex}` : undefined
          }
          autoComplete="off"
        />

        {/* Search Predictions Dropdown */}
        {showDropdown && hasResults && (
          <div
            className="search-dropdown"
            ref={dropdownRef}
            id="search-predictions"
            role="listbox"
          >
            {results.map((product, index) => (
              <div
                key={product.id}
                id={`search-item-${index}`}
                role="option"
                aria-selected={highlightedIndex === index}
                className={`search-dropdown-item ${highlightedIndex === index ? 'highlighted' : ''}`}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleItemClick(product)
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {/* Product thumbnail */}
                <div className="search-item-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div
                      className="search-item-placeholder"
                      style={{ backgroundColor: product.color || '#3a6df0' }}
                    >
                      {product.icon || product.name?.charAt(0) || '?'}
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="search-item-info">
                  <div className="search-item-name">{truncateName(product.name)}</div>
                  <div className="search-item-meta">
                    {(product.productType || product.category) && (
                      <span className="search-item-category">
                        {product.productType || product.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="search-item-price">
                  ${product.price?.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results state */}
        {isOpen && searchTerm.length >= 1 && !hasResults && !isSearching && (
          <div className="search-dropdown">
            <div className="search-dropdown-empty">
              No products found for &ldquo;{searchTerm}&rdquo;
            </div>
          </div>
        )}
      </div>

      <div className="header-profile">
        <div className="dark-light" onClick={toggleTheme}>
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </div>

        <div className="cart-badge" onClick={() => setIsCartOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="m1 1 4 4 2.68 11.12a2 2 0 0 0 2 1.88h9.72a2 2 0 0 0 2-1.46l1.38-6.54H6" />
          </svg>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>

        <div className="notification">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>

        <img
          className="profile-img"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=100&h=100&fit=crop&crop=face"
          alt="Profile"
        />
      </div>
    </div>
  )
}

export default Header
