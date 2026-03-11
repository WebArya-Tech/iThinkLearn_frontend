import React, { useState } from 'react'

export default function FeedbackReviews() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [myReviewsPage, setMyReviewsPage] = useState(1)
  const [allReviewsPage, setAllReviewsPage] = useState(1)
  const itemsPerPage = 5
  const [feedbackForm, setFeedbackForm] = useState({
    course: '',
    rating: 5,
    category: 'course',
    feedback: ''
  })

  const myReviews = [
    {
      id: 1,
      course: 'Mathematics Advanced',
      rating: 5,
      feedback: 'Excellent teaching methodology! The concepts are explained very clearly.',
      date: 'Jan 15, 2026',
      category: 'Course Quality',
      response: 'Thank you for your feedback! We\'re glad you\'re enjoying the course.'
    },
    {
      id: 2,
      course: 'Physics Fundamentals',
      rating: 4,
      feedback: 'Good course content but would appreciate more practice problems.',
      date: 'Jan 10, 2026',
      category: 'Course Content',
      response: null
    }
  ]

  const allReviews = [
    {
      id: 1,
      student: 'Rahul S.',
      course: 'Chemistry Basics',
      rating: 5,
      feedback: 'Outstanding tutor! Very patient and explains everything in detail.',
      date: '2 days ago'
    },
    {
      id: 2,
      student: 'Priya M.',
      course: 'Computer Science',
      rating: 5,
      feedback: 'Best online learning platform. Highly recommended!',
      date: '3 days ago'
    },
    {
      id: 3,
      student: 'Amit K.',
      course: 'Mathematics Advanced',
      rating: 4,
      feedback: 'Great teaching style and the practice materials are very helpful.',
      date: '5 days ago'
    },
    {
      id: 4,
      student: 'Sneha P.',
      course: 'Physics Fundamentals',
      rating: 5,
      feedback: 'The live classes are interactive and engaging. Love it!',
      date: '1 week ago'
    }
  ]

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    alert('Thank you for your feedback! We value your input.')
    setShowFeedbackForm(false)
    setFeedbackForm({ course: '', rating: 5, category: 'course', feedback: '' })
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="text-2xl"
            style={{ color: star <= rating ? '#f59e0b' : '#e0e0e0' }}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  const averageRating = (allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length).toFixed(1)

  // Pagination for My Reviews
  const myReviewsTotalPages = Math.ceil(myReviews.length / itemsPerPage)
  const myReviewsStartIndex = (myReviewsPage - 1) * itemsPerPage
  const paginatedMyReviews = myReviews.slice(myReviewsStartIndex, myReviewsStartIndex + itemsPerPage)

  // Pagination for All Reviews
  const allReviewsTotalPages = Math.ceil(allReviews.length / itemsPerPage)
  const allReviewsStartIndex = (allReviewsPage - 1) * itemsPerPage
  const paginatedAllReviews = allReviews.slice(allReviewsStartIndex, allReviewsStartIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Feedback & Reviews</h2>
          <p className="text-gray-500 text-sm mt-1">Share your experience and read reviews from other students</p>
        </div>
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="px-6 py-3 rounded-lg font-bold shadow-md hover:opacity-90 transition-all bg-blue-900 text-white"
        >
          Write Review
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Average Rating</h3>
          <div className="flex items-center gap-3">
            <p className="text-4xl font-bold text-yellow-500">{averageRating}</p>
            <span className="text-3xl text-yellow-500">★</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#1e3a8a' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Reviews</h3>
          <p className="text-4xl font-bold" style={{ color: '#1e3a8a' }}>{allReviews.length + myReviews.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#28a745' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">My Reviews</h3>
          <p className="text-4xl font-bold" style={{ color: '#28a745' }}>{myReviews.length}</p>
        </div>
      </div>

      {/* My Reviews */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6" style={{ color: '#1e3a8a' }}>My Reviews</h3>
        <div className="space-y-4">
          {paginatedMyReviews.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-lg border-l-4"
              style={{ backgroundColor: '#ffffff', borderLeftColor: '#f59e0b' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">{review.course}</h4>
                  {renderStars(review.rating)}
                  <span className="px-3 py-1 rounded-full text-xs font-bold mt-2 inline-block" style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
                    {review.category}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{review.date}</span>
              </div>
              <p className="text-gray-700 mb-3">{review.feedback}</p>
              {review.response && (
                <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: 'white' }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#1e3a8a' }}>Admin Response:</p>
                  <p className="text-sm text-gray-700">{review.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination for My Reviews */}
        {myReviewsTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setMyReviewsPage(prev => Math.max(prev - 1, 1))}
              disabled={myReviewsPage === 1}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: myReviewsPage === 1 ? '#e0e0e0' : '#1e3a8a',
                color: myReviewsPage === 1 ? '#666' : 'white'
              }}
            >
              Previous
            </button>
            {[...Array(myReviewsTotalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setMyReviewsPage(index + 1)}
                className="px-4 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: myReviewsPage === index + 1 ? '#1e3a8a' : 'white',
                  color: myReviewsPage === index + 1 ? 'white' : '#1e3a8a',
                  border: '2px solid #1e3a8a'
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setMyReviewsPage(prev => Math.min(prev + 1, myReviewsTotalPages))}
              disabled={myReviewsPage === myReviewsTotalPages}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: myReviewsPage === myReviewsTotalPages ? '#e0e0e0' : '#1e3a8a',
                color: myReviewsPage === myReviewsTotalPages ? '#666' : 'white'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* All Reviews */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6" style={{ color: '#1e3a8a' }}>Student Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedAllReviews.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-lg"
              style={{ backgroundColor: '#ffffff' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: '#1e3a8a' }}
                    >
                      {review.student.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{review.student}</h4>
                      <p className="text-xs text-gray-600">{review.date}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: '#1e3a8a' }}>{review.course}</p>
              <div className="mb-2">{renderStars(review.rating)}</div>
              <p className="text-gray-700 text-sm">{review.feedback}</p>
            </div>
          ))}
        </div>

        {/* Pagination for All Reviews */}
        {allReviewsTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setAllReviewsPage(prev => Math.max(prev - 1, 1))}
              disabled={allReviewsPage === 1}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: allReviewsPage === 1 ? '#e0e0e0' : '#1e3a8a',
                color: allReviewsPage === 1 ? '#666' : 'white'
              }}
            >
              Previous
            </button>
            {[...Array(allReviewsTotalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setAllReviewsPage(index + 1)}
                className="px-4 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: allReviewsPage === index + 1 ? '#1e3a8a' : 'white',
                  color: allReviewsPage === index + 1 ? 'white' : '#1e3a8a',
                  border: '2px solid #1e3a8a'
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setAllReviewsPage(prev => Math.min(prev + 1, allReviewsTotalPages))}
              disabled={allReviewsPage === allReviewsTotalPages}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: allReviewsPage === allReviewsTotalPages ? '#e0e0e0' : '#1e3a8a',
                color: allReviewsPage === allReviewsTotalPages ? '#666' : 'white'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowFeedbackForm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e3a8a' }}>Write Your Review</h2>
            
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                  <select
                    value={feedbackForm.course}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, course: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                    style={{ borderColor: '#1e3a8a' }}
                    required
                  >
                    <option value="">Select course</option>
                    <option value="Mathematics Advanced">Mathematics Advanced</option>
                    <option value="Physics Fundamentals">Physics Fundamentals</option>
                    <option value="Chemistry Basics">Chemistry Basics</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={feedbackForm.category}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                    style={{ borderColor: '#1e3a8a' }}
                  >
                    <option value="course">Course Quality</option>
                    <option value="teaching">Teaching</option>
                    <option value="content">Course Content</option>
                    <option value="platform">Platform</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                      className="text-4xl transition-all"
                      style={{ color: star <= feedbackForm.rating ? '#f59e0b' : '#e0e0e0' }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Feedback</label>
                <textarea
                  value={feedbackForm.feedback}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#1e3a8a' }}
                  rows="5"
                  placeholder="Share your experience..."
                  required
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowFeedbackForm(false)}
                  className="flex-1 py-3 rounded-lg font-bold border-2 transition-all"
                  style={{ borderColor: '#dc3545', color: '#dc3545' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#1e3a8a' }}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
