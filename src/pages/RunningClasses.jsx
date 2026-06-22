import React, { useState, useEffect } from 'react'
import { Clock, Users, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../component/auth/LoginModal'
import Header from '../component/Header'
import Footer from '../component/Footer'
import toast from 'react-hot-toast'
import { runningClassesApi } from '../api/runningClassesApi'
import { useDemoModal } from '../context/DemoModalContext'

export default function RunningClasses() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { openDemoModal } = useDemoModal()
  const { isAuthenticated, user } = useAuth()
  const [runningClasses, setRunningClasses] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(true)
  const [enrolling, setEnrolling] = useState(null)
  const [myEnrollments, setMyEnrollments] = useState([])

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoadingClasses(true)
        const res = await runningClassesApi.getActiveClasses()
        const data = Array.isArray(res.data) ? res.data : res.data?.content || res.data?.data || []
        setRunningClasses(data)
      } catch {
        setRunningClasses(FALLBACK_CLASSES)
      } finally {
        setLoadingClasses(false)
      }
    }
    fetchClasses()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('icfy_token')
    if (!token) return
    runningClassesApi.getMyEnrollments()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data?.content || res.data?.data || []
        setMyEnrollments(data)
      })
      .catch(() => {})
  }, [])

  const isEnrolled = (classId) =>
    myEnrollments.some(e => (e.classId || e.class?.id || e.runningClassId) === classId)

  const handleEnroll = async (classItem) => {
    if (!isAuthenticated) { setShowLoginModal(true); return }
    setEnrolling(classItem.id)
    try {
      await runningClassesApi.enroll(classItem.id)
      toast.success(`Enrolled in ${classItem.subject || classItem.title}!`)
      const res = await runningClassesApi.getMyEnrollments()
      const data = Array.isArray(res.data) ? res.data : res.data?.content || res.data?.data || []
      setMyEnrollments(data)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to enroll. Please try again.')
    } finally {
      setEnrolling(null)
    }
  }

  const handleCancelEnrollment = async (classId) => {
    const enrollment = myEnrollments.find(e => (e.classId || e.class?.id || e.runningClassId) === classId)
    if (!enrollment) return
    if (!window.confirm('Cancel your enrollment?')) return
    try {
      await runningClassesApi.cancelMyEnrollment(enrollment.id || enrollment.enrollmentId)
      toast.success('Enrollment cancelled')
      setMyEnrollments(prev => prev.filter(e => e.id !== enrollment.id))
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to cancel enrollment.')
    }
  }

  const handleFreeDemoClick = (classSubject) => {
    openDemoModal()
  }

  const handleContactUs = () => {
    // Open WhatsApp with the official iThinkLearn number
    window.open('https://wa.me/918197466607', '_blank')
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
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">🎓 Running Classes</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Join our active online classes with expert instructors, structured curriculum, and personalized guidance across multiple subjects and levels
          </p>
          <button
            onClick={() => handleFreeDemoClick('Running Classes')}
            className="bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
             Schedule Free Demo
          </button>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-6 sm:py-8 md:py-10 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Real-Time Learning with Expert Mentors
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                iThinkLearn's running classes are live, interactive learning sessions designed to provide students with expert guidance, structured content delivery, and personalized mentoring. Whether you're pursuing undergraduate courses, professional certifications, or competitive exams, our running classes offer the right learning environment.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Classes are conducted by highly qualified educators with extensive teaching experience. Each session emphasizes conceptual clarity, problem-solving skills, and exam preparation with regular doubt-clearing and interactive discussions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-lg shadow-md">
                  <Users className="text-blue-700 w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">8-18 per batch</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-lg shadow-md">
                  <Clock className="text-blue-700 w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">Flexible timing</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-lg shadow-md">
                  <Zap className="text-blue-700 w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">Live interaction</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <img
                src="https://media.istockphoto.com/id/980786884/photo/coaching-and-mentoring-concept-chart-with-keywords-and-icons.jpg?s=612x612&w=0&k=20&c=4Ai_lvfChwkgVbdLI2Nz_3PPDNgzJKFVdJUim8nGLUI="
                alt="Running Classes"
                className="w-full max-w-sm sm:max-w-md rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8 md:mb-12 leading-tight">Why Join Our Running Classes?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-blue-50 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-blue-600">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 leading-snug">
                  ✓ {benefit.title}
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
      <section className="py-6 sm:py-8 md:py-10 bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2 sm:mb-3 leading-tight">Currently Active Classes</h2>
          <p className="text-center text-gray-600 mb-6 sm:mb-8 md:mb-12 text-sm sm:text-base md:text-lg leading-relaxed">
            Browse our live and upcoming classes across various subjects and levels
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {loadingClasses ? (
              <div className="col-span-full text-center py-12 text-blue-900 font-semibold text-lg">Loading classes...</div>
            ) : runningClasses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">No active classes at the moment. Check back soon!</div>
            ) : runningClasses.map((classItem) => (
              <div key={classItem.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600 h-full flex flex-col">
                {/* Class image - only show if URL exists */}
                {classItem.image && (
                  <img
                    src={classItem.image}
                    alt={classItem.title || classItem.subject}
                    className="w-full h-36 sm:h-40 object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
                <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-snug">
                    {classItem.title || classItem.subject}
                  </h3>
                  
                  <div className="flex gap-2 mb-3 flex-wrap items-center">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {classItem.category || classItem.level}
                    </span>
                    {(classItem.difficultyLevel || classItem.difficulty) && (
                      <span className={`inline-block text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full ${
                        (classItem.difficultyLevel || classItem.difficulty) === 'Beginner' ? 'bg-green-600' :
                        (classItem.difficultyLevel || classItem.difficulty) === 'Intermediate' ? 'bg-blue-600' :
                        (classItem.difficultyLevel || classItem.difficulty) === 'Advanced' ? 'bg-orange-600' :
                        'bg-red-600'
                      }`}>
                        {classItem.difficultyLevel || classItem.difficulty}
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
                    <p><strong className="text-gray-900">Instructor:</strong> {classItem.instructorName || classItem.instructor}</p>
                    {classItem.schedule && <p><strong className="text-gray-900">Schedule:</strong> {classItem.schedule}</p>}
                    {classItem.duration && <p><strong className="text-gray-900">Duration:</strong> {classItem.duration || classItem.durationInfo}</p>}
                    {classItem.startDate && <p><strong className="text-gray-900">Start:</strong> {new Date(classItem.startDate).toLocaleDateString()}</p>}
                  </div>

                

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-green-700 text-center">
                       {classItem.status || 'Active'}
                    </span>
                    <button
                      onClick={() => handleFreeDemoClick(classItem.title || classItem.subject)}
                      className="w-full text-xs sm:text-sm font-bold  py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 transition-all hover:scale-105 shadow-md"
                    >
                      Free Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-6 sm:py-8 md:py-10 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8 md:mb-12 leading-tight">How Our Classes Work</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '1', title: 'Choose Your Class', desc: 'Browse available classes and select the one matching your subject and schedule' },
              { step: '2', title: 'Enroll & Access', desc: 'Complete enrollment and get instant access to class materials and schedule' },
              { step: '3', title: 'Attend & Interact', desc: 'Join live classes, participate in discussions, and ask doubts in real-time' },
              { step: '4', title: 'Learn & Grow', desc: 'Receive feedback, track progress, and improve with continuous guidance' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-xl transition-all text-center border-t-4 border-blue-600">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white bg-gradient-to-br from-blue-600 to-blue-800 mx-auto mb-3 sm:mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              Ready to start your learning journey with live, interactive classes?
            </p>
            <button
              onClick={handleContactUs}
              className="bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              💬 Contact Us on WhatsApp
            </button>
          </div>
        </div>
      </section>

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
