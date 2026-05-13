import React, { useState, useRef } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ContactModal from "../component/ContactModal";

const abTopics = [
  "Limits and Continuity",
  "Derivatives and Their Applications",
  "Integrals and the Fundamental Theorem of Calculus",
  "Applications of Integration (Area, Volume, Motion)",
  "Introduction to Differential Equations",
];

const bcAdditionalTopics = [
  "Advanced Integration Techniques",
  "Parametric, Polar, and Vector Functions",
  "Infinite Sequences and Series",
  "Taylor and Maclaurin Series",
  "More Advanced Differential Equations",
];

const abWhoShouldPoints = [
  { icon: "🔬", text: "Students planning to pursue STEM, economics, or business majors" },
  { icon: "📐", text: "Students with strong algebra and trigonometry foundations" },
  { icon: "🎓", text: "Learners aiming for college credit or advanced placement" },
];

const bcWhoShouldPoints = [
  { icon: "🏆", text: "Students with strong mathematical aptitude" },
  { icon: "🏛️", text: "Students aiming for top-tier universities and STEM programs" },
  { icon: "🚀", text: "Learners preparing for competitive exams and advanced mathematics" },
];

const examSections = [
  {
    section: "Section I",
    title: "Multiple Choice",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    subColor: "text-blue-300",
    icon: "📝",
    desc: "Divided into calculator and non-calculator portions. Tests conceptual understanding and procedural fluency across all syllabus topics.",
    tags: ["Calculator Portion", "Non-Calculator Portion", "Conceptual Understanding"],
  },
  {
    section: "Section II",
    title: "Free Response",
    color: "from-indigo-900 to-purple-900",
    badgeColor: "bg-orange-400 text-white",
    subColor: "text-indigo-300",
    icon: "✍️",
    desc: "Problem-solving and application-based questions requiring full working. Tests analytical reasoning and correct mathematical communication.",
    tags: ["Problem Solving", "Applications", "Mathematical Communication"],
  },
];

const whyMattersPoints = [
  { icon: "🎓", title: "College Credits", desc: "Earn college credit and reduce your course load in university — saving both time and tuition costs." },
  { icon: "🏛️", title: "University Advantage", desc: "Strengthen applications to top global universities with a proven record of advanced academic achievement." },
  { icon: "🔬", title: "STEM Foundation", desc: "Build a strong mathematical foundation essential for engineering, economics, finance, and science programs." },
  { icon: "🧠", title: "Analytical Thinking", desc: "Develop advanced problem-solving and analytical thinking skills valued across all academic and professional fields." },
];

const preparationPoints = [
  {
    icon: "📚",
    title: "Concept-First Teaching",
    desc: "Step-by-step concept building with clear, intuitive explanations before tackling advanced problems.",
  },
  {
    icon: "🔍",
    title: "MCQ + FRQ Mastery",
    desc: "Advanced problem-solving techniques specifically targeting both multiple-choice and free-response question types.",
  },
  {
    icon: "🎯",
    title: "College Board Aligned",
    desc: "Exam-focused strategies fully aligned with College Board standards and scoring rubrics for maximum marks.",
  },
  {
    icon: "📋",
    title: "Mock Exams & Analysis",
    desc: "Regular assessments, full-length mock exams, and detailed performance analysis to close skill gaps.",
  },
  {
    icon: "👨‍🏫",
    title: "Personalized Mentoring",
    desc: "One-on-one doubt resolution and personalized mentoring tailored to each student's learning pace.",
  },
  {
    icon: "🚀",
    title: "AB → BC Progression",
    desc: "Structured pathway from Calculus AB fundamentals to the full BC syllabus for advanced learners.",
  },
];

