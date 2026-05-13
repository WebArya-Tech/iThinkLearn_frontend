import React, { useState, useRef } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ContactModal from "../component/ContactModal";

const competitionPathway = [
  { step: "01", label: "AMC 8 / AMC 10 / AMC 12", active: false, desc: "Entry-level competitions — gateway to the AIME" },
  { step: "02", label: "AIME", active: true, desc: "You are here — second stage of U.S. Olympiad selection" },
  { step: "03", label: "USAJMO / USAMO", active: false, desc: "National Olympiad based on combined AMC + AIME scores" },
  { step: "04", label: "MOP", active: false, desc: "Mathematical Olympiad Program — elite training camp" },
  { step: "05", label: "IMO Team Selection", active: false, desc: "Represent the USA at the International Mathematical Olympiad" },
];

const examFormatRows = [
  { feature: "Total Questions", detail: "15" },
  { feature: "Time", detail: "3 Hours" },
  { feature: "Answer Type", detail: "Integer (0 – 999)" },
  { feature: "Calculator", detail: "Not Allowed" },
  { feature: "Negative Marking", detail: "None" },
];

const qualifyingScores = [
  { exam: "AMC 10", grades: "Grades 8–10", score: "~100–120", scoreBar: "75%" },
  { exam: "AMC 12", grades: "Grades 10–12", score: "~85–100", scoreBar: "62%" },
];

const topicAreas = [
  {
    icon: "📈",
    title: "Algebra",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    subColor: "text-blue-300",
    topics: ["Functional Equations", "Polynomials", "Sequences & Series", "Inequalities"],
  },
  {
    icon: "🔷",
    title: "Geometry",
    color: "from-indigo-900 to-purple-900",
    badgeColor: "bg-orange-400 text-white",
    subColor: "text-indigo-300",
    topics: ["Circles", "Triangles", "Coordinate Geometry", "Trigonometry"],
  },
  {
    icon: "🔢",
    title: "Number Theory",
    color: "from-blue-900 to-indigo-900",
    badgeColor: "bg-yellow-400 text-blue-900",
    subColor: "text-blue-300",
    topics: ["Modular Arithmetic", "Divisibility", "Diophantine Equations"],
  },
  {
    icon: "🧩",
    title: "Combinatorics",
    color: "from-purple-900 to-indigo-900",
    badgeColor: "bg-orange-400 text-white",
    subColor: "text-purple-300",
    topics: ["Counting", "Probability", "Recursions", "Casework"],
  },
];

const difficultyLevels = [
  { exam: "AMC 8", level: "Medium", bar: "35%", color: "bg-green-500" },
  { exam: "AMC 10/12", level: "Hard", bar: "60%", color: "bg-yellow-500" },
  { exam: "AIME", level: "Very Hard", bar: "82%", color: "bg-orange-500", highlight: true },
  { exam: "USAMO", level: "Extremely Hard", bar: "100%", color: "bg-red-600" },
];

const whyImportantPoints = [
  { icon: "🚀", title: "Olympiad Gateway", desc: "Your essential stepping stone toward USAMO, MOP, and the IMO team selection pathway." },
  { icon: "🏛️", title: "University Recognition", desc: "Recognized and valued by top universities including MIT, Stanford, Harvard, and Caltech." },
  { icon: "🧠", title: "Deep Problem-Solving", desc: "Builds elite-level mathematical reasoning, proof thinking, and creative problem-solving skills." },
  { icon: "🌟", title: "Competition Prestige", desc: "Qualifying for AIME itself is a major achievement — only top AMC scorers reach this stage." },
];

const preparationPoints = [
  {
    icon: "📚",
    title: "AMC-to-AIME Bridge",
    desc: "Structured training to bridge the gap from AMC-level to AIME-level problem solving.",
  },
  {
    icon: "🔍",
    title: "Deep Topic Mastery",
    desc: "In-depth coverage of algebra, geometry, number theory, and combinatorics at AIME depth.",
  },
  {
    icon: "📋",
    title: "Past Paper Practice",
    desc: "Extensive practice with past AIME exams and targeted problem sets by topic and difficulty.",
  },
  {
    icon: "⏱️",
    title: "Integer-Answer Technique",
    desc: "Specialized training for AIME's unique 0–999 integer answer format and verification strategies.",
  },
  {
    icon: "📈",
    title: "Score Optimization",
    desc: "Combined AMC + AIME score strategy to maximize USAJMO/USAMO qualification indices.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Mentoring",
    desc: "Personalized mentoring and continuous tracking toward USAMO and IMO pathway goals.",
  },
];

