import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import ContactModal from '../component/ContactModal'

const features = [
  {
    icon: '🎓',
    title: 'Highly Experienced Subject Experts',
    desc: 'Our team consists of seasoned educators, university professors, and industry professionals who possess strong subject-matter knowledge and a passion for teaching. Each mentor is carefully selected for their academic qualifications, teaching experience, and ability to simplify complex concepts. Students learn directly from experts who understand curriculum requirements, examination patterns, and practical applications.',
    color: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
  },
  {
    icon: '⏰',
    title: 'Flexible Schedules for International Students',
    desc: 'iThinkLearn caters to a global student community. We offer flexible class timings designed to accommodate different time zones, academic commitments, and personal schedules. Whether a student is located in Australia, the Middle East, Europe, Southeast Asia, or elsewhere, our adaptable scheduling ensures uninterrupted and convenient learning.',
    color: 'bg-green-50',
    iconBg: 'bg-green-100',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
  },
  {
    icon: '📚',
    title: 'Engaging, Easy-to-Understand Teaching Methods',
    desc: 'Our teaching approach combines interactive instruction, real-life examples, digital tools, and structured explanations to make even the most challenging subjects easy to grasp. We focus on clarity, retention, and concept mastery — ensuring that learning becomes enjoyable, engaging, and meaningful rather than overwhelming.',
    color: 'bg-yellow-50',
    iconBg: 'bg-yellow-100',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80',
  },
  {
    icon: '🌐',
    title: 'Support for Certification Level Exams at All Levels',
    desc: 'iThinkLearn specializes in preparing students for certification courses across all levels of difficulty — from foundational concepts to advanced and specialized programs. With comprehensive academic guidance spanning school (Higher and Secondary) and competitive curricula, iThinkLearn serves as a one-stop learning solution for students from diverse academic backgrounds worldwide.',
    color: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
  },
  {
    icon: '💻',
    title: 'Online Access Anytime, Anywhere',
    desc: 'Our platform ensures seamless learning with easy access to classes, study materials, recordings, assignments, and mentor feedback. Whether a student is at home, on the go, or balancing work and education, they can learn at their convenience — making education truly flexible and accessible.',
    color: 'bg-indigo-50',
    iconBg: 'bg-indigo-100',
    img: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&auto=format&fit=crop&q=80',
  },
  {
    icon: '🧭',
    title: 'Student-Centric Approach',
    desc: 'Every decision, program, and teaching method at iThinkLearn is designed with the student\'s needs in mind. We emphasize personalized guidance, continuous progress monitoring, constructive feedback, and emotional support. Our goal is not just to teach — but to mentor, motivate, and empower students to achieve their highest potential.',
    color: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
  },
]