export default function Calculus() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const overviewRef = useRef(null);

  return (
    <div className="w-full">
      <Header />

      {/* ── HERO ── */}
      <section className="w-full bg-white pt-14 pb-12 sm:pt-16 sm:pb-14 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-blue-900">
            AP Calculus
          </h1>
          <p className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            AB &amp; BC — College-Level Mathematics
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-6xl mx-auto mb-8 leading-relaxed">
            College Board AP courses recognized worldwide for{" "}
            <strong className="text-blue-900">college credit, advanced placement</strong>, and admissions
            advantage — especially for STEM, economics, and business programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => overviewRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Explore AP Calculus
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3 px-8 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Book Free Demo
            </button>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section ref={overviewRef} className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1">
              <img
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
                alt="AP Calculus mathematics"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                About AP Calculus
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                What is AP Calculus?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                <strong className="text-blue-900">AP Calculus AB and AP Calculus BC</strong> are college-level
                mathematics courses and examinations offered by the College Board, widely recognized by top
                universities worldwide.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                These exams are used for <strong className="text-blue-900">college credit, advanced placement</strong>,
                and admissions advantage — particularly for students pursuing STEM, economics, and
                business-related programs.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                AP Calculus develops strong analytical thinking, mathematical reasoning, and problem-solving
                skills — making it one of the most important AP subjects for academic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AB vs BC COURSES ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Course Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              AP Calculus AB &amp; BC
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Two levels designed to match different mathematical backgrounds and aspirations —
              both offering significant academic advantages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* AB Card */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-blue-900 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 md:p-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-yellow-400 text-blue-900 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-lg shrink-0">
                    AB
                  </div>
                  <div>
                    <p className="text-blue-300 text-xs uppercase tracking-widest">First Semester College Calculus</p>
                    <h3 className="text-xl md:text-2xl font-extrabold">AP Calculus AB</h3>
                  </div>
                </div>
                <p className="text-blue-100 text-sm md:text-base leading-relaxed mt-3">
                  Focuses on the fundamental concepts of differential and integral calculus —
                  equivalent to a <strong className="text-yellow-300">first-semester college calculus course</strong>.
                </p>
              </div>
              <div className="p-6 md:p-8">
                <h4 className="font-bold text-blue-900 text-sm sm:text-base mb-4 uppercase tracking-wide">Key Topics</h4>
                <ul className="space-y-2.5 mb-6">
                  {abTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-900 mt-1.5 shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{topic}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="font-bold text-blue-900 text-sm sm:text-base mb-3 uppercase tracking-wide">Ideal For</h4>
                <div className="space-y-2">
                  {abWhoShouldPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 hover:bg-blue-50 transition-colors">
                      <span className="text-lg shrink-0">{pt.icon}</span>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{pt.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BC Card */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-blue-900 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 md:p-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-orange-400 text-white rounded-xl flex items-center justify-center font-extrabold text-lg shadow-lg shrink-0">
                    BC
                  </div>
                  <div>
                    <p className="text-indigo-300 text-xs uppercase tracking-widest">Two Semesters of College Calculus</p>
                    <h3 className="text-xl md:text-2xl font-extrabold">AP Calculus BC</h3>
                  </div>
                </div>
                <p className="text-indigo-100 text-sm md:text-base leading-relaxed mt-3">
                  A more advanced and rigorous course — equivalent to{" "}
                  <strong className="text-yellow-300">two semesters of college calculus</strong>. Includes
                  all AB topics plus advanced concepts.
                </p>
              </div>
              <div className="p-6 md:p-8">
                <h4 className="font-bold text-blue-900 text-sm sm:text-base mb-4 uppercase tracking-wide">AB Topics + Additional BC Topics</h4>
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {abTopics.slice(0, 2).map((topic, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                        {topic.split(" (")[0]}
                      </span>
                    ))}
                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">+ All AB Topics</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {bcAdditionalTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-indigo-700 mt-1.5 shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{topic}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="font-bold text-blue-900 text-sm sm:text-base mb-3 uppercase tracking-wide">Ideal For</h4>
                <div className="space-y-2">
                  {bcWhoShouldPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 hover:bg-blue-50 transition-colors">
                      <span className="text-lg shrink-0">{pt.icon}</span>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{pt.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AB ⊂ BC note */}
          <div className="mt-6 bg-blue-900 rounded-2xl p-5 md:p-8 text-white text-center">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              <strong className="text-yellow-400">AP Calculus BC includes all AB content</strong> — students
              who score well on BC receive both a BC score and an AB sub-score, potentially earning
              credit for both college calculus courses.
            </p>
          </div>
        </div>
      </section>

      {/* ── EXAM FORMAT ── */}
      <section className="w-full bg-white py-12 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Exam Structure
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              AP Calculus Exam Format
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Both AB and BC follow the same structure — testing conceptual understanding,
              analytical reasoning, and correct mathematical communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-8">
            {examSections.map((sec) => (
              <div
                key={sec.section}
                className={`relative bg-gradient-to-br ${sec.color} rounded-2xl p-6 md:p-8 text-white shadow-2xl overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-11 h-11 md:w-14 md:h-14 ${sec.badgeColor} rounded-xl flex items-center justify-center text-xl shadow-lg shrink-0`}>
                      {sec.icon}
                    </div>
                    <div>
                      <div className={`text-xs ${sec.subColor} uppercase tracking-widest`}>{sec.section}</div>
                      <h3 className="text-lg md:text-xl font-bold">{sec.title}</h3>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5">{sec.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {sec.tags.map((tag) => (
                      <span key={tag} className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-5 md:p-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              ✨ Both exams test{" "}
              <strong className="text-blue-900">conceptual understanding, analytical reasoning, and correct mathematical communication</strong>{" "}
              — not just formula application. Students must show full working in free-response sections.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY AP CALCULUS MATTERS ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80"
                alt="Students studying AP Calculus"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="w-full lg:flex-1 order-1 lg:order-2">
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Why It Matters
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                Why AP Calculus Matters
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                AP Calculus is one of the most impactful exams a high school student can take —
                opening doors to top universities, saving college costs, and building skills for life.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whyMattersPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white rounded-xl border-2 border-gray-100 p-4 hover:border-blue-900 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-2xl shrink-0">{pt.icon}</span>
                    <div>
                      <h3 className="font-bold text-blue-900 text-sm mb-1">{pt.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW ITHINKLEARN PREPARES ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Our Approach
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              How iThinkLearn Prepares Students for AP Calculus
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              At iThinkLearn, AP Calculus preparation is designed to ensure deep conceptual clarity
              and exam excellence — from first principles to exam-day confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {preparationPoints.map((pt, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-8 hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="text-3xl md:text-4xl mb-3">{pt.icon}</div>
                <h3 className="text-base md:text-lg font-bold text-blue-900 mb-2">{pt.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed grow">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] flex items-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/75 to-indigo-900/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white w-full">
          <div className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest backdrop-blur-sm">
            Start Today
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
            Ready to Excel in AP Calculus?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-3 leading-relaxed max-w-2xl mx-auto">
            With experienced faculty, a structured curriculum, and individualized attention,
            iThinkLearn empowers students to score high in AP Calculus AB &amp; BC and
            succeed confidently in college-level mathematics.
          </p>
          <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-semibold mb-8 sm:mb-10">
            Earn college credit and open doors to the world's top universities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3.5 px-8 md:px-12 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base md:text-lg shadow-2xl hover:scale-105 active:scale-95"
            >
              Start AP Calculus Prep
            </button>
            <a
              href="mailto:ithinklearn@ixpoe.com"
              className="w-full sm:w-auto bg-white/10 border-2 border-white/40 text-white font-bold py-3.5 px-8 md:px-12 rounded-xl hover:bg-white/20 hover:border-white/60 transition-all text-sm sm:text-base md:text-lg backdrop-blur-sm hover:scale-105 active:scale-95 inline-flex items-center justify-center"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <Footer />
    </div>
  );
}
