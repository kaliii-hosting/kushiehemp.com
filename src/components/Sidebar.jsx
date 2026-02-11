import { useMemo } from 'react'

// Category icons - realistic hemp/cannabis industry icons
const categoryIcons = {
  // Flower: cannabis leaf with bud
  flower: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-8" />
      <path d="M12 14c-2-3-6-4-8-2 2.5.5 4 2 5 4" />
      <path d="M12 14c2-3 6-4 8-2-2.5.5-4 2-5 4" />
      <path d="M12 10c-1.5-3-5-5-8-4 2 1 3.5 3 4 5" />
      <path d="M12 10c1.5-3 5-5 8-4-2 1-3.5 3-4 5" />
      <path d="M12 7c0-3-1-5.5-1-5.5S12 4 12 7z" />
      <circle cx="12" cy="7" r="2" />
    </svg>
  ),
  // Edibles: gummy bear shape
  edibles: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C9 2 7 4 7 6.5c0 1.5.5 2.5 1 3.5-1.5 1-2.5 3-2.5 5 0 3.5 3 7 6.5 7s6.5-3.5 6.5-7c0-2-1-4-2.5-5 .5-1 1-2 1-3.5C17 4 15 2 12 2z" />
      <circle cx="10" cy="7" r=".8" />
      <circle cx="14" cy="7" r=".8" />
      <path d="M10 10.5c.7.5 1.3.8 2 .8s1.3-.3 2-.8" />
    </svg>
  ),
  // Concentrates: dab tool with drip
  concentrates: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l12 12" />
      <path d="M5 2l2 2" />
      <circle cx="18" cy="15" r="3" />
      <path d="M18 18c0 2-1 4-3 4" />
      <path d="M15 22c-1 0-2-.5-2-2" />
      <path d="M12 15c-1 1-2 3-1.5 4.5" />
    </svg>
  ),
  // Cartridges: 510 vape cart with tank and mouthpiece
  cartridges: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="1" width="6" height="4" rx="1" />
      <rect x="8" y="5" width="8" height="11" rx="1.5" />
      <path d="M10.5 8.5v4" />
      <path d="M13.5 8.5v4" />
      <path d="M10 16l-1 5" />
      <path d="M14 16l1 5" />
      <path d="M9 21h6" />
      <line x1="8" y1="8" x2="16" y2="8" />
    </svg>
  ),
  // Disposables: all-in-one vape pen with vapor
  disposables: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="4" width="6" height="16" rx="3" />
      <path d="M9 8h6" />
      <circle cx="12" cy="16" r="1" />
      <path d="M12 4v-1" />
      <path d="M10 1.5c.5-.5 1-.8 2-.8s1.5.3 2 .8" />
      <path d="M12 20v2" />
    </svg>
  ),
  // Infused Prerolls: joint/preroll with smoke wisps
  'infused prerolls': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21l14-14" />
      <path d="M19 7l1.5-1.5" />
      <path d="M5 21l-1.5 1" />
      <path d="M5 21c-.5 0-1-.5-.5-1" />
      <circle cx="18" cy="8" r="2" />
      <path d="M20 5c.5-1 .3-2.5-.5-3.5" />
      <path d="M22 4c.3-1 0-2.5-1-3" />
      <path d="M7.5 18l5-5" />
    </svg>
  ),
  // Pods: pod cartridge shape
  pods: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10a3 3 0 013 3v8a6 6 0 01-6 6h-4a6 6 0 01-6-6V7a3 3 0 013-3z" />
      <path d="M7 9h10" />
      <path d="M10 4V2" />
      <path d="M14 4V2" />
      <ellipse cx="12" cy="14" rx="3" ry="2.5" />
    </svg>
  ),
  // Batteries: 510 thread battery pen
  batteries: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="18" rx="3" />
      <path d="M12 20v2" />
      <circle cx="12" cy="15" r="1.5" />
      <path d="M9 7h6" />
      <path d="M11 10l2 2" />
      <path d="M13 10l-2 2" />
    </svg>
  ),
}

// Strain icons - leaf shapes representing each strain type
const strainIcons = {
  // Indica: wide, broad cannabis leaf (short & bushy plant)
  indica: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-9" />
      <path d="M12 4c0 4-5 7-9 8 4-1 7 0 9 3" />
      <path d="M12 4c0 4 5 7 9 8-4-1-7 0-9 3" />
      <path d="M12 2c-.5 1-1 2-1 3" />
      <path d="M12 2c.5 1 1 2 1 3" />
      <path d="M7 9c-2 2-4 2-5 2" />
      <path d="M17 9c2 2 4 2 5 2" />
    </svg>
  ),
  // Hybrid: two overlapping leaves (mix of both)
  hybrid: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-7" />
      <path d="M8 4c0 3-3 6-6 7 3-.5 5 1 6 4" />
      <path d="M8 4c0 3 2 5 4 6" />
      <path d="M16 4c0 3 3 6 6 7-3-.5-5 1-6 4" />
      <path d="M16 4c0 3-2 5-4 6" />
      <path d="M8 2v2" />
      <path d="M16 2v2" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  // Sativa: tall, narrow cannabis leaf (tall & thin plant)
  sativa: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-10" />
      <path d="M12 2v2" />
      <path d="M12 4c-1 5-4 6-7 7 3 0 5 1 7 4" />
      <path d="M12 4c1 5 4 6 7 7-3 0-5 1-7 4" />
      <path d="M9 6c-2 1-4 1-6 0" />
      <path d="M15 6c2 1 4 1 6 0" />
      <path d="M7 10c-1.5 1-3 1-4.5.5" />
      <path d="M17 10c1.5 1 3 1 4.5.5" />
    </svg>
  ),
}

