import React, { useState, useRef } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ContactModal from "../component/ContactModal";

const purposePoints = [
  { icon: "📐", text: "Quantitative and analytical reasoning skills" },
  { icon: "🧠", text: "Logical thinking and data interpretation ability" },
  { icon: "📖", text: "Verbal reasoning and comprehension" },
  { icon: "⏱️", text: "Decision-making and problem-solving under time pressure" },
];

const examSections = [
  {
    code: "QR",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    label: "Quantitative Reasoning",
    sub: "Section 01",
    subColor: "text-blue-300",
    desc: "Tests problem-solving and data sufficiency skills using arithmetic, algebra, and logical reasoning.",
    tags: ["Problem Solving", "Data Sufficiency", "Algebra", "Arithmetic"],
  },
  {
    code: "VR",
    color: "from-indigo-900 to-purple-800",
    badgeColor: "bg-orange-400 text-white",
    label: "Verbal Reasoning",
    sub: "Section 02",
    subColor: "text-indigo-300",
    desc: "Assesses reading comprehension, critical reasoning, and sentence correction skills.",
    tags: ["Reading Comprehension", "Critical Reasoning", "Sentence Correction"],
  },
  {
    code: "IR",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    label: "Integrated Reasoning",
    sub: "Section 03",
    subColor: "text-blue-300",
    desc: "Evaluates the ability to analyze data presented in multiple formats such as tables, graphs, and charts.",
    tags: ["Tables", "Graphs", "Charts", "Data Analysis"],
  },
  {
    code: "AW",
    color: "from-indigo-900 to-purple-800",
    badgeColor: "bg-orange-400 text-white",
    label: "Analytical Writing (AWA)",
    sub: "Section 04",
    subColor: "text-indigo-300",
    desc: "Measures critical thinking and written communication through an argument analysis task.",
    tags: ["Argument Analysis", "Critical Thinking", "Writing", "Communication"],
  },
];

const whoShouldPoints = [
  { icon: "🎓", text: "Plan to pursue MBA or business-related master's programs" },
  { icon: "🏛️", text: "Aim for admission to top-tier global business schools" },
  { icon: "💰", text: "Seek scholarships, fellowships, or competitive program placements" },
  { icon: "🏆", text: "Want to demonstrate strong analytical and leadership potential" },
];

const scoringData = [
  { section: "Total Score", range: "200 – 800", bar: "100%", color: "bg-blue-900" },
  { section: "Integrated Reasoning", range: "1 – 8", bar: "55%", color: "bg-indigo-800" },
  { section: "Analytical Writing", range: "0 – 6", bar: "40%", color: "bg-purple-800" },
];

const preparationPoints = [
  {
    icon: "📚",
    title: "Quant Reasoning Training",
    desc: "In-depth Quantitative Reasoning training with shortcuts and problem-solving strategies.",
  },
  {
    icon: "🧩",
    title: "Data Sufficiency & CR",
    desc: "Structured approaches to Data Sufficiency and Critical Reasoning for consistent accuracy.",
  },
  {
    icon: "⏳",
    title: "Adaptive Time Management",
    desc: "Time-management techniques specifically designed for the GMAT's computer-adaptive format.",
  },
  {
    icon: "📝",
    title: "Full-Length Mock Exams",
    desc: "Full-length mock exams with detailed performance analysis to identify and close gaps.",
  },
  {
    icon: "📈",
    title: "Personalized Mentoring",
    desc: "Personalized mentoring and targeted improvement plans based on each student's weak areas.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Faculty",
    desc: "Expert faculty with proven methodologies and continuous progress tracking for top scores.",
  },
];

