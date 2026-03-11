import React, { useState, useEffect } from 'react';
import { Star, Trash2, Check, X, AlertCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getAllTestimonials,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
} from '../../api/testimonialApi';

const STATIC_TESTIMONIALS = [
  {
    _id: 'static-1',
    name: 'Riya Sharma',
    role: 'CFA Level II Candidate',
    status: 'approved',
    rating: 5,
    message:
      'ICFY has completely transformed the way I prepare for my CFA exams. The structured study material, live doubt sessions, and dedicated faculty support made a huge difference. I cleared Level I with a 90th percentile score — something I could not have achieved without this platform!',
  },
];

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
  const [viewModal, setViewModal] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, [selectedStatus]);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getAllTestimonials();
      setTestimonials([...STATIC_TESTIMONIALS, ...(data || [])]);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
      setTestimonials(STATIC_TESTIMONIALS);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await approveTestimonial(id);
      setTestimonials((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: 'approved' } : t))
      );
      toast.success('Testimonial approved');
    } catch (error) {
      console.error('Error approving testimonial:', error);
      toast.error('Failed to approve testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      await rejectTestimonial(id);
      setTestimonials((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: 'rejected' } : t))
      );
      toast.success('Testimonial rejected');
    } catch (error) {
      console.error('Error rejecting testimonial:', error);
      toast.error('Failed to reject testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    setActionLoading(id);
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      toast.success('Testimonial deleted');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredTestimonials =
    selectedStatus === 'all'
      ? testimonials
      : testimonials.filter((t) => t.status === selectedStatus);

  const statusBadge = (status) => {
    const map = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || map.pending}`}>
        {status}
      </span>
    );
  };

  const stats = [
    { label: 'Total', count: testimonials.length, color: 'bg-blue-900 text-white' },
    { label: 'Pending', count: testimonials.filter(t => t.status === 'pending').length, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Approved', count: testimonials.filter(t => t.status === 'approved').length, color: 'bg-green-100 text-green-800' },
    { label: 'Rejected', count: testimonials.filter(t => t.status === 'rejected').length, color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Testimonial Management</h1>
        <p className="text-gray-500 text-sm mt-1">Review, approve, and manage student testimonials</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl p-4 text-center font-semibold ${s.color}`}>
            <div className="text-2xl font-bold">{s.count}</div>
            <div className="text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 flex-wrap mb-6">
        {['all', 'pending', 'approved', 'rejected'].map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
              selectedStatus === s
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
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <AlertCircle className="mx-auto mb-3 text-gray-400" size={40} />
          <p className="text-gray-600">
            No {selectedStatus !== 'all' ? selectedStatus : ''} testimonials found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white text-left">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonials.map((t, idx) => (
                <tr key={t._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{t.name}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">{t.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < t.rating ? 'fill-[#eab308] text-[#eab308]' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">{statusBadge(t.status)}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px]">
                    <span className="line-clamp-2">{t.message}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => setViewModal(t)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-xs font-medium"
                        title="View details"
                      >
                        <Eye size={13} /> View
                      </button>
                      {t.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(t._id)}
                            disabled={actionLoading === t._id}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 text-xs font-medium"
                          >
                            <Check size={13} /> Approve
                          </button>
                          <button
                            onClick={() => handleReject(t._id)}
                            disabled={actionLoading === t._id}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 text-xs font-medium"
                          >
                            <X size={13} /> Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(t._id)}
                        disabled={actionLoading === t._id}
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

      {/* View Message Modal */}
      {viewModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setViewModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-blue-900">{viewModal.name}</h3>
                <p className="text-sm text-gray-500">{viewModal.role}</p>
              </div>
              <button
                onClick={() => setViewModal(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < viewModal.rating ? 'fill-[#eab308] text-[#eab308]' : 'text-gray-300'}
                />
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">{viewModal.message}</p>

            <div className="flex items-center justify-between flex-wrap gap-2">
              {statusBadge(viewModal.status)}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => { handleApprove(viewModal._id); setViewModal(null); }}
                  disabled={actionLoading === viewModal._id}
                  className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <Check size={15} /> Approve
                </button>
                <button
                  onClick={() => { handleReject(viewModal._id); setViewModal(null); }}
                  disabled={actionLoading === viewModal._id}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <X size={15} /> Reject
                </button>
                <button
                  onClick={() => { handleDelete(viewModal._id); setViewModal(null); }}
                  disabled={actionLoading === viewModal._id}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
