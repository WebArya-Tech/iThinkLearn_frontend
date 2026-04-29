import React, { useState } from 'react'

export default function QuestionManagement() {
  const [questions, setQuestions] = useState([
    { id: 1, student: 'Rahul Sharma', subject: 'Calculus Integration', category: 'Mathematics', question: 'How to solve integration by parts?', aiAnswer: 'Apply the formula twice...', tutorAnswer: null, status: 'ai-answered', needsReview: true },
    { id: 2, student: 'Priya Mehta', subject: 'Chemical Bonding', category: 'Chemistry', question: 'Difference between ionic and covalent bonds?', aiAnswer: 'Ionic bonds form between...', tutorAnswer: 'Let me explain...', status: 'tutor-reviewed', needsReview: false },
  ])
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [tutorAnswerInput, setTutorAnswerInput] = useState('')

  const handleAddAnswer = (id) => {
    const answer = prompt('Enter tutor answer:')
    if (!answer) return
    setQuestions(questions.map(q => q.id === id ? { ...q, tutorAnswer: answer, status: 'tutor-reviewed' } : q))
  }

  const handleMarkReviewed = (id) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, needsReview: false, status: 'tutor-reviewed' } : q))
    setApproveModalOpen(false)
    setSelectedQuestion(null)
  }

  const openViewModal = (q) => {
    setSelectedQuestion(q)
    setViewModalOpen(true)
  }

  const openApproveModal = (q) => {
    setSelectedQuestion(q)
    setApproveModalOpen(true)
  }

  const openReviewModal = (q) => {
    setSelectedQuestion(q)
    setTutorAnswerInput('')
    setReviewModalOpen(true)
  }

  const handleSubmitReview = () => {
    if (!tutorAnswerInput.trim()) return
    setQuestions(questions.map(q => q.id === selectedQuestion.id ? { ...q, tutorAnswer: tutorAnswerInput, status: 'tutor-reviewed', needsReview: false } : q))
    setReviewModalOpen(false)
    setSelectedQuestion(null)
    setTutorAnswerInput('')
  }

  const filteredQuestions = filterStatus === 'all'
    ? questions
    : filterStatus === 'needs-review'
    ? questions.filter(q => q.needsReview)
    : questions.filter(q => q.status === filterStatus)

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + itemsPerPage)



  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#dc3545'
      case 'ai-answered':
        return '#ffc107'
      case 'tutor-reviewed':
        return '#28a745'
      default:
        return '#1e3a8a'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">❓ Q&A Management</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Review AI answers and provide tutor responses</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 border-l-4" style={{ borderLeftColor: '#dc3545' }}>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">Pending</h3>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#dc3545' }}>
            {questions.filter(q => q.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 border-l-4" style={{ borderLeftColor: '#ffc107' }}>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">AI Answered</h3>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#ffc107' }}>
            {questions.filter(q => q.status === 'ai-answered').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 border-l-4" style={{ borderLeftColor: '#28a745' }}>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">Tutor Reviewed</h3>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#28a745' }}>
            {questions.filter(q => q.status === 'tutor-reviewed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 border-l-4" style={{ borderLeftColor: '#1e3a8a' }}>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">Needs Review</h3>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">
            {questions.filter(q => q.needsReview).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-all border-2 border-blue-900 text-xs sm:text-sm ${
            filterStatus === 'all' ? 'bg-blue-900 text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-blue-50'
          }`}
        >
          All Questions
        </button>
        <button
          onClick={() => setFilterStatus('needs-review')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-all border-2 border-red-600 text-xs sm:text-sm ${
            filterStatus === 'needs-review' ? 'bg-red-600 text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-red-50'
          }`}
        >
          Needs Review
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-all border-2 border-yellow-500 text-xs sm:text-sm ${
            filterStatus === 'pending' ? 'bg-yellow-500 text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-yellow-50'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus('ai-answered')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-all border-2 border-green-600 text-xs sm:text-sm ${
            filterStatus === 'ai-answered' ? 'bg-green-600 text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-green-50'
          }`}
        >
          AI Answered
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-3 sm:space-y-4">
        {paginatedQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 border-l-4"
            style={{ borderLeftColor: getStatusColor(q.status) }}
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-900">{q.subject}</h3>
                  <span
                    className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white"
                    style={{ backgroundColor: getStatusColor(q.status) }}
                  >
                    {q.status.toUpperCase().replace('-', ' ')}
                  </span>
                  <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold" style={{ backgroundColor: '#eab308', color: 'white' }}>
                    {q.category}
                  </span>
                  {q.needsReview && (
                    <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-red-500 text-white">
                      REVIEW NEEDED
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                  👨‍🎓 {q.student} • 📅 {q.askedOn || 'Recently'}
                </p>
              </div>
            </div>

            <div className="mb-3 sm:mb-4">
              <p className="font-semibold text-gray-700 mb-1.5 sm:mb-2 text-sm sm:text-base">Question:</p>
              <p className="text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-lg text-sm sm:text-base">{q.question}</p>
            </div>

           

            {q.tutorAnswer && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 md:p-4 rounded-lg" style={{ backgroundColor: '#e8f5f0' }}>
                <p className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base" style={{ color: '#28a745' }}>
                  👨‍🏫 Tutor Review{q.reviewedBy ? ` by ${q.reviewedBy}` : ''}:
                </p>
                <p className="text-gray-700 text-sm sm:text-base">{q.tutorAnswer}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
              {q.needsReview && (
                <>
                 
                  <button
                    onClick={() => openReviewModal(q)}
                    className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-all bg-blue-900 text-xs sm:text-sm"
                  >
                    Add Tutor Review
                  </button>
                </>
              )}
              <button
                onClick={() => openViewModal(q)}
                className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg font-semibold transition-all border-2 text-xs sm:text-sm"
                style={{ borderColor: '#1e3a8a', color: '#1e3a8a' }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 sm:gap-2 mt-4 sm:mt-6 flex-wrap">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-all disabled:opacity-50 text-xs sm:text-sm"
            style={{ 
              backgroundColor: currentPage === 1 ? '#e0e0e0' : '#1e3a8a',
              color: currentPage === 1 ? '#666' : 'white'
            }}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm min-w-7 sm:min-w-10"
              style={{
                backgroundColor: currentPage === index + 1 ? '#1e3a8a' : 'white',
                color: currentPage === index + 1 ? 'white' : '#1e3a8a',
                border: '2px solid #1e3a8a'
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-all disabled:opacity-50 text-xs sm:text-sm"
            style={{ 
              backgroundColor: currentPage === totalPages ? '#e0e0e0' : '#1e3a8a',
              color: currentPage === totalPages ? '#666' : 'white'
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* View Details Modal */}
      {viewModalOpen && selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-blue-900 p-4 sm:p-6 rounded-t-xl flex justify-between items-start">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Question Details</h3>
                <p className="text-blue-200 text-xs sm:text-sm mt-1">ID: #{selectedQuestion.id}</p>
              </div>
              <button
                onClick={() => { setViewModalOpen(false); setSelectedQuestion(null) }}
                className="text-white hover:text-blue-200 text-2xl font-bold p-1"
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: getStatusColor(selectedQuestion.status) }}>
                  {selectedQuestion.status.toUpperCase().replace('-', ' ')}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-white">
                  {selectedQuestion.category}
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Student</p>
                <p className="font-semibold text-blue-900 text-sm sm:text-base">👨‍🎓 {selectedQuestion.student}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Subject</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{selectedQuestion.subject}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Question</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm sm:text-base">{selectedQuestion.question}</p>
              </div>
              {selectedQuestion.aiAnswer && (
                <div className="p-3 sm:p-4 rounded-lg" style={{ backgroundColor: '#fefce8' }}>
                  <p className="font-semibold mb-2 text-blue-900 text-xs sm:text-sm">🤖 AI Generated Answer:</p>
                  <p className="text-gray-700 text-sm sm:text-base">{selectedQuestion.aiAnswer}</p>
                </div>
              )}
              {selectedQuestion.tutorAnswer && (
                <div className="p-3 sm:p-4 rounded-lg" style={{ backgroundColor: '#e8f5f0' }}>
                  <p className="font-semibold mb-2 text-green-600 text-xs sm:text-sm">👨‍🏫 Tutor Answer:</p>
                  <p className="text-gray-700 text-sm sm:text-base">{selectedQuestion.tutorAnswer}</p>
                </div>
              )}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => { setViewModalOpen(false); setSelectedQuestion(null) }}
                  className="px-4 sm:px-6 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 transition text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approve AI Answer Modal */}
      {approveModalOpen && selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto">
            <div className="bg-green-600 p-4 sm:p-6 rounded-t-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white">Approve AI Answer</h3>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                Are you sure you want to approve the AI-generated answer for this question?
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Question</p>
                <p className="font-semibold text-gray-900 text-sm">{selectedQuestion.question}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#fefce8' }}>
                <p className="text-xs text-gray-600 mb-1">AI Answer</p>
                <p className="text-gray-700 text-sm">{selectedQuestion.aiAnswer}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                <button
                  onClick={() => handleMarkReviewed(selectedQuestion.id)}
                  className="flex-1 py-2 sm:py-2.5 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition text-sm order-1 sm:order-2"
                >
                  Yes, Approve
                </button>
                <button
                  onClick={() => { setApproveModalOpen(false); setSelectedQuestion(null) }}
                  className="flex-1 py-2 sm:py-2.5 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm order-2 sm:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Tutor Review Modal */}
      {reviewModalOpen && selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-blue-900 p-4 sm:p-6 rounded-t-xl flex justify-between items-start">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Add Tutor Review</h3>
                <p className="text-blue-200 text-xs sm:text-sm mt-1">Provide your expert answer</p>
              </div>
              <button
                onClick={() => { setReviewModalOpen(false); setSelectedQuestion(null); setTutorAnswerInput('') }}
                className="text-white hover:text-blue-200 text-2xl font-bold p-1"
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Original Question</p>
                <p className="font-semibold text-gray-900 text-sm">{selectedQuestion.question}</p>
              </div>
              {selectedQuestion.aiAnswer && (
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#fefce8' }}>
                  <p className="text-xs text-gray-600 mb-1">AI Answer (for reference)</p>
                  <p className="text-gray-700 text-sm">{selectedQuestion.aiAnswer}</p>
                </div>
              )}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Your Tutor Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={tutorAnswerInput}
                  onChange={(e) => setTutorAnswerInput(e.target.value)}
                  placeholder="Enter your expert answer here..."
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 resize-none text-sm"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                <button
                  onClick={handleSubmitReview}
                  disabled={!tutorAnswerInput.trim()}
                  className="flex-1 py-2 sm:py-2.5 rounded-lg font-semibold text-white bg-blue-900 hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm order-1 sm:order-2"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => { setReviewModalOpen(false); setSelectedQuestion(null); setTutorAnswerInput('') }}
                  className="flex-1 py-2 sm:py-2.5 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm order-2 sm:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
