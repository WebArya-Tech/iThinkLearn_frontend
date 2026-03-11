import React, { useState } from 'react'

export default function PracticeTests() {
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const tests = [
    {
      id: 1,
      title: 'Calculus - Integration Practice',
      subject: 'Mathematics',
      questions: 25,
      duration: '45 min',
      difficulty: 'Medium',
      completed: false,
      score: null,
      attempts: 0
    },
    {
      id: 2,
      title: 'Organic Chemistry - Chapter 3',
      subject: 'Chemistry',
      questions: 30,
      duration: '60 min',
      difficulty: 'Hard',
      completed: true,
      score: 85,
      attempts: 2
    },
    {
      id: 3,
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      questions: 20,
      duration: '30 min',
      difficulty: 'Easy',
      completed: true,
      score: 92,
      attempts: 1
    },
    {
      id: 4,
      title: 'Differential Equations Quiz',
      subject: 'Mathematics',
      questions: 15,
      duration: '40 min',
      difficulty: 'Hard',
      completed: false,
      score: null,
      attempts: 0
    },
    {
      id: 5,
      title: 'Thermodynamics Practice Test',
      subject: 'Physics',
      questions: 35,
      duration: '75 min',
      difficulty: 'Medium',
      completed: true,
      score: 78,
      attempts: 1
    },
    {
      id: 6,
      title: 'Electrochemistry Assessment',
      subject: 'Chemistry',
      questions: 20,
      duration: '45 min',
      difficulty: 'Medium',
      completed: false,
      score: null,
      attempts: 0
    }
  ]

  const filteredTests = selectedSubject === 'all'
    ? tests
    : tests.filter(test => test.subject === selectedSubject)

  // Pagination
  const totalPages = Math.ceil(filteredTests.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTests = filteredTests.slice(startIndex, startIndex + itemsPerPage)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return '#28a745'
      case 'Medium':
        return '#ffc107'
      case 'Hard':
        return '#dc3545'
      default:
        return '#1e3a8a'
    }
  }

  const completedTests = tests.filter(t => t.completed).length
  const averageScore = tests.filter(t => t.completed).reduce((acc, t) => acc + t.score, 0) / completedTests || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-900">Practice Tests</h2>
        <p className="text-gray-500 text-sm mt-1">Improve your skills with practice tests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-900">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Tests</h3>
          <p className="text-4xl font-bold text-blue-900">{tests.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Completed</h3>
          <p className="text-4xl font-bold text-green-600">{completedTests}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Average Score</h3>
          <p className="text-4xl font-bold text-yellow-500">{averageScore.toFixed(0)}%</p>
        </div>
      </div>

      {/* Subject Filter */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedSubject === 'all' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: selectedSubject === 'all' ? '#1e3a8a' : 'transparent' }}
          >
            All Subjects
          </button>
          <button
            onClick={() => setSelectedSubject('Mathematics')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedSubject === 'Mathematics' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: selectedSubject === 'Mathematics' ? '#1e3a8a' : 'transparent' }}
          >
            Mathematics
          </button>
          <button
            onClick={() => setSelectedSubject('Physics')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedSubject === 'Physics' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: selectedSubject === 'Physics' ? '#1e3a8a' : 'transparent' }}
          >
            Physics
          </button>
          <button
            onClick={() => setSelectedSubject('Chemistry')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedSubject === 'Chemistry' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: selectedSubject === 'Chemistry' ? '#1e3a8a' : 'transparent' }}
          >
            Chemistry
          </button>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedTests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1e3a8a' }}>
                  {test.title}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#f59e0b' }}>
                    {test.subject}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: getDifficultyColor(test.difficulty) }}
                  >
                    {test.difficulty}
                  </span>
                  {test.completed && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#28a745' }}>
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Questions:</span>
                <span className="font-semibold">{test.questions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{test.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Attempts:</span>
                <span className="font-semibold">{test.attempts}</span>
              </div>
              {test.completed && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Best Score:</span>
                  <span className="font-bold" style={{ color: '#28a745' }}>{test.score}%</span>
                </div>
              )}
            </div>

            <button
              className="w-full py-3 rounded-lg font-bold text-white shadow-md hover:opacity-90 transition-all"
              style={{ backgroundColor: test.completed ? '#f59e0b' : '#1e3a8a' }}
            >
              {test.completed ? 'Retake Test' : 'Start Test'}
            </button>
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
  )
}
