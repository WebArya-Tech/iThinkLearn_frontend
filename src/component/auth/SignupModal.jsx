import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function SignupModal({ isOpen, onClose, onOpenLogin }) {
  const navigate = useNavigate()
  const { requestOtp, verifyOtp } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('form')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    let interval
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(p => p - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setEmail('')
      setPhone('')
      setOtp('')
      setStep('form')
      setErrors({})
      setMessage('')
      setIsSubmitting(false)
      setResendTimer(0)
    }
  }, [isOpen])

  const validateForm = () => {
    const v = {}
    if (!name.trim()) v.name = 'Full name is required'
    else if (name.trim().length < 3) v.name = 'Name must be at least 3 characters'
    if (!email.trim()) v.email = 'Email is required'
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) v.email = 'Enter a valid email'
    if (!phone.trim()) v.phone = 'Mobile number is required'
    else if (phone.trim().length !== 10) v.phone = 'Mobile number must be exactly 10 digits'
    else if (!/^\d{10}$/.test(phone.trim())) v.phone = 'Enter a valid 10-digit number'
    return v
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setMessage('')
    const validationErrors = validateForm()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const result = await requestOtp(email.trim(), false)
      if (!result.success) {
        setErrors({ form: result.message || 'Unable to send OTP' })
        toast.error(result.message || 'Unable to send OTP')
      } else {
        setMessage(result.message || 'OTP sent to your email')
        toast.success('OTP sent successfully!')
        setStep('verify')
        setResendTimer(300)
      }
    } catch (error) {
      setErrors({ form: error?.message || 'Failed to send OTP' })
      toast.error(error?.message || 'Failed to send OTP')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    const v = {}
    if (!otp.trim()) v.otp = 'OTP is required'
    else if (!/^\d{6}$/.test(otp.trim())) v.otp = 'OTP must be a 6-digit number'
    setErrors(v)
    setMessage('')
    if (Object.keys(v).length > 0) return

    setIsSubmitting(true)
    try {
      const result = await verifyOtp(email.trim(), otp.trim(), name.trim(), phone.trim())
      if (!result.success) {
        const msg = result.message || 'OTP verification failed'
        setErrors({ form: msg })
        toast.error(msg)
      } else {
        toast.success('Account created successfully!')
        onClose()
        navigate('/student-dashboard')
      }
    } catch (error) {
      const msg = error?.message || 'Verification failed'
      setErrors({ form: msg })
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendTimer > 0) return
    setErrors({})
    setMessage('')
    setIsSubmitting(true)
    try {
      const result = await requestOtp(email.trim(), true)
      if (!result.success) {
        const msg = result.message || 'Unable to resend OTP'
        setErrors({ form: msg })
        toast.error(msg)
      } else {
        setMessage(result.message || 'OTP resent')
        toast.success('OTP resent!')
        setResendTimer(300)
      }
    } catch (error) {
      setErrors({ form: error?.message || 'Failed to resend OTP' })
      toast.error(error?.message || 'Failed to resend OTP')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-blue-950/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="relative bg-blue-900 px-6 pt-8 pb-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400" />
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Create Account</h2>
              <p className="text-blue-300 mt-1 text-sm">Sign up with OTP verification</p>
            </div>
            <button onClick={onClose} className="text-blue-300 hover:text-white text-2xl font-bold transition leading-none mt-0.5">&times;</button>
          </div>
        </div>

        <div className="px-6 py-6">
          {errors.form && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 mb-4">
              <span className="text-red-500 mt-0.5 shrink-0">&#9888;</span>
              <p className="text-sm text-red-600 font-medium">{errors.form}</p>
            </div>
          )}
          {message && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 border border-green-200 mb-4">
              <span className="text-green-500 mt-0.5 shrink-0">&#10003;</span>
              <p className="text-sm text-green-700 font-medium">{message}</p>
            </div>
          )}

          {step === 'form' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors({}) }}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-900 transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors({}) }}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-900 transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  maxLength={10}
                  onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setErrors({}) }}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-900 transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Enter your 10-digit mobile number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-bold text-base bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />Sending OTP...</span>
                ) : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Verification OTP</label>
                <input
                  type="text"
                  value={otp}
                  maxLength={6}
                  onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setErrors({}) }}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-900 transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${errors.otp ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Enter the 6-digit code"
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1 font-medium">{errors.otp}</p>}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isSubmitting || resendTimer > 0}
                  className={`text-sm font-semibold transition ${resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-700 hover:text-blue-900 hover:underline'}`}
                >
                  {resendTimer > 0 ? `Resend in ${formatTime(resendTimer)}` : 'Resend OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => { setStep('form'); setOtp(''); setMessage(''); setErrors({}) }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Change details
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-bold text-base bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />Verifying...</span>
                ) : 'Verify OTP & Create Account'}
              </button>
            </form>
          )}

          <div className="text-center pt-4 border-t border-gray-100 mt-4">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <button type="button" onClick={() => { onClose(); onOpenLogin() }} className="font-bold text-blue-900 hover:text-blue-700 hover:underline transition">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
