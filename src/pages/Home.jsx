import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'
import Hero from '../component/Hero'
import Footer from '../component/Footer'
import { useDemoModal } from '../context/DemoModalContext'

export default function Home() {
  const { openDemoModal } = useDemoModal()
  const features = [
    { 
      icon: '🎓', 
      title: '25+ Years of Excellence', 
      desc: 'Over 25 years of combined experience in global education and competitive exam preparation' 
    },
    { 
      icon: '👨‍🏫', 
      title: 'Expert Faculty', 
      desc: 'Highly experienced subject specialists with 10-25 years of teaching expertise' 
    },
    { 
      icon: '💡', 
      title: 'Conceptual Clarity', 
      desc: 'Deep understanding over rote learning - building strong foundations for lasting success' 
    },
    { 
      icon: '🌍', 
      title: 'Global Reach', 
      desc: 'Supporting students from India and across USA, Europe, Middle East, Australia & beyond' 
    },
  ]

  const whyChooseUs = [
    { 
      icon: '👥', 
      title: 'Small Batches (4-6 students)', 
      desc: 'Individual attention and personalized guidance for every learner' 
    },
    { 
      icon: '📱', 
      title: 'Flexible Online Learning', 
      desc: 'Learn anytime, anywhere with recorded classes and convenient scheduling' 
    },
    { 
      icon: '📊', 
      title: 'Real-Time Progress Tracking', 
      desc: 'Weekly assessments, monthly reports, and transparent parent updates' 
    },
    { 
      icon: '🎯', 
      title: 'Exam-Focused Preparation', 
      desc: 'Strategic coaching aligned with exam patterns and standards' 
    },
    { 
      icon: '💬', 
      title: 'Doubt-Solving Sessions', 
      desc: 'Dedicated support for clearing concepts and strengthening weak areas' 
    },
    { 
      icon: '🏆', 
      title: 'Proven Track Record', 
      desc: 'Thousands of students transforming from average to top scorers' 
    },
  ]

  const courses = [
    { 
      category: 'College Admissions',
      exams: ['TMUA', 'ACT', 'SAT', 'GRE', 'GMAT'],
      color: 'from-blue-600 to-blue-800'
    },
    { 
      category: 'Olympiad Exams',
      exams: ['AMC', 'IMO', 'TMUA'],
      color: 'from-purple-600 to-purple-800'
    },
    { 
      category: 'AP Examinations',
      exams: ['AP Calculus AB & BC', 'AP Statistics', 'AP Biology', 'AP Economics'],
      color: 'from-green-600 to-green-800'
    },
    { 
      category: 'ICFY',
      exams: ['CFA Program'],
      color: 'from-orange-600 to-orange-800'
    },
  ]

  const testimonials = [
    {
      name: 'Aarav S.',
      exam: 'AP Calculus BC Student',
      quote: '  iThinkLearn helped me master AP Calculus BC with complete conceptual clarity. The problem-solving approach made even the toughest questions manageable.'
    },
    {
      name: 'Rohan K.',
      exam: 'AMC (USA) Aspirant',
      quote: 'The AMC and Olympiad-style training at   iThinkLearn significantly improved my logical thinking and speed. I feel far more confident now.'
    },
    {
      name: 'Meera P.',
      exam: 'AP Statistics & SAT Student',
      quote: 'AP Statistics and SAT Math became much easier after joining   iThinkLearn. The classes are focused, interactive, and very effective.'
    },
  ]

  const parentTestimonials = [
    {
      name: 'Parent of AP Calculus AB Student',
      quote: 'The personalized attention at   iThinkLearn is outstanding. My son\'s performance in AP Calculus AB improved significantly within months.'
    },
    {
      name: 'Parent of SAT & AP Statistics Student',
      quote: '  iThinkLearn\'s structured teaching and regular feedback helped my daughter gain confidence in SAT Math and AP Statistics.'
    },
    {
      name: 'Parent of International Student',
      quote: '  iThinkLearn provides global-level coaching with consistent monitoring and feedback. We are very satisfied with the progress.'
    },
  ]
  return (
    <div className="bg-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .section-card {
          transition: all 0.3s ease;
        }

        .section-card:hover {
          transform: translateY(-8px);
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
          transform: translateY(-2px);
        }

        .btn-secondary {
          border: 2px solid white;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      <Header />
      <Hero />
      {/* Why   iThinkLearn Section */}
      <section id="why-choose" className="py-12  md:py-18 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose   iThinkLearn?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              A comprehensive global learning ecosystem designed for ambitious students preparing for world-class certifications and competitive examinations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="text-4xl md:text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Key Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Makes   iThinkLearn Different
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Built on excellence, experience, and a commitment to student success
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start bg-linear-to-r from-blue-50 to-transparent p-6 sm:p-8 rounded-lg">
                <div className="text-4xl sm:text-5xl shrink-0">{feature.icon}</div>
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 lg:text-lg">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Courses We Offer Section */}
      <section className="py-12 md:py-16 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Exam Preparation
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Expert coaching for global certifications, Olympiads, AP exams, and professional qualifications
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {courses.map((course, idx) => (
              <div key={idx} className={`bg-linear-to-br ${course.color} rounded-xl p-6 md:p-8 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}>
                <h3 className="text-xl md:text-2xl font-bold mb-6">{course.category}</h3>
                <ul className="space-y-2 md:space-y-3">
                  {course.exams.map((exam, i) => (
                    <li key={i} className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
                      <span className="text-lg">✓</span>
                      <span>{exam}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="py-10 md:py-10 bg-linear-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up leading-tight">
            Ready to Transform Your Academic Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto px-4">
            Join thousands of students who have achieved excellence with   iThinkLearn. Start your free demo class today!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap justify-center">
           
            <button onClick={openDemoModal} className="btn-secondary text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:shadow-lg transition cursor-pointer">
              ✨ Book Free Demo Class
            </button>
           
          </div>
         
        </div>
      </section>
      {/* Teaching Philosophy Section */}
      <section className="py-12 md:py-16 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Teaching Methodology
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Strong concepts + consistent practice + personalized feedback = guaranteed academic success
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-blue-600">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Diagnostic Assessment</h3>
              <p className="text-gray-700 text-sm">Initial evaluation to understand strengths and improvement areas</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-blue-600">
              <div className="text-2xl sm:text-3xl mb-3">📚</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Concept-Based Teaching</h3>
              <p className="text-xs sm:text-sm text-gray-700">Focus on clarity and logical thinking with real-life examples</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-blue-600">
              <div className="text-2xl sm:text-3xl mb-3">💬</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Interactive Learning</h3>
              <p className="text-xs sm:text-sm text-gray-700">Discussion-based sessions with real-time problem solving</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-blue-600">
              <div className="text-2xl sm:text-3xl mb-3">📊</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Performance Tracking</h3>
              <p className="text-xs sm:text-sm text-gray-700">Regular tests and detailed feedback for measurable improvement</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-purple-600">
              <div className="text-2xl sm:text-3xl mb-3">✍️</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Practice-Driven Learning</h3>
              <p className="text-xs sm:text-sm text-gray-700">Worksheets, assignments, and evaluations with constructive feedback</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-purple-600">
              <div className="text-2xl sm:text-3xl mb-3">🎯</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Exam Preparation</h3>
              <p className="text-xs sm:text-sm text-gray-700">Intensive revision, mock tests, and exam-focused strategies</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-purple-600">
              <div className="text-2xl sm:text-3xl mb-3">❓</div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Doubt-Solving Sessions</h3>
              <p className="text-xs sm:text-sm text-gray-700">Dedicated one-on-one mentoring to clarify concepts instantly</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-purple-600">
              <div className="text-2xl sm:text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Revision & Mastery</h3>
              <p className="text-gray-700 text-sm">Continuous revision cycles ensuring concept retention</p>
            </div>
          </div>
        </div>
      </section>

      {/* Online vs Traditional Comparison Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why   iThinkLearn Online Learning Works Better
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Perfect for today's ambitious students seeking flexibility, clarity, and personal mentoring
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">✅</span>   iThinkLearn Advantage
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base">
                  <span className="text-green-600 font-bold shrink-0">✓</span>
                  <span><strong>Small Batches (4-6 students)</strong> - Individual attention for every learner</span>
                </li>
                <li className="flex gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base">
                  <span className="text-green-600 font-bold shrink-0">✓</span>
                  <span><strong>Expert Faculty (10-25 years exp)</strong> - Subject specialists, not part-timers</span>
                </li>
                <li className="flex gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base">
                  <span className="text-green-600 font-bold shrink-0">✓</span>
                  <span><strong>Flexible Scheduling</strong> - Learn at your pace, anytime, anywhere</span>
                </li>
                <li className="flex gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base">
                  <span className="text-green-600 font-bold shrink-0">✓</span>
                  <span><strong>No Travel Time</strong> - Safe, convenient home-based learning</span>
                </li>
                <li className="flex gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base">
                  <span className="text-green-600 font-bold shrink-0">✓</span>
                  <span><strong>Recorded Sessions</strong> - Revision anytime with class recordings</span>
                </li>
                <li className="flex gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base">
                  <span className="text-green-600 font-bold shrink-0">✓</span>
                  <span><strong>Advanced Digital Tools</strong> - Interactive whiteboards and visual explanations</span>
                </li>
                <li className="flex gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base">
                  <span className="text-green-600 font-bold shrink-0">✓</span>
                  <span><strong>Real-Time Feedback</strong> - Instant doubt-solving and assessment feedback</span>
                </li>
                <li className="flex gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base">
                  <span className="text-green-600 font-bold shrink-0">✓</span>
                  <span><strong>Parent Updates</strong> - Monthly reports on performance and progress</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-linear-to-br from-red-50 to-orange-100 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">❌</span> Traditional Tuition Challenges
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">✗</span>
                  <span><strong>Large Groups (20-50+ students)</strong> - Limited individual attention</span>
                </li>
                <li className="flex gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">✗</span>
                  <span><strong>Inconsistent Quality</strong> - Part-time or less experienced teachers</span>
                </li>
                <li className="flex gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">✗</span>
                  <span><strong>Fixed Schedules</strong> - Must attend at predetermined times</span>
                </li>
                <li className="flex gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">✗</span>
                  <span><strong>Travel & Commute</strong> - Time-consuming journey, safety concerns</span>
                </li>
                <li className="flex gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">✗</span>
                  <span><strong>No Recorded Classes</strong> - Cannot revise missed or unclear topics</span>
                </li>
                <li className="flex gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">✗</span>
                  <span><strong>Limited Technology</strong> - Blackboard teaching, less engagement</span>
                </li>
                <li className="flex gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">✗</span>
                  <span><strong>Slow Feedback</strong> - Limited interaction due to large batches</span>
                </li>
                <li className="flex gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">✗</span>
                  <span><strong>Minimal Parent Involvement</strong> - Sporadic updates, limited transparency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-12 bg-linear-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support to help you achieve academic excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Mentoring</h3>
              <p className="text-gray-700 mb-4">Every student learns differently. Our one-on-one mentoring sessions understand your unique learning style and tailor instruction to help you grasp concepts easily and improve steadily.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customized Study Schedules</h3>
              <p className="text-gray-700 mb-4">We design structured and realistic study plans that match your academic goals and daily routine, helping you stay organized and develop healthy study habits.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-purple-600">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Exam Practice & Strategy</h3>
              <p className="text-gray-700 mb-4">Regular practice tests, time-management techniques, and exam-oriented revision methods prepare you to approach questions effectively and handle exam stress.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-purple-600">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Concept Clarity & Doubt-Solving</h3>
              <p className="text-gray-700 mb-4">Complex topics explained simply with dedicated doubt-solving sessions. We ensure you truly understand—not just memorize—building strong, lasting foundations.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-600">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Continuous Progress Tracking</h3>
              <p className="text-gray-700 mb-4">Through regular assessments and progress reviews, we closely monitor your improvement and identify areas needing attention. Regular updates keep you motivated.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-600">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Career & Academic Counselling</h3>
              <p className="text-gray-700 mb-4">Beyond academics, we guide you in making informed decisions about your future—from course selection to understanding global opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Expected Learning Outcomes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform from average to exceptional with measurable academic growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Strong Fundamentals</h3>
              <p className="text-gray-700">Build deep, lasting understanding of core concepts and principles</p>
            </div>
            
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Higher Accuracy</h3>
              <p className="text-gray-700">Improved problem-solving accuracy and exam performance</p>
            </div>
            
            <div className="bg-linear-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">✍️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Better Writing Skills</h3>
              <p className="text-gray-700">Enhanced presentation and answer-writing ability</p>
            </div>
            
            <div className="bg-linear-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Time Management</h3>
              <p className="text-gray-700">Better time utilization and exam completion strategies</p>
            </div>
            
            <div className="bg-linear-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Consistent Improvement</h3>
              <p className="text-gray-700">Measurable score improvements visible in every assessment</p>
            </div>
            
            <div className="bg-linear-to-br from-pink-50 to-pink-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">😊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Reduced Stress</h3>
              <p className="text-gray-700">Increased motivation, confidence, and stress-free learning</p>
            </div>
          </div>
        </div>
      </section>

      {/*   iThinkLearn Promise Section */}
      <section className="py-10 bg-linear-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            The   iThinkLearn Promise
          </h2>
          <p className="text-3xl md:text-4xl font-bold mb-4 leading-relaxed text-yellow-300">
            "Every student matters. Every student grows."
          </p>
          <p className="text-xl mb-4 text-blue-100 max-w-3xl mx-auto">
            We are committed to delivering real improvement, disciplined study habits, and strong foundations that last beyond school and into your career.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
          
            <button onClick={openDemoModal} className="btn-secondary text-white px-10 py-4 rounded-lg font-bold text-lg cursor-pointer">
              📚 Join a Free Demo Class
            </button>
          </div>
        </div>
      </section>

      {/* About   iThinkLearn Brief Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About   iThinkLearn
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                  iThinkLearn is a premier international coaching and academic support platform dedicated to delivering world-class education for students preparing for globally recognized certification and competitive examinations.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                With over 25 years of combined experience, our team specializes in preparing ambitious students for SAT, ACT, AP, GRE, GMAT, ICFY (CFA), TMUA, and prestigious Mathematics and science competitions like AMC and IMO.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Built on the philosophy that conceptual clarity and critical thinking outperform rote memorization,   iThinkLearn blends rigorous academic instruction with intuitive, student-centric teaching methodologies.
              </p>
              <Link to="/about" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition transform hover:scale-105">
                Learn More About Us
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-75"></div>
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJvdXQlMjB1c3xlbnwwfHwwfHx8MA%3D%3D" 
                  alt="  iThinkLearn - Online Learning Platform" 
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics Section */}
      <section className="py-12 bg-linear-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Impact & Achievement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven track record of excellence and student success
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center transform hover:-translate-y-2">
              <p className="text-5xl font-bold text-linear-to-r from-blue-600 to-blue-800 mb-3">25+</p>
              <p className="text-gray-700 font-semibold text-lg">Years of Experience</p>
              <p className="text-gray-600 text-sm mt-2">In global education and coaching</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center transform hover:-translate-y-2">
              <p className="text-5xl font-bold text-green-600 mb-3">1000+</p>
              <p className="text-gray-700 font-semibold text-lg">Students Trained</p>
              <p className="text-gray-600 text-sm mt-2">From India and across the globe</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center transform hover:-translate-y-2">
              <p className="text-5xl font-bold text-purple-600 mb-3">95%</p>
              <p className="text-gray-700 font-semibold text-lg">Success Rate</p>
              <p className="text-gray-600 text-sm mt-2">Students achieve their target scores</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center transform hover:-translate-y-2">
              <p className="text-5xl font-bold text-orange-600 mb-3">🌍</p>
              <p className="text-gray-700 font-semibold text-lg">Global Reach</p>
              <p className="text-gray-600 text-sm mt-2">Supporting students worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories Section */}
      <section className="py-12 bg-linear-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real transformations from students who achieved their dreams with   iThinkLearn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "  iThinkLearn helped me master AP Calculus BC with complete conceptual clarity. The problem-solving approach made even the toughest questions manageable. My score improved from 70% to 95%!"
              </p>
              <div>
                <p className="font-bold text-gray-900">Aarav S.</p>
                <p className="text-sm text-blue-600 font-semibold">AP Calculus BC Student</p>
                <p className="text-xs text-gray-600 mt-1">Score Improvement: 70% → 95%</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The AMC and Olympiad-style training at   iThinkLearn significantly improved my logical thinking and speed. The structured approach made complex problems feel simple. I've never felt more confident!"
              </p>
              <div>
                <p className="font-bold text-gray-900">Rohan K.</p>
                <p className="text-sm text-blue-600 font-semibold">AMC (USA) Aspirant</p>
                <p className="text-xs text-gray-600 mt-1">Qualified for AIME</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "AP Statistics and SAT Math became much easier after joining   iThinkLearn. The classes are focused, interactive, and very effective. Both exams went better than expected!"
              </p>
              <div>
                <p className="font-bold text-gray-900">Meera P.</p>
                <p className="text-sm text-blue-600 font-semibold">AP Statistics & SAT Student</p>
                <p className="text-xs text-gray-600 mt-1">Accepted to Top Universities</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 border-l-4 border-purple-600">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "I struggled with GRE Quantitative Reasoning until I joined   iThinkLearn. The personalized approach and consistent practice sessions helped me score 165/170. I'm now pursuing my dream MBA!"
              </p>
              <div>
                <p className="font-bold text-gray-900">Vikram M.</p>
                <p className="text-sm text-purple-600 font-semibold">GRE Test Taker</p>
                <p className="text-xs text-gray-600 mt-1">GRE Score: 165/170 Quant</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 border-l-4 border-purple-600">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "GMAT preparation seemed overwhelming, but   iThinkLearn's structured methodology and expert guidance made it manageable. I scored 720 and got admitted to my preferred business school!"
              </p>
              <div>
                <p className="font-bold text-gray-900">Priya N.</p>
                <p className="text-sm text-purple-600 font-semibold">GMAT Aspirant</p>
                <p className="text-xs text-gray-600 mt-1">GMAT Score: 720/800</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 border-l-4 border-purple-600">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "From struggling in AP Biology to scoring 5 on the AP exam—  iThinkLearn made that possible. The conceptual teaching approach helped me understand complex biological concepts deeply."
              </p>
              <div>
                <p className="font-bold text-gray-900">Ananya G.</p>
                <p className="text-sm text-purple-600 font-semibold">AP Biology Student</p>
                <p className="text-xs text-gray-600 mt-1">AP Score: 5/5</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Testimonials Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Parent Testimonials
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              What parents say about their children's learning journey with   iThinkLearn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <div className="flex text-lg sm:text-base text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
                "We were worried about our son's AP Calculus performance, but   iThinkLearn turned everything around. The small batch size meant he got individual attention, and his confidence grew tremendously. The monthly progress reports kept us informed every step of the way."
              </p>
              <div className="border-t border-blue-200 pt-4">
                <p className="font-bold text-gray-900 text-sm sm:text-base">Mrs. Sharma</p>
                <p className="text-xs sm:text-sm text-blue-700 font-semibold">Parent - AP Calculus Student</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6">
                "  iThinkLearn's teaching methodology is exceptional. My daughter went from dreading math to actually enjoying it. The conceptual approach helped her understand not just the 'how' but the 'why' behind each concept. Truly transformational!"
              </p>
              <div className="border-t border-blue-200 pt-4">
                <p className="font-bold text-gray-900">Mr. Patel</p>
                <p className="text-sm text-blue-700 font-semibold">Parent - SAT Math Student</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg hover:shadow-xl transition p-8">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6">
                "The flexibility of online learning combined with expert teaching is exactly what we needed. Our son could attend classes from anywhere, and the recorded sessions helped him revise whenever he had doubts. Highly professional and results-driven!"
              </p>
              <div className="border-t border-purple-200 pt-4">
                <p className="font-bold text-gray-900">Dr. Kapoor</p>
                <p className="text-sm text-purple-700 font-semibold">Parent - GRE Student</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg hover:shadow-xl transition p-8">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6">
                "What impressed us most was the transparency and communication. Regular feedback, monthly performance reports, and special doubt-solving sessions showed that   iThinkLearn genuinely cares about student success. My daughter's GMAT preparation was stress-free and productive!"
              </p>
              <div className="border-t border-purple-200 pt-4">
                <p className="font-bold text-gray-900">Mrs. Gupta</p>
                <p className="text-sm text-purple-700 font-semibold">Parent - GMAT Aspirant</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition p-8">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6">
                "The doubt-solving sessions are outstanding! My son had specific weak areas, and   iThinkLearn provided targeted support to address them. The personalized approach made all the difference in his exam preparation."
              </p>
              <div className="border-t border-green-200 pt-4">
                <p className="font-bold text-gray-900">Mr. Reddy</p>
                <p className="text-sm text-green-700 font-semibold">Parent - AP Statistics Student</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition p-8">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6">
                "Beyond academics,   iThinkLearn helped our daughter develop discipline, time management, and self-confidence. The career guidance sessions also provided valuable insights for her future. We couldn't be happier with this investment in her education!"
              </p>
              <div className="border-t border-green-200 pt-4">
                <p className="font-bold text-gray-900">Mrs. Joshi</p>
                <p className="text-sm text-green-700 font-semibold">Parent - Multiple Exams</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
