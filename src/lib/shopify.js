// Shopify Storefront API Configuration
const SHOPIFY_STORE_DOMAIN = 'kushie-hemp.myshopify.com'
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '35c2846ca038e01dbc5bed5957e72c0e'
const API_VERSION = '2024-10'

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await response.json()

  if (json.errors) {
    console.error('Shopify API errors:', json.errors)
    throw new Error(json.errors[0]?.message || 'Shopify API error')
  }

  return json.data
}

// Color palette for product icons (cycles through these)
const ICON_COLORS = [
  '#3b82f6', '#8b5cf6', '#f97316', '#22c55e', '#eab308',
  '#ec4899', '#14b8a6', '#64748b', '#f43f5e', '#06b6d4',
]

function formatProduct(node, index) {
  const variant = node.variants?.edges?.[0]?.node
  const image = node.images?.edges?.[0]?.node

  return {
    id: node.id,
    handle: node.handle,
    name: node.title,
    description: node.description,
    icon: node.title?.charAt(0)?.toUpperCase() || '?',
    color: ICON_COLORS[index % ICON_COLORS.length],
    price: variant ? parseFloat(variant.price?.amount || 0) : 0,
    compareAtPrice: variant?.compareAtPrice
      ? parseFloat(variant.compareAtPrice.amount)
      : null,
    currencyCode: variant?.price?.currencyCode || 'USD',
    inStock: node.availableForSale,
    image: image?.url || null,
    imageAlt: image?.altText || node.title,
    productType: node.productType || '',
    tags: node.tags || [],
    vendor: node.vendor || '',
    shopifyUrl: node.onlineStoreUrl || `https://${SHOPIFY_STORE_DOMAIN}/products/${node.handle}`,
  }
}

// Fetch all products
export async function fetchAllProducts(first = 50) {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            tags
            vendor
            availableForSale
            onlineStoreUrl
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query, { first })
  return data.products.edges.map((edge, index) => formatProduct(edge.node, index))
}

// Fetch products by collection/type
export async function fetchProductsByType(productType, first = 20) {
  const query = `
    query GetProductsByType($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            tags
            vendor
            availableForSale
            onlineStoreUrl
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query, {
    query: `product_type:${productType}`,
    first,
  })
  return data.products.edges.map((edge, index) => formatProduct(edge.node, index))
}

// Fetch collections
export async function fetchCollections(first = 20) {
  const query = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
            products(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query, { first })
  return data.collections.edges.map((edge) => ({
    id: edge.node.id,
    name: edge.node.title,
    handle: edge.node.handle,
    description: edge.node.description,
    image: edge.node.image?.url || null,
    productCount: edge.node.products?.edges?.length || 0,
  }))
}

// Fetch products from a specific collection
export async function fetchCollectionProducts(handle, first = 50) {
  const query = `
    query GetCollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              productType
              tags
              vendor
              availableForSale
              onlineStoreUrl
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query, { handle, first })
  if (!data.collection) return []
  return data.collection.products.edges.map((edge, index) =>
    formatProduct(edge.node, index)
  )
}
