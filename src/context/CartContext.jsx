import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../lib/firebase'
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'

const CartContext = createContext()

const SHOPIFY_STORE_DOMAIN = 'wa16ig-yj.myshopify.com'

export function CartProvider({ children }) {
  const { user } = useAuth()

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kushie-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Refs for Firestore sync
  const unsubFirestoreRef = useRef(null)
  const isLoadingFromFirestore = useRef(false)
  const hasMergedRef = useRef(false)

  // Firestore sync: listen to cart document when user is logged in
  useEffect(() => {
    // Cleanup previous listener
    if (unsubFirestoreRef.current) {
      unsubFirestoreRef.current()
      unsubFirestoreRef.current = null
    }

    if (user) {
      const cartDocRef = doc(db, 'users', user.uid, 'cart', 'current')
      hasMergedRef.current = false

      unsubFirestoreRef.current = onSnapshot(cartDocRef, (snapshot) => {
        const firestoreItems = snapshot.exists() ? (snapshot.data().items || []) : []

        // Only merge once on initial login
        if (!hasMergedRef.current) {
          hasMergedRef.current = true
          isLoadingFromFirestore.current = true

          setCartItems((localItems) => {
            // Merge: union of local + firestore, keep higher quantity for dupes
            const merged = [...firestoreItems]
            localItems.forEach((localItem) => {
              const matchKey = localItem.variantId || localItem.id
              const existing = merged.find(
                (item) => (item.variantId || item.id) === matchKey
              )
              if (existing) {
                existing.quantity = Math.max(existing.quantity, localItem.quantity)
              } else {
                merged.push(localItem)
              }
            })
            return merged
          })

          // Clear localStorage - Firestore is now source of truth
          try { localStorage.removeItem('kushie-cart') } catch {}
          setTimeout(() => { isLoadingFromFirestore.current = false }, 200)
        } else {
          // Subsequent updates from Firestore (e.g., another device)
          isLoadingFromFirestore.current = true
          setCartItems(firestoreItems)
          setTimeout(() => { isLoadingFromFirestore.current = false }, 200)
        }
      })
    } else {
      // User logged out - reset merge flag
      hasMergedRef.current = false
    }

    return () => {
      if (unsubFirestoreRef.current) {
        unsubFirestoreRef.current()
      }
    }
  }, [user])

  // Persist cart: Firestore when logged in, localStorage when logged out
  useEffect(() => {
    if (isLoadingFromFirestore.current) return

    if (user) {
      const cartDocRef = doc(db, 'users', user.uid, 'cart', 'current')
      setDoc(cartDocRef, {
        items: cartItems,
        updatedAt: serverTimestamp(),
      }, { merge: true }).catch((err) => {
        console.error('Failed to save cart to Firestore:', err)
      })
    } else {
      try {
        localStorage.setItem('kushie-cart', JSON.stringify(cartItems))
      } catch {
        // localStorage unavailable
      }
    }
  }, [cartItems, user])

  const addToCart = (product) => {
    setCartItems((prev) => {
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

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const getCheckoutUrl = () => {
    const lineItems = cartItems
      .map((item) => {
        let numericId = null

        if (item.variantId) {
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
