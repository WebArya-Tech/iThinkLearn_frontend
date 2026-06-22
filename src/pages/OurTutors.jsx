import React, { useState, useEffect } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { getPublicTeachers } from '../api/api/teacherApi'

export default function OurTutors() {
  const [expandedExpertise, setExpandedExpertise] = useState({})
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const normalizeTeacher = (t) => ({
    id: t.id || t._id,
    name: t.fullName || t.name || '',
    title: t.speciality || t.position || '',
    qualification: t.mainSubject || t.qualification || '',
    expertise: Array.isArray(t.expertise) ? t.expertise : String(t.mainSubject || '').split(',').map(s => s.trim()).filter(Boolean),
    image: t.photoUrl || t.image || '',
    description: t.bio || t.description || '',
    initial: (t.fullName || t.name || 'T').replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.|Prof\.)\s*/i, '').trim().split(' ').filter(Boolean).map(w => w[0]).join('').substring(0, 2).toUpperCase(),
  })

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true)
      try {
        const data = await getPublicTeachers()
        const list = Array.isArray(data) ? data : data?.content || data?.data || []
        setTutors(list.map(normalizeTeacher))
        setError(null)
      } catch (err) {
        setError('Failed to load tutors')
      } finally {
        setLoading(false)
      }
    }
    fetchTutors()
  }, [])

  const toggleExpertise = (tutorId) => {
    setExpandedExpertise(prev => ({
      ...prev,
      [tutorId]: !prev[tutorId]
    }))
  }


  const highlights = [
    {
      icon: '🎓',
      title: 'Expertise & Experience',
      description: 'Average 12+ years of experience in competitive exam preparation with proven results'
    },
    {
      icon: '🏆',
      title: 'Highly Qualified Tutors',
      description: 'Expert educators with extensive experience and proven track records in test preparation'
    },
    {
      icon: '❤️',
      title: 'Passion for Teaching',
      description: 'Dedicated to student success with personalized mentoring and continuous support'
    },
    {
      icon: '📚',
      title: 'Continuous Learning',
      description: 'Regular training and updates on latest exam patterns and teaching methodologies'
    }
  ]
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section with Image */}
        <section className="bg-white py-8 sm:py-12 lg:py-12 border-b border-gray-100 relative overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
              <div className="text-center lg:text-left">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                   Meet Our Expert Team
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Our Tutors
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  Our tutors are carefully selected from top educational institutions and have a proven track record in helping students achieve exceptional results.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm">
                    <span>✅</span> <span className="hidden sm:inline">Highly Qualified Tutors</span><span className="sm:hidden">Qualified</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm">
                    <span>✅</span> <span className="hidden sm:inline">12+ Years Avg Experience</span><span className="sm:hidden">Experienced</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm">
                    <span>✅</span> <span className="hidden sm:inline">Global Test Prep Experts</span><span className="sm:hidden">Expert</span>
                  </div>
                </div>
              </div>
              <div className="block">
                <img 
                  src="https://media.istockphoto.com/id/1429678950/photo/confident-mid-adult-male-professor-explaining-mature-adult-students-in-the-classroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=abSkWxEPH-t5I1IjxwkbVsJNj2kRJThvBbbvNv5q0Z8=" 
                  alt="Expert Tutors" 
                  className="rounded-2xl shadow-2xl w-full mt-6 lg:mt-0"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Tutors Grid */}
        <section className="py-8 sm:py-12 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Meet Our Expert Faculty</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">Each tutor brings specialized expertise and a passion for helping students achieve their academic goals.</p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="text-center py-16 text-red-500">{error}</div>
            )}

            {/* Empty State */}
            {!loading && !error && tutors.length === 0 && (
              <div className="text-center py-16 text-gray-400">No tutors found.</div>
            )}

            {/* Tutors Grid */}
            {!loading && tutors && tutors.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {tutors.map((tutor) => (
                <div 
                  key={tutor.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200"
                >
                  {/* Card Header with Initial */}
                  <div className="bg-linear-to-br from-gray-50 to-white p-4 sm:p-6 text-center border-b border-gray-100">
                    {tutor.image ? (
                      <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="w-40 sm:w-52 md:w-56 h-40 sm:h-52 md:h-56 rounded-full mx-auto mb-4 sm:mb-6 object-contain shadow-lg group-hover:scale-105 transition-transform border-4 border-blue-100"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="w-32 sm:w-40 md:w-44 h-32 sm:h-40 md:h-44 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-4xl sm:text-5xl font-bold text-white shadow-lg group-hover:scale-105 transition-transform"
                      style={{ display: tutor.image ? 'none' : 'flex' }}
                    >
                      {tutor.initial}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {tutor.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                      {tutor.title}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-6">
                    {/* Qualification */}
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-base text-gray-500 font-medium mb-1">Qualification:</p>
                      <p className="text-gray-800 font-semibold text-xs sm:text-base">{tutor.qualification}</p>
                    </div>

                    {/* Expertise */}
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-base text-gray-500 font-medium mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {(expandedExpertise[tutor.id] ? tutor.expertise : tutor.expertise.slice(0, 4)).map((item, idx) => (
                          <span 
                            key={idx}
                            className="bg-blue-50 text-blue-700 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                        {tutor.expertise.length > 4 && (
                          <button 
                            onClick={() => toggleExpertise(tutor.id)}
                            className="bg-linear-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:shadow-md transition-all cursor-pointer font-medium"
                          >
                            {expandedExpertise[tutor.id] ? '- Show less' : `+${tutor.expertise.length - 4} more`}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                      {tutor.description}
                    </p>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        </section>
        {/* Teaching Approach Section with Images */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <span className="inline-block bg-orange-100 text-orange-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                🎯 Our Approach
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                How We Help Students Excel
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl group transition-shadow duration-300">
                <div className="relative h-48 sm:h-56">
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop" 
                    alt="Interactive Teaching" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                    <h3 className="font-bold text-sm sm:text-base">Interactive Classes</h3>
                    <p className="text-xs sm:text-sm text-white/90">Live engagement & discussions</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl group transition-shadow duration-300">
                <div className="relative h-48 sm:h-56">
                  <img 
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop" 
                    alt="Personalized Learning" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                    <h3 className="font-bold text-sm sm:text-base">Personalized Learning</h3>
                    <p className="text-xs sm:text-sm text-white/90">Tailored to each student</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl group transition-shadow duration-300">
                <div className="relative h-48 sm:h-56">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop" 
                    alt="Exam Preparation" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                    <h3 className="font-bold text-sm sm:text-base">Exam Focused</h3>
                    <p className="text-xs sm:text-sm text-white/90">Strategic test preparation</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl group transition-shadow duration-300">
                <div className="relative h-48 sm:h-56">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop" 
                    alt="Doubt Solving" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                    <h3 className="font-bold text-sm sm:text-base">Doubt Solving</h3>
                    <p className="text-xs sm:text-sm text-white/90">24/7 support & guidance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Why Our Tutors Stand Out */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center mb-8 sm:mb-12">
              <div>
                <span className="inline-block bg-green-100 text-green-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                  ✨ What Makes Us Different
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Why Our Tutors Stand Out
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-xs sm:text-base">
                  Our faculty members are not just teachers – they are mentors who have walked the path of academic excellence themselves. With extensive experience and proven expertise, they understand what it takes to succeed in competitive exams.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5">✓</span>
                    <span>Proven track record of student success</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5">✓</span>
                    <span>Personalized attention in small batches</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5">✓</span>
                    <span>Regular feedback and progress tracking</span>
                  </li>
                </ul>
              </div>
              <div className="block">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1683121152928-787ececd7359?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V2h5JTIwT3VyJTIwVHV0b3JzJTIwU3RhbmQlMjBPdXR8ZW58MHx8MHx8fDA%3D" 
                  alt="Expert Teaching" 
                  className="rounded-2xl shadow-xl w-full mt-6 lg:mt-0"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {highlights.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-linear-to-br from-gray-50 to-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 text-center group"
                >
                  <div className="w-14 sm:w-16 h-14 sm:h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-2xl sm:text-3xl text-white shadow-lg group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <span className="text-green-500 text-lg sm:text-xl">✓</span>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-base">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-12 bg-linear-to-r from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold">
                🌟 Start Your Journey Today
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Book a Free Demo Class and Experience World-Class Education
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have achieved their academic dreams with   iThinkLearn's expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+917795010900" 
                className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg"
              >
                📞 Book Free Demo Class
              </a>
              <a 
                href="mailto:  ithinklearn@ixpoe.com" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                📧 Email Us
              </a>
            </div>
           
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
