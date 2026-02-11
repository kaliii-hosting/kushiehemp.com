import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function CartSidebar() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    getCheckoutUrl,
  } = useCart()
  const { user } = useAuth()

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  // Truncate name to first 4 words
  const truncateName = (name) => {
    if (!name) return 'Product'
    const words = name.split(' ')
    if (words.length <= 4) return name
    return words.slice(0, 4).join(' ') + '...'
  }

  const handleCheckout = async () => {
    // Save order to Firestore if user is logged in
    if (user && cartItems.length > 0) {
      try {
        await addDoc(collection(db, 'users', user.uid, 'orders'), {
          items: cartItems.map((item) => ({
            id: item.id,
            variantId: item.variantId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            handle: item.handle,
          })),
          total: cartTotal,
          itemCount: cartCount,
          createdAt: serverTimestamp(),
          status: 'completed',
        })
      } catch (err) {
        console.error('Failed to save order:', err)
      }
    }

    // Open Shopify checkout
    const url = getCheckoutUrl()
    window.open(url, '_blank')

    // Clear cart after checkout
    clearCart()
    setIsCartOpen(false)
  }

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          opacity: isCartOpen ? 1 : 0,
          visibility: isCartOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s, visibility 0.3s',
          zIndex: 20,
          pointerEvents: isCartOpen ? 'all' : 'none',
        }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '380px',
          maxWidth: '100%',
          height: '100vh',
          backgroundColor: 'var(--popup-bg)',
          borderLeft: '1px solid var(--border-color)',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
          zIndex: 21,
          display: 'flex',
          flexDirection: 'column',
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          fontFamily: 'var(--body-font)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-color)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--theme-color)',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '20px', height: '20px' }}
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="m1 1 4 4 2.68 11.12a2 2 0 0 0 2 1.88h9.72a2 2 0 0 0 2-1.46l1.38-6.54H6" />
            </svg>
            Your Cart
            {cartCount > 0 && (
              <span
                style={{
                  backgroundColor: '#3a6df0',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                {cartCount}
              </span>
            )}
          </div>

          <svg
            onClick={() => setIsCartOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: '20px',
              height: '20px',
              color: 'var(--theme-color)',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>

        {/* Cart Items */}
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '16px 24px',
          }}
        >
          {cartItems.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--inactive-color)',
                gap: '16px',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '48px', height: '48px', opacity: 0.4 }}
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="m1 1 4 4 2.68 11.12a2 2 0 0 0 2 1.88h9.72a2 2 0 0 0 2-1.46l1.38-6.54H6" />
              </svg>
              <span style={{ fontSize: '14px', fontWeight: 400 }}>
                Your cart is empty
              </span>
              <button
                className="content-button status-button open"
                onClick={() => setIsCartOpen(false)}
                style={{ marginTop: '8px' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cartItems.map((item) => (
                <div
                  key={item.variantId || item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    backgroundColor: 'var(--content-bg)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: 'var(--hover-menu-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        style={{
                          width: '24px',
                          height: '24px',
                          color: 'var(--inactive-color)',
                        }}
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                    )}
                  </div>

                  {/* Product Info */}
                  <div
                    style={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '8px',
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--theme-color)',
                          fontSize: '13px',
                          fontWeight: 500,
                          lineHeight: '1.3',
                        }}
                      >
                        {truncateName(item.name)}
                      </span>

                      {/* Remove button */}
                      <svg
                        onClick={() => removeFromCart(item.variantId || item.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          width: '14px',
                          height: '14px',
                          color: 'var(--inactive-color)',
                          cursor: 'pointer',
                          flexShrink: 0,
                          opacity: 0.6,
                          transition: 'opacity 0.2s, color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1'
                          e.currentTarget.style.color = '#f43f5e'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.6'
                          e.currentTarget.style.color = 'var(--inactive-color)'
                        }}
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </div>

                    {/* Price */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '4px',
                      }}
                    >
                      <span
                        style={{
                          color: '#16a34a',
                          fontSize: '14px',
                          fontWeight: 600,
                        }}
                      >
                        ${item.price.toFixed(2)}
                      </span>
                      {item.compareAtPrice && (
                        <span
                          style={{
                            color: 'var(--inactive-color)',
                            fontSize: '12px',
                            textDecoration: 'line-through',
                          }}
                        >
                          ${item.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0',
                        marginTop: '8px',
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.variantId || item.id,
                            item.quantity - 1
                          )
                        }
                        style={{
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'var(--hover-menu-bg)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px 0 0 6px',
                          color: 'var(--theme-color)',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 600,
                          fontFamily: 'var(--body-font)',
                          transition: 'background-color 0.2s',
                        }}
                      >
                        -
                      </button>
                      <span
                        style={{
                          width: '36px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'var(--hover-menu-bg)',
                          borderTop: '1px solid var(--border-color)',
                          borderBottom: '1px solid var(--border-color)',
                          color: 'var(--theme-color)',
                          fontSize: '13px',
                          fontWeight: 500,
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.variantId || item.id,
                            item.quantity + 1
                          )
                        }
                        style={{
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'var(--hover-menu-bg)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '0 6px 6px 0',
                          color: 'var(--theme-color)',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 600,
                          fontFamily: 'var(--body-font)',
                          transition: 'background-color 0.2s',
                        }}
                      >
                        +
                      </button>

                      {/* Line total */}
                      <span
                        style={{
                          marginLeft: 'auto',
                          color: 'var(--theme-color)',
                          fontSize: '13px',
                          fontWeight: 600,
                        }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart link */}
              {cartItems.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '4px' }}>
                  <span
                    onClick={clearCart}
                    style={{
                      color: 'var(--inactive-color)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      opacity: 0.7,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
                  >
                    Clear Cart
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--border-color)',
              flexShrink: 0,
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  color: 'var(--inactive-color)',
                  fontSize: '14px',
                  fontWeight: 400,
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  color: 'var(--theme-color)',
                  fontSize: '18px',
                  fontWeight: 600,
                }}
              >
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <div
              style={{
                color: 'var(--inactive-color)',
                fontSize: '12px',
                marginBottom: '14px',
                textAlign: 'center',
              }}
            >
              Shipping & taxes calculated at checkout
            </div>

            {/* Checkout Button */}
            <button
              className="content-button"
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'var(--body-font)',
                borderRadius: '10px',
                marginTop: 0,
              }}
            >
              Checkout
            </button>

            {/* Continue Shopping */}
            <button
              className="content-button status-button open"
              onClick={() => setIsCartOpen(false)}
              style={{
                width: '100%',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'var(--body-font)',
                borderRadius: '10px',
                marginTop: '8px',
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar
