import React, { useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
export default function OurTutors() {
  const [expandedExpertise, setExpandedExpertise] = useState({})

  const toggleExpertise = (tutorId) => {
    setExpandedExpertise(prev => ({
      ...prev,
      [tutorId]: !prev[tutorId]
    }))
  }
  const tutors = [
    {
      id: 1,
      name: 'B. Aishwarya',
      image: '/tutors/AISHWARYA_Professional Photo.png',
      title: 'Chemistry Expert | SAT Subject Test & AP Chemistry Trainer',
      qualification: 'M.Sc. in Chemistry from NIT Rourkela | GATE (Chemistry) AIR 390',
      expertise: ['Chemistry', 'SAT Subject Test', 'AP Chemistry', 'GRE', 'GMAT Quant'],
      description: 'B. Aishwarya is an accomplished Chemistry educator specializing in preparing students for global standardized exams such as SAT Subject Tests, AP Chemistry, and foundational Chemistry sections relevant to GRE and GMAT Quant. An expert with a M.Sc. in Chemistry from NIT Rourkela, she further distinguished herself by clearing GATE (Chemistry) with an impressive AIR 390. Aishwarya has extensive experience designing curriculum-aligned study material, structured notes, and exam-focused summaries for international learners. Her deep conceptual clarity and ability to simplify challenging topics make her highly effective in preparing students for competitive aptitude-based tests. She uses visual explanations, digital tools, and analytical teaching methods to strengthen students\' conceptual understanding, reasoning skills, and problem-solving speed—skills crucial for exams like SAT, AP, GRE, and GMAT. Aishwarya remains committed to helping learners build confidence, overcome weaknesses, and achieve high scores in international Chemistry and Quantitative exams.',
      initial: 'BA'
    },
    {
      id: 2,
      name: 'Mr. Vijay Kalyan',
      image: '/tutors/Vijay Kalyan_Professional Photo.PNG',
      title: 'Mathematics, Physics & Quant Faculty | SAT, ACT, GRE, GMAT, AMC and IMO Trainer',
      qualification: 'B.E. in Electrical Engineering from Kalyani Government Engineering College',
      expertise: ['Mathematics', 'Physics', 'SAT', 'ACT', 'GRE', 'GMAT', 'AMC', 'IMO'],
      description: 'Mr. A. Vijay Kalyan is a dedicated educator with strong conceptual command across Mathematics, Physics, and Quantitative Reasoning, offering specialized coaching for SAT, ACT, AP Calculus, and GRE/GMAT Quant. An Electrical Engineering graduate from Kalyani Government Engineering College, he combines analytical depth with an engaging teaching style. His experience includes guiding global test-prep students to build solid foundations in algebra, arithmetic, data interpretation, and physics-based reasoning. His structured sessions reflect the rigor and patterns of exams like SAT Math, ACT Math & Science, GRE Quant, GMAT Quant, and AP Physics. With additional professional experience in a multinational company, Mr. Vijay incorporates real-world engineering logic into his teaching, helping students develop intuition and accuracy for high-stakes standardized tests.',
      initial: 'VK'
    },
    {
      id: 3,
      name: 'Ms. Balasaritha P',
      image: '/tutors/Saritha_Professional Photo.png',
      title: 'Physics & Mathematics Educator | SAT, ACT & AP Physics Specialist',
      qualification: 'Ph.D. in Physics | NET Qualified (AIR 132)',
      expertise: ['Physics', 'Mathematics', 'SAT', 'ACT', 'AP Physics', 'GRE Quant'],
      description: 'Ms. Balasaritha P is a highly qualified Physics and Mathematics faculty member with a Ph.D. in Physics and NET qualification (AIR 132). She now focuses exclusively on mentoring students for SAT Math, SAT Subject Tests, ACT Math & Science, AP Physics, and GRE Quant preparation. Her experience spans both digital learning platforms and personalized coaching. She specializes in curriculum mapping, high-yield concept reinforcement, and pattern-based problem-solving, perfectly aligned with international test formats. Her clarity, patience, and step-by-step explanations help learners master challenging topics such as mechanics, electricity, calculus-based reasoning, and data interpretation. With a student-first approach, she ensures students consistently perform with confidence in global competitive exams.',
      initial: 'BP'
    },
    {
      id: 4,
      name: 'Mr. Sant Kumar Verma',
      image: '/tutors/Sant Kumar_Professional Photo.png',
      title: 'Quantitative Reasoning & Physics Specialist | SAT, ACT, AMC, IMO, GRE Trainer',
      qualification: 'Engineering Graduate | 10+ Years Experience',
      expertise: ['Algebra & Functions', 'Trigonometry', 'Probability & Statistics', 'Arithmetic & Data Interpretation', 'Physics Numerical & Applied Concepts'],
      description: 'Mr. Sant Kumar Verma brings over a decade of experience in preparing learners for SAT Math, ACT Math & Science, GRE Quant, and AP-level Physics and Math content. An engineering graduate, he combines theoretical clarity with strong analytical reasoning skills. He specializes in key quantitative domains such as Algebra & Functions, Trigonometry, Probability & Statistics, Arithmetic & Data Interpretation, and Physics Numerical & Applied Concepts. Mr. Sant is known for simplifying complex reasoning processes, improving student accuracy, and helping learners sharpen their test-taking strategy for time-bound international exams. His structured lessons focus on high-frequency topics, rigorous practice, and exam-focused mastery—making him a trusted mentor for competitive test aspirants worldwide.',
      initial: 'SV'
    },
    {
      id: 5,
      name: 'Ms. Ramya Rajamani',
      image: '/tutors/Ramya_Professional Photo.PNG',
      title: 'Mathematics, Statistics & Quant Trainer | SAT, ACT, IMO, TMUA, GRE, GMAT Specialist',
      qualification: '19+ Years of Teaching Experience | Research Analyst Background',
      expertise: ['Algebra & Advanced Functions', 'Calculus (School & AP Level)', 'Statistics & Probability', 'Graphical/Data Interpretation', 'Quantitative Comparison & Analytical Skills'],
      description: 'With over 19 years of experience, Ms. Ramya Rajamani is a senior educator specializing in SAT Math, ACT Math, TMUA, GRE Quantitative Reasoning, GMAT Quant, AP Statistics, and AP Calculus fundamentals. She teaches with exceptional clarity and ensures students build strong fundamentals needed for high performance in quantitative sections. Her expertise covers Algebra & Advanced Functions, Calculus (School & AP Level), Statistics & Probability, Graphical/Data Interpretation, and Quantitative Comparison & Analytical Skills. Her background as a Research Analyst enables her to connect theoretical math with real-world logic—making her training highly effective for GRE, GMAT, and SAT-style reasoning questions. With her calm, encouraging, and structured approach, she helps students achieve competitive international exam scores.',
      initial: 'RR'
    },
    {
      id: 6,
      name: 'Mr. Ram G. Mohan',
      image: '/tutors/Ram Mohan_Professional Photo.PNG',
      title: 'Physics & Quant Educator | IIT Delhi | SAT, ACT, AP & GRE Tutor',
      qualification: 'M.Tech from IIT Delhi | 10+ Years Teaching Experience',
      expertise: ['AP Physics (Mechanics & Electricity)', 'SAT/ACT problem-solving', 'GRE/GMAT Quant', 'Data-driven assessment'],
      description: 'Mr. Ram G. Mohan, with an M.Tech from IIT Delhi, is an accomplished educator specializing in Physics and Quantitative Reasoning for SAT, ACT, AP Physics, GRE, and GMAT Quant. His academic depth and more than a decade of teaching experience make him a highly respected trainer. His test-prep experience includes AP Physics (Mechanics & Electricity) coaching, SAT/ACT problem-solving strategies, GRE/GMAT Quant strengthening, and Data-driven assessment and feedback. His prior work in top software companies enriches his approach, helping students relate abstract concepts to real-world logic—a key requirement for global standardized exams. Known for his disciplined teaching and conceptual clarity, he helps learners achieve exceptional results.',
      initial: 'RM'
    },
    {
      id: 7,
      name: 'Mr. K. V. Bala Subramanyam',
      image: '/tutors/Balu_Professional Photo.PNG',
      title: 'Physics Faculty | SAT, ACT & AP Physics Mentor',
      qualification: 'Physics Educator | 15+ Years Experience',
      expertise: ['Conceptual clarity for Physics-based reasoning', 'Numerical problem-solving', 'Test-taking techniques for SAT/ACT', 'Analytical thinking for AP Physics'],
      description: 'Mr. Balu is a dedicated Physics educator with 15+ years of experience, now specializing in SAT Physics, ACT Science, AP Physics, and GRE Physics fundamentals. Renowned for his structured teaching, he excels in breaking down complex Physics concepts into simple, manageable frameworks. His training emphasizes conceptual clarity for Physics-based reasoning, numerical problem-solving for standardized tests, test-taking techniques for SAT/ACT, and analytical thinking needed in AP Physics exams. His student-centered and supportive teaching style helps learners overcome fear, build confidence, and achieve top scores in international Physics assessments.',
      initial: 'KB'
    },
    {
      id: 8,
      name: 'Mr. Ashwin Jain',
      title: 'Computer Science & Quantitative Logic Trainer | SAT, AP CS, GRE/GMAT Mentor',
      qualification: '12+ Years Industry Experience at Top MNCs (JP Morgan, VISA, SAP Labs, Barclays)',
      expertise: ['Logic building & algorithmic thinking', 'AP Computer Science (Java/Python)', 'SAT/ACT analytical reasoning', 'GRE/GMAT Quant strategies', 'Real-life coding applications'],
      description: 'With 12+ years of industry experience at top multinational companies, Mr. Ashwin Jain now focuses on preparing students for SAT, ACT, AP Computer Science (Java/Python), GRE Quant, and GMAT Quant. His teaching emphasizes logic building & algorithmic thinking, syllabus-aligned AP Computer Science preparation, SAT/ACT-style analytical reasoning, GRE/GMAT Quant strategies, and real-life coding applications for conceptual clarity. His structured and practical approach helps students confidently solve coding problems, logic-based questions, and quantitative comparisons in global certification exams.',
      initial: 'AJ'
    },
    {
      id: 9,
      name: 'Mr. Shambhu M. G.',
      image: '/tutors/Shambhu_Professional Photo.PNG',
      title: 'Biology Expert | AP Biology & SAT Biology Mentor',
      qualification: 'M.Sc. Biotechnology | IISc Bengaluru Research Experience | 15+ Years',
      expertise: ['High-yield AP Biology themes', 'SAT Biology pattern-based preparation', 'Visual learning and memory techniques', 'Exam-focused chapter prioritization', 'Practice with advanced problems and diagrams'],
      description: 'Mr. Shambhu is a senior Biology educator with 15+ years of experience, specializing in AP Biology, SAT Biology (E/M), and foundational biological reasoning for GRE subject-level preparation. He excels in simplifying complex biological processes, using real-life examples to strengthen conceptual understanding essential for standardized tests. His lessons emphasize high-yield AP Biology themes, SAT Biology pattern-based preparation, visual learning and memory techniques, exam-focused chapter prioritization, and practice with advanced problems and diagrams. Mr. Shambhu\'s student-friendly, clear, and motivational teaching style consistently helps learners achieve strong results in international Biology exams.',
      initial: 'SM'
    },
    {
      id: 10,
      name: 'Mr. Rakesh',
      title: 'Chemistry, Math & Quantitative Aptitude Trainer | SAT, ACT, AP, GRE Mentor',
      qualification: 'M.Sc. Chemistry (Gold Medalist) from University of Mysore',
      expertise: ['Concept-focused Chemistry for AP & SAT', 'Quantitative reasoning for GRE/GMAT', 'Algebra, geometry, and calculus foundations', 'Real-life examples to simplify complex concepts'],
      description: 'Mr. Rakesh, a gold medallist from the University of Mysore, is an accomplished educator specializing in SAT Math, ACT Math & Science, AP Chemistry, and GRE/GMAT Quant. His core strengths include concept-focused Chemistry for AP & SAT, quantitative reasoning for GRE/GMAT, algebra, geometry, and calculus foundations for SAT/ACT, and real-life examples to simplify complex concepts. His friendly and structured teaching style helps students confidently approach high-level test problems and consistently improve their scores.',
      initial: 'R'
    },
    {
      id: 11,
      name: 'Ms. Salai Kulamani Birlasekar',
      image: '/tutors/Salai_Profesional Photo.png',
      title: 'English Language & Verbal Reasoning Expert | SAT, ACT, GRE, GMAT Tutor',
      qualification: 'Content Writing & Editing Background | 12+ Years Experience',
      expertise: ['Grammar & usage mastery for standardized tests', 'Critical reading strategies for SAT/ACT', 'Analytical Writing training for GRE/GMAT', 'Essay writing for SAT & AP English', 'Vocabulary-building through structured methods'],
      description: 'With 12+ years of experience, Ms. Birlasekar specializes in English Language, Reading Comprehension, Writing Skills, and Verbal Reasoning for exams like SAT, ACT, AP English, GRE, GMAT, and TOEFL-level communication skills. Her expertise includes grammar & usage mastery for standardized tests, critical reading strategies for SAT/ACT, analytical writing training for GRE/GMAT, essay writing for SAT & AP English, and vocabulary-building through structured methods. Her precision in language instruction and strong command over English enable students to achieve significant improvements in verbal scores.',
      initial: 'SB'
    },
    {
      id: 12,
      name: 'Mr. Arvind',
      title: 'Physics & Quantitative Skills Mentor | IIT Bombay | SAT, ACT, AP Physics Trainer',
      qualification: 'IIT Bombay Postgraduate | GATE 2010 AIR 11 | 14+ Years Experience',
      expertise: ['SAT Physics preparation', 'ACT Science coaching', 'AP Physics mentoring', 'GRE/GMAT Quant reasoning', 'F=ma Preparation'],
      description: 'Mr. Arvind, an IIT Bombay alumnus with AIR 11 in GATE 2010, is a highly respected Physics educator specializing in SAT Physics, ACT Science, AP Physics, and foundational Quant reasoning for GRE/GMAT. His teaching style is logical, clear, and student-friendly. He uses real-world examples and interactive methods to help learners understand complex physics concepts and solve high-level reasoning questions with ease. His guidance consistently helps students excel in global Physics assessments and build strong analytical reasoning skills.',
      initial: 'A'
    },
    {
      id: 13,
      name: 'Ms. Neha Aggarwal',
      image: '/tutors/Neha Aggarwal_Professional Photo.png',
      title: 'Mathematics Faculty | SAT, ACT, GRE/GMAT, TMUA Quant & AP Math Trainer',
      qualification: 'CSIR NET Qualified | Mathematics Instructor',
      expertise: ['Strong conceptual foundations', 'Problem-solving strategies for competitive exams', 'Logical reasoning using math + programming insights', 'Confidence-building through guided practice'],
      description: 'Ms. Neha Aggarwal is a committed Maths educator specializing in SAT Math, ACT Math, GRE Quant, TMUA, GMAT Quant, and AP-level mathematical foundations. Having qualified CSIR NET, she brings academic rigor and conceptual clarity to her training. Her teaching focuses on strong conceptual foundations, problem-solving strategies for competitive exams, logical reasoning using math + programming insights, and confidence-building through guided practice. Her goal is to make mathematics intuitive and enjoyable for students preparing for global standardized tests.',
      initial: 'NA'
    }
  ]
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
                        className="w-20 sm:w-24 h-20 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 object-cover shadow-lg group-hover:scale-105 transition-transform border-4 border-blue-100"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="w-20 sm:w-24 h-20 sm:h-24 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-white shadow-lg group-hover:scale-105 transition-transform"
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
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:shadow-md transition-all cursor-pointer font-medium"
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
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">✓</span>
                    <span>Proven track record of student success</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">✓</span>
                    <span>Personalized attention in small batches</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">✓</span>
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
