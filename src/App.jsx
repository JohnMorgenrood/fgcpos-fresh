import { useState, useEffect } from 'react'
import './App.css'

// Mock data for demonstration
const mockMenuItems = [
  { id: 1, name: 'Flame-Grilled Chicken Burger', price: 89.00, category: 'Burgers', emoji: '🍔', description: 'Juicy flame-grilled chicken with fresh salad' },
  { id: 2, name: 'Beef Burger Deluxe', price: 95.00, category: 'Burgers', emoji: '🍔', description: 'Premium beef patty with cheese and bacon' },
  { id: 3, name: 'Truffle Hand-Cut Chips', price: 35.00, category: 'Sides', emoji: '🍟', description: 'Hand-cut chips with truffle seasoning' },
  { id: 4, name: 'Chocolate Milkshake', price: 45.00, category: 'Drinks', emoji: '🥤', description: 'Rich chocolate milkshake with whipped cream' },
  { id: 5, name: 'Grilled Chicken Salad', price: 75.00, category: 'Salads', emoji: '🥗', description: 'Fresh greens with grilled chicken breast' },
  { id: 6, name: 'Fish & Chips', price: 85.00, category: 'Mains', emoji: '🍤', description: 'Beer-battered fish with golden chips' },
]

const mockOrders = [
  { id: 1, items: [{ name: 'Flame-Grilled Chicken Burger', qty: 1, price: 89.00 }], total: 89.00, status: 'preparing', time: '2 min ago' },
  { id: 2, items: [{ name: 'Beef Burger Deluxe', qty: 2, price: 95.00 }], total: 190.00, status: 'ready', time: '5 min ago' },
]

function App() {
  const [currentView, setCurrentView] = useState('login') // login, pos, orders, menu, settings
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Burgers', 'Sides', 'Drinks', 'Salads', 'Mains']

  const filteredItems = mockMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id)
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
      return
    }
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const completeOrder = () => {
    if (cart.length === 0) return
    
    const newOrder = {
      id: orders.length + 1,
      items: cart.map(item => ({ name: item.name, qty: item.quantity, price: item.price })),
      total: getCartTotal(),
      status: 'preparing',
      time: 'Just now'
    }
    
    setOrders(prev => [newOrder, ...prev])
    setCart([])
    alert('Order placed successfully!')
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-red-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-slide-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔥</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Flame Grilled Cafe</h1>
            <p className="text-gray-600">Modern POS System</p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => setCurrentView('pos')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🍔 Start POS System
            </button>
            
            <button 
              onClick={() => setCurrentView('orders')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              📋 View Orders
            </button>
            
            <button 
              onClick={() => setCurrentView('menu')}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              📚 Manage Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🔥</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Flame Grilled Cafe</h1>
                <p className="text-sm text-gray-500 capitalize">{currentView} System</p>
              </div>
            </div>
            
            <nav className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('pos')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'pos' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                POS
              </button>
              <button 
                onClick={() => setCurrentView('orders')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'orders' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Orders
              </button>
              <button 
                onClick={() => setCurrentView('menu')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'menu' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Menu
              </button>
              <button 
                onClick={() => setCurrentView('login')}
                className="px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* POS System */}
      {currentView === 'pos' && (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => addToCart(item)}>
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-600">R{item.price.toFixed(2)}</span>
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Order</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🛒</div>
                <p className="text-gray-500">No items in cart</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">R{item.price.toFixed(2)} each</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span className="text-orange-600">R{getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <button 
                    onClick={completeOrder}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Complete Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Orders View */}
      {currentView === 'orders' && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'preparing' ? 'bg-orange-100 text-orange-800' : 
                        order.status === 'ready' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'preparing' ? '🔥 Preparing' : 
                         order.status === 'ready' ? '✅ Ready' : order.status}
                      </span>
                      <span className="font-bold text-orange-600">R{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.qty}x {item.name}</span>
                        <span>R{(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Menu Management */}
      {currentView === 'menu' && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200">
                Add New Item
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMenuItems.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-orange-600">R{item.price.toFixed(2)}</span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{item.category}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