const classFeatures = [
  { icon: '🔴', title: 'Live Interactive Sessions', desc: 'All classes are live, enabling real-time explanation, discussion, and doubt-solving. Students can ask questions instantly and engage actively — just like a physical classroom, but more focused.', img: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&auto=format&fit=crop&q=80' },
  { icon: '👥', title: 'Small Batch Size for Personal Attention', desc: 'Each batch has only 4–6 students, ensuring the teacher understands each student\'s learning pace and provides tailored guidance.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80' },
  { icon: '🖥️', title: 'Advanced Digital Tools & Teaching Aids', desc: 'We use interactive whiteboards, digital notes, visual animations, diagrams, past papers, and practical examples to enhance understanding. This makes learning engaging, clear, and application-oriented.', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80' },
  { icon: '🎬', title: 'Class Recordings for Revision', desc: 'All sessions are recorded and shared with students, so they can revise anytime — especially useful before exams.', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=80' },
  { icon: '🙋', title: 'Scheduled Doubt-Solving Support', desc: 'Separate doubt-clearing sessions and one-on-one mentoring ensure no student is left behind.', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=80' },
  { icon: '📊', title: 'Structured Weekly and Monthly Assessments', desc: 'Regular practice tests, chapter-wise assessments, and feedback reports track progress and strengthen exam preparation.', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80' },
  { icon: '👨‍👩‍👧', title: 'Parent-Teacher Updates', desc: 'Parents receive monthly performance reports and feedback on learning progress, attendance, and improvement areas.', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&auto=format&fit=crop&q=80' },
]

const comparisonRows = [
  ['Small batches, individual attention', 'Crowded classrooms with limited focus'],
  ['Learn from top expert teachers from anywhere', 'Limited to local tutor availability'],
  ['Class recordings for repeated revision', 'No access to recorded lessons'],
  ['Real-time whiteboard technology and digital resources', 'Traditional blackboard-only learning'],
  ['More time-efficient (no travel)', 'Wasted time commuting'],
  ['Flexible timings', 'Rigid schedules'],
  ['Strong parent involvement through reports', 'Limited transparency'],
]

export default function OnlineClasses() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="w-full">
      <Header />

      {/* Hero */}
      <section className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — Text */}
            <div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 mb-4 md:mb-5 leading-tight">
                High-Quality <span className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">Online Classes</span>
                <br />Designed for Excellence
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                At iThinkLearn, we specialize exclusively in online learning — ensuring every class is interactive, structured, and result-oriented. With <strong className="text-blue-900">25+ years of teaching experience</strong>, we combine expert teaching, advanced technology, and personalized attention to give students the best of convenience and academic rigor.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-bold py-3 sm:py-3.5 px-8 sm:px-10 rounded-xl hover:from-blue-800 hover:to-indigo-800 transition-all shadow-lg text-sm sm:text-base"
                >
                  Book a Free Demo Class
                </button>
                <Link to="/courses" className="w-full sm:w-auto">
                  <button className="border-2 border-blue-900 text-blue-900 font-bold py-3 sm:py-3.5 px-8 sm:px-10 rounded-xl hover:bg-blue-50 transition text-sm sm:text-base w-full">
                    Explore Courses →
                  </button>
                </Link>
              </div>
            </div>

            {/* Right — Image */}
            <div className="relative">
              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop&q=80"
                  alt="Student attending online class"
                  className="w-full h-auto object-cover"
                />
               
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 25+ Years Banner */}
      <section className="bg-blue-900 py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
          <div className="text-4xl md:text-5xl shrink-0">🌟</div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">25+ Years of Academic Mentoring Excellence</h2>
            <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
              With over two decades of proven experience, iThinkLearn brings unparalleled academic expertise to students across various disciplines. Our long-standing legacy in education reflects our commitment to student success, continuous innovation, and a deep understanding of the challenges learners face today. This experience allows us to deliver structured, reliable, and results-driven mentoring that has helped thousands of students excel academically.
            </p>
          </div>
        </div>
      </section>

      {/* How Our Classes Stand Apart */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">How Our Online Classes Stand Apart</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-full mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className={`${f.color} rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300`}>
                <img src={f.img} alt={f.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-blue-900 text-xl mb-3">{f.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Features */}
      <section className="bg-gray-50 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">What's Included in Every Class</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-full mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classFeatures.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border-2 border-gray-100 hover:border-blue-900 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <img src={f.img} alt={f.title} className="w-full h-44 object-cover" />
                <div className="p-6 flex gap-4">
                  <span className="text-3xl shrink-0">{f.icon}</span>
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2 text-lg">{f.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white py-10 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">Why Online Classes at iThinkLearn Work Better</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-full mx-auto"></div>
          </div>
          <div className="overflow-x-auto shadow-xl border border-gray-200 rounded-lg -mx-4 sm:mx-0">
            <div className="min-w-[600px] sm:min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-2">
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-4 sm:px-6 lg:px-8 py-4 md:py-5 text-white font-bold text-center text-sm sm:text-base lg:text-xl">
                  ✅ Online at iThinkLearn
                </div>
                <div className="bg-gray-600 px-4 sm:px-6 lg:px-8 py-4 md:py-5 text-white font-bold text-center text-sm sm:text-base lg:text-xl">
                  ❌ Traditional Offline Tuition
                </div>
              </div>
              {/* Rows */}
              {comparisonRows.map((row, i) => (
                <div key={i} className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}>
                  <div className="px-4 sm:px-6 lg:px-8 py-4 md:py-5 text-sm sm:text-base text-blue-900 font-medium border-r border-gray-200 flex items-start gap-2 sm:gap-3">
                    <span className="text-green-600 font-bold text-base sm:text-lg shrink-0">✓</span>
                    <span className="leading-relaxed">{row[0]}</span>
                  </div>
                  <div className="px-4 sm:px-6 lg:px-8 py-4 md:py-5 text-sm sm:text-base text-gray-500 flex items-start gap-2 sm:gap-3">
                    <span className="text-red-400 font-bold text-base sm:text-lg shrink-0">✗</span>
                    <span className="leading-relaxed">{row[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perfect for Today's Students */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Perfect for Today's Students</h2>
            <p className="text-blue-200 text-base sm:text-lg max-w-2xl mx-auto">
              Students today need flexibility, clarity, and personal mentoring. iThinkLearn's online platform delivers a learning experience that is:
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 md:mb-10">
            {['Focused and distraction-free', 'Highly interactive', 'Efficient and time-saving', 'Built around student needs'].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-center border border-white/20">
                <span className="text-yellow-400 text-xl font-bold">●</span>
                <p className="text-white font-semibold mt-2 text-sm sm:text-base">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-blue-200 text-base sm:text-lg mb-2 px-4">
            We ensure that students don't just memorize or ROTE learn — they <strong className="text-white">understand, apply, and excel</strong>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">Start Learning the iThinkLearn Way</h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6 md:mb-8 leading-relaxed px-2 sm:px-0">
            Experience a demo class and see how online learning can transform your child's performance and confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-xl hover:from-blue-800 hover:to-indigo-800 transition shadow-lg text-base sm:text-lg"
            >
              Book a Free Demo Class Now
            </button>
            <a
              href="mailto:ithinklearn@ixpoe.com"
              className="bg-transparent border-2 border-blue-900 text-blue-900 font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-xl hover:bg-blue-900 hover:text-white transition shadow-lg text-base sm:text-lg inline-flex items-center justify-center"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  )
}
