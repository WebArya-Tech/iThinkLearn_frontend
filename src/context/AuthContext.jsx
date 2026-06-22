import React, { createContext, useContext, useState, useEffect } from 'react'
import { requestUserOTP, verifyUserOTP, authApi, adminAuthApi } from '../api/authApi'

const AuthContext = createContext(null)

const ADMIN_EMAIL = 'ithinklearn@gmail.com'

const USERS_KEY = 'ithinklearn_users'

const getStoredUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
}

const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users))

// Initialize test user account if it doesn't exist
const initializeTestUsers = () => {
  const users = getStoredUsers()
  const testUserExists = users.some(u => u.email.toLowerCase() === 'kumuyadav249@gmail.com')
  
  if (!testUserExists) {
    const testUser = {
      fullName: 'Test Student',
      email: 'kumuyadav249@gmail.com',
      phone: '9876543210',
      password: 'Sudha@123'
    }
    saveUsers([...users, testUser])
  }
}

// In-memory OTP store: { [email]: { otp, expiresAt } }
const otpStore = {}

export const generateOtp = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }
  return otp
}

export const verifyOtp = (email, inputOtp) => {
  const record = otpStore[email]
  if (!record) return { valid: false, message: 'No OTP found. Please request a new one.' }
  if (Date.now() > record.expiresAt) {
    delete otpStore[email]
    return { valid: false, message: 'OTP has expired. Please request a new one.' }
  }
  if (record.otp !== inputOtp) return { valid: false, message: 'Invalid OTP. Please try again.' }
  delete otpStore[email]
  return { valid: true }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('auth_user') || localStorage.getItem('icfy_user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  useEffect(() => {
    // Initialize test users on first load
    initializeTestUsers()
    
    const handleStorageChange = (e) => {
      if (e.key === 'auth_user' || e.key === 'icfy_user') {
        try { setUser(e.newValue ? JSON.parse(e.newValue) : null) } catch { setUser(null) }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const isAdmin = !!(user && user.role === 'admin')

  const login = async (email, password) => {
    if (!email || !password) return { success: false, message: 'Email and password are required' }

    // Admin check — call real backend login
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      try {
        const res = await adminAuthApi.login({ email, password })
        const data = res.data
        const token = data.token || data.accessToken
        const loginTime = new Date().toISOString()
        const adminData = {
          email: data.email || ADMIN_EMAIL,
          name: data.name || 'Admin',
          fullName: data.fullName || 'Administrator',
          role: 'admin',
          adminId: data.id || data.adminId || 'ADMIN001',
          lastLogin: loginTime
        }
        if (token) {
          localStorage.setItem('icfy_token', token)
          localStorage.setItem('icfy_role', 'admin')
        }
        localStorage.setItem('admin_last_login', loginTime)
        setUser(adminData)
        localStorage.setItem('auth_user', JSON.stringify(adminData))
        return { success: true, isAdmin: true }
      } catch (err) {
        return { success: false, message: err?.message || err?.error || 'Invalid credentials' }
      }
    }

    // Regular user — must match stored credentials
    const users = getStoredUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!found) return { success: false, message: 'Invalid email or password' }
    if (found.password !== password) return { success: false, message: 'Invalid email or password' }

    const userData = { email: found.email, name: found.fullName, fullName: found.fullName, phone: found.phone }
    setUser(userData)
    localStorage.setItem('auth_user', JSON.stringify(userData))
    return { success: true, isAdmin: false }
  }

  const signup = (fullName, email, phone, password) => {
    if (!fullName || !email || !password) return { success: false, message: 'All fields are required' }
    const users = getStoredUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'An account with this email already exists' }
    }
    const newUser = { fullName, email, phone, password }
    saveUsers([...users, newUser])
    const userData = { email, name: fullName, fullName, phone }
    setUser(userData)
    localStorage.setItem('auth_user', JSON.stringify(userData))
    return { success: true }
  }

  const requestOtp = async (email, isResend = false) => {
    try {
      const result = await requestUserOTP(email, isResend)
      return { success: true, message: result.message || 'OTP sent successfully' }
    } catch (error) {
      return { success: false, message: error?.message || 'Failed to send OTP' }
    }
  }

  const verifySignupOtp = async (email, otp, name, mobile) => {
    try {
      const result = await verifyUserOTP({ email, otp, name, mobile })
      if (!result.token) {
        return { success: false, message: result.message || 'Invalid OTP' }
      }

      const studentUser = {
        id: result.user?.id || result.user?._id || 'student-id',
        name: result.user?.name || result.user?.fullName || name,
        fullName: result.user?.name || result.user?.fullName || name,
        email: result.user?.email || email,
        phone: result.user?.mobile || result.user?.phone || mobile,
        role: result.user?.role || 'student'
      }

      setUser(studentUser)
      localStorage.setItem('auth_user', JSON.stringify(studentUser))
      localStorage.setItem('icfy_user', JSON.stringify(studentUser))
      localStorage.setItem('icfy_role', 'student')
      return { success: true, isAdmin: false }
    } catch (error) {
      return { success: false, message: error?.message || 'Verification failed' }
    }
  }

  const resetPassword = (email, newPassword) => {
    const users = getStoredUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase())
    if (idx === -1) return { success: false, message: 'No account found with this email' }
    users[idx].password = newPassword
    saveUsers(users)
    return { success: true }
  }

  const refreshUser = async () => {
    const token = localStorage.getItem('icfy_token')
    if (!token) return
    try {
      const res = await authApi.getMyProfile()
      const data = res?.data || res
      const profile = data.user || data
      if (profile) {
        const userData = {
          email: profile.email,
          name: profile.name || profile.fullName,
          fullName: profile.fullName || profile.name,
          role: profile.role || 'student',
          phone: profile.phone || profile.mobile,
        }
        setUser(userData)
        localStorage.setItem('auth_user', JSON.stringify(userData))
      }
    } catch {
      // API unavailable — keep existing user state
    }
  }

  const isEmailRegistered = (email) => {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return true
    return getStoredUsers().some(u => u.email.toLowerCase() === email.toLowerCase())
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('icfy_token')
    localStorage.removeItem('icfy_user')
    localStorage.removeItem('icfy_role')
    adminAuthApi.logout().catch(() => {})
    authApi.logout().catch(() => {})
  }

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated: !!user, isAdmin, isLoading: false,
      login, signup, logout, resetPassword, isEmailRegistered, refreshUser,
      requestOtp, verifyOtp: verifySignupOtp
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
