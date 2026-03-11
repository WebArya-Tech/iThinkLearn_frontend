import React, { useState, useEffect } from 'react'

const STATIC_HOMEWORK = [
  { id: 1, subject: 'Mathematics', title: 'Calculus Problem Set 5', description: 'Solve problems 1-15 from Chapter 8. Focus on integration techniques.', dueDate: 'Mar 10, 2026', status: 'pending', marks: 25, assignedDate: 'Feb 28, 2026' },
  { id: 2, subject: 'Physics', title: 'Thermodynamics Assignment', description: 'Write a report on the First Law of Thermodynamics with examples.', dueDate: 'Mar 15, 2026', status: 'pending', marks: 30, assignedDate: 'Mar 01, 2026' },
  { id: 3, subject: 'Chemistry', title: 'Organic Chemistry Worksheet', description: 'Complete the reaction mechanism worksheet for Chapter 5.', dueDate: 'Mar 20, 2026', status: 'pending', marks: 20, assignedDate: 'Mar 05, 2026' },
]

const loadHomework = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('icfy_homework') || 'null')
    if (saved && saved.length > 0) {
      return saved.map(h => ({
        ...h,
        status: h.status || 'pending',
        marks: h.marks || 10,
        assignedDate: h.assignedDate || (h.dueDate ? '' : new Date().toLocaleDateString('en-IN')),
      }))
    }
  } catch {}
  return STATIC_HOMEWORK
}