export default function AIME() {
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
      <section className="w-full bg-white pt-14 pb-12 sm:pt-10 sm:pb-14 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12 ">
        <div className="max-w-3xl mx-auto text-center">
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-blue-900">
            AIME
          </h1>
          <p className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            American Invitational Mathematics Examination
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            The prestigious second stage of the U.S. mathematical Olympiad selection pathway —
            a{" "}
            <strong className="text-blue-900">critical gateway to USAMO, MOP, and ultimately the IMO</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToOverview}
              className="w-full sm:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Explore AIME
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

      {/* ── WHAT IS AIME + COMPETITION PATHWAY ── */}
      <section ref={overviewRef} className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
            {/* Image + overview */}
            <div className="w-full lg:flex-1">
              <img
                src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80"
                alt="Mathematics competition"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video mb-6"
              />
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                About AIME
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                What is the AIME?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                The <strong className="text-blue-900">AIME (American Invitational Mathematics Examination)</strong> is
                a prestigious mathematics competition conducted in the United States, forming the second
                stage of the U.S. mathematical Olympiad selection process.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Students who perform well in AMC 10 or AMC 12 earn an invitation to the AIME — a major
                milestone that can eventually lead to{" "}
                <strong className="text-blue-900">IMO team selection</strong>.
              </p>
            </div>

            {/* Competition pathway */}
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                Competition Pathway
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-6 leading-tight">
                The Road to the IMO
              </h2>
              <div className="space-y-3">
                {competitionPathway.map((item) => (
                  <div
                    key={item.step}
                    className={`flex items-start gap-4 rounded-xl border-2 p-4 md:p-5 transition-all duration-300 ${
                      item.active
                        ? "bg-blue-900 border-blue-900 shadow-xl"
                        : "bg-white border-gray-100 hover:border-blue-900 hover:shadow-lg"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                        item.active ? "bg-yellow-400 text-blue-900" : "bg-blue-900 text-white"
                      }`}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm sm:text-base mb-0.5 ${item.active ? "text-yellow-300" : "text-blue-900"}`}>
                        {item.label}
                        {item.active && (
                          <span className="ml-2 text-xs bg-yellow-400 text-blue-900 px-2 py-0.5 rounded-full font-semibold">You are here</span>
                        )}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed ${item.active ? "text-blue-100" : "text-gray-500"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO CAN TAKE + EXAM FORMAT ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

            {/* Who can take */}
            <div>
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Eligibility
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-6 leading-tight">
                Who Can Take the AIME?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                Only students who qualify through AMC 10 or AMC 12 are invited to take the AIME.
                Qualifying score thresholds may vary slightly each year.
              </p>
              <div className="space-y-4">
                {qualifyingScores.map((q) => (
                  <div key={q.exam} className="bg-white rounded-xl border-2 border-gray-100 p-4 md:p-5 hover:border-blue-900 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-bold text-blue-900 text-sm sm:text-base">{q.exam}</span>
                        <span className="ml-2 text-xs text-gray-400">{q.grades}</span>
                      </div>
                      <span className="text-orange-500 font-extrabold text-sm sm:text-base">{q.score}</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-900 rounded-full" style={{ width: q.scoreBar }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Typical qualifying score on AMC (out of 150)</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-900 rounded-xl p-4 text-white text-sm leading-relaxed">
                Qualifying for AIME itself is a significant achievement —{" "}
                <strong className="text-yellow-300">fewer than 5% of AMC participants</strong> receive an AIME invitation.
              </div>
            </div>

            {/* Exam format */}
            <div>
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Exam Format
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-6 leading-tight">
                AIME Exam Format
              </h2>
              <div className="overflow-hidden rounded-2xl border-2 border-gray-100 shadow-sm">
                {examFormatRows.map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-5 py-3.5 md:py-4 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <span className="text-gray-600 text-sm sm:text-base font-medium">{row.feature}</span>
                    <span className="text-blue-900 font-bold text-sm sm:text-base">{row.detail}</span>
                  </div>
                ))}
              </div>

              {/* Answer example */}
              <div className="mt-4 bg-white rounded-xl border-2 border-gray-100 p-4 md:p-5">
                <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-3">Example Valid Answers</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["007", "125", "999", "042", "500"].map((ans) => (
                    <span key={ans} className="bg-blue-900 text-white font-mono font-bold text-sm px-3 py-1.5 rounded-lg">
                      {ans}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Each answer is a whole number between 0 and 999. Leading zeros are used if necessary (e.g., 007).
                </p>
              </div>

              {/* Scoring */}
              <div className="mt-4 bg-white rounded-xl border-2 border-gray-100 p-4 md:p-5">
                <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-2">Scoring & Qualification Index</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2">
                  Each correct answer = <strong className="text-blue-900">1 point</strong> (max 15 points). Your AIME score
                  combines with your AMC score to determine USAMO/USAJMO qualification:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 font-mono text-blue-900 text-sm text-center font-bold">
                  AMC Score + (10 × AIME Score)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOPICS COVERED ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Syllabus
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Topics Covered in AIME
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              AIME problems are significantly harder than AMC and require deeper mathematical
              thinking across four core areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {topicAreas.map((area) => (
              <div
                key={area.title}
                className={`relative bg-gradient-to-br ${area.color} rounded-2xl p-6 md:p-8 text-white shadow-2xl overflow-hidden flex flex-col`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${area.badgeColor} rounded-xl flex items-center justify-center text-lg md:text-xl shadow-lg shrink-0`}>
                      {area.icon}
                    </div>
                    <h3 className="text-base md:text-xl font-bold">{area.title}</h3>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {area.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-white/90 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFFICULTY + WHY IMPORTANT ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">

            {/* Difficulty */}
            <div>
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Difficulty Scale
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-6 leading-tight">
                How Hard is the AIME?
              </h2>
              <div className="space-y-3">
                {difficultyLevels.map((item) => (
                  <div
                    key={item.exam}
                    className={`rounded-xl border-2 p-4 md:p-5 transition-all ${
                      item.highlight ? "bg-blue-900 border-blue-900 shadow-xl" : "bg-white border-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className={`font-bold text-sm sm:text-base ${item.highlight ? "text-yellow-300" : "text-blue-900"}`}>
                        {item.exam}
                        {item.highlight && (
                          <span className="ml-2 text-xs bg-yellow-400 text-blue-900 px-2 py-0.5 rounded-full">← You are here</span>
                        )}
                      </span>
                      <span className={`text-xs sm:text-sm font-semibold ${item.highlight ? "text-white" : "text-gray-500"}`}>
                        {item.level}
                      </span>
                    </div>
                    <div className={`w-full h-2.5 rounded-full overflow-hidden ${item.highlight ? "bg-white/20" : "bg-gray-100"}`}>
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: item.bar }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-white border-2 border-gray-100 rounded-xl p-4 md:p-5">
                <p className="text-gray-600 text-sm leading-relaxed">
                  💡 Even strong, well-prepared students typically solve{" "}
                  <strong className="text-blue-900">5–8 out of 15 problems</strong> on the AIME —
                  a score of 10+ is considered excellent.
                </p>
              </div>
            </div>

            {/* Why important */}
            <div>
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Why It Matters
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-6 leading-tight">
                Why is the AIME Important?
              </h2>
              <div className="space-y-4">
                {whyImportantPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white rounded-xl border-2 border-gray-100 p-4 md:p-5 hover:border-blue-900 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-2xl md:text-3xl shrink-0">{pt.icon}</span>
                    <div>
                      <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-1">{pt.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{pt.desc}</p>
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
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Our Approach
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              How iThinkLearn Prepares Students for the AIME
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Structured, progressive, and personalized — our AIME coaching is built to take
              students from AMC qualification to USAMO-level readiness.
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
              "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/75 to-indigo-900/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white w-full">
          <div className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest backdrop-blur-sm">
            Start Today
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
            Ready to Conquer the AIME?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-3 leading-relaxed max-w-2xl mx-auto">
            With expert faculty, structured problem-solving training, and personalized mentoring,
            iThinkLearn equips students to qualify for the AIME and advance toward USAMO and
            the IMO pathway.
          </p>
          <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-semibold mb-8 sm:mb-10">
            Your Olympiad journey to the highest level of mathematics starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3.5 px-8 md:px-12 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base md:text-lg shadow-2xl hover:scale-105 active:scale-95"
            >
              Start AIME Preparation
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
