import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api/authApi'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginModal({ isOpen, onClose, onOpenSignup, onOpenForgotPassword, onOpenAdminLogin }) {
  const { refreshUser } = useAuth()
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!loginData.email || !loginData.password) {
      setError('Email and password are required')
      return
    }

    setIsLoading(true)
    try {
      const response = await authApi.loginWithPassword({
        email: loginData.email,
        password: loginData.password
      })
      
      if (response.data && response.data.token) {
        localStorage.setItem('icfy_token', response.data.token)
        localStorage.setItem('icfy_user', JSON.stringify(response.data.user))
        localStorage.setItem('icfy_role', response.data.user.role || 'student')
        
        console.log('✅ Login successful:', {
          token: response.data.token.substring(0, 20) + '...',
          user: response.data.user,
          role: response.data.user.role || 'student'
        })
        
        toast.success('Login successful!')
        setLoginData({ email: '', password: '' })
        onClose()
        refreshUser()
        
        const isAdmin = response.data.user.role === 'admin'
        const redirectPath = isAdmin ? '/admin-dashboard' : '/student-dashboard'
        console.log('🔄 Redirecting to:', redirectPath)
        navigate(redirectPath)
      } else {
        setError('Invalid response from server')
      }
    } catch (apiError) {
      console.error('Login API error:', apiError)
      setError(apiError.response?.data?.message || 'Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-blue-950/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="relative bg-blue-900 px-6 pt-8 pb-6">
          {/* Decorative accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400" />
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Welcome Back</h2>
              <p className="text-blue-300 mt-1 text-sm">Login to your iThinkLearn account</p>
            </div>
            <button onClick={onClose} className="text-blue-300 hover:text-white text-2xl font-bold transition leading-none mt-0.5">×</button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200">
                <span className="text-red-500 mt-0.5 shrink-0">⚠️</span>
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="login-email" className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                id="login-email"
                required
                value={loginData.email}
                onChange={e => { setLoginData({ ...loginData, email: e.target.value }); setError('') }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-900 transition text-gray-800 text-sm bg-gray-50 focus:bg-white"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  required
                  value={loginData.password}
                  onChange={e => { setLoginData({ ...loginData, password: e.target.value }); setError('') }}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-900 transition text-gray-800 text-sm bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 transition" tabIndex={-1}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => { onClose(); onOpenForgotPassword() }}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline transition"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-base bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />Logging in...</span>
              ) : 'Login'}
            </button>

            <div className="text-center pt-3 border-t border-gray-100 space-y-2">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <button type="button" onClick={() => { onClose(); onOpenSignup() }} className="font-bold text-blue-900 hover:text-blue-700 hover:underline transition">
                  Sign Up
                </button>
              </p>
              <p className="text-xs text-gray-400">
                Administrator?{' '}
                <button type="button" onClick={() => { onClose(); onOpenAdminLogin() }} className="font-bold text-red-600 hover:text-red-700 hover:underline transition">
                  Admin Login
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
