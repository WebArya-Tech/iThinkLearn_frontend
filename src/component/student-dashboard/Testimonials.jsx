import React, { useState, useEffect } from 'react'
import { Star, MessageCircle, Plus, Image as ImageIcon, Video, Headphones } from 'lucide-react'
import { getApprovedTestimonials } from '../../api/testimonialApi'
import TestimonialFormModal from '../TestimonialFormModal'
import Pagination from '../ui/Pagination'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const data = await getApprovedTestimonials()
      const list = data?.content || (Array.isArray(data) ? data : [])
      setTestimonials(list)
    } catch (err) {
      console.error('Failed to load testimonials:', err)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginated = testimonials.slice(startIndex, startIndex + itemsPerPage)

  const getIcon = (t) => {
    const url = t.mediaUrl || t.content || ''
    if (url.match(/\.(mp4|webm|mov)/i) || url.startsWith('data:video/')) return <Video size={14} />
    if (url.match(/\.(mp3|wav|ogg)/i) || url.startsWith('data:audio/')) return <Headphones size={14} />
    if (url.match(/\.(jpg|jpeg|png|gif|webp)/i) || url.startsWith('data:image/')) return <ImageIcon size={14} />
    return <MessageCircle size={14} />
  }

  const ratingStats = {
    total: testimonials.length,
    avg: testimonials.length > 0 ? (testimonials.reduce((a, t) => a + (t.rating || 5), 0) / testimonials.length).toFixed(1) : '0.0',
    withMedia: testimonials.filter(t => t.mediaUrl).length
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Testimonials & Success Stories</h2>
          <p className="text-gray-500 text-sm mt-1">What students and parents say about us</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg"
        >
          <Plus size={18} /> Share Your Story
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">{ratingStats.total}</div>
          <div className="text-xs text-gray-500 mt-1">Total Stories</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500">{ratingStats.avg} ★</div>
          <div className="text-xs text-gray-500 mt-1">Avg Rating</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-indigo-500">{ratingStats.withMedia}</div>
          <div className="text-xs text-gray-500 mt-1">With Media</div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900 mb-4"></div>
          <p className="text-gray-500">Loading testimonials...</p>
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <MessageCircle size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No testimonials yet. Be the first to share your story!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((t) => (
            <div
              key={t.id || t._id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-bl-full" />
              <div className="absolute top-4 right-4 text-5xl text-gray-100 leading-none select-none">"</div>

              {/* Media Badge */}
              {t.mediaUrl && (
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {getIcon(t)}
                  <span className="ml-1">
                    {t.mediaUrl.match(/\.(mp4|webm|mov)/i) ? 'Video' : 
                     t.mediaUrl.match(/\.(mp3|wav|ogg)/i) ? 'Audio' : 
                     t.mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)/i) ? 'Image' : 'Text'}
                  </span>
                </div>
              )}

              <p className="text-gray-700 leading-relaxed mb-5 relative z-10 italic text-sm">
                "{t.text || t.message || t.quote || t.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < (t.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                ))}
              </div>

              {/* Author */}
              <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {(t.name || t.reviewerName || 'S').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name || t.reviewerName || 'Student'}</div>
                  <div className="text-xs text-gray-500">{t.role || 'Student'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={testimonials.length}
        itemsPerPage={itemsPerPage}
        alwaysShow={true}
      />

      {/* Submit Form Modal */}
      <TestimonialFormModal isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  )
}