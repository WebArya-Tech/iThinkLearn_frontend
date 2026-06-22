import React, { useEffect, useState } from 'react'
import Pagination from '../ui/Pagination'

const DEFAULT_ASSIGNMENTS = [
  {
    id: 1,
    title: 'Calculus Assignment 1',
    subject: 'Mathematics',
    dueDate: '2026-03-10',
    assignedDate: 'Feb 28, 2026',
    marks: 25,
    description: 'Solve all integration problems from chapter 5. Show all working steps.',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Physics Project',
    subject: 'Physics',
    dueDate: '2026-03-15',
    assignedDate: 'Mar 01, 2026',
    marks: 30,
    description: 'Create a detailed project on simple machines with diagrams.',
    status: 'pending'
  }
]

const daysUntil = (dateValue) => {
  const dueDate = new Date(dateValue)
  if (Number.isNaN(dueDate.getTime())) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dueDate.setHours(0, 0, 0, 0)
  return Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

const formatDate = (dateValue) => {
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return dateValue || '-'
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const loadHomeworkAssignments = () => {
  let source = DEFAULT_ASSIGNMENTS

  try {
    const saved = JSON.parse(localStorage.getItem('icfy_homework') || 'null')
    if (saved && saved.length > 0) source = saved
  } catch {
    source = DEFAULT_ASSIGNMENTS
  }

  return source.map(item => {
    const daysLeft = item.status === 'submitted' ? null : daysUntil(item.dueDate)
    return {
      ...item,
      course: item.subject || item.course || 'General',
      courseIcon: '',
      dueDate: item.status === 'submitted' && item.submittedDate ? `Submitted on ${item.submittedDate}` : formatDate(item.dueDate),
      rawDueDate: item.dueDate,
      daysLeft,
      status: item.status || 'pending',
      priority: item.priority || (daysLeft !== null && daysLeft <= 5 ? 'high' : 'medium'),
      points: Number(item.marks || item.points || 10),
      attachments: item.attachments || 0
    }
  })
}

const saveHomeworkAssignments = (items) => {
  localStorage.setItem('icfy_homework', JSON.stringify(items))
  window.dispatchEvent(new Event('icfy_homework_updated'))
}

export default function MyAssignments() {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [assignments, setAssignments] = useState(loadHomeworkAssignments)
  const [error, setError] = useState(null)
  const [submittingId, setSubmittingId] = useState(null)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const itemsPerPage = 100

  useEffect(() => {
    const refresh = () => setAssignments(loadHomeworkAssignments())

    window.addEventListener('storage', refresh)
    window.addEventListener('icfy_homework_updated', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('icfy_homework_updated', refresh)
    }
  }, [])

  const handleSubmitAssignment = (assignmentId) => {
    try {
      setSubmittingId(assignmentId)

      if (!selectedAssignment?.files || selectedAssignment.files.length === 0) {
        setError('Please select a file to upload before submitting.')
        return
      }

      const submittedDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      const storedHomework = JSON.parse(localStorage.getItem('icfy_homework') || '[]')
      const baseItems = storedHomework.length > 0 ? storedHomework : assignments
      const updatedItems = baseItems.map(item =>
        item.id === assignmentId
          ? {
              ...item,
              status: 'submitted',
              submittedDate,
              submittedFile: selectedAssignment.files[0]?.name || ''
            }
          : item
      )

      saveHomeworkAssignments(updatedItems)
      setAssignments(loadHomeworkAssignments())
      setShowSubmitModal(false)
      setSelectedAssignment(null)
      setError(null)
    } catch (err) {
      console.error('Error submitting assignment:', err)
      setError('Failed to submit assignment. Please try again.')
    } finally {
      setSubmittingId(null)
    }
  }

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment)
    setShowSubmitModal(true)
  }

  const handleViewOnly = (assignment) => {
    setSelectedAssignment(assignment)
    setShowViewModal(true)
  }

  const filteredAssignments = filter === 'all'
    ? assignments
    : assignments.filter(assignment => assignment.status === filter)

  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAssignments = filteredAssignments.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return '#28a745'
      case 'overdue': return '#dc3545'
      default: return '#dc3545'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: '#1e3a8a' }}>My Assignments</h2>
          <p className="text-gray-600 mt-2">Manage your assignments and submissions</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4" style={{ borderLeftColor: '#dc3545' }}>
          <h3 className="text-2xl font-bold" style={{ color: '#dc3545' }}>
            {assignments.filter(a => a.status === 'pending').length}
          </h3>
          <p className="text-gray-600 text-sm">Pending</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4" style={{ borderLeftColor: '#28a745' }}>
          <h3 className="text-2xl font-bold" style={{ color: '#28a745' }}>
            {assignments.filter(a => a.status === 'submitted').length}
          </h3>
          <p className="text-gray-600 text-sm">Submitted</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4" style={{ borderLeftColor: '#1e3a8a' }}>
          <h3 className="text-2xl font-bold" style={{ color: '#1e3a8a' }}>{assignments.length}</h3>
          <p className="text-gray-600 text-sm">Total</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow-md">
        {['all', 'pending', 'submitted'].map(status => (
          <button
            key={status}
            onClick={() => {
              setFilter(status)
              setCurrentPage(1)
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filter === status ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ backgroundColor: filter === status ? (status === 'submitted' ? '#28a745' : status === 'pending' ? '#dc3545' : '#1e3a8a') : 'transparent' }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2" style={{ borderBottomColor: '#1e3a8a' }}>
                <th className="text-left px-5 py-3 font-bold" style={{ color: '#1e3a8a' }}>Assignment</th>
                <th className="text-left px-5 py-3 font-bold" style={{ color: '#1e3a8a' }}>Course</th>
                <th className="text-left px-5 py-3 font-bold" style={{ color: '#1e3a8a' }}>Due Date</th>
                <th className="text-left px-5 py-3 font-bold" style={{ color: '#1e3a8a' }}>Points</th>
                <th className="text-left px-5 py-3 font-bold" style={{ color: '#1e3a8a' }}>Priority</th>
                <th className="text-left px-5 py-3 font-bold" style={{ color: '#1e3a8a' }}>Status</th>
                <th className="text-left px-5 py-3 font-bold" style={{ color: '#1e3a8a' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-800">{assignment.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 max-w-[180px] truncate">{assignment.description}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-700">{assignment.course}</td>
                  <td className="px-5 py-4">
                    <p className="text-gray-700">{assignment.dueDate}</p>
                    {assignment.daysLeft !== null && assignment.daysLeft >= 0 && (
                      <p className="text-xs mt-0.5" style={{ color: assignment.daysLeft <= 5 ? '#dc3545' : '#28a745' }}>
                        {assignment.daysLeft} days left
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 font-bold" style={{ color: '#f59e0b' }}>
                    {assignment.grade !== undefined ? `${assignment.grade}/${assignment.points}` : assignment.points}
                  </td>
                  <td className="px-5 py-4">
                    {assignment.status === 'submitted' ? (
                      <span className="text-gray-400 text-xs">-</span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ backgroundColor: assignment.priority === 'high' ? '#dc3545' : '#f59e0b' }}>
                        {assignment.priority === 'high' ? 'High' : 'Medium'}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ backgroundColor: getStatusColor(assignment.status) }}>
                      {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {assignment.status === 'pending' && (
                        <button onClick={() => handleViewDetails(assignment)} className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 hover:bg-blue-900 hover:text-white transition-all whitespace-nowrap" style={{ borderColor: '#1e3a8a', color: '#1e3a8a', backgroundColor: 'white' }}>
                          Submit
                        </button>
                      )}
                      <button onClick={() => handleViewOnly(assignment)} className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 hover:bg-gray-100 transition-all whitespace-nowrap" style={{ borderColor: '#1e3a8a', color: '#1e3a8a', backgroundColor: 'white' }}>
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredAssignments.length}
        itemsPerPage={itemsPerPage}
        alwaysShow={true}
      />

      {showSubmitModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#1e3a8a' }}>
              Submit: {selectedAssignment.title}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Files</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setSelectedAssignment({ ...selectedAssignment, files: e.target.files })}
                  className="block w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Comments (Optional)</label>
                <textarea className="block w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500" rows="3" placeholder="Add any comments..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowSubmitModal(false)} className="flex-1 px-4 py-2 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50" style={{ borderColor: '#1e3a8a', color: '#1e3a8a', backgroundColor: 'white' }}>
                Cancel
              </button>
              <button onClick={() => handleSubmitAssignment(selectedAssignment.id)} disabled={submittingId === selectedAssignment.id} className="flex-1 px-4 py-2 rounded-lg font-semibold border-2 transition-all hover:opacity-90 disabled:opacity-50" style={{ borderColor: '#1e3a8a', backgroundColor: '#1e3a8a', color: 'white' }}>
                {submittingId === selectedAssignment.id ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold" style={{ color: '#1e3a8a' }}>Assignment Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">x</button>
            </div>
            <h4 className="font-bold text-base mb-1" style={{ color: '#1e3a8a' }}>{selectedAssignment.title}</h4>
            <p className="text-xs text-gray-500 mb-4">{selectedAssignment.course}</p>
            <p className="text-sm text-gray-700 mb-4">{selectedAssignment.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#fef9f0' }}>
                <p className="text-xs text-gray-500 mb-1">Due Date</p>
                <p className="font-bold text-gray-800">{selectedAssignment.dueDate}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#fef9f0' }}>
                <p className="text-xs text-gray-500 mb-1">Points</p>
                <p className="font-bold text-gray-800">{selectedAssignment.points}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: selectedAssignment.status === 'submitted' ? '#e8f5e9' : '#fef9f0' }}>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="font-bold" style={{ color: selectedAssignment.status === 'submitted' ? '#28a745' : '#dc3545' }}>
                  {selectedAssignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                </p>
              </div>
              {selectedAssignment.submittedFile && (
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#e8f5e9' }}>
                  <p className="text-xs text-gray-500 mb-1">Submitted File</p>
                  <p className="font-bold text-gray-800">{selectedAssignment.submittedFile}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setShowViewModal(false)} className="flex-1 py-2 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50" style={{ borderColor: '#1e3a8a', color: '#1e3a8a', backgroundColor: 'white' }}>
                Close
              </button>
              {selectedAssignment.status === 'pending' && (
                <button onClick={() => { setShowViewModal(false); handleViewDetails(selectedAssignment) }} className="flex-1 py-2 rounded-lg font-semibold border-2 transition-all hover:opacity-90" style={{ borderColor: '#1e3a8a', backgroundColor: '#1e3a8a', color: 'white' }}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
