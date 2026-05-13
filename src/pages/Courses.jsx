import React, { useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import ContactModal from '../component/ContactModal'

export default function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const courseCategories = [
    {
      id: 1,
      name: 'College Admissions',
      icon: '🎓',
      color: 'from-blue-600 to-blue-800',
      courses: [
        {
          name: 'TMUA',
          id: 'tmua',
          description: 'Test of Mathematics for University Admission - Prestigious exam for top UK and European universities',
          key: ['Advanced Problem-Solving', 'Mathematical Reasoning', 'Logical Thinking', 'Proof-Based Concepts']
        },
        {
          name: 'ACT',
          id: 'act',
          description: 'American College Testing - Standardized test for US and international university admissions',
          key: ['English', 'Mathematics', 'Reading', 'Science']
        },
        {
          name: 'SAT',
          id: 'sat',
          description: 'Scholastic Assessment Test - Key exam for undergraduate admissions globally',
          key: ['Evidence-Based Reading', 'Writing', 'Math', 'Optional Essay']
        },
        {
          name: 'GRE',
          id: 'gre',
          description: 'Graduate Record Examination - Required for master\'s and PhD programs worldwide',
          key: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing']
        },
        {
          name: 'GMAT',
          id: 'gmat',
          description: 'Graduate Management Admission Test - Required for MBA and business school admissions',
          key: ['Quantitative Reasoning', 'Verbal Reasoning', 'Integrated Reasoning', 'Analytical Writing']
        }
      ]
    },
    {
      id: 2,
      name: 'Olympiad Examinations',
      icon: '🏅',
      color: 'from-blue-600 to-blue-800',
      courses: [
        {
          name: 'AMC',
          id: 'amc',
          description: 'American Mathematics Competitions - Gateway to AIME and international Olympiads',
          key: ['AMC 8', 'AMC 10', 'AMC 12', 'Advanced Problem-Solving']
        },
        {
          name: 'IMO',
          id: 'imo',
          description: 'International Mathematical Olympiad - World\'s most prestigious mathematics competition',
          key: ['Algebra', 'Geometry', 'Number Theory', 'Combinatorics']
        },
        {
          name: 'AIME',
          id: 'aime',
          description: 'American Invitational Mathematics Examination - Qualification exam between AMC and USAMO. A 15-question, 3-hour exam requiring integer answers (0–999), testing deep problem-solving in algebra, geometry, combinatorics, and number theory.',
          key: ['Algebra & Functions', 'Geometry & Trigonometry', 'Number Theory', 'Combinatorics & Probability']
        }
      ]
    },
    {
      id: 3,
      name: 'Advanced Placement (AP)',
      icon: '📚',
      color: 'from-blue-600 to-blue-800',
      courses: [
        {
          name: 'AP Calculus (AB & BC)',
          id: 'ap-calculus',
          description: 'College-level calculus courses - AB covers single-variable calculus, BC includes advanced topics',
          key: ['Limits & Continuity', 'Derivatives', 'Integrals', 'Advanced Applications']
        },
        {
          name: 'AP Statistics',
          id: 'ap-statistics',
          description: 'Data analysis and statistical reasoning for real-world applications',
          key: ['Data Exploration', 'Probability', 'Statistical Inference', 'Regression Analysis']
        },
        {
          name: 'AP Biology',
          id: 'ap-biology',
          description: 'College-level biology with emphasis on scientific reasoning and data analysis',
          key: ['Evolution', 'Energetics', 'Information Storage', 'Systems Interactions']
        },
        {
          name: 'AP Economics',
          id: 'ap-economics',
          description: 'Micro and Macroeconomics - Understanding economic reasoning and decision-making',
          key: ['Supply & Demand', 'Market Structures', 'Fiscal & Monetary Policy', 'International Trade']
        }
      ]
    }
  ]

  return (
    <div className="bg-white">
      <Header />
      {/* Hero Section */}
      <section className="py-12 md:py-16 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">🎓 Comprehensive Course Offerings</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Expert coaching for global certifications, Olympiads, AP exams, and professional qualifications
          </p>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center">
              <p className="text-3xl sm:text-4xl mb-3">🎓</p>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">College Admissions</h3>
              <p className="text-xs sm:text-sm text-gray-600">TMUA • ACT • SAT • GRE • GMAT</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center">
              <p className="text-3xl sm:text-4xl mb-3">🏅</p>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Olympiads</h3>
              <p className="text-xs sm:text-sm text-gray-600">AMC • IMO • AIME</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center">
              <p className="text-3xl sm:text-4xl mb-3">📚</p>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">AP Exams</h3>
              <p className="text-xs sm:text-sm text-gray-600">Calculus • Statistics • Biology • Economics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Course Sections */}
      {courseCategories.map((category) => (
        <section key={category.id} className="py-12 bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`bg-linear-to-r ${category.color} text-white p-8 rounded-xl mb-12`}>
              <h2 className="text-4xl font-bold mb-3">{category.icon} {category.name}</h2>
              <p className="text-lg text-white/90">Expert-led preparation for success</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {category.courses.map((course, idx) => (
                <div key={idx} id={course.id} className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition border-l-4 border-blue-600 scroll-mt-24">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.name}</h3>
                  <p className="text-gray-700 mb-6">{course.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Key Topics & Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.key.map((key, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {key}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose   iThinkLearn for Courses */}
      <section className="py-12 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose   iThinkLearn Courses?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
              <p className="text-4xl mb-4">👨‍🏫</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Faculty</h3>
              <p className="text-gray-700">Highly experienced subject specialists with 10-25 years of teaching expertise and proven track records</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
              <p className="text-4xl mb-4">📊</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Results</h3>
              <p className="text-gray-700">Thousands of students have improved dramatically - from average to top scorers with confidence and clarity</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
              <p className="text-4xl mb-4">🎯</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Learning</h3>
              <p className="text-gray-700">Small batches (4-6 students), customized study plans, and individual attention for each learner</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
              <p className="text-4xl mb-4">📚</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Resources</h3>
              <p className="text-gray-700">Curated notes, solved examples, practice tests, mock exams, and access to recorded sessions</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
              <p className="text-4xl mb-4">💻</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Online Learning</h3>
              <p className="text-gray-700">Learn from anywhere at your pace with live interactive classes and scheduled doubt-solving sessions</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
              <p className="text-4xl mb-4">📈</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-700">Regular assessments, performance reports, and continuous feedback to monitor improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-linear-to-r from-blue-900/80 via-blue-800/60 to-blue-700/50 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 px-4">
            Choose from our comprehensive range of courses and begin your path to academic excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block bg-white text-blue-900 px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-blue-50 transition transform hover:scale-105"
            >
              Book Free Demo Class
            </button>
            <a
              href="mailto:ithinklearn@ixpoe.com"
              className="inline-block bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-white hover:text-blue-900 transition transform hover:scale-105"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

