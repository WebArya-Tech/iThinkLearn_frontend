import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import ContactModal from '../component/ContactModal'

const standOutPoints = [
  {
    num: '1',
    icon: '👥',
    title: 'Small Batches for Individual Attention',
    desc: 'Unlike typical coaching centers with 20–50 students, iThinkLearn maintains only 4–6 students per batch, ensuring every child receives personalized support and guidance.',
    accent: 'from-blue-500 to-blue-700',
    iconBg: 'bg-blue-100',
    img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&auto=format&fit=crop&q=80',
  },
  {
    num: '2',
    icon: '🎓',
    title: 'Highly Experienced & Specialized Teachers',
    desc: 'All subjects are taught by experts with 10–25 years of teaching experience — not college students or part-time teachers. Every teacher is a subject specialist who understands exam patterns thoroughly.',
    accent: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
  },
  {
    num: '3',
    icon: '💡',
    title: 'Conceptual Teaching, Not Rote Learning',
    desc: 'We focus on clarity of fundamentals, logical reasoning, and application-based understanding — enabling students to think, analyze, and write better answers in exams.',
    accent: 'from-yellow-500 to-orange-500',
    iconBg: 'bg-yellow-100',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
  },
  {
    num: '4',
    title: 'Structured Learning System',
    desc: 'A disciplined and systematic study plan helps students stay ahead — chapter-wise teaching, notes, regular tests, analysis, revision cycles, and final exam preparation.',
    accent: 'from-purple-500 to-indigo-600',
    iconBg: 'bg-purple-100',
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&auto=format&fit=crop&q=80',
  },
  {
    num: '5',
    title: 'Doubt-Solving & One-on-One Mentorship',
    desc: 'Special doubt classes and guided mentoring ensure that every student\'s weak areas are identified and strengthened. No student is ever left behind.',
    accent: 'from-pink-500 to-rose-600',
    iconBg: 'bg-pink-100',
    img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80',
  },
  {
    num: '6',
    title: 'Real-Time Tracking & Parent Updates',
    desc: 'We maintain complete transparency. Parents receive periodic reports on test performance, attendance, class participation, areas of improvement, and academic goals.',
    accent: 'from-cyan-500 to-blue-500',
    iconBg: 'bg-cyan-100',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
  },
  {
    num: '7',
    title: 'Advanced Teaching Tools & Technology',
    desc: 'Digital whiteboards, visual explanations, recorded sessions, and smart learning materials make complex concepts simple and engaging for every student.',
    accent: 'from-violet-500 to-purple-700',
    iconBg: 'bg-violet-100',
    img: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=600&auto=format&fit=crop&q=80',
  },
  {
    num: '8',
    title: 'Flexible Convenience of Online Learning',
    desc: 'No travel time, safer learning environment, access from anywhere — without compromising on quality or outcomes. Learn from the comfort of your home.',
    accent: 'from-orange-500 to-amber-600',
    iconBg: 'bg-orange-100',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop&q=80',
  },
  {
    num: '9',
    title: 'Proven Track Record',
    desc: 'Thousands of students have improved dramatically in academics — from average performance to top scorers. Our results speak louder than any promise.',
    accent: 'from-amber-500 to-yellow-600',
    iconBg: 'bg-amber-100',
    img: 'https://media.istockphoto.com/id/651240134/photo/record-written-on-chalkboard.webp?a=1&b=1&s=612x612&w=0&k=20&c=beSCj237dv_N1nrKIKBt1Vp339aR9SNiYE-v9Oz8w78=',
  },
]

