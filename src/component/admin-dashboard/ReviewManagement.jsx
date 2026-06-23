import React, { useState, useEffect, useCallback } from 'react'
import { Star, Trash2, Check, X, AlertCircle, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { adminReviewApi } from '../../api/reviewApi'

const RATING_LABELS = [
  { key: 'teachingQuality', label: 'Teaching Quality' },
  { key: 'personalAttention', label: 'Personal Attention' },
  { key: 'testSystem', label: 'Test System' },
  { key: 'overallExperience', label: 'Overall Experience' },
  { key: 'conceptClarity', label: 'Concept Clarity' },
  { key: 'doubtSolving', label: 'Doubt Solving' },
  { key: 'studyMaterial', label: 'Study Material' },
  { key: 'improvementInConfidence', label: 'Improvement in Confidence' },
  { key: 'structuredPlanning', label: 'Structured Planning' },
  { key: 'examOrientedPractice', label: 'Exam-Oriented Practice' },
  { key: 'reinforcementClasses', label: 'Reinforcement Classes' },
  { key: 'overallSatisfaction', label: 'Overall Satisfaction' },
  { key: 'batchSizeAdvantage', label: 'Batch Size Advantage' },
  { key: 'individualMonitoring', label: 'Individual Monitoring' },
  { key: 'teacherExperience', label: 'Teacher Experience' },
  { key: 'resultImprovement', label: 'Result Improvement' },
]

const Stars = ({ rating, size = 14 }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
    ))}
  </div>
)

