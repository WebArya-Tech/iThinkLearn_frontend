import React, { useState, useEffect } from 'react'
// import { courseApi } from '../../api/courseApi' // API file not created - using mock data
import { useAuth } from '../../context/AuthContext'

export default function MyCourses() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [enrollingId, setEnrollingId] = useState(null)
  const [showMaterialsId, setShowMaterialsId] = useState(null)
  const itemsPerPage = 5

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      // API file not created - using mock data directly
      try {
        // const response = await courseApi.getStudentCourses()
        // setCourses(response.data.courses || response.data)
        throw new Error('API not implemented')
      } catch (apiError) {
        // Fallback to mock data if API is not available
        console.log('Using mock data (API not available)')
        setCourses([
          {
            id: 1,
            title: 'Undergraduate Mathematics - Calculus',
            tutor: 'Ms. Ramya Rajamani',
            progress: 75,
            totalClasses: 40,
            completedClasses: 30,
            upcomingClass: 'Today, 4:00 PM',
            status: 'active',
            image: '📐',
            category: 'Mathematics'
          },
          {
            id: 2,
            title: 'Physics - Mechanics & Electromagnetism',
            tutor: 'Mr. Ram G. Mohan',
            progress: 60,
            totalClasses: 35,
            completedClasses: 21,
            upcomingClass: 'Tomorrow, 3:00 PM',
            status: 'active',
            image: '⚡',
            category: 'Physics'
          },
          {
            id: 3,
            title: 'Organic Chemistry',
            tutor: 'B. Aishwarya',
            progress: 85,
            totalClasses: 30,
            completedClasses: 25,
            upcomingClass: 'Jan 22, 5:00 PM',
            status: 'active',
            image: '🧪',
            category: 'Chemistry'
          },
          {
            id: 4,
            title: 'Computer Science - Data Structures',
            tutor: 'Mr. Ashwin Jain',
            progress: 45,
            totalClasses: 38,
            completedClasses: 17,
            upcomingClass: 'Jan 23, 2:00 PM',
            status: 'active',
            image: '💻',
            category: 'Computer Science'
          },
          {
            id: 5,
            title: 'Statistics & Probability',
            tutor: 'Ms. Ramya Rajamani',
            progress: 100,
            totalClasses: 25,
            completedClasses: 25,
            upcomingClass: 'Completed',
            status: 'completed',
            image: '📊',
            category: 'Mathematics'
          }
        ])
      }
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  const handleEnrollCourse = async (courseId) => {
    try {
      setEnrollingId(courseId)
      await courseApi.enrollCourse(courseId)
      // Refresh courses after enrollment
      await fetchCourses()
    } catch (err) {
      console.error('Error enrolling course:', err)
      setError('Failed to enroll in course')
    } finally {
      setEnrollingId(null)
    }
  }

  const handleViewMaterials = async (courseId) => {
    try {
      const response = await courseApi.getCourseMaterials(courseId)
      setShowMaterialsId(courseId)
      // You could display materials in a modal or navigate to a materials page
    } catch (err) {
      console.error('Error fetching materials:', err)
    }
  }

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.status === filter)

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-900"></div>
          <p className="mt-4 text-lg font-semibold text-blue-900">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">My Courses</h2>
          <p className="text-gray-500 text-sm mt-1">Track your enrolled courses and progress</p>
        </div>
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md">
          + Enroll New Course
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 bg-white p-4 rounded-xl shadow-md flex-wrap">
        <button onClick={() => { setFilter('all'); setCurrentPage(1) }} className={`px-5 py-2 rounded-lg font-semibold transition-all text-sm ${filter === 'all' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-700 hover:bg-white'}`}>All Courses ({courses.length})</button>
        <button onClick={() => { setFilter('active'); setCurrentPage(1) }} className={`px-5 py-2 rounded-lg font-semibold transition-all text-sm ${filter === 'active' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-700 hover:bg-white'}`}>Active ({courses.filter(c => c.status === 'active').length})</button>
        <button onClick={() => { setFilter('completed'); setCurrentPage(1) }} className={`px-5 py-2 rounded-lg font-semibold transition-all text-sm ${filter === 'completed' ? 'bg-green-500 text-white shadow-md' : 'text-gray-700 hover:bg-white'}`}>Completed ({courses.filter(c => c.status === 'completed').length})</button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border-t-4"
            style={{ borderTopColor: course.status === 'completed' ? '#28a745' : '#1e3a8a' }}
          >
            <div className="p-6">
              {/* Course Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md bg-blue-900 shrink-0"
                >
                  {course.title.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#1e3a8a' }}>
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{course.tutor}</p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                  style={{
                    backgroundColor: course.status === 'completed' ? '#28a745' : '#f59e0b',
                    color: 'white'
                  }}
                >
                  {course.status === 'completed' ? 'Completed' : 'Active'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Progress</span>
                  <span className="text-sm font-bold" style={{ color: '#1e3a8a' }}>
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: course.status === 'completed' ? '#28a745' : '#f59e0b'
                    }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                  <p className="text-xs text-gray-600 mb-1">Classes</p>
                  <p className="font-bold text-gray-800">
                    {course.completedClasses}/{course.totalClasses}
                  </p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                  <p className="text-xs text-gray-600 mb-1">Next Class</p>
                  <p className="font-bold text-gray-800 text-sm">{course.upcomingClass}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  className="flex-1 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1e3a8a' }}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleViewMaterials(course.id)}
                  className="flex-1 py-2 rounded-lg font-semibold transition-all border-2 hover:bg-white"
                  style={{ 
                    borderColor: '#1e3a8a',
                    color: '#1e3a8a',
                    backgroundColor: 'transparent'
                  }}
                >
                  Materials
                </button>
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
    </div>
  )
}
