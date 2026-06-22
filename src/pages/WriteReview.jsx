import React, { useState, useEffect } from 'react'
import { Star, CheckCircle, Loader2, ArrowLeft, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitReview } from '../api/reviewApi'
import { requestUserOTP, verifyUserOTP } from '../api/authApi'
import Header from '../component/Header'
import Footer from '../component/Footer'

export default function WriteReview() {
  const [step, setStep] = useState('form') // 'form' | 'otp' | 'done'
  const [otpValue, setOtpValue] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    grade: '',
    review: '',
    overallRating: 5,
    detailedRatings: {
      teachingQuality: 5,
      personalAttention: 5,
      testSystem: 5,
      overallExperience: 5,
      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 5,
      improvementInConfidence: 5,
      structuredPlanning: 5,
      examOrientedPractice: 5,
      reinforcementClasses: 5,
      overallSatisfaction: 5,
      batchSizeAdvantage: 5,
      individualMonitoring: 5,
      teacherExperience: 5,
      resultImprovement: 5,
    },
  })

  useEffect(() => {
    let interval
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((p) => p - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'studentName' || name === 'parentName') {
      setFormData((p) => ({ ...p, [name]: value.replace(/[^a-zA-Z\s]/g, '') }))
      return
    }
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handleDetailedRating = (category, rating) =>
    setFormData((p) => ({ ...p, detailedRatings: { ...p.detailedRatings, [category]: rating } }))

  const buildPayload = () => ({
    studentName: formData.studentName.trim(),
    parentName: formData.parentName.trim(),
    gradeOrClass: formData.grade,
    reviewText: formData.review.trim(),
    overallRating: Number(formData.overallRating),
    ...Object.fromEntries(
      Object.entries(formData.detailedRatings).map(([k, v]) => [k, Number(v)])
    ),
  })

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleSendOtp = async () => {
    if (!formData.email.trim()) return toast.error('Please enter your email to verify.')
    if (!emailRegex.test(formData.email.trim())) return toast.error('Please enter a valid email address.')
    setOtpLoading(true)
    try {
      await requestUserOTP(formData.email.trim())
      toast.success('OTP sent to ' + formData.email)
      setStep('otp')
      setResendTimer(300)
    } catch (error) {
      toast.error(error?.data?.message || error?.message || 'Failed to send OTP')
    } finally {
      setOtpLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedReview = formData.review.trim()
    if (!formData.studentName.trim() || !formData.parentName.trim() || !formData.grade || trimmedReview.length < 20) {
      toast.error(trimmedReview.length > 0 && trimmedReview.length < 20
        ? 'Review must be at least 20 characters.'
        : 'Please fill in all required fields.')
      return
    }

    if (step === 'form') {
      await handleSendOtp()
      return
    }

    if (step === 'otp') {
      if (!otpValue.trim()) return toast.error('Please enter the OTP sent to your email.')

      setSubmitting(true)
      try {
        // Step 1: verify OTP → stores token in localStorage automatically
        await verifyUserOTP({ email: formData.email.trim(), otp: otpValue.trim() })

        // Step 2: submit review using the stored token
        await submitReview(buildPayload())

        setStep('done')
        toast.success('Thank you! Your review has been submitted and will appear after admin approval.')
      } catch (error) {
        console.error('Submit failed:', error)
        const errMsg = error?.data?.message || error?.message || ''
        const status = error?.status

        if (status === 401) {
          toast.error(errMsg || 'Invalid or expired OTP. Please try again.')
          setStep('form')
          setOtpValue('')
        } else if (status === 400) {
          toast.error(errMsg || 'Validation failed. Please check your input.')
        } else if (status === 403) {
          toast.error(errMsg || 'Submission rejected by server.')
        } else if (errMsg && !errMsg.includes('Failed to fetch') && !errMsg.includes('NetworkError')) {
          toast.error(errMsg)
          setStep('done') // saved offline by submitReview
        } else {
          setStep('done') // saved offline by submitReview
          toast.success('Saved offline. Will sync when server is available.')
        }
      } finally {
        setSubmitting(false)
      }
    }
  }

  const StarInput = ({ value, onChange, size = 28 }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)}
          className="focus:outline-none transition-transform hover:scale-110">
          <Star size={size} className={star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'} />
        </button>
      ))}
    </div>
  )

  const RatingRow = ({ label, category, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-700 mb-2 sm:mb-0">{label}</span>
      <StarInput value={value} onChange={(r) => handleDetailedRating(category, r)} size={24} />
    </div>
  )

  if (step === 'done') {
    return (
      <>
        <Header />
        <div className="w-full min-h-screen bg-white overflow-x-hidden">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">Review Submitted Successfully!</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              Thank you for sharing your experience. Your review will be published after admin approval.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/reviews" className="px-6 sm:px-8 py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition">View All Reviews</a>
              <a href="/" className="px-6 sm:px-8 py-3 border-2 border-blue-900 text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition">Back to Home</a>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden">
        <section className="bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <a href="/reviews" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 font-semibold mb-4 sm:mb-6">
              <ArrowLeft className="w-5 h-5" /> Back to Reviews
            </a>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">Write a Review</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Share your experience and help other students make informed decisions</p>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-4 sm:px-8 py-4 sm:py-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Share Your Experience</h2>
              </div>

              <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">

                {/* OTP Verification Banner */}
                {step === 'otp' && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-blue-900 shrink-0" />
                      <div>
                        <p className="font-bold text-blue-900 text-sm">Verify your email</p>
                        <p className="text-xs text-blue-700">OTP sent to <span className="font-bold">{formData.email}</span></p>
                      </div>
                      <button type="button" onClick={() => { setStep('form'); setOtpValue('') }}
                        className="ml-auto text-xs text-blue-600 hover:underline font-medium">Change</button>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Enter OTP</label>
                      <input
                        type="text"
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:border-blue-900 focus:outline-none text-lg font-bold text-center tracking-[0.3em]"
                        placeholder="000000"
                        maxLength={6}
                        autoFocus
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpLoading || resendTimer > 0}
                      className={`text-xs font-medium transition-colors ${resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-700 hover:underline'}`}
                    >
                      {otpLoading ? 'Sending...' : resendTimer > 0 ? `Resend OTP in ${formatTime(resendTimer)}` : 'Resend OTP'}
                    </button>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name *</label>
                    <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Name *</label>
                    <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email ID *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                      disabled={step === 'otp'}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Grade/Class *</label>
                    <select name="grade" value={formData.grade} onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base" required>
                      <option value="">Select Grade</option>
                      <option value="1-5">Class 1-5</option>
                      <option value="6-8">Class 6-8</option>
                      <option value="9-10">Class 9-10</option>
                      <option value="11-12">Class 11-12</option>
                      <option value="ug">Undergraduate</option>
                      <option value="pg">Postgraduate</option>
                      <option value="competitive">Competitive Exam</option>
                    </select>
                  </div>
                </div>

                {/* Overall Rating */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <label className="block text-sm sm:text-base font-bold text-gray-800 mb-3">Overall Rating *</label>
                  <StarInput value={formData.overallRating} onChange={(r) => setFormData((p) => ({ ...p, overallRating: r }))} size={36} />
                </div>

                {/* Detailed Ratings */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Detailed Ratings</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-blue-50 rounded-lg p-4 sm:p-5">
                      <h4 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">Teaching & Learning</h4>
                      <RatingRow label="Teaching Quality" category="teachingQuality" value={formData.detailedRatings.teachingQuality} />
                      <RatingRow label="Personal Attention" category="personalAttention" value={formData.detailedRatings.personalAttention} />
                      <RatingRow label="Test System" category="testSystem" value={formData.detailedRatings.testSystem} />
                      <RatingRow label="Overall Experience" category="overallExperience" value={formData.detailedRatings.overallExperience} />
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 sm:p-5">
                      <h4 className="font-semibold text-green-900 mb-3 text-sm sm:text-base">Concept & Material</h4>
                      <RatingRow label="Concept Clarity" category="conceptClarity" value={formData.detailedRatings.conceptClarity} />
                      <RatingRow label="Doubt Solving" category="doubtSolving" value={formData.detailedRatings.doubtSolving} />
                      <RatingRow label="Study Material" category="studyMaterial" value={formData.detailedRatings.studyMaterial} />
                      <RatingRow label="Improvement in Confidence" category="improvementInConfidence" value={formData.detailedRatings.improvementInConfidence} />
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 sm:p-5">
                      <h4 className="font-semibold text-purple-900 mb-3 text-sm sm:text-base">Planning & Practice</h4>
                      <RatingRow label="Structured Planning" category="structuredPlanning" value={formData.detailedRatings.structuredPlanning} />
                      <RatingRow label="Exam-Oriented Practice" category="examOrientedPractice" value={formData.detailedRatings.examOrientedPractice} />
                      <RatingRow label="Reinforcement Classes" category="reinforcementClasses" value={formData.detailedRatings.reinforcementClasses} />
                      <RatingRow label="Overall Satisfaction" category="overallSatisfaction" value={formData.detailedRatings.overallSatisfaction} />
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 sm:p-5">
                      <h4 className="font-semibold text-orange-900 mb-3 text-sm sm:text-base">Class & Teacher</h4>
                      <RatingRow label="Batch Size Advantage" category="batchSizeAdvantage" value={formData.detailedRatings.batchSizeAdvantage} />
                      <RatingRow label="Individual Monitoring" category="individualMonitoring" value={formData.detailedRatings.individualMonitoring} />
                      <RatingRow label="Teacher Experience" category="teacherExperience" value={formData.detailedRatings.teacherExperience} />
                      <RatingRow label="Result Improvement" category="resultImprovement" value={formData.detailedRatings.resultImprovement} />
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Review Paragraph * <span className="text-gray-400 font-normal">(minimum 20 characters)</span>
                  </label>
                  <textarea name="review" value={formData.review} onChange={handleInputChange} rows={5}
                    className="w-full px-3 sm:px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base resize-none"
                    required />
                  {formData.review.trim().length > 0 && formData.review.trim().length < 20 && (
                    <p className="text-amber-600 text-xs mt-1 font-medium">{20 - formData.review.trim().length} more characters needed</p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                  <button type="submit" disabled={submitting || otpLoading}
                    className="flex-1 px-6 sm:px-8 py-3 rounded-lg font-bold text-white bg-blue-900 hover:bg-blue-800 transition disabled:opacity-50 text-sm sm:text-base">
                    {(submitting || otpLoading) ? (
                      <><Loader2 className="animate-spin inline mr-2 w-4 h-4" />{step === 'otp' ? 'Verifying & Submitting...' : 'Sending OTP...'}</>
                    ) : (
                      step === 'otp' ? 'Verify OTP & Submit' : 'Submit Review'
                    )}
                  </button>
                </div>

              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
