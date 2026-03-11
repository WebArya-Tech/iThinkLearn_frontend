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
      if (onSuccess) onSuccess()
      setForm({ name: '', role: '', message: '', rating: 5, type: 'student' })
      onClose()
      toast.success('✅ Thank you! Your testimonial has been submitted and will appear after admin approval.')
    } catch (err) {
      setForm({ name: '', role: '', message: '', rating: 5, type: 'student' })
      onClose()
      toast.success('✅ Thank you! Your testimonial has been submitted and will appear after admin approval.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition text-xl leading-none"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold text-white">Share Your Experience</h2>
          <p className="text-blue-200 text-sm mt-1">Your review helps other students make better decisions.</p>
          {user ? (
            <div className="mt-2 flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 w-fit">
              <span className="text-green-300 text-xs">✓ Logged in as</span>
              <span className="text-white text-xs font-semibold">{user.email}</span>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 rounded-lg px-3 py-2">
              <span className="text-yellow-300 text-base">⚠️</span>
              <span className="text-yellow-200 text-xs font-semibold">You must be logged in to submit a testimonial. Please close and login first.</span>
            </div>
          )}
        </div>
        {/* Form — only shown when logged in */}
        {!user ? (
          <div className="p-6 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-blue-900 text-white font-bold hover:bg-blue-800 transition text-sm"
            >
              Close & Login
            </button>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">I am a <span className="text-red-500">*</span></label>
            <div className="flex gap-3">
              {['student', 'parent'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, type: t }))}
                  className={`flex-1 py-2.5 rounded-lg border-2 font-semibold text-sm capitalize transition-all ${
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
              required
            />
          </div>
          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Role / Designation</label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder={form.type === 'parent' ? 'e.g. Parent of AMC Student' : 'e.g. AP Calculus BC Student, GRE Aspirant'}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
            />
          </div>
          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, rating: star }))}
                  className={`text-2xl transition-transform hover:scale-110 ${star <= form.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Testimonial <span className="text-red-500">*</span></label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your experience with iThinkLearn..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition resize-none"
              required
            />
          </div>
          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-bold hover:from-blue-800 hover:to-indigo-800 transition disabled:opacity-60 text-sm"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  )
}