import React, { useState, useRef, useEffect } from 'react'
import { Star } from 'lucide-react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import LoginModal from '../component/auth/LoginModal'
import SignupModal from '../component/auth/SignupModal'
import { useAuth } from '../context/AuthContext'
import { getApprovedTestimonials } from '../api/api/testimonialApi'

const hardcodedReviews = [
  {
    id: 1,
    name: 'Kaustubh Yadav',
    course: 'ICFY Program',
    rating: 5,
    review: 'ICFY has been an incredible learning experience! The teaching quality is exceptional with personalized attention to every student. The test system is comprehensive and helps track progress effectively.',
    date: '2024-12-15',
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
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    course: 'UG Mathematics',
    rating: 5,
    review: 'Excellent teaching methodology! My concepts became crystal clear through ICFY classes. Highly recommended!',
    date: '2024-01-15',
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
  },
  {
    id: 2,
    name: 'Priya Patel',
    course: 'UG Physics',
    rating: 5,
    review: 'The instructors are very supportive and interactive. Great learning experience with practical problem-solving approach.',
    date: '2024-02-10',
    detailedRatings: {
      teachingQuality: 5,
      personalAttention: 5,
      testSystem: 5,
      overallExperience: 5,

      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 4,
      improvementInConfidence: 5,

      structuredPlanning: 5,
      examOrientedPractice: 5,
      reinforcementClasses: 4,
      overallSatisfaction: 5,

      batchSizeAdvantage: 5,
      individualMonitoring: 5,
      teacherExperience: 5,
      resultImprovement: 5
    }
  },
  {
    id: 3,
    name: 'Amit Kumar',
    course: 'UG Chemistry',
    rating: 4,
    review: 'Good quality content and patient teachers. Would appreciate more mock tests, but overall very satisfied.',
    date: '2024-01-20',
    detailedRatings: {
      teachingQuality: 4,
      personalAttention: 4,
      testSystem: 3,
      overallExperience: 4,

      conceptClarity: 5,
      doubtSolving: 4,
      studyMaterial: 4,
      improvementInConfidence: 4,

      structuredPlanning: 4,
      examOrientedPractice: 3,
      reinforcementClasses: 3,
      overallSatisfaction: 4,

      batchSizeAdvantage: 4,
      individualMonitoring: 4,
      teacherExperience: 4,
      resultImprovement: 4
    }
  },
  {
    id: 4,
    name: 'Ananya Singh',
    course: 'GRE',
    rating: 5,
    review: 'ICFY helped me score 330 in GRE! The doubt-clearing sessions were incredibly helpful. Thanks team!',
    date: '2024-02-05',
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
  },
  {
    id: 5,
    name: 'Vikram Singh',
    course: 'GMAT',
    rating: 5,
    review: 'Professional approach, comprehensive study materials, and excellent mentor support. Achieved my target score!',
    date: '2024-01-28',
    detailedRatings: {
      teachingQuality: 5,
      personalAttention: 5,
      testSystem: 5,
      overallExperience: 5,

      conceptClarity: 5,
      doubtSolving: 4,
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
  },
 
  
];

import { getApprovedReviews } from '../api/reviewApi'

export default function Reviews() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState(hardcodedReviews)

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const approved = await getApprovedReviews()
        if (approved && approved.length > 0) {
          setReviews([...approved, ...hardcodedReviews])
        }
      } catch (err) {
        console.error('Failed to load reviews:', err)
      }
    }
    loadReviews()
  }, [])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const reviewsRef = useRef(null)
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    grade: '',
    course: '',
    review: '',
    ratings: {
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
  const [pendingReviews, setPendingReviews] = useState([])
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const filteredReviews = reviews

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  const totalReviews = reviews.length

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const StarRating = ({ rating, size = 16 }) => (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  )

  const RatingInput = ({ label, value, onChange }) => (
    <div className="mb-3 sm:mb-4">
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">{label}</label>
      <div className="flex gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              size={22}
              className={star <= value ? 'fill-yellow-400 text-yellow-400 cursor-pointer' : 'text-gray-300 cursor-pointer hover:text-yellow-200'}
            />
          </button>
        ))}
      </div>
    </div>
  )

  const handleRatingChange = (category, value) => {
    setFormData({
      ...formData,
      ratings: {
        ...formData.ratings,
        [category]: value
      }
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()

    // Calculate overall rating from individual ratings
    const ratingsArray = Object.values(formData.ratings)
    const overallRating = Math.round(ratingsArray.reduce((sum, r) => sum + r, 0) / ratingsArray.length)

    const newReview = {
      id: Date.now(),
      studentName: formData.studentName,
      parentName: formData.parentName,
      email: formData.email || user?.email || '',
      grade: formData.grade,
      course: formData.course,
      rating: overallRating,
      review: formData.review,
      date: new Date().toISOString(),
      detailedRatings: formData.ratings,
      status: 'pending'
    }

    // Add to pending reviews for admin approval
    setPendingReviews([newReview, ...pendingReviews])
    setSubmitSuccess(true)
    setShowReviewForm(false)
    setFormData({
      studentName: '',
      parentName: '',
      email: '',
      grade: '',
      course: '',
      review: '',
      ratings: {
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

    // Show success message for 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (
    <div className="w-full bg-white">
      <Header />
      {/* Hero Section */}
      <section className="py-10 sm:py-12 md:py-16 px-3 sm:px-4 md:px-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-blue-900">
            Student Reviews
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0">
            Hear what our students have to say about their learning experience with iThinkLearn
          </p>
          
          {/* Rating Stats & Write Review */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 bg-gray-50 rounded-xl p-4 sm:p-6 mx-2 sm:mx-0">
            <div className="text-center flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={scrollToReviews}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-white bg-blue-900 hover:bg-blue-800 transition text-sm sm:text-base"
              >
                Explore Reviews
              </button>
              <a
                href="/write-review"
                className="px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-blue-900 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 transition text-sm sm:text-base inline-block text-center"
              >
                Write a Review
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section ref={reviewsRef} className="py-10 sm:py-12 md:py-16 px-3 sm:px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl border-2 border-gray-100 p-4 sm:p-6 hover:shadow-xl hover:border-blue-900 transition flex flex-col"
              >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-800">{review.name}</h3>
                      <p className="text-xs sm:text-sm text-blue-900">
                        {review.course}
                      </p>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    "{review.review}"
                  </p>

                  {/* Detailed Ratings */}
                  {review.detailedRatings && (
                    <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">Detailed Ratings</h4>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Teaching Quality:</span>
                        <StarRating rating={review.detailedRatings.teachingQuality} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Personal Attention:</span>
                        <StarRating rating={review.detailedRatings.personalAttention} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Test System:</span>
                        <StarRating rating={review.detailedRatings.testSystem} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Overall Experience:</span>
                        <StarRating rating={review.detailedRatings.overallExperience} size={12} />
                      </div>

                      <div className="flex justify-between items-center pt-1 mt-1 border-t border-gray-100">
                        <span className="text-[10px] sm:text-xs text-gray-600">Concept Clarity:</span>
                        <StarRating rating={review.detailedRatings.conceptClarity} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Doubt Solving:</span>
                        <StarRating rating={review.detailedRatings.doubtSolving} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Study Material:</span>
                        <StarRating rating={review.detailedRatings.studyMaterial} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Improvement in Confidence:</span>
                        <StarRating rating={review.detailedRatings.improvementInConfidence} size={12} />
                      </div>

                      <div className="flex justify-between items-center pt-1 mt-1 border-t border-gray-100">
                        <span className="text-[10px] sm:text-xs text-gray-600">Structured Planning:</span>
                        <StarRating rating={review.detailedRatings.structuredPlanning} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Exam-Oriented Practice:</span>
                        <StarRating rating={review.detailedRatings.examOrientedPractice} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Reinforcement Classes:</span>
                        <StarRating rating={review.detailedRatings.reinforcementClasses} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Overall Satisfaction:</span>
                        <StarRating rating={review.detailedRatings.overallSatisfaction} size={12} />
                      </div>

                      <div className="flex justify-between items-center pt-1 mt-1 border-t border-gray-100">
                        <span className="text-[10px] sm:text-xs text-gray-600">Batch Size Advantage:</span>
                        <StarRating rating={review.detailedRatings.batchSizeAdvantage} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Individual Monitoring:</span>
                        <StarRating rating={review.detailedRatings.individualMonitoring} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Teacher Experience:</span>
                        <StarRating rating={review.detailedRatings.teacherExperience} size={12} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Result Improvement:</span>
                        <StarRating rating={review.detailedRatings.resultImprovement} size={12} />
                      </div>
                    </div>
                  )}

                  {/* Overall Rating at Bottom */}
                  <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">Overall Rating:</span>
                      <StarRating rating={review.rating} size={16} />
                    </div>
                    {/* Date */}
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Success Message */}
      {submitSuccess && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-lg">✓</span>
            <p className="font-semibold text-sm sm:text-base">Review submitted! Pending admin approval.</p>
          </div>
        </div>
      )}

      {/* Pending Reviews Section */}
      {pendingReviews.length > 0 && (
        <section className="py-8 sm:py-12 px-3 sm:px-4 md:px-8 bg-yellow-50 border-t border-yellow-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold">⏳ Pending Approval</span>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Your Submitted Reviews</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl border-2 border-yellow-300 p-4 sm:p-6 shadow-md"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-800">{review.studentName}</h3>
                      <p className="text-xs sm:text-sm text-blue-900">{review.course}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[10px] sm:text-xs font-semibold">PENDING</span>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed line-clamp-3">
                    "{review.review}"
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">Overall: {review.rating}/5</span>
                    <span className="text-[10px] sm:text-xs text-gray-500">Submitted: {new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6">
              Your reviews will be visible to everyone after admin approval.
            </p>
          </div>
        </section>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900">Write a Review</h2>
                  {user?.email && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-green-600 text-[10px] sm:text-xs">✓ Submitting as</span>
                      <span className="text-blue-900 text-[10px] sm:text-xs font-semibold truncate max-w-32 sm:max-w-48">{user.email}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl font-bold p-1 -mr-1"
                >
                  ×
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitReview} className="p-4 sm:p-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Student Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Student's full name"
                    className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Parent Name *</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Parent's full name"
                    className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Grade/Class *</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm"
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

              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Course/Program *</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="e.g., ICFY Program, UG Mathematics, GRE, GMAT"
                  className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm"
                  required
                />
              </div>

              {/* Rating Categories */}
              <div className="mb-4 sm:mb-6 bg-gray-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-blue-900">Rate Your Experience (1-5 Stars)</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  <RatingInput
                    label="Teaching Quality"
                    value={formData.ratings.teachingQuality}
                    onChange={(value) => handleRatingChange('teachingQuality', value)}
                  />
                  <RatingInput
                    label="Personal Attention"
                    value={formData.ratings.personalAttention}
                    onChange={(value) => handleRatingChange('personalAttention', value)}
                  />
                  <RatingInput
                    label="Test System"
                    value={formData.ratings.testSystem}
                    onChange={(value) => handleRatingChange('testSystem', value)}
                  />
                  <RatingInput
                    label="Overall Experience"
                    value={formData.ratings.overallExperience}
                    onChange={(value) => handleRatingChange('overallExperience', value)}
                  />
                  <RatingInput
                    label="Concept Clarity"
                    value={formData.ratings.conceptClarity}
                    onChange={(value) => handleRatingChange('conceptClarity', value)}
                  />
                  <RatingInput
                    label="Doubt Solving"
                    value={formData.ratings.doubtSolving}
                    onChange={(value) => handleRatingChange('doubtSolving', value)}
                  />
                  <RatingInput
                    label="Study Material"
                    value={formData.ratings.studyMaterial}
                    onChange={(value) => handleRatingChange('studyMaterial', value)}
                  />
                  <RatingInput
                    label="Confidence Improvement"
                    value={formData.ratings.improvementInConfidence}
                    onChange={(value) => handleRatingChange('improvementInConfidence', value)}
                  />
                  <RatingInput
                    label="Structured Planning"
                    value={formData.ratings.structuredPlanning}
                    onChange={(value) => handleRatingChange('structuredPlanning', value)}
                  />
                  <RatingInput
                    label="Exam-Oriented Practice"
                    value={formData.ratings.examOrientedPractice}
                    onChange={(value) => handleRatingChange('examOrientedPractice', value)}
                  />
                  <RatingInput
                    label="Reinforcement Classes"
                    value={formData.ratings.reinforcementClasses}
                    onChange={(value) => handleRatingChange('reinforcementClasses', value)}
                  />
                  <RatingInput
                    label="Overall Satisfaction"
                    value={formData.ratings.overallSatisfaction}
                    onChange={(value) => handleRatingChange('overallSatisfaction', value)}
                  />
                  <RatingInput
                    label="Batch Size Advantage"
                    value={formData.ratings.batchSizeAdvantage}
                    onChange={(value) => handleRatingChange('batchSizeAdvantage', value)}
                  />
                  <RatingInput
                    label="Individual Monitoring"
                    value={formData.ratings.individualMonitoring}
                    onChange={(value) => handleRatingChange('individualMonitoring', value)}
                  />
                  <RatingInput
                    label="Teacher Experience"
                    value={formData.ratings.teacherExperience}
                    onChange={(value) => handleRatingChange('teacherExperience', value)}
                  />
                  <RatingInput
                    label="Result Improvement"
                    value={formData.ratings.resultImprovement}
                    onChange={(value) => handleRatingChange('resultImprovement', value)}
                  />
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Your Review *</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm resize-none"
                  placeholder="Share your detailed experience with iThinkLearn. What did you like? How did it help you? Would you recommend it to others?"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 transition text-sm sm:text-base order-1 sm:order-2"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold border-2 border-blue-900 text-blue-900 hover:bg-blue-50 transition text-sm sm:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenSignup={() => { setIsLoginModalOpen(false); setIsSignupModalOpen(true) }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onOpenLogin={() => { setIsSignupModalOpen(false); setIsLoginModalOpen(true) }}
      />
      <Footer />
    </div>
  )
}