const statusBadge = (status) => {
  const s = (status || 'pending').toLowerCase()
  const map = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${map[s] || map.pending}`}>
      {s}
    </span>
  )
}

export default function ReviewManagement() {
  const [allReviews, setAllReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [actionLoading, setActionLoading] = useState(null)
  const [viewModal, setViewModal] = useState(null)

  const normalizeReview = (r) => ({
    id: r.id,
    studentName: r.studentName || 'Unknown',
    parentName: r.parentName || '',
    email: r.email || '',
    grade: r.grade || '',
    review: r.reviewText || r.review || '',
    rating: r.overallRating || r.rating || 0,
    date: r.createdAt || r.date || new Date().toISOString(),
    status: (r.status || 'PENDING').toUpperCase(),
    detailedRatings: r.detailedRatings || {}
  })

  const loadReviews = useCallback(async () => {
    setLoading(true)
    try {
      const response = await adminReviewApi.getAdminReviews()
      const data = Array.isArray(response.data) ? response.data
        : response.data?.content || response.data?.data || []
      setAllReviews(data.map(normalizeReview))
    } catch (error) {
      toast.error('Failed to load reviews')
      setAllReviews([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  const updateStatus = async (id, newStatus) => {
    setActionLoading(id)
    try {
      if (newStatus === 'approved') {
        await adminReviewApi.approveReview(id)
      } else {
        await adminReviewApi.rejectReview(id, { reason: 'Rejected by admin' })
      }
      const statusUpper = newStatus.toUpperCase()
      setAllReviews(prev => prev.map(r => r.id === id ? { ...r, status: statusUpper } : r))
      setViewModal(prev => prev?.id === id ? { ...prev, status: statusUpper } : prev)
      toast.success(`Review ${newStatus}`)
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${newStatus} review`)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return
    setActionLoading(id)
    try {
      await adminReviewApi.deleteReview(id)
      setAllReviews(prev => prev.filter(r => r.id !== id))
      if (viewModal?.id === id) setViewModal(null)
      toast.success('Review deleted')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete review')
    } finally {
      setActionLoading(null)
    }
  }

  const filtered = selectedStatus === 'all'
    ? allReviews
    : allReviews.filter(r => r.status === selectedStatus.toUpperCase())

  const counts = {
    all: allReviews.length,
    pending: allReviews.filter(r => r.status === 'PENDING').length,
    approved: allReviews.filter(r => r.status === 'APPROVED').length,
    rejected: allReviews.filter(r => r.status === 'REJECTED').length,
  }

  const stats = [
    { label: 'Total', count: counts.all, color: 'bg-blue-900 text-white' },
    { label: 'Pending', count: counts.pending, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Approved', count: counts.approved, color: 'bg-green-100 text-green-800' },
    { label: 'Rejected', count: counts.rejected, color: 'bg-red-100 text-red-800' },
  ]

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-900">Review Management</h1>
        <p className="text-gray-500 text-sm mt-1">Approve or reject student reviews before they appear on the website</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className={`rounded-xl px-4 py-3 text-center font-bold ${s.color}`}>
            <div className="text-2xl">{s.count}</div>
            <div className="text-xs mt-0.5 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'approved', 'rejected'].map(s => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${selectedStatus === s ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${selectedStatus === s ? 'bg-white/20' : 'bg-gray-200'}`}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading reviews...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <AlertCircle className="mx-auto mb-3 text-gray-400" size={40} />
          <p className="text-gray-600 font-semibold">No {selectedStatus !== 'all' ? selectedStatus : ''} reviews found</p>
          <p className="text-gray-400 text-sm mt-1">Reviews submitted from the Write a Review page will appear here</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-900 text-white text-left">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Grade</th>
                  <th className="px-4 py-3 font-semibold">Review</th>
                  <th className="px-4 py-3 font-semibold">Rating</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((review, idx) => (
                  <tr key={review.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800">{review.studentName}</p>
                      <p className="text-xs text-gray-500">{review.parentName}</p>
                      <p className="text-xs text-gray-400">{review.email}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{review.grade}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-xs">
                      <p className="line-clamp-2 text-xs">{review.review}</p>
                    </td>
                    <td className="px-4 py-3"><Stars rating={review.rating} /></td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(review.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3">{statusBadge(review.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setViewModal(review)} className="flex items-center gap-1 px-2 py-1 bg-blue-900 text-white rounded hover:bg-blue-800 text-[10px] font-semibold transition whitespace-nowrap">
                          <Eye size={10} /> View
                        </button>
                        <button
                          onClick={() => updateStatus(review.id, 'approved')}
                          disabled={actionLoading === review.id || review.status === 'APPROVED'}
                          className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-[10px] font-semibold transition disabled:opacity-40 whitespace-nowrap"
                        >
                          <Check size={10} /> Approve
                        </button>
                        <button
                          onClick={() => updateStatus(review.id, 'rejected')}
                          disabled={actionLoading === review.id || review.status === 'REJECTED'}
                          className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-[10px] font-semibold transition disabled:opacity-40 whitespace-nowrap"
                        >
                          <X size={10} /> Reject
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          disabled={actionLoading === review.id}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-[10px] font-semibold transition disabled:opacity-40 whitespace-nowrap"
                        >
                          <Trash2 size={10} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {filtered.map(review => (
              <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{review.studentName}</p>
                    <p className="text-xs text-gray-500">{review.parentName} · {review.grade}</p>
                    <p className="text-xs text-gray-400">{review.email}</p>
                  </div>
                  {statusBadge(review.status)}
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">"{review.review}"</p>
                <div className="flex items-center justify-between">
                  <Stars rating={review.rating} />
                  <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex gap-2 flex-wrap pt-1 border-t border-gray-100">
                  <button onClick={() => setViewModal(review)} className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition">View</button>
                  <button onClick={() => updateStatus(review.id, 'approved')} disabled={review.status === 'APPROVED'} className="flex-1 py-2 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 transition disabled:opacity-40">Approve</button>
                  <button onClick={() => updateStatus(review.id, 'rejected')} disabled={review.status === 'REJECTED'} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition disabled:opacity-40">Reject</button>
                  <button onClick={() => handleDelete(review.id)} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-bold hover:bg-gray-600 transition">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* View Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-blue-900">{viewModal.studentName}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 mt-1">
                  <span>Parent: <strong>{viewModal.parentName}</strong></span>
                  <span>Grade: <strong>{viewModal.grade}</strong></span>
                  <span>Email: <strong>{viewModal.email}</strong></span>
                </div>
              </div>
              <button onClick={() => setViewModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Status + Date */}
              <div className="flex items-center justify-between">
                {statusBadge(viewModal.status)}
                <span className="text-xs text-gray-400">{new Date(viewModal.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>

              {/* Overall Rating */}
              <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Overall Rating</p>
                  <Stars rating={viewModal.rating} size={22} />
                </div>
                <span className="text-3xl font-black text-blue-900">{viewModal.rating}<span className="text-base font-normal text-gray-400">/5</span></span>
              </div>

              {/* Review Text */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Review</p>
                <p className="text-gray-700 leading-relaxed text-sm italic">"{viewModal.review}"</p>
              </div>

              {/* Detailed Ratings */}
              {viewModal.detailedRatings && (
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 pb-2 border-b">Detailed Ratings</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {RATING_LABELS.map(item => (
                      <div key={item.key} className="flex justify-between items-center py-1 border-b border-gray-50">
                        <span className="text-xs text-gray-600">{item.label}</span>
                        <Stars rating={viewModal.detailedRatings[item.key] || 0} size={12} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => updateStatus(viewModal.id, 'approved')}
                  disabled={viewModal.status === 'APPROVED'}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition disabled:opacity-40"
                >
                  <Check size={16} /> Approve
                </button>
                <button
                  onClick={() => updateStatus(viewModal.id, 'rejected')}
                  disabled={viewModal.status === 'REJECTED'}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition disabled:opacity-40"
                >
                  <X size={16} /> Reject
                </button>
                <button
                  onClick={() => handleDelete(viewModal.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-500 text-white rounded-xl font-bold text-sm hover:bg-gray-600 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
                <button onClick={() => setViewModal(null)} className="flex-1 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