const offerItems = [
  {
    title: 'One-on-One Personalised Mentoring',
    desc: 'Every student learns differently. Through one-on-one sessions, we understand strengths, challenges, and learning style — tailoring our approach for steady, confident progress.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    tag: 'Personalized',
    tagColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    title: 'Customized Study Schedules',
    desc: 'We design structured and realistic study plans that match the student\'s goals, pace, and routine — helping them stay organized and develop lasting study habits.',
    img: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&auto=format&fit=crop&q=80',
    tag: 'Structured',
    tagColor: 'bg-blue-100 text-blue-800',
  },
  {
    title: 'Exam Practice & Preparation Strategies',
    desc: 'Regular practice tests, time-management techniques, and exam-oriented revision methods ensure students approach questions effectively and handle exam pressure with confidence.',
    img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=80',
    tag: 'Exam Ready',
    tagColor: 'bg-green-100 text-green-800',
  },
  {
    title: 'Concept Clarity & Doubt-Solving Sessions',
    desc: 'Complex topics explained simply — ensuring students truly understand, not just memorize. Dedicated doubt-solving sessions reduce confusion and build lasting confidence.',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80',
    tag: 'Deep Learning',
    tagColor: 'bg-purple-100 text-purple-800',
  },
  {
    title: 'Continuous Performance Tracking',
    desc: 'Regular assessments and progress reviews closely monitor improvement and identify areas needing extra attention. Parents and students stay updated and motivated throughout.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    tag: 'Data-Driven',
    tagColor: 'bg-cyan-100 text-cyan-800',
  },
  {
    title: 'Career & Academic Counselling',
    desc: 'Beyond academics, we guide students in making informed decisions — from choosing the right courses and career paths to opportunities abroad. We help build a clear roadmap.',
    img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&auto=format&fit=crop&q=80',
    tag: 'Future-Focused',
    tagColor: 'bg-rose-100 text-rose-800',
  },
]