export default function Homework() {
  const [filter, setFilter] = useState('all')
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedHomework, setSelectedHomework] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [homework, setHomework] = useState(loadHomework)
  const itemsPerPage = 5

  // Reload when admin updates homework
  useEffect(() => {
    setHomework(loadHomework())
  }, [])

  const filteredHomework = filter === 'all' ? homework : homework.filter(h => h.status === filter)
  const totalPages = Math.ceil(filteredHomework.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedHomework = filteredHomework.slice(startIndex, endIndex)

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107'
      case 'overdue':
        return '#dc3545'
      case 'submitted':
        return '#28a745'
      default:
        return '#1e3a8a'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'overdue':
        return 'Overdue'
      case 'submitted':
        return 'Submitted'
      default:
        return status
    }
  }

  const handleSubmit = (hw) => {
    setSelectedHomework(hw)
    setShowSubmitModal(true)
  }

  const handleSubmitHomework = (e) => {
    e.preventDefault()
    alert('Homework submitted successfully!')
    setShowSubmitModal(false)
    setSelectedHomework(null)
  }

  const pendingCount = homework.filter(h => h.status === 'pending').length
  const overdueCount = homework.filter(h => h.status === 'overdue').length
  const submittedCount = homework.filter(h => h.status === 'submitted').length

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-900">Homework</h2>
        <p className="text-gray-500 text-sm mt-1">Track and submit your homework assignments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Pending</h3>
          <p className="text-4xl font-bold text-yellow-500">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-400">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Overdue</h3>
          <p className="text-4xl font-bold text-red-500">{overdueCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Submitted</h3>
          <p className="text-4xl font-bold text-green-600">{submittedCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-700">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total</h3>
          <p className="text-4xl font-bold text-blue-900">{homework.length}</p>
        </div>
      </div>

        <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${filter === 'all' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-700 hover:bg-white'}`}>All ({homework.length})</button>
          <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${filter === 'pending' ? 'bg-yellow-400 text-blue-900 shadow-md' : 'text-gray-700 hover:bg-white'}`}>Pending ({pendingCount})</button>
          <button onClick={() => setFilter('overdue')} className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${filter === 'overdue' ? 'bg-red-500 text-white shadow-md' : 'text-gray-700 hover:bg-white'}`}>Overdue ({overdueCount})</button>
          <button onClick={() => setFilter('submitted')} className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${filter === 'submitted' ? 'bg-green-500 text-white shadow-md' : 'text-gray-700 hover:bg-white'}`}>Submitted</button>
        </div>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {paginatedHomework.map((hw) => (
          <div
            key={hw.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-l-4"
            style={{ borderLeftColor: getStatusColor(hw.status) }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="text-xl font-bold text-blue-900">{hw.title}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: getStatusColor(hw.status) }}>{getStatusText(hw.status)}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900 text-white">{hw.subject}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900 text-white">{hw.marks} Marks</span>
                </div>
                <p className="text-gray-700 mb-3">{hw.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Assigned:</span> {hw.assignedDate}
                  </div>
                  <div>
                    <span className="font-semibold">Due Date:</span> {hw.dueDate}
                  </div>
                  {hw.submittedDate && (
                    <div>
                      <span className="font-semibold">Submitted:</span> {hw.submittedDate}
                    </div>
                  )}
                  {hw.grade !== null && hw.grade !== undefined && (
                    <div>
                      <span className="font-semibold">Grade:</span>{' '}
                      <span className="font-bold" style={{ color: '#28a745' }}>
                        {hw.grade}/{hw.marks}
                      </span>
                    </div>
                  )}
                </div>
                {hw.feedback && (
                  <div className="mt-3 p-3 rounded-lg bg-white">
                    <p className="text-sm font-semibold mb-1 text-blue-900">Teacher's Feedback:</p>
                    <p className="text-sm text-gray-700">{hw.feedback}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => { setSelectedHomework(hw); setShowDetailsModal(true) }}
                  className="px-6 py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all whitespace-nowrap bg-blue-900"
                >
                  View Details
                </button>
                {(hw.status === 'pending' || hw.status === 'overdue') && (
                  <button
                    onClick={() => handleSubmit(hw)}
                    className="px-6 py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all whitespace-nowrap bg-blue-900"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
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

      {/* View Details Modal */}
      {showDetailsModal && selectedHomework && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#1e3a8a' }}>Homework Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-2xl text-gray-400 hover:text-gray-600 transition"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1e3a8a' }}>{selectedHomework.title}</h3>
                <p className="text-gray-700 mb-3">{selectedHomework.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                  <p className="text-xs text-gray-600 font-semibold">Subject</p>
                  <p className="text-lg font-bold" style={{ color: '#1e3a8a' }}>{selectedHomework.subject}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                  <p className="text-xs text-gray-600 font-semibold">Marks</p>
                  <p className="text-lg font-bold" style={{ color: '#f59e0b' }}>{selectedHomework.marks} Marks</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                  <p className="text-xs text-gray-600 font-semibold">Assigned Date</p>
                  <p className="text-lg font-bold" style={{ color: '#1e3a8a' }}>{selectedHomework.assignedDate}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                  <p className="text-xs text-gray-600 font-semibold">Due Date</p>
                  <p className="text-lg font-bold" style={{ color: '#dc3545' }}>{selectedHomework.dueDate}</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'white' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#1e3a8a' }}>Status</p>
                <span
                  className="px-3 py-1 rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: getStatusColor(selectedHomework.status) }}
                >
                  {getStatusText(selectedHomework.status)}
                </span>
              </div>
              
              {selectedHomework.submittedDate && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#d4edda' }}>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Submitted Date</p>
                  <p className="text-lg font-bold" style={{ color: '#28a745' }}>{selectedHomework.submittedDate}</p>
                </div>
              )}
              
              {selectedHomework.grade !== null && selectedHomework.grade !== undefined && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#d4edda' }}>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Grade</p>
                  <p className="text-lg font-bold" style={{ color: '#28a745' }}>{selectedHomework.grade}/{selectedHomework.marks}</p>
                </div>
              )}
              
              {selectedHomework.feedback && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#e8f4f8' }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: '#1e3a8a' }}>Teacher's Feedback</p>
                  <p className="text-sm text-gray-700">{selectedHomework.feedback}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 py-3 rounded-lg font-bold border-2 transition-all"
                style={{ borderColor: '#1e3a8a', color: '#1e3a8a' }}
              >
                Close
              </button>
              {(selectedHomework.status === 'pending' || selectedHomework.status === 'overdue') && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    handleSubmit(selectedHomework)
                  }}
                  className="flex-1 py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#1e3a8a' }}
                >
                  Submit Homework
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Homework Modal */}
      {showSubmitModal && selectedHomework && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSubmitModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e3a8a' }}>Submit Homework</h2>
            
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
              <h3 className="font-bold text-lg mb-2">{selectedHomework.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{selectedHomework.subject}</p>
              <p className="text-sm"><span className="font-semibold">Due Date:</span> {selectedHomework.dueDate}</p>
            </div>

            <form onSubmit={handleSubmitHomework} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload File</label>
                <input
                  type="file"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#1e3a8a' }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Comments (Optional)</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#1e3a8a' }}
                  rows="4"
                  placeholder="Add any comments or notes..."
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
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
                  Submit Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
