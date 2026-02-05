import { useState, useEffect } from 'react'
import { fetchAllProducts } from '../lib/shopify'
import { products as fallbackProducts, featuredProducts as fallbackFeatured } from '../data/products'

export function useShopifyProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)
        const shopifyProducts = await fetchAllProducts(50)

        if (!cancelled) {
          if (shopifyProducts.length > 0) {
            setProducts(shopifyProducts)
            setUsingFallback(false)
          } else {
            // No products from Shopify, use fallback
            setProducts(fallbackProducts)
            setUsingFallback(true)
          }
        }
      } catch (err) {
        console.warn('Failed to fetch from Shopify, using fallback data:', err.message)
        if (!cancelled) {
          setProducts(fallbackProducts)
          setUsingFallback(true)
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [])

  return { products, loading, error, usingFallback }
}

export default useShopifyProducts