export default function HowAreDifferent() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="w-full">
      <Header />

      {/* Hero */}
      <section className="bg-white py-16 md:py-15 px-4 md:px-8 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                Why iThinkLearn
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 mb-5 leading-tight">
                How Are We{' '}
                <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                  Different?
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                At iThinkLearn, we don't just teach — we{' '}
                <strong className="text-blue-900">transform learning</strong>. Our approach is built on deep expertise, personalized attention, and proven academic success developed over{' '}
                <strong className="text-blue-900">25+ years</strong>.
              </p>
              <p className="text-base text-gray-500 mb-8 leading-relaxed">
                True academic success goes beyond traditional tutoring. We provide comprehensive academic mentoring — a holistic support system guiding students through every stage of their journey. We shape{' '}
                <strong className="text-blue-900">confident, capable learners</strong> who understand deeply and apply knowledge effectively.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-bold py-3.5 px-10 rounded-xl hover:from-blue-800 hover:to-indigo-800 transition-all shadow-lg text-base"
                >
                  Book a Free Demo Class
                </button>
                <Link to="/courses">
                  <button className="border-2 border-blue-900 text-blue-900 font-bold py-3.5 px-10 rounded-xl hover:bg-blue-50 transition text-base w-full sm:w-auto">
                    Explore Courses →
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80"
                  alt="Students learning with iThinkLearn"
                  className="w-full h-auto object-cover"
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Banner */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-10 px-4 md:px-8 border-y border-blue-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
            🎯
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">Our Methodology — Built Around You</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              We understand that every child learns differently. That's why our teaching methods, class structure, and support systems are designed to focus on{' '}
              <strong className="text-blue-900">individual progress</strong>, not generic instruction. Our methodology creates a meaningful, personalized, and structured learning experience through evidence-based principles.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes iThinkLearn Stand Out */}
      <section className="bg-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              Our Differentiators
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">What Makes iThinkLearn Stand Out?</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              9 powerful reasons why students and parents across the globe choose iThinkLearn for real, lasting academic excellence.
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-900 to-indigo-600 rounded-full mx-auto mt-5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {standOutPoints.map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative overflow-hidden h-52">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.accent} opacity-25`} />
                  <div className={`absolute top-4 left-4 bg-gradient-to-r ${item.accent} text-white text-sm font-extrabold w-9 h-9 rounded-full flex items-center justify-center shadow-lg`}>
                    {item.num}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                 
                  <h3 className="font-bold text-blue-900 text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed flex-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-50 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
           
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">What We Offer</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              A complete academic support system — from personalized mentoring to career guidance — designed to help every student thrive.
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-900 to-indigo-600 rounded-full mx-auto mt-5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerItems.map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative overflow-hidden h-48">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${item.tagColor}`}>{item.tag}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-blue-900 text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed flex-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="bg-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">The Outcome</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-900 to-indigo-600 rounded-full mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              {[
                { icon: '🚀', text: 'Students who learn with iThinkLearn experience a transformational academic journey. Our structured guidance and personalised mentoring help them build confidence, overcome challenges, and approach studies with a positive mindset.' },
                { icon: '📊', text: 'As understanding deepens and concepts become clearer, students naturally begin performing better in assessments, assignments, and examinations — leading to noticeable improvements in grades.' },
                { icon: '🧠', text: 'Beyond scores, students develop strong long-term habits: discipline, consistency, analytical thinking, and self-motivation — shaping success in higher studies, competitive exams, and professional careers.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <div className="text-3xl shrink-0">{item.icon}</div>
                  <p className="text-gray-700 text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                {label: 'Better Grades', sub: 'Consistent improvement in marks', color: 'bg-blue-50 border-blue-200' },
                {label: 'Conceptual Clarity', sub: 'Deep understanding of subjects', color: 'bg-purple-50 border-purple-200' },
                {label: 'Boosted Confidence', sub: 'Ready to face any challenge', color: 'bg-green-50 border-green-200' },
                {label: 'Success Habits', sub: 'Discipline & long-term focus', color: 'bg-amber-50 border-amber-200' },
              ].map((item, i) => (
                <div key={i} className={`${item.color} border rounded-2xl p-6 text-center hover:shadow-md transition-all`}>
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="font-bold text-blue-900 text-lg mb-1">{item.label}</p>
                  <p className="text-gray-500 text-sm">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="bg-white py-20 px-4 md:px-8 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Our Commitment
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">
              The iThinkLearn <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Promise</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mx-auto" />
          </div>

          {/* Quote Card */}
          <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl px-8 py-12 text-center mb-12 overflow-hidden shadow-2xl w-full">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
           
            <p className="text-2xl md:text-3xl font-extrabold text-white italic leading-snug mb-4">
              Every student matters.<br />Every student grows.
            </p>
            
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed text-center max-w-2xl mx-auto mb-12">
            We are committed to delivering real improvement, disciplined study habits, and strong foundations that last beyond school. With enhanced clarity, confidence, and direction, students are better prepared to achieve their goals.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🎓',
                title: 'Expert-led Teaching',
                desc: 'Learn from seasoned educators with 10–25 years of subject expertise.',
                from: 'from-blue-500',
                to: 'to-blue-700',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
              },
              {
                icon: '👥',
                title: 'Small Focused Batches',
                desc: 'Only 4–6 students per batch for personalised attention and real engagement.',
                from: 'from-indigo-500',
                to: 'to-purple-700',
                bg: 'bg-indigo-50',
                border: 'border-indigo-100',
              },
              {
                icon: '📊',
                title: 'Measurable Results',
                desc: 'Track progress with regular assessments and transparent performance reports.',
                from: 'from-cyan-500',
                to: 'to-blue-600',
                bg: 'bg-cyan-50',
                border: 'border-cyan-100',
              },
            ].map((item, i) => (
              <div key={i} className={`group ${item.bg} border ${item.border} rounded-2xl p-7 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <div className={`w-14 h-14 bg-gradient-to-br ${item.from} ${item.to} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-blue-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-10 px-4 md:px-8 ">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Experience the Difference Yourself</h2>
          <p className="text-gray-600 text-lg mb-3 leading-relaxed">
            Join a Free Demo Class and see why students and parents trust iThinkLearn.
          </p>
          <div className="text-blue-900 font-semibold text-lg mb-8 space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span>📞 Call:</span>
              <a href="tel:+917795010900" className="text-blue-600 hover:text-blue-800 underline">+91 779 501 0900</a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span>💬 WhatsApp:</span>
              <a href="https://wa.me/918197466607" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline">+91 819 746 6607</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-bold py-4 px-12 rounded-xl hover:from-blue-800 hover:to-indigo-800 transition shadow-lg text-lg"
            >
              Book a Free Demo Class Now
            </button>
            <Link to="/courses">
              <button className="border-2 border-blue-900 text-blue-900 font-bold py-4 px-12 rounded-xl hover:bg-blue-50 transition text-lg w-full sm:w-auto">
                View Our Courses →
              </button>
            </Link>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  )
}