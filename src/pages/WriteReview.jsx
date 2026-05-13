import React, { useState } from 'react'
import { Star, CheckCircle, Loader2, ArrowLeft } from 'lucide-react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import LoginModal from '../component/auth/LoginModal'
import SignupModal from '../component/auth/SignupModal'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { submitTestimonial } from '../api/api/testimonialApi'

export default function WriteReview() {
  const { user } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
      resultImprovement: 5
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleOverallRating = (rating) => {
    setFormData(prev => ({ ...prev, overallRating: rating }))
  }

  const handleDetailedRating = (category, rating) => {
    setFormData(prev => ({
      ...prev,
      detailedRatings: {
        ...prev.detailedRatings,
        [category]: rating
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setIsLoginModalOpen(true)
      return
    }

    if (!formData.studentName.trim() || !formData.parentName.trim() || !formData.email.trim() || !formData.review.trim()) {
      toast.error('Please fill in all required fields.')
      return
    }

    setSubmitting(true)

    try {
      // Submit review to backend with PENDING status
      const reviewData = {
        name: formData.studentName,
        reviewerName: formData.studentName,
        text: formData.review,
        message: formData.review,
        rating: formData.overallRating,
        role: `${formData.grade} - ${user?.email || 'Student'}`,
        category: formData.grade,
        email: formData.email,
        parentName: formData.parentName,
        type: 'text',
        status: 'PENDING',
        detailedRatings: formData.detailedRatings
      }

      await submitTestimonial(reviewData)
      setSubmitting(false)
      setSubmitted(true)
      toast.success('✅ Thank you! Your review has been submitted and will appear after admin approval.')
    } catch (error) {
      console.error('Error submitting review:', error)
      setSubmitting(false)
      toast.error('Failed to submit review. Please try again.')
    }
  }

  const StarInput = ({ value, onChange, size = 28 }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            size={size}
            className={star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}
          />
        </button>
      ))}
    </div>
  )

  const RatingRow = ({ label, category, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-700 mb-2 sm:mb-0">{label}</span>
      <StarInput
        value={value}
        onChange={(rating) => handleDetailedRating(category, rating)}
        size={24}
      />
    </div>
  )

  if (submitted) {
    return (
      <div className="w-full min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Review Submitted Successfully!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8">
            Thank you for sharing your experience. Your review has been submitted and will be published after admin approval.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reviews"
              className="px-6 sm:px-8 py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition"
            >
              View All Reviews
            </a>
            <a
              href="/"
              className="px-6 sm:px-8 py-3 border-2 border-blue-900 text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition"
            >
              Back to Home
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />

      <section className="bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 font-semibold mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Reviews
          </a>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
            Write a Review
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Share your experience with iThinkLearn and help other students make informed decisions
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-4 sm:px-8 py-4 sm:py-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Share Your Experience</h2>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Name *</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Grade/Class *</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base"
                    required
                  >
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

              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <label className="block text-sm sm:text-base font-bold text-gray-800 mb-3">Overall Rating *</label>
                <StarInput value={formData.overallRating} onChange={handleOverallRating} size={36} />
              </div>

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

              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Review Paragraph *</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-3 sm:px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm sm:text-base resize-none"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 sm:px-8 py-3 rounded-lg font-bold text-white bg-blue-900 hover:bg-blue-800 transition disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin inline mr-2" /> : 'Submit Review'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onOpenSignup={() => { setIsLoginModalOpen(false); setIsSignupModalOpen(true) }} />
      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} onOpenLogin={() => { setIsSignupModalOpen(false); setIsLoginModalOpen(true) }} />
    </div>
  )
}
