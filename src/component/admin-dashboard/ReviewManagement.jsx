import React, { useState, useEffect } from 'react';
import { Star, Trash2, Check, X, AlertCircle, Eye, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
  const [viewModal, setViewModal] = useState(null);

  // Fetch reviews from localStorage
  useEffect(() => {
    const dummyReview = {
      id: 1,
      studentName: 'Rahul Sharma',
      parentName: 'Sanjay Sharma',
      email: 'rahul.sharma@example.com',
      grade: 'UG',
      course: 'UG Mathematics',
      rating: 5,
      review: 'Excellent teaching methodology! My concepts became crystal clear through ICFY classes. Highly recommended!',
      date: '2024-01-15T10:00:00.000Z',
      status: 'approved',
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
    };

    const storedReviews = localStorage.getItem('icfy_reviews');
    if (!storedReviews) {
      localStorage.setItem('icfy_reviews', JSON.stringify([dummyReview]));
    }
    fetchReviews();
  }, [selectedStatus]);

  const fetchReviews = () => {
    setLoading(true);
    try {
      const storedReviews = localStorage.getItem('icfy_reviews');
      let reviewsList = storedReviews ? JSON.parse(storedReviews) : [];
      
      if (selectedStatus !== 'all') {
        reviewsList = reviewsList.filter(r => (r.status || 'pending').toLowerCase() === selectedStatus);
      }
      
      setReviews(reviewsList);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = (index, newStatus) => {
    try {
      const storedReviews = localStorage.getItem('icfy_reviews');
      let reviewsList = storedReviews ? JSON.parse(storedReviews) : [];
      reviewsList[index].status = newStatus;
      localStorage.setItem('icfy_reviews', JSON.stringify(reviewsList));
      toast.success(`Review ${newStatus}`);
      fetchReviews();
    } catch (error) {
      toast.error('Failed to update review');
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprove = (index) => {
    setActionLoading(index);
    updateReviewStatus(index, 'approved');
  };

  const handleReject = (index) => {
    setActionLoading(index);
    updateReviewStatus(index, 'rejected');
  };

  const handleDelete = (index) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    setActionLoading(index);
    try {
      const storedReviews = localStorage.getItem('icfy_reviews');
      let reviewsList = storedReviews ? JSON.parse(storedReviews) : [];
      reviewsList.splice(index, 1);
      localStorage.setItem('icfy_reviews', JSON.stringify(reviewsList));
      toast.success('Review deleted');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
    } finally {
      setActionLoading(null);
    }
  };

  const statusBadge = (status) => {
    const s = (status || 'pending').toLowerCase();
    const map = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${map[s] || map.pending}`}>
        {s}
      </span>
    );
  };

  const stats = [
    { label: 'Total', count: reviews.length, color: 'bg-blue-900 text-white' },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Review Management</h1>
          <p className="text-gray-500 text-sm mt-1">Review, approve, and manage student reviews</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 flex-wrap mb-6">
        {['all', 'pending', 'approved', 'rejected'].map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${selectedStatus === s
              ? 'bg-blue-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <AlertCircle className="mx-auto mb-3 text-gray-400" size={40} />
          <p className="text-gray-600">
            No {selectedStatus !== 'all' ? selectedStatus : ''} reviews found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white text-left">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Review</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, idx) => (
                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3 text-gray-800 font-medium">
                    <div>
                      <p className="font-semibold">{review.studentName}</p>
                      <p className="text-xs text-gray-500">{review.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-800 max-w-[300px]">
                    <span className="line-clamp-2">{review.review}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {statusBadge(review.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => setViewModal(review)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 text-xs font-medium"
                        title="View details"
                      >
                        <Eye size={13} /> View
                      </button>
                      <button
                        onClick={() => handleApprove(idx)}
                        disabled={actionLoading === idx || (review.status && review.status.toLowerCase() === 'approved')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 text-xs font-medium"
                        title="Approve this review"
                      >
                        <Check size={13} /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(idx)}
                        disabled={actionLoading === idx || (review.status && review.status.toLowerCase() === 'rejected')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 text-xs font-medium"
                        title="Reject this review"
                      >
                        <X size={13} /> Reject
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        disabled={actionLoading === idx}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 text-xs font-medium"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Review Modal */}
      {viewModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setViewModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-blue-900">{viewModal.studentName}</h3>
                <p className="text-sm font-semibold text-blue-700">{viewModal.course}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
                  <span>Parent: {viewModal.parentName}</span>
                  <span>Grade: {viewModal.grade}</span>
                  <span>Email: {viewModal.email}</span>
                </div>
              </div>
              <button
                onClick={() => setViewModal(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="mb-6 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
              <h4 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wider">Review Paragraph</h4>
              <p className="text-gray-700 leading-relaxed italic">"{viewModal.review}"</p>
            </div>

            {viewModal.detailedRatings && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider border-b pb-2">Detailed Ratings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    { label: 'Teaching Quality', key: 'teachingQuality' },
                    { label: 'Personal Attention', key: 'personalAttention' },
                    { label: 'Test System', key: 'testSystem' },
                    { label: 'Overall Experience', key: 'overallExperience' },
                    { label: 'Concept Clarity', key: 'conceptClarity' },
                    { label: 'Doubt Solving', key: 'doubtSolving' },
                    { label: 'Study Material', key: 'studyMaterial' },
                    { label: 'Improvement in Confidence', key: 'improvementInConfidence' },
                    { label: 'Structured Planning', key: 'structuredPlanning' },
                    { label: 'Exam-Oriented Practice', key: 'examOrientedPractice' },
                    { label: 'Reinforcement Classes', key: 'reinforcementClasses' },
                    { label: 'Overall Satisfaction', key: 'overallSatisfaction' },
                    { label: 'Batch Size Advantage', key: 'batchSizeAdvantage' },
                    { label: 'Individual Monitoring', key: 'individualMonitoring' },
                    { label: 'Teacher Experience', key: 'teacherExperience' },
                    { label: 'Result Improvement', key: 'resultImprovement' }
                  ].map((item) => (
                    <div key={item.key} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                      <span className="text-xs font-medium text-gray-600">{item.label}:</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < (viewModal.detailedRatings[item.key] || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-end pt-4 border-t border-gray-200">
              <div className="text-left">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Overall Rating</p>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < viewModal.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(viewModal.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <button
                onClick={() => setViewModal(null)}
                className="px-6 py-2.5 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
