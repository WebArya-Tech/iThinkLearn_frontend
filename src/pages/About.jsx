import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import ContactModal from '../component/ContactModal'

export default function About() {
  const [activeTab, setActiveTab] = useState('mission')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const services = [
    {
      icon: '🎯',
      title: 'Personalized Learning Pathways',
      description: 'Tailored study plans, one-to-one mentoring, and goal-driven learning models customized to each student\'s academic background, pace, and target examinations.'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Faculty & Exam Specialists',
      description: 'A distinguished panel of well-trained educators, experienced professors, and industry professionals who bring deep subject expertise, exam-focused instruction, and strategic insights.'
    },
    {
      icon: '📺',
      title: 'Live & Interactive Classes',
      description: 'Engaging, concept-driven online sessions that encourage active participation, real-time doubt resolution, and discussion-based learning for enhanced understanding and retention.'
    },
    {
      icon: '📚',
      title: 'Comprehensive Study Resources',
      description: 'Access to curated notes, solved examples, graded problem sets, revision modules, mock tests, and assignment support aligned with AP, SAT, GRE, GMAT, ICFY (CFA), AMC, TMUA, and Olympiad standards.'
    },
    {
      icon: '📊',
      title: 'Continuous Assessment & Progress Tracking',
      description: 'Regular evaluations, performance analytics, and personalized feedback to help students monitor progress, identify strengths, and systematically improve weaker areas.'
    },
    {
      icon: '🎓',
      title: 'Academic & Career Mentorship',
      description: 'Guidance beyond examinations, including university readiness, competitive exam pathways, and professional mentoring to support smooth transitions into higher education and global careers.'
    }
  ]

  const teachingApproach = [
    { icon: '📖', text: 'Deep subject understanding' },
    { icon: '👥', text: 'Small, focused batches' },
    { icon: '📝', text: 'Structured learning with regular assessments' },
    { icon: '🤝', text: 'Personalized attention and mentorship' },
    { icon: '🏗️', text: 'A strong emphasis on fundamentals' }
  ]

  return (
    <div className="bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}        <div className="py-8 lg:py-8  text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About   iThinkLearn</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A premier international coaching platform with 25+ years of experience guiding students toward global academic excellence
            </p>
          </div>
        </div>

        {/* Brief History Section - Our Foundation Story */}
        <div className="py-8 lg:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Foundation Story</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    iThinkLearn is a <strong className="text-gray-900">student-focused global learning platform</strong> dedicated to helping students excel in Mathematics through conceptual clarity, structured guidance, and expert mentoring. We are committed to nurturing mathematical excellence in students across the world. With over <strong className="text-blue-600">20 years of experience</strong>, our team of expert mentors has successfully guided students from diverse countries, curriculums, and academic backgrounds. We believe that true success lies not only in high scores, but in helping every student reach the very best of their own potential. Through personalised mentoring, concept-driven teaching, and structured academic support, iThinkLearn helps learners build deep understanding, sharpen problem-solving skills, and gain the confidence to excel in mathematics courses and examinations globally.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <span className="text-2xl">💡</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Our teaching approach is designed to make mathematics <strong className="text-gray-900">meaningful, engaging, and intellectually enriching</strong> rather than mechanical or intimidating. We focus on developing clarity of thought, logical reasoning, and the ability to apply concepts with confidence and precision. Whether a student is aiming for academic improvement, competitive success, or admission to a prestigious institution, we provide the right guidance, discipline, and encouragement at every step. At iThinkLearn, we are not just teaching mathematics—we are shaping <strong className="text-blue-600">confident thinkers and future achievers</strong>.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <span className="text-2xl">📚</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    With over <strong className="text-blue-600">25+ years of combined experience</strong> in education,   iThinkLearn specializes in delivering expert-led coaching for students enrolled in advanced mathematics, quantitative reasoning, and analytical programs. The platform supports learners worldwide preparing for <strong>AP Calculus (AB & BC), BC Calculus, AP Statistics, AP Economics, and AP Biology</strong>, as well as standardized and professional exams such as <strong>SAT, ACT, GRE, GMAT, and ICFY (CFA)</strong>. In addition,   iThinkLearn offers rigorous preparation for elite competitive mathematics examinations, including <strong>AMC (USA), TMUA, IMO</strong>, and other high-level contests.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Designed with a <strong className="text-blue-600">student-first philosophy</strong>,   iThinkLearn focuses on strengthening conceptual clarity, bridging learning gaps, and building deep problem-solving ability. The curriculum emphasizes <strong>logical reasoning, mathematical rigor, and exam-oriented strategies</strong>—ensuring students develop the confidence and competence needed to tackle complex, high-difficulty problems with precision.
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    At its core,   iThinkLearn delivers a <strong className="text-blue-600">comprehensive academic ecosystem</strong> built on structured guidance, individualized tutoring, and continuous mentorship. Each program is carefully designed to align with international curricula and competitive exam standards, helping students transition seamlessly from school-level learning to advanced and competition-level expectations.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="text-center p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-linear-to-br from-green-50 to-green-100 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">1000+</div>
                <div className="text-gray-600 font-medium">Students Trained</div>
              </div>
              <div className="text-center p-6 bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">15+</div>
                <div className="text-gray-600 font-medium">Exam Categories</div>
              </div>
              <div className="text-center p-6 bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">95%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Services */}
        <div className="py-12 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Beyond academic instruction,   iThinkLearn offers a holistic learning experience that includes:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-12 lg:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Expert Team</h2>
              <p className="text-gray-600 leading-relaxed">
                Today, the   iThinkLearn team comprises <strong>highly experienced mathematics and quantitative educators</strong> who have trained hundreds of students across international boards and competitive platforms. With deep subject mastery, structured pedagogy, and a learner-centric approach, our teachers form the backbone of   iThinkLearn and uphold its commitment to academic excellence.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="font-bold text-gray-900">IIT Alumni</h3>
                <p className="text-gray-500 text-sm">Expert Faculty</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍🏫</span>
                </div>
                <h3 className="font-bold text-gray-900">Experienced Professors</h3>
                <p className="text-gray-500 text-sm">25+ Years Experience</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💼</span>
                </div>
                <h3 className="font-bold text-gray-900">Industry Professionals</h3>
                <p className="text-gray-500 text-sm">Real-world Insights</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="font-bold text-gray-900">Exam Specialists</h3>
                <p className="text-gray-500 text-sm">Proven Strategies</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-10">
              <p className="text-gray-600 leading-relaxed text-center">
                From humble beginnings to becoming a trusted name in advanced mathematics and global exam preparation, <strong className="text-blue-600">  iThinkLearn continues to inspire, mentor, and guide students worldwide</strong>—helping them build confidence, master complex concepts, and achieve outstanding results in global standardized and competitive examinations.
              </p>
            </div>
          </div>
        </div>

        {/* Vision and Mission */}
        <div className="py-12 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Vision & Mission</h2>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'mission'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                🎯 Our Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'vision'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                ✨ Our Vision
              </button>
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl mx-auto">
              {activeTab === 'mission' && (
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Empowering Students</h3>
                  </div>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      At   iThinkLearn, our mission is to <strong className="text-blue-600">empower students with strong academic foundations, conceptual clarity, and confidence</strong>, enabling them to excel in college examinations and beyond.
                    </p>
                    <p>
                      With a mission to make quality education <strong>accessible, structured, and personalized</strong>,   iThinkLearn stands as a trusted academic partner for students who seek clarity, confidence, and excellence in their educational journey. The platform is built on the belief that every learner—regardless of location, background, or academic level—deserves the opportunity to learn at their own pace, receive expert guidance, and develop the skills needed to succeed in today's competitive world.
                    </p>
                    <p>
                      At the heart of   iThinkLearn's mission is a commitment to <strong className="text-blue-600">transforming education into a more inclusive, student-centered experience</strong>. By offering tailored learning pathways, one-on-one academic mentoring, and a wide range of professional and graduation-level support programs, the platform ensures that each student receives the attention, structure, and resources they need to thrive.
                    </p>
                    <p>
                      Through expert teaching, continuous mentorship, and a structured learning approach, we strive to shape <strong>disciplined, curious, and self-driven learners</strong> who are prepared for future academic and career success.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">✨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Transforming Education Globally</h3>
                  </div>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Our vision is to become <strong className="text-blue-600">India's most trusted and result-driven online tutoring platform</strong> for students by delivering exceptional academic support and creating meaningful learning experiences.
                    </p>
                    <p>
                      We aim to build a community where every student, regardless of background or location, receives the guidance and encouragement needed to <strong>unlock their full potential</strong>.
                    </p>
                    <p>
                        iThinkLearn envisions becoming a reliable and transformative educational companion for learners around the world preparing for <strong>AP Calculus (AB & BC), BC Calculus, AP Economics, AP Statistics, AP Biology and AP Economics; TMUA, GRE and GMAT; SAT and ACT, ICFY (CFA)</strong>, and other high-level competitive math exams like <strong>IMO and AMC (USA)</strong>—one that supports them not only in their academic pursuits but also in their long-term professional growth.
                    </p>
                    <p>
                      The goal is to create a learning ecosystem where students can develop deep subject knowledge, strengthen their conceptual foundations, and acquire the practical skills required to excel in an ever-evolving global workplace.
                    </p>
                    <p>
                      This vision is rooted in the belief that <strong className="text-blue-600">true education extends beyond textbooks and examinations</strong>. It involves holistic development, critical thinking, adaptability, and the confidence to apply knowledge in real-world scenarios. By integrating structured academic support with skill-building opportunities,   iThinkLearn aims to prepare learners to meet modern challenges with competence and clarity.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message from Rohit Sir */}
        <div className="py-12 bg-linear-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Message from Rohit Sir</h2>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Founder Image - Left Side */}
                  <div className="lg:w-2/5 bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 p-8 lg:p-12 flex flex-col items-center justify-center text-center text-white">
                    <div className="relative mb-6">
                      <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                        <img 
                          src="/image copy 2.png" 
                          alt="Rohit Gupta - Founder" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Rohit Gupta</h3>
                    <p className="text-blue-200 text-lg font-medium mb-4">Founder,   iThinkLearn</p>
                   
                  </div>

                  {/* Message Content - Right Side */}
                  <div className="lg:w-3/5 p-8 lg:p-12">
                    <div className="text-5xl text-blue-200 leading-none mb-4">"</div>
                    <div className="space-y-5 text-gray-600 leading-relaxed">
                      <p className="font-semibold text-gray-800 text-xl">Dear Students and Parents,</p>
                      <p>
                        It gives me immense pride and joy to welcome you to   iThinkLearn.
                      </p>
                      <p>
                        When we founded   iThinkLearn more than 25 years ago, our vision was simple yet powerful — to create a learning environment where every student receives personal attention, builds strong conceptual clarity, and gains the confidence to excel academically and in life. Over the years, this vision has grown into a trusted educational platform supported by a team of highly experienced teachers and mentors who are passionate about student success.
                      </p>
                      <p>
                        At   iThinkLearn, we believe that <strong className="text-blue-600">education is not just about marks, but about shaping thinking, nurturing curiosity, and developing discipline and self-belief</strong>. We have seen students transform from struggling to outstanding performers when they are guided correctly, encouraged consistently, and taught with care.
                      </p>

                      {/* Teaching Approach */}
                      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 my-6">
                        <p className="font-bold text-gray-800 mb-4">Our approach to teaching is rooted in:</p>
                        <ul className="space-y-2">
                          {teachingApproach.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-gray-700">
                              <span className="text-xl">{item.icon}</span>
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p>
                        Today,   iThinkLearn proudly supports students from abroad and India who are preparing for <strong>AP Calculus (AB & BC), BC Calculus, AP Economics, AP Statistics, AP Biology and AP Economics, TMUA, GRE and GMAT, SAT and ACT, ICFY (CFA)</strong>, and other high-level competitive math exams like <strong>IMO and AMC (USA)</strong> preparation courses, helping them prepare not just for exams but for future opportunities — including college assignments, subject selection guidance, international study pathways, and project support.
                      </p>
                      <p>
                        To all parents, students and professionals who trust us and all students who learn with us, <strong className="text-blue-600">thank you for making   iThinkLearn what it is today</strong>. We remain committed to evolving continuously, maintaining the highest standards of academic excellence, and guiding every student towards success.
                      </p>
                      <div className="pt-6 border-t border-gray-200 mt-6">
                        <p className="italic text-gray-500">With warm regards and best wishes,</p>
                        <p className="font-bold text-blue-600 text-2xl mt-2">Rohit Gupta</p>
                        <p className="text-gray-500 font-medium">Founder,   iThinkLearn</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-12 bg-blue-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their academic performance with   iThinkLearn's expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                � Book Free Demo Class
              </button>
              <a href="tel:+917795010900" className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                � Call: +91 779 501 0900
              </a>
              <Link to="/contact" className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                📧 Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

