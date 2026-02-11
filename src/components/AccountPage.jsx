import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../lib/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

function AccountPage({ onNavigateBack }) {
  const { user, logOut } = useAuth()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    if (!user) return

    const ordersRef = collection(db, 'users', user.uid, 'orders')
    const q = query(ordersRef, orderBy('createdAt', 'desc'))

    const unsub = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setOrders(orderList)
      setLoadingOrders(false)
    })

    return unsub
  }, [user])

  const handleSignOut = async () => {
    await logOut()
    onNavigateBack()
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const truncateName = (name) => {
    if (!name) return 'Product'
    const words = name.split(' ')
    if (words.length <= 5) return name
    return words.slice(0, 5).join(' ') + '...'
  }

  if (!user) return null

  const initials = (user.displayName || user.email || '?').charAt(0).toUpperCase()

  return (
    <div className="main-container">
      <div className="main-header">
        <a href="#" className="menu-link-main" onClick={(e) => { e.preventDefault(); onNavigateBack() }}>
          Kushie Hemp Store
        </a>
      </div>

      <div className="content-wrapper">
        {/* Back Button */}
        <button className="product-detail-back" onClick={onNavigateBack} style={{ marginBottom: '20px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </button>

        {/* Profile Card */}
        <div className="account-profile-card">
          <div className="account-avatar">{initials}</div>
          <div className="account-info">
            <div className="account-name">{user.displayName || 'Kushie Customer'}</div>
            <div className="account-email">{user.email}</div>
          </div>
          <button
            className="content-button status-button open"
            onClick={handleSignOut}
            style={{ marginLeft: 'auto', padding: '8px 20px', fontSize: '13px', borderRadius: '20px' }}
          >
            Sign Out
          </button>
        </div>

        {/* Order History */}
        <div className="content-section" style={{ marginTop: '30px' }}>
          <div className="content-section-title">
            Order History
            <span style={{ fontSize: '12px', opacity: 0.5, marginLeft: '10px', fontWeight: 'normal' }}>
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>

          {loadingOrders && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', opacity: 0.5 }}>
              <div className="loading-spinner" />
            </div>
          )}

          {!loadingOrders && orders.length === 0 && (
            <div className="account-empty-orders">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', opacity: 0.3, marginBottom: '12px' }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
              <p style={{ color: 'var(--inactive-color)', fontSize: '14px', margin: 0 }}>
                No orders yet. Start shopping to see your order history here!
              </p>
              <button
                className="content-button"
                onClick={onNavigateBack}
                style={{ marginTop: '16px', fontSize: '13px', padding: '8px 24px' }}
              >
                Shop Now
              </button>
            </div>
          )}

          {!loadingOrders && orders.map((order) => (
            <div
              key={order.id}
              className="order-card"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="order-header">
                <div>
                  <div className="order-date">{formatDate(order.createdAt)}</div>
                  <div className="order-items-count">
                    {order.itemCount || order.items?.length || 0} {(order.itemCount || order.items?.length || 0) === 1 ? 'item' : 'items'}
                  </div>
                </div>
                <div className="order-total">${(order.total || 0).toFixed(2)}</div>
              </div>

              {expandedOrder === order.id && order.items && (
                <div className="order-items-list">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="order-item-image" />
                      ) : (
                        <div className="order-item-placeholder">
                          {(item.name || '?').charAt(0)}
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', color: 'var(--theme-color)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {truncateName(item.name)}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--inactive-color)' }}>
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#16a34a', whiteSpace: 'nowrap' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AccountPage
