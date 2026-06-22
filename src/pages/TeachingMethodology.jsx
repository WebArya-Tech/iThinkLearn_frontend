import React, { useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import ContactModal from '../component/ContactModal'

export default function TeachingMethodology() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const steps = [
    {
      id: 1,
      title: 'Diagnostic Assessment & Batch Allocation',
      icon: '📊',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      description: 'We begin with an initial evaluation to understand each student\'s current level, strengths, and areas that need improvement. Based on this, students are placed in 4–6 member batches with similar learning pace for maximum effectiveness.'
    },
    {
      id: 2,
      title: 'Concept-Based Teaching',
      icon: '💡',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop',
      description: 'Every chapter is taught from the basics to advanced level, using real-life examples, diagrams, animations, and board-specific explanations.',
      points: [
        'Focus on clarity, not memorization',
        'Emphasis on why, not just what',
        'Encouraging logical thinking, reasoning & application'
      ]
    },
    {
      id: 3,
      title: 'Interactive Live Classes',
      icon: '🎥',
      image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=400&h=250&fit=crop',
      description: 'Our sessions are engaging and discussion-based — not lecture-style one-way teaching. Students are encouraged to ask doubts, participate actively, and solve questions live.'
    },
    {
      id: 4,
      title: 'Notes, Summaries & Learning Material',
      icon: '📚',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
      description: 'We provide comprehensive learning resources:',
      points: [
        'Chapter-wise concise notes',
        'Formula sheets and key concept summaries',
        'Question banks, solved examples, and PYQs (Previous Year Questions)'
      ],
      extra: 'This makes revision faster and more effective.'
    },
    {
      id: 5,
      title: 'Practice-Driven Learning',
      icon: '✍️',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
      description: 'After completing each topic:',
      points: [
        'Worksheets & assignments are given',
        'Students submit solutions for evaluation',
        'Teachers provide corrections and improvement feedback'
      ],
      extra: 'Practice is treated as a core learning element, not an optional activity.'
    },
    {
      id: 6,
      title: 'Regular Tests & Performance Tracking',
      icon: '📝',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=250&fit=crop',
      description: 'We conduct:',
      points: [
        'Weekly or chapter-wise tests',
        'Monthly assessments',
        'Pre-board and final revision tests'
      ],
      extra: 'Each test is analyzed, and students receive detailed feedback. Parents receive performance reports to track progress transparently.'
    },
    {
      id: 7,
      title: 'Personalized Doubt-Solving Sessions',
      icon: '🤝',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
      description: 'Special dedicated time is assigned for clearing doubts, revisiting weak topics, and one-on-one academic guidance.'
    },
    {
      id: 8,
      title: 'Revision & Exam-Focused Preparation',
      icon: '🎯',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=250&fit=crop',
      description: 'As exams approach, we conduct:',
      points: [
        'Intensive revision classes',
        'Solving of previous board questions',
        'Time-bound mock tests for writing practice',
        'Strategy sessions for exam-wise scoring'
      ],
      extra: 'Our methodology ensures students enter the exam hall with confidence, clarity, and calmness.'
    }
  ]

  const outcomes = [
    { icon: '💪', text: 'Strong fundamentals' },
    { icon: '🎯', text: 'Higher accuracy and confidence' },
    { icon: '✍️', text: 'Better writing and presentation skills' },
    { icon: '⏰', text: 'Improved time management' },
    { icon: '📈', text: 'Consistent score improvement' },
    { icon: '😊', text: 'Reduced stress and increased motivation' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section - Simple with Image */}
        <section className="py-12 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Teaching Methodology
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  At   iThinkLearn Tuitions, our teaching methodology is built on a simple belief:
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900">
                  Strong concepts + consistent practice + personalized feedback = guaranteed academic success.
                </p>
              </div>
              <div className="mt-2 lg:mt-0">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop"
                  alt="Teaching Methodology"
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <div className="py-8 md:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Over <span className="font-bold text-blue-900">25 years</span>, we have developed a proven and structured learning framework that helps students understand deeply, retain confidence, and perform exceptionally in exams. Our approach <span className="font-semibold text-gray-900">eliminates fear</span>, <span className="font-semibold text-gray-900">builds discipline</span>, and makes learning <span className="font-semibold text-gray-900">meaningful and enjoyable</span>.
            </p>
          </div>
        </div>

        {/* Step-by-Step Process */}
        <div id="steps" className="py-10 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3 md:mb-4">
                Our Step-by-Step Learning Process
              </h2>
            </div>

            {/* All Steps - Responsive Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-blue-400 transition-all group"
                >
                  {/* Card Image */}
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-2xl shrink-0">
                        {step.icon}
                      </div>
                      <span className="text-blue-900 font-bold text-sm">STEP {step.id}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    
                    <p className="text-gray-600 text-base leading-relaxed mb-3">{step.description}</p>
                    
                    {step.points && (
                      <div className="space-y-1 mb-3">
                        {step.points.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-blue-600 text-sm mt-0.5">✔</span>
                            <span className="text-gray-600 text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {step.extra && (
                      <p className="text-blue-700 text-sm font-medium">{step.extra}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teaching Philosophy */}
        <div className="py-10 md:py-16 lg:py-24 bg-linear-to-r from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
              Teaching Philosophy at <span className="text-yellow-400">  iThinkLearn</span>
            </h2>
            
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8 md:mb-12">
              {['Concept', 'Practice', 'Revision', 'Test', 'Feedback', 'Mastery'].map((item, idx, arr) => (
                <React.Fragment key={item}>
                  <div className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                    <span className="font-bold text-xs sm:text-sm md:text-base">{item}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <p className="text-lg sm:text-xl text-blue-100 px-2 sm:px-0">
              This cycle guarantees <span className="text-yellow-400 font-bold">measurable improvement</span> and <span className="text-yellow-400 font-bold">academic success</span>.
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="py-10 md:py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Learning Outcomes Expected from <span className="text-blue-900">  iThinkLearn Students</span>
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">What you can expect after joining our program</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {outcomes.map((outcome, idx) => (
                <div 
                  key={idx}
                  className="group bg-linear-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-900 group-hover:scale-110 transition-all">
                      <span className="group-hover:hidden">{outcome.icon}</span>
                      <span className="hidden group-hover:block text-white">✔</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-800">{outcome.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*   iThinkLearn Commitment */}
        <div className="py-10 md:py-16 lg:py-24 bg-linear-to-br from-yellow-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop"
                  alt="Student Success"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  The   iThinkLearn <span className="text-orange-500">Commitment</span>
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed mb-3 md:mb-4">
                  We do not aim for average improvement — <span className="font-bold text-orange-600">we aim for transformation.</span>
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  Every child receives attention, support, and guidance to achieve their highest potential.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA - Book Demo */}
        <div className="py-8 md:py-10 bg-white text-blue-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Experience Our Methodology Firsthand
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-10 px-2 sm:px-4">
              See how our proven teaching approach can transform your child's learning journey
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span className="text-xl sm:text-2xl">📞</span>
                Book Free Demo
              </button>
              <a
                href="https://wa.me/918197466607"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span className="text-xl sm:text-2xl">💬</span>
                WhatsApp Us
              </a>
            </div>
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4 text-sm text-gray-600">
              <a href="tel:+917795010900" className="flex items-center gap-1 hover:text-blue-600 transition">
                <span>📞</span> +91 779 501 0900
              </a>
              <span className="text-gray-400">•</span>
              <a href="https://wa.me/918197466607" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-green-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +91 8197 466 607
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
