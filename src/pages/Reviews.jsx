import React, { useState, useRef } from 'react'
import { Star } from 'lucide-react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import LoginModal from '../component/auth/LoginModal'
import SignupModal from '../component/auth/SignupModal'
import { useAuth } from '../context/AuthContext'

const hardcodedReviews = [
  {
    id: 1,
    name: 'Rahul Sharma',
    course: 'UG Mathematics',
    rating: 5,
    review: 'Excellent teaching methodology! My concepts became crystal clear through ICFY classes. Highly recommended!',
    date: '2024-01-15',
    detailedRatings: {
      teachingQuality: 5,
      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 5,
      examOriented: 5,
      personalAttention: 5
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
      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 4,
      examOriented: 5,
      personalAttention: 5
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
      conceptClarity: 5,
      doubtSolving: 4,
      studyMaterial: 4,
      examOriented: 3,
      personalAttention: 4
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
      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 5,
      examOriented: 5,
      personalAttention: 5
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
      conceptClarity: 5,
      doubtSolving: 4,
      studyMaterial: 5,
      examOriented: 5,
      personalAttention: 5
    }
  },
  {
    id: 6,
    name: 'Neha Gupta',
    course: 'Online Classes',
    rating: 4,
    review: 'Very flexible class timings and recorded sessions available. Great for working professionals like me.',
    date: '2024-02-12',
    detailedRatings: {
      teachingQuality: 4,
      conceptClarity: 4,
      doubtSolving: 4,
      studyMaterial: 4,
      examOriented: 4,
      personalAttention: 4
    }
  },
]

export default function Reviews() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState(hardcodedReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const reviewsRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    review: '',
    ratings: {
      teachingQuality: 0,
      conceptClarity: 0,
      doubtSolving: 0,
      studyMaterial: 0,
      examOriented: 0,
      personalAttention: 0
    }
  })

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
      name: formData.name,
      email: user?.email || '',
      course: formData.course,
      rating: overallRating,
      review: formData.review,
      date: new Date().toISOString(),
      detailedRatings: formData.ratings
    }
    
    setReviews([newReview, ...reviews])
    setShowReviewForm(false)
    setFormData({
      name: '',
      course: '',
      review: '',
      ratings: {
        teachingQuality: 0,
        conceptClarity: 0,
        doubtSolving: 0,
        studyMaterial: 0,
        examOriented: 0,
        personalAttention: 0
      }
    })
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
              <button
                onClick={() => {
                  if (!user) {
                    setIsLoginModalOpen(true)
                    return
                  }
                  setShowReviewForm(true)
                }}
                className="px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-blue-900 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 transition text-sm sm:text-base"
              >
                Write a Review
              </button>
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
                        <span className="text-[10px] sm:text-xs text-gray-600">Exam-Oriented:</span>
                        <StarRating rating={review.detailedRatings.examOriented} size={12} />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] sm:text-xs text-gray-600">Personal Attention:</span>
                        <StarRating rating={review.detailedRatings.personalAttention} size={12} />
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
              {/* Basic Information */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm"
                  required
                />
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Course *</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="e.g., UG Mathematics, GRE, GMAT"
                  className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm"
                  required
                />
              </div>

              {/* Rating Categories */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-blue-900">Rate Your Experience</h3>
                
                <RatingInput
                  label="Teaching Quality"
                  value={formData.ratings.teachingQuality}
                  onChange={(value) => handleRatingChange('teachingQuality', value)}
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
                  label="Exam-Oriented Practice"
                  value={formData.ratings.examOriented}
                  onChange={(value) => handleRatingChange('examOriented', value)}
                />
                
                <RatingInput
                  label="Personal Attention"
                  value={formData.ratings.personalAttention}
                  onChange={(value) => handleRatingChange('personalAttention', value)}
                />
              </div>

              {/* Review Text */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Your Review *</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-sm resize-none"
                  placeholder="Share your experience with iThinkLearn..."
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