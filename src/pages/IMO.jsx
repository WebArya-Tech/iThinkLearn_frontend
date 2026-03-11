import React, { useState, useRef } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ContactModal from "../component/ContactModal";

const purposePoints = [
  { icon: "⭐", text: "Identify and nurture students with outstanding mathematical ability" },
  { icon: "🧠", text: "Test deep conceptual understanding and creative problem solving" },
  { icon: "📜", text: "Encourage rigorous mathematical reasoning and proof-based thinking" },
  { icon: "🌍", text: "Promote international academic excellence and collaboration" },
];

const examDays = [
  {
    day: "Day 1",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    subColor: "text-blue-300",
    problems: "3 Problems",
    duration: "4.5 Hours",
    desc: "Three carefully crafted Olympiad problems spanning multiple areas of advanced mathematics requiring full proofs.",
    tags: ["Algebra", "Geometry", "Combinatorics"],
  },
  {
    day: "Day 2",
    color: "from-indigo-900 to-purple-900",
    badgeColor: "bg-orange-400 text-white",
    subColor: "text-indigo-300",
    problems: "3 Problems",
    duration: "4.5 Hours",
    desc: "Three additional problems of escalating difficulty, testing mastery in number theory and creative mathematical thinking.",
    tags: ["Number Theory", "Geometry", "Advanced Algebra"],
  },
];

const mathAreas = [
  { icon: "📐", label: "Algebra" },
  { icon: "🔷", label: "Geometry" },
  { icon: "🔢", label: "Number Theory" },
  { icon: "🧩", label: "Combinatorics" },
];

const scoringStats = [
  { label: "Total Problems", value: "6", sub: "3 per day" },
  { label: "Marks per Problem", value: "7", sub: "Full proof required" },
  { label: "Maximum Score", value: "42", sub: "Points total" },
  { label: "Duration per Day", value: "4.5h", sub: "Per sitting" },
];

const qualificationSteps = [
  {
    step: "01",
    title: "School / Regional Contests",
    desc: "Students begin their journey through school or regional mathematics competitions, building foundational competition skills.",
  },
  {
    step: "02",
    title: "National Olympiads",
    desc: "Top performers advance to national-level Olympiad programs conducted by individual countries.",
  },
  {
    step: "03",
    title: "International Selection Exams",
    desc: "National finalists compete in rigorous international team selection exams to secure a country spot.",
  },
  {
    step: "04",
    title: "IMO — World Stage",
    desc: "Only the most exceptional students are selected to represent their country at the IMO, competing against the world's best.",
  },
];

const whoShouldPoints = [
  { icon: "🔥", text: "Demonstrate exceptional interest and ability in mathematics" },
  { icon: "🧩", text: "Enjoy solving complex, non-routine, proof-based problems" },
  { icon: "🏆", text: "Aspire to compete at the highest international level" },
  { icon: "🎓", text: "Plan to pursue careers in mathematics, science, engineering, or research" },
];

const preparationPoints = [
  {
    icon: "📚",
    title: "Deep Conceptual Mastery",
    desc: "In-depth training in algebra, geometry, number theory, and combinatorics at Olympiad depth.",
  },
  {
    icon: "📜",
    title: "Proof Techniques",
    desc: "Advanced proof techniques and rigorous mathematical writing skills essential for IMO success.",
  },
  {
    icon: "🚀",
    title: "Progressive Pathway",
    desc: "Structured progression from AMC and national Olympiads through to full IMO-level preparation.",
  },
  {
    icon: "👨‍🏫",
    title: "One-to-One Mentoring",
    desc: "Personalized one-to-one mentoring with experienced Olympiad coaches and individualized learning plans.",
  },
  {
    icon: "📋",
    title: "Mock Olympiads",
    desc: "Regular evaluations, full-length mock Olympiads, and detailed problem-by-problem feedback sessions.",
  },
  {
    icon: "🌟",
    title: "Mindset & Confidence",
    desc: "Developing the problem-solving mindset, intellectual confidence, and resilience needed at the world stage.",
  },
];

