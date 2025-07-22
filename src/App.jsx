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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-rose-900/20 to-orange-900/20"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl animate-spin duration-20000"></div>
        
        <div className="relative z-10 w-full max-w-md mx-auto">
          {/* Glass morphism container */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden group hover:bg-white/15 transition-all duration-500">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-purple-500/10 rounded-3xl"></div>
            
            <div className="relative z-10">
              {/* Logo section with enhanced animation */}
              <div className="text-center mb-10">
                <div className="relative inline-block">
                  <div className="text-8xl mb-6 animate-bounce relative">
                    🔥
                    <div className="absolute inset-0 text-8xl animate-pulse text-orange-400/50 blur-sm">🔥</div>
                  </div>
                </div>
                
                <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400 bg-clip-text text-transparent mb-4 tracking-tight">
                  Flame Grilled
                </h1>
                <h2 className="text-3xl font-light text-white/90 mb-4 tracking-wide">
                  CAFE
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-rose-400 mx-auto rounded-full mb-4"></div>
                <p className="text-white/70 text-lg font-light">Experience premium dining at your fingertips</p>
              </div>
              
              {/* Action buttons with premium styling */}
              <div className="space-y-4">
                <button 
                  onClick={() => setUserRole('customer')}
                  className="group relative w-full bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 text-white font-bold py-6 px-8 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center justify-center space-x-4">
                    <span className="text-3xl animate-pulse">📱</span>
                    <div className="text-left">
                      <div className="text-xl font-black tracking-wide">ORDER FOOD</div>
                      <div className="text-sm font-light opacity-90">Browse menu & place order</div>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setUserRole('admin')}
                  className="group relative w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white font-bold py-6 px-8 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center justify-center space-x-4">
                    <span className="text-3xl">👨‍💼</span>
                    <div className="text-left">
                      <div className="text-xl font-black tracking-wide">STAFF LOGIN</div>
                      <div className="text-sm font-light opacity-90">Manage orders & menu</div>
                    </div>
                  </div>
                </button>
              </div>
              
              {/* Enhanced footer */}
              <div className="mt-8 text-center">
                <div className="text-white/50 text-sm font-light">
                  Powered by modern technology
                </div>
                <div className="flex justify-center space-x-4 mt-4 text-white/30">
                  <div className="text-xs">🔒 Secure</div>
                  <div className="text-xs">⚡ Fast</div>
                  <div className="text-xs">📱 Mobile</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Customer App - Ultra-Modern Mobile Design
  if (userRole === 'customer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-rose-50">
        {/* Premium Mobile Header with Glass Morphism */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-xl shadow-orange-500/10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setUserRole(null)}
                  className="group p-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent tracking-tight">
                    🔥 Flame Grilled
                  </h1>
                  <p className="text-sm font-medium text-slate-500 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Ready for delivery
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowCartSlideout(!showCartSlideout)}
                className="group relative p-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-6 h-6 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
                </svg>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-black rounded-full w-7 h-7 flex items-center justify-center animate-bounce shadow-lg">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Ultra-Modern Search Bar */}
        <div className="p-6 bg-gradient-to-r from-white via-orange-50 to-white">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search delicious food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 text-lg font-medium shadow-xl transition-all duration-300 group-hover:shadow-2xl placeholder-slate-400"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Category Pills */}
        <div className="px-6 py-4 bg-gradient-to-r from-white via-rose-50 to-white">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group relative px-8 py-4 rounded-2xl font-bold text-lg whitespace-nowrap transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xl shadow-orange-500/30'
                    : 'bg-white/80 backdrop-blur-xl text-slate-600 hover:bg-gradient-to-r hover:from-orange-100 hover:to-rose-100 border border-white/30'
                }`}
              >
                {/* Glow effect for active category */}
                {selectedCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 rounded-2xl blur-xl opacity-30 -z-10"></div>
                )}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items - Ultra-Premium Cards */}
        <div className="px-6 py-4 pb-32">
          <div className="space-y-6">
            {filteredItems.map(item => (
              <div key={item.id} className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex">
                  <div className="flex-1 p-8">
                    {/* Header with badges */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-2xl font-black text-slate-800 tracking-tight">{item.name}</h3>
                          {item.popular && (
                            <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                              🔥 POPULAR
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-base mb-4 leading-relaxed font-medium">{item.description}</p>
                        
                        {/* Enhanced stats */}
                        <div className="flex items-center space-x-6 text-sm mb-6">
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-full">
                            <span className="text-lg">⭐</span>
                            <span className="font-black text-slate-700">{item.rating}</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-2 rounded-full">
                            <span className="text-lg">⏱️</span>
                            <span className="font-bold text-slate-700">{item.prep_time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                        R{item.price.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="group relative bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-black text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                      >
                        {/* Button glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl"></div>
                        
                        <span className="relative z-10 flex items-center space-x-2">
                          <span>Add to Cart</span>
                          <span className="text-xl transition-transform group-hover:translate-x-1">🛒</span>
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Enhanced food image */}
                  <div className="relative w-40 h-40 bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center overflow-hidden">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-500">
                      {item.emoji}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
