import React, { useState } from 'react'

export default function AskQuestion() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [questionForm, setQuestionForm] = useState({
    subject: '',
    category: 'academic',
    question: ''
  })

  const [questions, setQuestions] = useState([
    {
      id: 1,
      subject: 'Calculus Integration Problem',
      category: 'Mathematics',
      question: 'How do I solve integration by parts for ∫x²e^x dx?',
      answer: 'To solve ∫x²e^x dx using integration by parts, apply the formula twice. First, let u = x² and dv = e^x dx. This gives du = 2x dx and v = e^x. Following the integration by parts formula ∫u dv = uv - ∫v du, you get...',
      status: 'answered',
      askedOn: '2 days ago',
      answeredBy: 'AI Tutor',
      reviewedBy: 'Prof. Smith'
    },
    {
      id: 2,
      subject: 'Chemical Bonding Confusion',
      category: 'Chemistry',
      question: 'What is the difference between ionic and covalent bonds?',
      answer: 'Ionic bonds form between metals and non-metals through electron transfer, while covalent bonds form between non-metals through electron sharing...',
      status: 'answered',
      askedOn: '3 days ago',
      answeredBy: 'AI Tutor',
      reviewedBy: 'Dr. Johnson'
    },
    {
      id: 3,
      subject: 'Newton\'s Laws Application',
      category: 'Physics',
      question: 'How do I apply Newton\'s second law to an inclined plane problem?',
      answer: null,
      status: 'pending',
      askedOn: '1 hour ago',
      answeredBy: null,
      reviewedBy: null
    }
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newQuestion = {
      id: questions.length + 1,
      subject: questionForm.subject,
      category: questionForm.category,
      question: questionForm.question,
      answer: null,
      status: 'pending',
      askedOn: 'Just now',
      answeredBy: null,
      reviewedBy: null
    }
    setQuestions([newQuestion, ...questions])
    setQuestionForm({ subject: '', category: 'academic', question: '' })
    alert('Question submitted successfully! You will be notified when it\'s answered.')
  }

  const getStatusColor = (status) => {
    return status === 'answered' ? '#28a745' : '#ffc107'
  }

  // Pagination
  const totalPages = Math.ceil(questions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedQuestions = questions.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-900">Ask a Question</h2>
        <p className="text-gray-500 text-sm mt-1">Get AI-powered answers reviewed by expert tutors</p>
      </div>

      {/* Ask New Question Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6 text-blue-900">Post Your Question</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject/Topic</label>
              <input
                type="text"
                value={questionForm.subject}
                onChange={(e) => setQuestionForm({ ...questionForm, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                style={{ borderColor: '#1e3a8a' }}
                placeholder="e.g., Quadratic Equations"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={questionForm.category}
                onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                style={{ borderColor: '#1e3a8a' }}
              >
                <option value="academic">Academic</option>
                <option value="homework">Homework Help</option>
                <option value="concept">Concept Clarification</option>
                <option value="exam">Exam Preparation</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Question</label>
            <textarea
              value={questionForm.question}
              onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#1e3a8a' }}
              rows="5"
              placeholder="Describe your question in detail..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-bold text-lg shadow-lg hover:opacity-90 transition-all"
            style={{ backgroundColor: '#1e3a8a' }}
          >
            Submit Question
          </button>
        </form>
      </div>

      {/* My Questions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6" style={{ color: '#1e3a8a' }}>My Questions</h3>
        <div className="space-y-4">
          {paginatedQuestions.map((q) => (
            <div
              key={q.id}
              className="p-5 rounded-lg border-l-4"
              style={{
                backgroundColor: '#ffffff',
                borderLeftColor: getStatusColor(q.status)
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-lg text-gray-800">{q.subject}</h4>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: getStatusColor(q.status) }}
                    >
                      {q.status.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#f59e0b', color: 'white' }}>
                      {q.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Asked {q.askedOn}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="font-semibold text-gray-700 mb-2">Question:</p>
                <p className="text-gray-700">{q.question}</p>
              </div>

              {q.answer && (
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'white' }}>
                  <p className="font-semibold mb-2" style={{ color: '#1e3a8a' }}>Answer:</p>
                  <p className="text-gray-700 mb-3">{q.answer}</p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Answered by: {q.answeredBy}</span>
                    {q.reviewedBy && <span>Reviewed by: {q.reviewedBy}</span>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="px-4 py-2 rounded-lg font-semibold transition-all"
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
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: currentPage === totalPages ? '#e0e0e0' : '#1e3a8a',
                color: currentPage === totalPages ? '#666' : 'white'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