export default function IMO() {
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
        <div className="max-w-7xl mx-auto text-center">
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-blue-900">
            IMO
          </h1>
          <p className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            International Mathematical Olympiad
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-6xl mx-auto mb-8 leading-relaxed">
            The world's most prestigious mathematics competition for pre-university students —
            bringing together the brightest mathematical minds from over{" "}
            <strong className="text-blue-900">100 countries</strong> every year.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToOverview}
              className="w-full sm:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Explore IMO
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
                alt="International Mathematics Olympiad"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                About the IMO
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                What is the IMO?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                The <strong className="text-blue-900">International Mathematical Olympiad (IMO)</strong> is
                the world's most prestigious and challenging mathematics competition for pre-university
                students, conducted annually since 1959.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                It brings together the brightest young mathematical minds from over 100 countries,
                representing the <strong className="text-blue-900">highest level of achievement</strong> in
                school-level competitive mathematics.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Success at the IMO is globally recognized by top universities, research institutions,
                and scholarship committees — it is viewed as a strong indicator of exceptional
                mathematical talent and creative problem-solving ability.
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
              Purpose of the IMO
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Unlike standard examinations, IMO problems require original thinking, elegant
              reasoning, and complete mathematical proofs — not routine calculations.
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

          <div className="mt-6 md:mt-8 bg-blue-900 rounded-2xl p-5 md:p-8 text-white text-center">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              The IMO is widely considered the{" "}
              <strong className="text-yellow-400">gold standard of mathematical excellence</strong> — a
              benchmark recognized by the world's top universities, research labs, and STEM institutions.
            </p>
          </div>
        </div>
      </section>

      {/* ── EXAM STRUCTURE ── */}
      <section className="w-full bg-white py-10 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Exam Format
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              IMO Exam Structure
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Conducted over two consecutive days — each day presents three problems that demand
              rigorous proof, logical creativity, and mathematical elegance.
            </p>
          </div>

          {/* Day cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-8">
            {examDays.map((day) => (
              <div
                key={day.day}
                className={`relative bg-gradient-to-br ${day.color} rounded-2xl p-6 md:p-8 text-white shadow-2xl overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-11 h-11 md:w-14 md:h-14 ${day.badgeColor} rounded-xl flex items-center justify-center font-extrabold text-sm md:text-base shadow-lg shrink-0`}>
                      {day.day.replace("Day ", "D")}
                    </div>
                    <div>
                      <div className={`text-xs ${day.subColor} uppercase tracking-widest`}>{day.problems} · {day.duration}</div>
                      <h3 className="text-lg md:text-xl font-bold">{day.day}</h3>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5">{day.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {day.tags.map((tag) => (
                      <span key={tag} className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scoring stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-8">
            {scoringStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-gray-100 p-4 md:p-6 text-center hover:border-blue-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-1">{stat.value}</div>
                <div className="text-orange-500 font-semibold text-xs sm:text-sm mb-0.5">{stat.label}</div>
                <div className="text-gray-400 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Math areas */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-5 md:p-6">
            <h3 className="font-bold text-blue-900 text-base md:text-lg mb-4 text-center">
              Problems span these advanced areas of mathematics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {mathAreas.map((area) => (
                <div key={area.label} className="flex flex-col items-center gap-2 bg-white rounded-xl p-3 md:p-4 border-2 border-gray-100 hover:border-blue-900 transition-all">
                  <span className="text-2xl md:text-3xl">{area.icon}</span>
                  <span className="font-semibold text-blue-900 text-xs sm:text-sm text-center">{area.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALIFICATION PATHWAY ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                alt="Olympiad qualification pathway"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="w-full lg:flex-1 order-1 lg:order-2">
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                How to Qualify
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                IMO Qualification Pathway
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                Students do not register directly for the IMO. Qualification occurs through
                national-level Olympiad programs — a multi-stage process ensuring only the most
                capable students reach the international stage.
              </p>
              <div className="space-y-3">
                {qualificationSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-4 bg-white rounded-xl border-2 border-gray-100 p-4 md:p-5 hover:border-blue-900 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD AIM ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Is This For You?
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Who Should Aim for the IMO?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The IMO is for students who are not just good at mathematics — but who live and
              breathe it, driven by passion, curiosity, and the will to excel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {whoShouldPoints.map((pt, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-8 hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex items-start gap-4"
              >
                <span className="text-3xl md:text-4xl shrink-0">{pt.icon}</span>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW ITHINKLEARN PREPARES ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Our Approach
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              How iThinkLearn Prepares Students for the IMO
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              At iThinkLearn, IMO preparation is built around long-term mathematical development
              and Olympiad-level rigor — guided by expert mentors through a structured and
              progressive training program.
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
              "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/75 to-indigo-900/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white w-full">
          <div className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest backdrop-blur-sm">
            Start Today
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
            Ready to Aim for the IMO?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-3 leading-relaxed max-w-2xl mx-auto">
            With experienced Olympiad mentors, structured pedagogy, and individualized attention,
            iThinkLearn empowers students to develop the skills, confidence, and mindset required
            to compete at the highest level of international mathematics.
          </p>
          <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-semibold mb-8 sm:mb-10">
            Begin your journey from national Olympiads to the IMO world stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3.5 px-8 md:px-12 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base md:text-lg shadow-2xl hover:scale-105 active:scale-95"
            >
              Start IMO Preparation
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-white/10 border-2 border-white/40 text-white font-bold py-3.5 px-8 md:px-12 rounded-xl hover:bg-white/20 hover:border-white/60 transition-all text-sm sm:text-base md:text-lg backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <Footer />
    </div>
  );
}
