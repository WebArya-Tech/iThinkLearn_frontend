import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const ADMIN_CREDENTIALS = {
  email: 'ithinklearn@ixpoe.com',
  password: 'Admin@123'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('auth_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [isLoading] = useState(false)

  // Sync login/logout state across browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'auth_user') {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null)
        } catch {
          setUser(null)
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const isAdmin = !!(user && user.role === 'admin')

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' }
    }
    // Admin credentials check
    if (
      email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const adminData = {
        email: ADMIN_CREDENTIALS.email,
        name: 'Admin',
        fullName: 'Administrator',
        role: 'admin',
        adminId: 'ADMIN001'
      }
      setUser(adminData)
      localStorage.setItem('auth_user', JSON.stringify(adminData))
      return { success: true, isAdmin: true }
    }
    // Regular user
    const userData = { email, name: email.split('@')[0] }
    setUser(userData)
    localStorage.setItem('auth_user', JSON.stringify(userData))
    return { success: true, isAdmin: false }
  }

  const signup = (fullName, email, phone, password) => {
    if (!fullName || !email || !password) {
      return { success: false, message: 'All fields are required' }
    }
    const userData = { email, name: fullName, fullName, phone }
    setUser(userData)
    localStorage.setItem('auth_user', JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
