import React, { useState, useEffect } from 'react'
import { Star, Quote, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import toast from 'react-hot-toast'
import { getPublishedReviews } from '../api/reviewApi'

const RATING_LABELS = {
  teachingQuality: 'Teaching Quality',
  personalAttention: 'Personal Attention',
  testSystem: 'Test System',
  overallExperience: 'Overall Experience',
  conceptClarity: 'Concept Clarity',
  doubtSolving: 'Doubt Solving',
  studyMaterial: 'Study Material',
  improvementInConfidence: 'Improvement in Confidence',
  structuredPlanning: 'Structured Planning',
  examOrientedPractice: 'Exam-Oriented Practice',
  reinforcementClasses: 'Reinforcement Classes',
  overallSatisfaction: 'Overall Satisfaction',
  batchSizeAdvantage: 'Batch Size Advantage',
  individualMonitoring: 'Individual Monitoring',
  teacherExperience: 'Teacher Experience',
  resultImprovement: 'Result Improvement',
}

const getRatingsArray = (review) =>
  Object.entries(RATING_LABELS)
    .map(([key, label]) => ({ label, score: review[key] || review.detailedRatings?.[key] || 0 }))
    .filter(r => r.score > 0)

const chunkArray = (arr, size) => {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

const ReviewText = ({ text }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > 180
  return (
    <div>
      <p className={`text-gray-700 text-sm sm:text-base leading-relaxed relative z-10 ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
        "{text}"
      </p>
      {isLong && (
        <button onClick={() => setExpanded(p => !p)} className="text-[#1e3a8a] text-xs font-bold mt-1 hover:underline text-left block">
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

const Stars = ({ rating, size = 10 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <Star key={s} size={size} fill={s <= rating ? '#f59e0b' : 'none'} className={s <= rating ? 'text-amber-500' : 'text-gray-200'} />
    ))}
  </div>
)

export default function Reviews() {
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [avgRating, setAvgRating] = useState(0)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await getPublishedReviews({ page, size: 9 })
        const items = res?.content || []
        setReviews(items)
        setTotalPages(res?.totalPages || 1)
        setTotalElements(res?.totalElements || items.length)
        setAvgRating(
          items.length > 0
            ? Math.round((items.reduce((s, r) => s + (r.overallRating || 0), 0) / items.length) * 10) / 10
            : 0
        )
      } catch {
        toast.error('Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [page])

  const reviewGroups = chunkArray(reviews, 6)

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />

      <section className="pt-4 sm:pt-16 pb-6 px-4 text-center max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e3a8a] mb-3 leading-tight tracking-tight">
          Student Reviews
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto font-medium mb-6">
          Hear what our students have to say about their learning experience with iThinkLearn
        </p>

        {/* Stats Banner */}
        {!loading && totalElements > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-6">
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
              <p className="text-lg sm:text-2xl font-black text-[#1e3a8a]">{totalElements}</p>
              <p className="text-[11px] sm:text-xs font-bold text-gray-500 mt-1">Total Reviews</p>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-1.5 justify-center">
                <span className="text-lg sm:text-2xl font-black text-[#f59e0b]">{avgRating}</span>
                <Star size={16} fill="#f59e0b" className="text-amber-500" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-gray-500 mt-1">Average Rating</p>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
              <p className="text-lg sm:text-2xl font-black text-green-600">{totalPages}</p>
              <p className="text-[11px] sm:text-xs font-bold text-gray-500 mt-1">Pages</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            onClick={() => document.getElementById('reviews-grid')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-[#1e3a8a] text-white rounded-xl font-black text-base sm:text-lg hover:bg-[#162d6b] transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            Explore Reviews
          </button>
          <button
            onClick={() => navigate('/write-review')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-[#f59e0b] text-white rounded-xl font-black text-base sm:text-lg hover:bg-[#d97706] transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div id="reviews-grid" className="max-w-[1600px] mx-auto px-4 pb-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-[#1e3a8a] animate-spin mb-3" />
              <p className="text-lg font-bold text-gray-400">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-lg sm:text-xl font-bold text-gray-400">No reviews found yet.</p>
              <button
                onClick={() => navigate('/write-review')}
                className="inline-block mt-4 px-6 py-3 bg-[#f59e0b] text-white rounded-[16px] font-bold text-sm sm:text-base hover:bg-[#d97706] transition-all"
              >
                Be the first to review
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {reviewGroups.map((group, groupIndex) => (
                  <React.Fragment key={`group-${groupIndex}`}>
                    {group.map((review, index) => {
                      const ratingsArr = getRatingsArray(review)
                      return (
                        <div
                          key={review.id || `${groupIndex}-${index}`}
                          className="bg-white rounded-xl md:rounded-[24px] border border-gray-100 shadow-lg shadow-gray-200/50 flex flex-col h-full overflow-hidden hover:border-blue-100 transition-colors"
                        >
                          {/* Top */}
                          <div className="p-3 sm:p-5 md:p-6 pb-4 text-left">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1e3a8a] mb-1.5 leading-tight text-center">
                              {review.studentName || review.name}
                            </h3>
                            <p className="text-[#5c7cbd] font-semibold text-xs sm:text-sm mb-3 sm:mb-4 tracking-wide uppercase text-center">
                              {review.gradeOrClass || review.grade}
                            </p>
                            <div className="relative">
                              <Quote className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 text-blue-50 opacity-50" />
                              <ReviewText text={review.reviewText || review.review || ''} />
                            </div>
                          </div>

                          {/* Detailed Ratings */}
                          {ratingsArr.length > 0 && (
                            <div className="mx-2 sm:mx-4 mb-2 sm:mb-3 p-2 sm:p-5 bg-[#f8f9fb] rounded-xl md:rounded-[20px] border border-gray-50 flex-1">
                              <h4 className="text-[9px] sm:text-[10px] font-black text-[#999] tracking-[0.15em] uppercase mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                                DETAILED RATINGS <div className="flex-1 h-px bg-gray-200" />
                              </h4>
                              <div>
                                {ratingsArr.map((rating, idx) => (
                                  <React.Fragment key={`rating-${idx}`}>
                                    <div className="grid grid-cols-[1fr_auto] items-center gap-1.5 sm:gap-2 py-1 sm:py-1.5">
                                      <span className="text-[#444] text-[11px] sm:text-sm font-semibold leading-tight text-left">
                                        {rating.label}:
                                      </span>
                                      <Stars rating={rating.score} size={10} />
                                    </div>
                                    {(idx + 1) % 4 === 0 && idx !== ratingsArr.length - 1 && (
                                      <div className="h-px bg-gray-200 my-1" />
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Footer */}
                          <div className="px-3 sm:px-5 md:px-6 pb-4 md:pb-6 pt-3 text-left">
                            <div className="h-px bg-gray-100 mb-3 sm:mb-4 w-full" />
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2 mb-2">
                              <span className="text-[#1e3a8a] text-base sm:text-lg font-black">Overall Rating:</span>
                              <Stars rating={review.overallRating || review.rating || 5} size={16} />
                            </div>
                            <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-tight">
                              {new Date(review.submittedAt || review.publishedAt || review.createdAt || review.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                    {groupIndex !== reviewGroups.length - 1 && (
                      <div className="col-span-full h-px border-t border-gray-300 my-4 sm:my-6" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
                  <button
                    disabled={page === 0}
                    onClick={() => setPage(p => p - 1)}
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-[#1e3a8a] text-sm sm:text-base hover:bg-gray-50 disabled:opacity-50 transition-all"
                  >
                    Previous
                  </button>
                  <span className="px-4 sm:px-6 font-bold text-gray-500 text-sm sm:text-base whitespace-nowrap">
                    Page {page + 1} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages - 1}
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-[#1e3a8a] text-sm sm:text-base hover:bg-gray-50 disabled:opacity-50 transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
