import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

const SHOPIFY_STORE_DOMAIN = 'wa16ig-yj.myshopify.com'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kushie-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kushie-cart', JSON.stringify(cartItems))
    } catch {
      // localStorage unavailable
    }
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems((prev) => {
      // Use variantId if available, otherwise fall back to id
      const matchKey = product.variantId || product.id
      const existing = prev.find(
        (item) => (item.variantId || item.id) === matchKey
      )

      if (existing) {
        return prev.map((item) =>
          (item.variantId || item.id) === matchKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prev,
        {
          id: product.id,
          variantId: product.variantId || null,
          name: product.name || product.title || 'Product',
          price: product.price || 0,
          compareAtPrice: product.compareAtPrice || product.originalPrice || null,
          image: product.image || null,
          quantity: 1,
          handle: product.handle || null,
        },
      ]
    })
  }

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id && item.variantId !== id)
    )
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id || item.variantId === id
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  // Computed total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // Computed total item count
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  // Build Shopify checkout URL from cart items
  const getCheckoutUrl = () => {
    // If items have Shopify variant IDs (gid://shopify/ProductVariant/xxxxx),
    // extract the numeric ID for the /cart/ URL format
    const lineItems = cartItems
      .map((item) => {
        let numericId = null

        if (item.variantId) {
          // Handle GID format: gid://shopify/ProductVariant/12345
          const gidMatch = String(item.variantId).match(/(\d+)$/)
          if (gidMatch) {
            numericId = gidMatch[1]
          }
        }

        if (!numericId && item.id) {
          const idMatch = String(item.id).match(/(\d+)$/)
          if (idMatch) {
            numericId = idMatch[1]
          }
        }

        if (numericId) {
          return `${numericId}:${item.quantity}`
        }
        return null
      })
      .filter(Boolean)

    if (lineItems.length > 0) {
      return `https://${SHOPIFY_STORE_DOMAIN}/cart/${lineItems.join(',')}`
    }

    // Fallback: just open the store
    return `https://${SHOPIFY_STORE_DOMAIN}/cart`
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    getCheckoutUrl,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