export default function GMAT() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const overviewRef = useRef(null);

  const scrollToOverview = () => {
    if (overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <Header />

      {/* ── HERO ── */}
      <section className="w-full bg-white py-10 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-blue-600 text-xs sm:text-sm font-semibold mb-4 uppercase tracking-widest">
            <span>College Admissions</span>
            <span className="text-gray-400">›</span>
            <span>GMAT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-blue-900">
            GMAT
          </h1>
          <p className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Graduate Management Admission Test
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            A globally recognized standardized exam required for admission to MBA, Master's in
            Management, Finance, Business Analytics, and other business-related graduate programs
            at top business schools worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToOverview}
              className="w-full sm:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Explore GMAT
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
                src="https://media.gettyimages.com/id/2189327644/photo/a-student-showing-a-test-with-a-score-of-100.jpg?s=612x612&w=0&k=20&c=8rtE_1zdFr1UZwomMsfejlDYS1JKRkUD9o3KhmTPJUU="
                alt="Business school admissions"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                Business School Admissions
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                What is the GMAT?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                The <strong className="text-blue-900">GMAT (Graduate Management Admission Test)</strong> is a
                globally recognized standardized exam required for admission to MBA, Master's in Management,
                Finance, Business Analytics, and other business-related graduate programs.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                It is accepted by top business schools worldwide, including institutions in the United
                States, Europe, the UK, Canada, and Asia.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                GMAT scores are a{" "}
                <strong className="text-blue-900">critical component of business school applications</strong> and
                are widely used to assess a candidate's readiness for the rigorous academic and analytical
                demands of management education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PURPOSE ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Why It Matters
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Purpose of the GMAT
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Rather than testing academic knowledge alone, the GMAT focuses on real-world business
              and analytical skills required for success in graduate management programs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {purposePoints.map((pt, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-8 hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex flex-col items-start"
              >
                <div className="text-3xl md:text-4xl mb-3">{pt.icon}</div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{pt.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-900 rounded-2xl p-5 md:p-8 text-white text-center">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              The GMAT is valued by top business schools because it provides a{" "}
              <strong className="text-yellow-400">standardized measure of business acumen and analytical readiness</strong>{" "}
              independent of academic background.
            </p>
          </div>
        </div>
      </section>

      {/* ── EXAM STRUCTURE ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Exam Format
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              GMAT Exam Structure
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Four sections, each testing a distinct skill set. The GMAT is computer-adaptive —
              difficulty adjusts based on your performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {examSections.map((sec) => (
              <div
                key={sec.label}
                className={`relative bg-gradient-to-br ${sec.color} rounded-2xl p-6 md:p-8 text-white shadow-2xl overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${sec.badgeColor} rounded-xl flex items-center justify-center font-extrabold text-sm md:text-base shadow-lg`}>
                      {sec.code}
                    </div>
                    <div>
                      <div className={`text-xs ${sec.subColor} uppercase tracking-widest`}>{sec.sub}</div>
                      <h3 className="text-base md:text-xl font-bold leading-tight">{sec.label}</h3>
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

          {/* Computer-adaptive note */}
          <div className="mt-5 md:mt-8 bg-gray-50 border-2 border-gray-200 rounded-2xl p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-3xl">💻</span>
              <div>
                <h3 className="font-bold text-blue-900 text-base md:text-lg mb-1">Computer-Adaptive Format</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  The GMAT is computer-adaptive — the difficulty of each question adjusts dynamically based
                  on your performance. Strategic test-taking and calm decision-making are essential skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCORING ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Scoring
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              GMAT Scoring System
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              A strong GMAT score significantly improves admission chances at leading business schools.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                alt="Business analytics scoring"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1 space-y-4">
              {scoringData.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-6 hover:border-blue-900 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-blue-900 text-sm md:text-base">{item.section}</h3>
                    <span className="text-orange-500 font-extrabold text-base md:text-lg">{item.range}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.bar }} />
                  </div>
                </div>
              ))}

              {/* Quant + Verbal note */}
              <div className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-6 hover:border-blue-900 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h3 className="font-bold text-blue-900 text-sm md:text-base mb-1">Quantitative &amp; Verbal</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Scaled scores from Quantitative and Verbal sections combine to form the main
                      Total Score of 200–800.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 rounded-xl p-5 text-white">
                <p className="text-sm sm:text-base leading-relaxed">
                  <strong className="text-yellow-400">A strong GMAT score</strong> significantly improves
                  admission chances, scholarship eligibility, and overall credibility at leading business
                  schools globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD TAKE ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="MBA students"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="w-full lg:flex-1 order-1 lg:order-2">
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Is This For You?
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                Who Should Take the GMAT?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                The GMAT is designed for ambitious students who want to gain an edge in competitive
                business school admissions and demonstrate their readiness for management education.
              </p>
              <div className="space-y-3">
                {whoShouldPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-gray-50 rounded-xl border-2 border-gray-100 p-4 md:p-5 hover:border-blue-900 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-0.5">{pt.icon}</span>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{pt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW iTHINKLEARN PREPARES ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Our Approach
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              How iThinkLearn Prepares Students for the GMAT
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              At iThinkLearn, GMAT preparation is built around conceptual clarity, strategic
              problem-solving, and exam-focused training to help students achieve competitive scores.
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
      <section className="w-full py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-blue-950/88" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Ready to Maximize Your GMAT Score?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-3 leading-relaxed">
            With expert faculty, proven methodologies, and continuous progress tracking,
            iThinkLearn empowers students to maximize their GMAT performance and gain admission
            to top global business schools.
          </p>
          <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-semibold mb-8">
            Your MBA journey at a top business school starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3 px-8 md:px-12 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl"
            >
              Start Your GMAT Journey
            </button>
            <a
              href="mailto:ithinklearn@ixpoe.com"
              className="w-full sm:w-auto bg-white/10 border-2 border-white/40 text-white font-bold py-3 px-8 md:px-12 rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base md:text-lg backdrop-blur-sm inline-flex items-center justify-center"
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
