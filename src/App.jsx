import { useState } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔥 Flame Grilled Cafe</h1>
        <h2>Point of Sale System</h2>
      </header>
      
      <main className="app-main">
        {!isLoggedIn ? (
          <div className="login-section">
            <div className="card">
              <h3>Welcome to Flame Grilled Cafe POS</h3>
              <p>Please log in to access the point of sale system</p>
              <button 
                className="login-btn"
                onClick={() => setIsLoggedIn(true)}
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className="pos-dashboard">
            <div className="dashboard-grid">
              <div className="card">
                <h3>📋 Orders</h3>
                <p>Manage customer orders</p>
                <button>View Orders</button>
              </div>
              
              <div className="card">
                <h3>🍔 Menu</h3>
                <p>Manage menu items</p>
                <button>View Menu</button>
              </div>
              
              <div className="card">
                <h3>📊 Reports</h3>
                <p>Sales and analytics</p>
                <button>View Reports</button>
              </div>
              
              <div className="card">
                <h3>⚙️ Settings</h3>
                <p>System configuration</p>
                <button>View Settings</button>
              </div>
            </div>
            
            <div className="logout-section">
              <button 
                className="logout-btn"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>Powered by Supabase & Vercel</p>
      </footer>
    </div>
  )
}

export default App
