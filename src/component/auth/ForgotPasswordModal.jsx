import React, { useState, useEffect, useRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { authApi } from '../../api/authApi'
import toast from 'react-hot-toast'

const OTP_DURATION = 300

export default function ForgotPasswordModal({ isOpen, onClose, onOpenLogin }) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [otpError, setOtpError] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordErrors, setPasswordErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [timeLeft, setTimeLeft] = useState(OTP_DURATION)
  const [otpExpired, setOtpExpired] = useState(false)
  const timerRef = useRef(null)

  const startTimer = () => {
    setTimeLeft(OTP_DURATION)
    setOtpExpired(false)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); setOtpExpired(true); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setEmailError('')
    if (!email.trim()) { setEmailError('Email is required'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('Please enter a valid email address'); return }
    
    setIsLoading(true)
    try {
      await authApi.forgotPassword({ email })
      toast.success('OTP sent to your email!')
      setOtpInput('')
      setOtpError('')
      setStep(2)
      startTimer()
    } catch (apiError) {
      console.error('Forgot password API error:', apiError)
      setEmailError(apiError.response?.data?.message || 'Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setIsLoading(true)
    try {
      await authApi.forgotPassword({ email })
      toast.success('OTP resent to your email!')
      setOtpInput('')
      setOtpError('')
      startTimer()
    } catch (apiError) {
      console.error('Resend OTP API error:', apiError)
      toast.error('Failed to resend OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otpInput.length !== 6) { setOtpError('Please enter the 6-digit OTP'); return }
    if (otpExpired) { setOtpError('OTP has expired. Please click Resend OTP.'); return }
    
    // No separate verify endpoint, just move to next step
    // OTP will be verified when resetting password
    clearInterval(timerRef.current)
    toast.success('Proceeding to reset password')
    setStep(3)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!newPassword) errs.newPassword = 'Password is required'
    else if (newPassword.length < 6) errs.newPassword = 'Password must be at least 6 characters'
    if (!confirmPassword) errs.confirmPassword = 'Please confirm your password'
    else if (newPassword !== confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (Object.keys(errs).length > 0) { setPasswordErrors(errs); return }
    
    setIsLoading(true)
    try {
      // Backend will verify OTP and reset password in one call
      await authApi.resetPassword({ 
        email, 
        otp: otpInput,
        newPassword
      })
      toast.success('Password reset successful!')
      setStep(4)
    } catch (apiError) {
      console.error('Reset password API error:', apiError)
      const errorMsg = apiError.response?.data?.message || 'Failed to reset password. Please try again.'
      // If OTP is invalid, show error on OTP field and go back to step 2
      if (errorMsg.toLowerCase().includes('otp') || errorMsg.toLowerCase().includes('invalid') || errorMsg.toLowerCase().includes('expired')) {
        setStep(2)
        setOtpError(errorMsg)
        toast.error('Invalid or expired OTP')
      } else {
        setPasswordErrors({ newPassword: errorMsg })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    clearInterval(timerRef.current)
    setStep(1); setEmail(''); setEmailError(''); setOtpInput(''); setOtpError('')
    setNewPassword(''); setConfirmPassword(''); setPasswordErrors({})
    setIsLoading(false); setOtpExpired(false)
    onClose()
  }

  if (!isOpen) return null

  const stepTitles = { 1: 'Forgot Password', 2: 'Verify OTP', 3: 'Reset Password', 4: 'Success!' }
  const stepSubtitles = {
    1: 'Enter your registered email to receive OTP',
    2: `OTP sent to ${email}`,
    3: 'Create your new password',
    4: 'Your password has been reset successfully'
  }

  const btnClass = 'w-full py-3 rounded-xl font-bold text-base bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
  const inputClass = (err) => `w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${err ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-900'}`
  const labelClass = 'block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide'

  return (
    <div className="fixed inset-0 bg-blue-950/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="relative bg-blue-900 px-6 pt-8 pb-6 sticky top-0 z-10">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400" />
          {/* Step progress bar */}
          {step < 4 && (
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-yellow-400' : 'bg-white/20'}`} />
              ))}
            </div>
          )}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">{stepTitles[step]}</h2>
              <p className="text-blue-300 mt-1 text-sm">{stepSubtitles[step]}</p>
            </div>
            <button onClick={handleClose} className="text-blue-300 hover:text-white text-2xl font-bold transition leading-none mt-0.5">×</button>
          </div>
        </div>

        <div className="px-6 py-6">

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} noValidate>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-900 rounded-r-xl p-4">
                  <p className="text-sm text-gray-700">We'll send a 6-digit OTP to your registered email.</p>
                  <p className="text-xs text-orange-600 font-semibold mt-1">⚠️ OTP is valid for 5 minutes only.</p>
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setEmailError('') }}
                    className={inputClass(emailError)}
                    placeholder="Enter your registered email"
                    disabled={isLoading}
                  />
                  {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                </div>
                <button type="submit" disabled={isLoading} className={btnClass}>
                  {isLoading
                    ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />Sending OTP...</span>
                    : 'Send OTP →'}
                </button>
                <div className="text-center pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Remember your password?{' '}
                    <button type="button" onClick={() => { handleClose(); onOpenLogin() }} className="font-bold text-blue-900 hover:text-blue-700 hover:underline transition">Back to Login</button>
                  </p>
                </div>
              </div>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} noValidate>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-900 rounded-r-xl p-4">
                  <p className="text-sm text-gray-700">OTP sent to <strong className="text-blue-900">{email}</strong>.</p>
                  <p className="text-xs text-orange-600 font-semibold mt-1">⚠️ This OTP is valid for 5 minutes only.</p>
                </div>

                {/* Timer */}
                <div className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-base border-2 ${
                  otpExpired
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : timeLeft <= 60
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-300'
                    : 'bg-blue-900 text-white border-blue-900'
                }`}>
                  <span>⏱</span>
                  {otpExpired
                    ? <span>OTP Expired — Please resend</span>
                    : <span>Expires in: <span className="font-black tabular-nums">{formatTime(timeLeft)}</span></span>
                  }
                </div>

                <div>
                  <label className={labelClass}>Enter OTP</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpInput}
                    onChange={e => { setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6)); setOtpError('') }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-center text-2xl font-black tracking-[0.5em] text-blue-900 bg-gray-50 focus:bg-white ${otpError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-900'}`}
                    placeholder="------"
                    disabled={otpExpired}
                  />
                  {otpError && <p className="text-xs text-red-500 mt-1 text-center font-medium">{otpError}</p>}
                </div>

                <div className="text-center">
                  <button type="button" onClick={handleResendOtp} disabled={isLoading} className="text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline disabled:opacity-50 transition">
                    {isLoading ? 'Sending...' : "Didn't receive code? Resend OTP"}
                  </button>
                </div>

                <button type="submit" disabled={isLoading || otpInput.length !== 6 || otpExpired} className={btnClass}>
                  {isLoading
                    ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />Verifying...</span>
                    : 'Verify OTP →'}
                </button>

                <button type="button" onClick={() => { clearInterval(timerRef.current); setStep(1); setOtpInput(''); setOtpError('') }} className="w-full py-2 text-sm font-semibold text-gray-500 hover:text-blue-900 transition">
                  ← Change Email
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} noValidate>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-yellow-400 rounded-r-xl p-4 flex items-center gap-3">
                  <span className="text-yellow-500 text-xl shrink-0">✓</span>
                  <p className="text-sm text-gray-700 font-semibold">OTP Verified! Set your new password below.</p>
                </div>

                <div>
                  <label className={labelClass}>New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => { setNewPassword(e.target.value); setPasswordErrors(p => ({ ...p, newPassword: '' })) }}
                      className={inputClass(passwordErrors.newPassword) + ' pr-12'}
                      placeholder="Enter new password"
                      disabled={isLoading}
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 transition" tabIndex={-1}>
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {passwordErrors.newPassword
                    ? <p className="text-xs text-red-500 mt-1">{passwordErrors.newPassword}</p>
                    : <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
                  }
                </div>

                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => { setConfirmPassword(e.target.value); setPasswordErrors(p => ({ ...p, confirmPassword: '' })) }}
                      className={inputClass(passwordErrors.confirmPassword) + ' pr-12'}
                      placeholder="Confirm new password"
                      disabled={isLoading}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 transition" tabIndex={-1}>
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && <p className="text-xs text-red-500 mt-1">{passwordErrors.confirmPassword}</p>}
                </div>

                <button type="submit" disabled={isLoading} className={btnClass}>
                  {isLoading
                    ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />Resetting...</span>
                    : 'Reset Password'}
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="space-y-5 text-center py-4">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-yellow-400 text-4xl font-black">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-blue-900">Password Reset!</h3>
                  <p className="text-gray-500 text-sm mt-1">You can now login with your new password.</p>
                </div>
              </div>
              <button type="button" onClick={() => { handleClose(); onOpenLogin() }} className={btnClass}>
                Go to Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