// Compound type icons - molecular/chemistry inspired
const compoundIcons = {
  // THCA: diamond crystal (THCA diamonds are a popular form)
  thca: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 7-10 12L2 10z" />
      <path d="M2 10h20" />
      <path d="M6 3l6 7 6-7" />
      <path d="M12 10l-6-7" />
      <path d="M12 10l6-7" />
      <path d="M12 10v12" />
    </svg>
  ),
  // THCP: hexagonal molecule structure
  thcp: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 4v6l-7 4-7-4V7z" />
      <path d="M12 3v6" />
      <path d="M19 7l-7 2" />
      <path d="M5 7l7 2" />
      <circle cx="12" cy="17" r="2" />
      <path d="M12 19v3" />
      <path d="M5 13l-2 1" />
      <path d="M19 13l2 1" />
    </svg>
  ),
}

// Default icon for unknown categories
const defaultIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
  </svg>
)

function Sidebar({ activeCategory, onCategoryChange, products }) {
  // Build categories dynamically from product data
  const { categories, strainFilters, compoundFilters } = useMemo(() => {
    if (!products || products.length === 0) {
      return { categories: [], strainFilters: [], compoundFilters: [] }
    }

    // Build categories from productType field
    const typeMap = {}
    const strainMap = {}
    const compoundMap = {}

    products.forEach((product) => {
      // Count by productType (for main categories)
      const rawType = product.productType || product.category || ''
      if (rawType) {
        const typeLower = rawType.toLowerCase().trim()
        if (!typeMap[typeLower]) {
          typeMap[typeLower] = { name: rawType.trim(), count: 0 }
        }
        typeMap[typeLower].count++
      }

      // Count by strain
      const strain = product.strain || ''
      if (strain) {
        const strainLower = strain.toLowerCase()
        if (!strainMap[strainLower]) {
          strainMap[strainLower] = { name: strain, count: 0 }
        }
        strainMap[strainLower].count++
      }

      // Count by compound type (THCA vs THCP from tags)
      const tags = product.tags || []
      tags.forEach((tag) => {
        const tagLower = tag.toLowerCase().trim()
        if (tagLower === 'thca' || tagLower === 'thcp') {
          if (!compoundMap[tagLower]) {
            compoundMap[tagLower] = { name: tag.toUpperCase(), count: 0 }
          }
          compoundMap[tagLower].count++
        }
      })
    })

    // Convert type map to sorted array
    const cats = Object.entries(typeMap)
      .map(([id, data]) => ({
        id,
        name: data.name,
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count)

    // Build strain filters
    const strains = Object.entries(strainMap)
      .map(([id, data]) => ({
        id: `strain:${id}`,
        name: data.name,
        count: data.count,
        key: id,
      }))
      .sort((a, b) => b.count - a.count)

    // Build compound filters
    const compounds = Object.entries(compoundMap)
      .map(([id, data]) => ({
        id: `compound:${id}`,
        name: data.name,
        count: data.count,
        key: id,
      }))
      .sort((a, b) => b.count - a.count)

    return { categories: cats, strainFilters: strains, compoundFilters: compounds }
  }, [products])

  const handleCategoryClick = (e, categoryId) => {
    e.preventDefault()
    // Toggle: click same category again to deselect (show all)
    if (activeCategory === categoryId) {
      onCategoryChange(null)
    } else {
      onCategoryChange(categoryId)
    }
  }

  return (
    <div className="left-side">
      {/* Product Categories */}
      <div className="side-wrapper">
        <div className="side-title">Categories</div>
        <div className="side-menu">
          {categories.map((category) => (
            <a
              key={category.id}
              href="#"
              className={activeCategory === category.id ? 'active' : ''}
              onClick={(e) => handleCategoryClick(e, category.id)}
            >
              {categoryIcons[category.id] || defaultIcon}
              {category.name}
              <span className="updates">
                {category.count}
              </span>
            </a>
          ))}
          {categories.length === 0 && (
            <span style={{ color: 'var(--inactive-color)', fontSize: '13px', padding: '8px 0' }}>
              Loading...
            </span>
          )}
        </div>
      </div>

      {/* Strain Filters */}
      {strainFilters.length > 0 && (
        <div className="side-wrapper">
          <div className="side-title">Strains</div>
          <div className="side-menu">
            {strainFilters.map((strain) => (
              <a
                key={strain.id}
                href="#"
                className={activeCategory === strain.id ? 'active' : ''}
                onClick={(e) => handleCategoryClick(e, strain.id)}
              >
                {strainIcons[strain.key] || defaultIcon}
                {strain.name}
                <span className="updates">
                  {strain.count}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Compound Type Filters */}
      {compoundFilters.length > 0 && (
        <div className="side-wrapper">
          <div className="side-title">Compound</div>
          <div className="side-menu">
            {compoundFilters.map((compound) => (
              <a
                key={compound.id}
                href="#"
                className={activeCategory === compound.id ? 'active' : ''}
                onClick={(e) => handleCategoryClick(e, compound.id)}
              >
                {compoundIcons[compound.key] || defaultIcon}
                {compound.name}
                <span className="updates">
                  {compound.count}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Support */}
      <div className="side-wrapper">
        <div className="side-title">Support</div>
        <div className="side-menu">
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
            </svg>
            FAQs
          </a>
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            Lab Results
          </a>
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
