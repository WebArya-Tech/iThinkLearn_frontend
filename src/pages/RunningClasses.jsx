import React, { useState, useEffect } from 'react'
import { Clock, Users, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../component/auth/LoginModal'
import Header from '../component/Header'
import Footer from '../component/Footer'
import toast from 'react-hot-toast'
import { runningClassesApi } from '../api/runningClassesApi'

export default function RunningClasses() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const { isAuthenticated, user } = useAuth()
  const [runningClasses, setRunningClasses] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(true)
  const [enrollmentData, setEnrollmentData] = useState({
    fullName: '',
    email: '',
    phone: '',
    classSubject: '',
    message: ''
  })

  // Update enrollment data with user info when authenticated
  React.useEffect(() => {
    if (isAuthenticated && user) {
      setEnrollmentData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [isAuthenticated, user])

  // Fetch running classes from API
  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoadingClasses(true)
        const res = await runningClassesApi.getAll()
        const data = res.data?.data || res.data || []
        const active = Array.isArray(data)
          ? data.filter(c => (c.status === 'Active' || c.status === 'active'))
          : []
        if (active.length > 0) {
          setRunningClasses(active)
        } else {
          throw new Error('empty')
        }
      } catch {
        // Fallback: localStorage → hardcoded defaults
        try {
          const saved = JSON.parse(localStorage.getItem('icfy_running_classes') || 'null')
          if (saved && saved.length > 0) {
            setRunningClasses(saved.filter(c => c.status === 'Active' || c.status === 'active'))
          } else {
            setRunningClasses(FALLBACK_CLASSES)
          }
        } catch {
          setRunningClasses(FALLBACK_CLASSES)
        }
      } finally {
        setLoadingClasses(false)
      }
    }
    fetchClasses()
  }, [])

  const handleEnrollClick = (classSubject) => {
    if (!isAuthenticated) {
      toast.error('Please login first to enroll in classes')
      setShowLoginModal(true)
      return
    }
    // User is authenticated, show enrollment form
    setSelectedClass(classSubject)
    setEnrollmentData(prev => ({
      ...prev,
      classSubject: classSubject
    }))
    setShowEnrollmentForm(true)
  }

  const handleEnrollmentSubmit = (e) => {
    e.preventDefault()
    
    // Store enrollment in localStorage
    const enrollments = JSON.parse(localStorage.getItem('runningClassEnrollments') || '[]')
    
    // Generate enrollment number (ENROLL + timestamp + random suffix)
    const enrollmentNo = `ENROLL${enrollments.length + 1}${Math.floor(Date.now() / 1000)}`
    
    const newEnrollment = {
      id: `ENROLL${Date.now()}`,
      enrollmentNo: enrollmentNo,
      fullName: enrollmentData.fullName,
      email: enrollmentData.email,
      phone: enrollmentData.phone,
      classSubject: enrollmentData.classSubject,
      specialRequirements: enrollmentData.message, // Map message to specialRequirements
      enrollmentDate: new Date().toISOString(),
      status: 'Pending'
    }
    enrollments.push(newEnrollment)
    localStorage.setItem('runningClassEnrollments', JSON.stringify(enrollments))
    
    console.log('Enrollment submitted:', newEnrollment)
    toast.success('Enrollment request submitted! Our team will contact you soon.')
    setShowEnrollmentForm(false)
    setEnrollmentData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      classSubject: '',
      message: ''
    })
  }

  const handleEnrollmentChange = (e) => {
    const { name, value } = e.target
    setEnrollmentData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const FALLBACK_CLASSES = [
    { id: 1, subject: 'UG Mathematics', level: 'Undergraduate', schedule: 'Mon, Wed, Fri - 6:00 PM IST', students: '12-15', instructor: 'Ms. Neha Aggarwal', description: 'Comprehensive mathematics coverage for B.Sc and B.Tech students', status: 'Active' },
    { id: 2, subject: 'UG Physics', level: 'Undergraduate', schedule: 'Tue, Thu - 5:30 PM IST', students: '10-12', instructor: 'Mr. Arvind', description: 'Advanced physics concepts with real-world applications', status: 'Active' },
    { id: 3, subject: 'UG Chemistry', level: 'Undergraduate', schedule: 'Mon, Wed, Fri - 4:30 PM IST', students: '8-10', instructor: 'B. Aishwarya', description: 'Organic, Inorganic, and Physical Chemistry fundamentals', status: 'Active' },
    { id: 4, subject: 'Computer Science Fundamentals', level: 'Undergraduate', schedule: 'Tue, Thu, Sat - 7:00 PM IST', students: '15-18', instructor: 'Mr. Ashwin Jain', description: 'Programming, algorithms, and software design principles', status: 'Active' },
    { id: 5, subject: 'GRE Preparation', level: 'Post-Graduate', schedule: 'Sat, Sun - 6:00 PM IST', students: '8-12', instructor: 'Ms. Ramya Rajamani', description: 'Intensive GRE verbal and quantitative reasoning', status: 'Active' },
    { id: 6, subject: 'CFA Level I', level: 'Professional', schedule: 'Thu, Sat - 8:00 PM IST', students: '10-14', instructor: 'Financial Expert', description: 'Complete CFA Level I curriculum coverage', status: 'Active' },
    { id: 7, subject: 'GMAT Coaching', level: 'Post-Graduate', schedule: 'Tue, Thu, Sat - 8:30 PM IST', students: '6-10', instructor: 'Expert Coach', description: 'Targeted GMAT verbal and quantitative strategies', status: 'Active' },
    { id: 8, subject: 'Engineering Mathematics', level: 'Undergraduate', schedule: 'Mon, Wed - 6:30 PM IST', students: '12-16', instructor: 'Mr. Ram G. Mohan', description: 'Applied mathematics for engineering students', status: 'Active' },
  ]

  const benefits = [
    {
      title: 'Small Batch Classes',
      description: 'Personalized attention with limited class size ensures every student gets mentored effectively'
    },
    {
      title: 'Flexible Timings',
      description: 'Classes scheduled at convenient times for Indian and international students across time zones'
    },
    {
      title: 'Expert Instructors',
      description: 'Learn from seasoned educators with 10+ years of teaching experience and strong subject expertise'
    },
    {
      title: 'Structured Curriculum',
      description: 'Carefully designed course content aligned with academic standards and examination patterns'
    },
    {
      title: 'Interactive Learning',
      description: 'Doubt-clearing sessions, live interactions, and real-time feedback during every class'
    },
    {
      title: 'Class Recordings',
      description: 'Access recorded sessions anytime for revision and to catch up on missed classes'
    },
    {
      title: 'Assignments & Tests',
      description: 'Regular practice assignments and tests to monitor progress and identify learning gaps'
    },
    {
      title: 'Progress Tracking',
      description: 'Periodic evaluations and detailed feedback to help you stay on track with your goals'
    }
  ]

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-8 sm:py-10 md:py-12 text-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">🎓 Running Classes</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-4 mb-6 sm:mb-8">
            Join our active online classes with expert instructors, structured curriculum, and personalized guidance across multiple subjects and levels
          </p>
          <button
            onClick={() => handleEnrollClick('Running Classes')}
            className="bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg"
          >
            {isAuthenticated ? 'Enroll Now' : 'Login to Enroll'}
          </button>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-8 sm:py-10 bg-blue-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Real-Time Learning with Expert Mentors
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                iThinkLearn's running classes are live, interactive learning sessions designed to provide students with expert guidance, structured content delivery, and personalized mentoring. Whether you're pursuing undergraduate courses, professional certifications, or competitive exams, our running classes offer the right learning environment.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Classes are conducted by highly qualified educators with extensive teaching experience. Each session emphasizes conceptual clarity, problem-solving skills, and exam preparation with regular doubt-clearing and interactive discussions.
              </p>
              <div className="flex gap-2 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow">
                  <Users size={20} className="text-blue-700 sm:w-6 sm:h-6" />
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">8-18 per batch</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow">
                  <Clock size={20} className="text-blue-700 sm:w-6 sm:h-6" />
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">Flexible timing</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow">
                  <Zap size={20} className="text-blue-700 sm:w-6 sm:h-6" />
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">Live interaction</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://media.istockphoto.com/id/980786884/photo/coaching-and-mentoring-concept-chart-with-keywords-and-icons.jpg?s=612x612&w=0&k=20&c=4Ai_lvfChwkgVbdLI2Nz_3PPDNgzJKFVdJUim8nGLUI="
                alt="Running Classes"
                className="w-full max-w-xs sm:max-w-md rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Why Join Our Running Classes?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-blue-50 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition border-l-4 border-blue-600">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Classes Section */}
      <section className="py-8 sm:py-10 bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2 sm:mb-3">Currently Active Classes</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base md:text-lg px-2">
            Browse our live and upcoming classes across various subjects and levels
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {loadingClasses ? (
              <div className="col-span-full text-center py-12 text-blue-900 font-semibold text-lg">Loading classes...</div>
            ) : runningClasses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">No active classes at the moment. Check back soon!</div>
            ) : runningClasses.map((classItem) => (
              <div key={classItem.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition border-l-4 border-blue-600 h-full flex flex-col">
                {/* Class image - only show if URL exists */}
                {classItem.image && (
                  <img
                    src={classItem.image}
                    alt={classItem.subject}
                    className="w-full h-32 sm:h-40 object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    {classItem.subject}
                  </h3>
                  
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
                      {classItem.level}
                    </span>
                    {classItem.difficultyLevel && (
                      <span className={`inline-block text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full ${
                        classItem.difficultyLevel === 'Beginner' ? 'bg-green-600' :
                        classItem.difficultyLevel === 'Intermediate' ? 'bg-blue-600' :
                        classItem.difficultyLevel === 'Advanced' ? 'bg-orange-600' :
                        'bg-red-600'
                      }`}>
                        {classItem.difficultyLevel}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {classItem.description}
                  </p>

                  {/* Topics */}
                  {classItem.topics && (
                    <div className="mb-2 pb-2 border-b border-gray-100">
                      <p className="text-xs text-gray-600 font-semibold">Topics</p>
                      <p className="text-xs text-gray-700 line-clamp-1">{classItem.topics}</p>
                    </div>
                  )}

                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 pt-2 sm:pt-3 text-xs sm:text-sm text-gray-600">
                    <p><strong className="text-gray-900">Instructor:</strong> {classItem.instructor}</p>
                    {classItem.schedule && <p><strong className="text-gray-900">Schedule:</strong> {classItem.schedule}</p>}
                    {classItem.duration && <p><strong className="text-gray-900">Duration:</strong> {classItem.duration}</p>}
                    {classItem.startDate && <p><strong className="text-gray-900">Start:</strong> {new Date(classItem.startDate).toLocaleDateString()}</p>}
                  </div>

                  {/* Enrollment Status Bar */}
                  {classItem.maxCapacity && (
                    <div className="mb-3 sm:mb-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-700">Availability:</span>
                        <span className="text-xs font-bold text-gray-900">
                          {classItem.currentEnrollment || 0}/{classItem.maxCapacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            ((classItem.currentEnrollment || 0) / classItem.maxCapacity) > 0.8 ? 'bg-red-500' :
                            ((classItem.currentEnrollment || 0) / classItem.maxCapacity) > 0.5 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{width: `${Math.min(((classItem.currentEnrollment || 0) / classItem.maxCapacity) * 100, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold text-white bg-green-700">
                      {classItem.status}
                    </span>
                    <button
                      onClick={() => handleEnrollClick(classItem.subject)}
                      className="text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 transition"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 sm:py-10 bg-blue-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">How Our Classes Work</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '1', title: 'Choose Your Class', desc: 'Browse available classes and select the one matching your subject and schedule' },
              { step: '2', title: 'Enroll & Access', desc: 'Complete enrollment and get instant access to class materials and schedule' },
              { step: '3', title: 'Attend & Interact', desc: 'Join live classes, participate in discussions, and ask doubts in real-time' },
              { step: '4', title: 'Learn & Grow', desc: 'Receive feedback, track progress, and improve with continuous guidance' }
            ].map((item, idx) => (
              <div key={idx} className="bg-blue-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white bg-blue-800 mx-auto mb-3 sm:mb-4">
                  {item.step}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 px-2">
              Ready to start your learning journey with live, interactive classes?
            </p>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setShowEnrollmentForm(true)
                  setSelectedClass('Running Classes - Browse Class')
                  setEnrollmentData(prev => ({ ...prev, classSubject: 'To be selected' }))
                } else {
                  toast.error('Please login first to enroll in classes')
                  setShowLoginModal(true)
                }
              }}
              className="bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg"
            >
              {isAuthenticated ? 'Start Enrollment' : 'Login to Get Started'}
            </button>
          </div>
        </div>
      </section>

      {/* Enrollment Form Modal */}
      {showEnrollmentForm && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/60 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl bg-linear-to-r from-blue-900 via-blue-800 to-indigo-900">
              <div className="flex justify-between items-start">
                <div className="pr-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white">Enroll in Running Class</h2>
                  <p className="text-blue-200 mt-1 text-xs sm:text-sm">Complete your enrollment for <strong className="wrap-break-word">{selectedClass}</strong></p>
                </div>
                <button
                  onClick={() => setShowEnrollmentForm(false)}
                  className="text-white hover:text-blue-200 text-2xl sm:text-3xl font-bold transition p-1 -mr-1"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleEnrollmentSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1.5 sm:mb-2">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text" name="fullName" value={enrollmentData.fullName}
                  onChange={handleEnrollmentChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 bg-white text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Your registered name</p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1.5 sm:mb-2">Email <span className="text-red-500">*</span></label>
                <input
                  type="email" name="email" value={enrollmentData.email}
                  onChange={handleEnrollmentChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 bg-white text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Your registered email</p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1.5 sm:mb-2">Phone <span className="text-red-500">*</span></label>
                <input
                  type="tel" name="phone" value={enrollmentData.phone}
                  onChange={handleEnrollmentChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 bg-white text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Your registered phone</p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1.5 sm:mb-2">Class <span className="text-red-500">*</span></label>
                <input
                  type="text" name="classSubject" value={enrollmentData.classSubject}
                  onChange={handleEnrollmentChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 bg-white text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1.5 sm:mb-2">Any Special Requirements (Optional)</label>
                <textarea
                  name="message" value={enrollmentData.message} onChange={handleEnrollmentChange}
                  placeholder="e.g., Specific timing preference, learning objectives, previous experience..."
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 resize-none text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-blue-900 bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 transition-all shadow-lg active:scale-95 text-sm sm:text-base order-1 sm:order-2"
                >
                  Confirm Enrollment
                </button>
                <button
                  type="button"
                  onClick={() => setShowEnrollmentForm(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-50 transition-all active:scale-95 text-sm sm:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onOpenSignup={() => setShowLoginModal(false)}
        onOpenForgotPassword={() => setShowLoginModal(false)}
      />

      <Footer />
    </div>
  )
}
