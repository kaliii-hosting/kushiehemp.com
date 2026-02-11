import { useState, useEffect, useMemo } from 'react'

function useSearchProducts(products, searchTerm, { maxResults = 6, minChars = 1, debounceMs = 150 } = {}) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)

  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), debounceMs)
    return () => clearTimeout(timer)
  }, [searchTerm, debounceMs])

  // Compute filtered results with weighted scoring
  const results = useMemo(() => {
    if (!debouncedTerm || debouncedTerm.length < minChars) return []

    const term = debouncedTerm.toLowerCase().trim()
    if (!term) return []

    const scored = products
      .map((product) => {
        let score = 0
        const name = (product.name || '').toLowerCase()
        const category = (product.category || product.productType || '').toLowerCase()
        const description = (product.description || '').toLowerCase()
        const tags = (product.tags || []).map((t) => t.toLowerCase())

        // Exact name match (highest weight)
        if (name === term) {
          score += 100
        } else if (name.startsWith(term)) {
          // Name starts with term
          score += 80
        } else if (name.includes(term)) {
          // Name contains term
          score += 60
        }

        // Check individual words in name for partial match
        const nameWords = name.split(/\s+/)
        if (nameWords.some((word) => word.startsWith(term))) {
          score += 50
        }

        // Category/productType match
        if (category.includes(term)) score += 40

        // Tag match
        if (tags.some((tag) => tag.includes(term))) score += 30

        // Description match (lowest weight)
        if (description.includes(term)) score += 10

        return { product, score }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map((item) => item.product)

    return scored
  }, [debouncedTerm, products, maxResults, minChars])

  const isSearching = searchTerm !== debouncedTerm

  return { results, isSearching }
}

export default useSearchProducts
