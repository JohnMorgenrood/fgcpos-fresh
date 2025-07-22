import { useState, useEffect } from 'react'
import './App.css'

// Mock data
const mockMenuItems = [
  { 
    id: 1, 
    name: 'Flame-Grilled Chicken Burger', 
    price: 89.00, 
    category: 'Burgers', 
    emoji: '🍔', 
    description: 'Juicy flame-grilled chicken breast with fresh lettuce, tomato, and our signature sauce',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    popular: true,
    rating: 4.8,
    prep_time: '15-20 min'
  },
  { 
    id: 2, 
    name: 'Beef Burger Deluxe', 
    price: 95.00, 
    category: 'Burgers', 
    emoji: '🍔', 
    description: 'Premium beef patty with cheese, bacon, lettuce, and tomato',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    popular: true,
    rating: 4.9,
    prep_time: '12-18 min'
  },
  { 
    id: 3, 
    name: 'Truffle Hand-Cut Chips', 
    price: 35.00, 
    category: 'Sides', 
    emoji: '🍟', 
    description: 'Hand-cut potato chips with truffle oil and parmesan',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop',
    rating: 4.7,
    prep_time: '8-12 min'
  },
  { 
    id: 4, 
    name: 'Chocolate Milkshake', 
    price: 45.00, 
    category: 'Drinks', 
    emoji: '🥤', 
    description: 'Rich chocolate milkshake with whipped cream and chocolate drizzle',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
    rating: 4.6,
    prep_time: '5-8 min'
  },
  { 
    id: 5, 
    name: 'Grilled Chicken Salad', 
    price: 75.00, 
    category: 'Salads', 
    emoji: '🥗', 
    description: 'Fresh mixed greens with grilled chicken, avocado, and balsamic vinaigrette',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    rating: 4.5,
    prep_time: '10-15 min'
  },
  { 
    id: 6, 
    name: 'Fish & Chips', 
    price: 85.00, 
    category: 'Mains', 
    emoji: '🍤', 
    description: 'Beer-battered fresh fish with golden hand-cut chips',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=300&fit=crop',
    rating: 4.4,
    prep_time: '18-25 min'
  },
]

function App() {
  const [userRole, setUserRole] = useState(null) // null, 'customer', 'admin'
  const [currentView, setCurrentView] = useState('menu') // menu, cart, orders, admin
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showCartSlideout, setShowCartSlideout] = useState(false)

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
    // Show cart briefly when item added
    setShowCartSlideout(true)
    setTimeout(() => setShowCartSlideout(false), 2000)
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => item.id !== itemId))
      return
    }
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Landing Page - Choose Customer or Admin
  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔥</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Flame Grilled Cafe
            </h1>
            <p className="text-gray-600">Choose your access level</p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => setUserRole('customer')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl">📱</span>
                <div className="text-left">
                  <div className="font-bold">Customer</div>
                  <div className="text-sm opacity-90">Browse menu & order</div>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => setUserRole('admin')}
              className="w-full bg-gray-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl">👨‍💼</span>
                <div className="text-left">
                  <div className="font-bold">Admin</div>
                  <div className="text-sm opacity-90">Manage restaurant</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Customer App - Clean Professional Design
  if (userRole === 'customer') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setUserRole(null)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🔥</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Flame Grilled Cafe</h1>
                    <p className="text-sm text-orange-100">Fresh • Fast • Delicious</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowCartSlideout(!showCartSlideout)}
                className="relative p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
                </svg>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="bg-white p-4 shadow-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search delicious food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 pb-24">
          <div className="space-y-4">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
                <div className="flex">
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                          {item.popular && (
                            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              🔥 Popular
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <span>⭐</span>
                            <span className="font-medium">{item.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>⏱️</span>
                            <span>{item.prep_time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">R{item.price.toFixed(2)}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-4xl">
                    {item.emoji}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Slideout */}
        {showCartSlideout && (
          <div className="fixed inset-0 z-50 flex">
            <div 
              className="flex-1 bg-black bg-opacity-50"
              onClick={() => setShowCartSlideout(false)}
            ></div>
            <div className="w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>
                  <button 
                    onClick={() => setShowCartSlideout(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm">Add some delicious items!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4">
                        <div className="text-2xl">{item.emoji}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">R{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-white">
                  <div className="flex justify-between items-center text-2xl font-bold mb-4">
                    <span>Total:</span>
                    <span className="text-orange-600">R{getCartTotal().toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-xl text-lg">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Admin Panel (keeping existing functionality)
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🔥</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Flame Grilled Cafe</p>
              </div>
            </div>
            
            <button 
              onClick={() => setUserRole(null)}
              className="px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">127</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue Today</p>
                <p className="text-3xl font-bold text-green-600">R2,450</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                <p className="text-3xl font-bold text-orange-600">12</p>
              </div>
              <div className="text-4xl">🔥</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Menu Items</p>
                <p className="text-3xl font-bold text-blue-600">{mockMenuItems.length}</p>
              </div>
              <div className="text-4xl">🍔</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMenuItems.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
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
    </div>
  )
}

export default App
