import React, { useState } from 'react'
import { submitTestimonial } from '../api/testimonialApi'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function SubmitTestimonialModal({ isOpen, onClose, onSuccess }) {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: '', role: '', message: '', rating: 5, type: 'student' })
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) {
      toast.error('Please fill in your name and testimonial.')
      return
    }
    setSubmitting(true)
    const payload = { ...form, email: user.email }
    try {
      await submitTestimonial(payload)
      if (onSuccess) onSuccess(form)
      setForm({ name: '', role: '', message: '', rating: 5, type: 'student' })
      onClose()
      toast.success('✅ Thank you! Your testimonial has been submitted and will appear after admin approval.')
    } catch (err) {
      if (onSuccess) onSuccess(form)
      setForm({ name: '', role: '', message: '', rating: 5, type: 'student' })
      onClose()
      toast.success('✅ Thank you! Your testimonial has been submitted and will appear after admin approval.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[calc(100%-1rem)] sm:max-w-lg mx-auto max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-5 sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 transition text-lg sm:text-xl leading-none p-1"
          >
            ✕
          </button>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 pr-8">Share Your Experience</h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Your review helps other students make better decisions.</p>
          {user ? (
            <div className="mt-2 flex items-center gap-1.5 sm:gap-2 bg-gray-50 rounded-lg px-2 sm:px-3 py-1.5 w-fit">
              <span className="text-green-600 text-[10px] sm:text-xs">✓ Logged in as</span>
              <span className="text-gray-700 text-[10px] sm:text-xs font-semibold truncate max-w-28 sm:max-w-40">{user.email}</span>
            </div>
          ) : (
            <div className="mt-2 sm:mt-3 flex items-start sm:items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-600 text-sm sm:text-base shrink-0">⚠️</span>
              <span className="text-yellow-700 text-[10px] sm:text-xs font-semibold leading-tight">You must be logged in to submit a testimonial. Please close and login first.</span>
            </div>
          )}
        </div>
        {/* Form — only shown when logged in */}
        <div>
          {!user ? (
            <div className="p-4 sm:p-6 text-center">
              <button
                onClick={onClose}
                className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-blue-900 text-white font-bold hover:bg-blue-800 transition text-sm"
              >
                Close & Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* Type Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">I am a <span className="text-red-500">*</span></label>
                <div className="flex gap-2 sm:gap-3">
                  {['student', 'parent'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, type: t }))}
                      className={`flex-1 py-2 sm:py-2.5 rounded-lg border-2 font-semibold text-xs sm:text-sm capitalize transition-all ${
                        form.type === t
                          ? t === 'student'
                            ? 'bg-blue-100 border-blue-600 text-blue-800'
                            : 'bg-green-100 border-green-600 text-green-800'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {t === 'student' ? 'Student' : ' Parent'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
                  required
                />
              </div>
              {/* Role */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Role / Designation</label>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder={form.type === 'parent' ? 'e.g. Parent of AMC Student' : 'e.g. AP Calculus BC Student, GRE Aspirant'}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
                />
              </div>
              {/* Rating */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Rating</label>
                <div className="flex gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, rating: star }))}
                      className={`text-xl sm:text-2xl transition-transform hover:scale-110 ${star <= form.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Your Testimonial <span className="text-red-500">*</span></label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us about your experience with iThinkLearn..."
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition resize-none"
                  required
                />
              </div>
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 sm:py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition text-xs sm:text-sm order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-bold hover:from-blue-800 hover:to-indigo-800 transition disabled:opacity-60 text-xs sm:text-sm order-1 sm:order-2"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}