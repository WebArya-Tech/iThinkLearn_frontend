import React, { useState, useRef } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ContactModal from "../component/ContactModal";

const examLevels = [
  {
    code: "AMC 8",
    grade: "Grade 8 & Below",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    subColor: "text-blue-300",
    desc: "Designed for middle-school students, focusing on fundamental mathematics and logical reasoning skills.",
    tags: ["Arithmetic", "Geometry", "Number Theory", "Logical Reasoning"],
    icon: "🌱",
  },
  {
    code: "AMC 10",
    grade: "Up to Grade 10",
    color: "from-indigo-900 to-purple-900",
    badgeColor: "bg-orange-400 text-white",
    subColor: "text-indigo-300",
    desc: "Covers algebra, geometry, number theory, probability, and counting — without calculus.",
    tags: ["Algebra", "Geometry", "Number Theory", "Probability", "Counting"],
    icon: "📐",
    aime: true,
  },
  {
    code: "AMC 12",
    grade: "Up to Grade 12",
    color: "from-blue-900 to-indigo-900",
    badgeColor: "bg-yellow-400 text-blue-900",
    subColor: "text-blue-300",
    desc: "Includes advanced algebra, geometry, trigonometry, and introductory concepts for higher-level competitions.",
    tags: ["Advanced Algebra", "Trigonometry", "Geometry", "Pre-Calculus"],
    icon: "🏆",
    aime: true,
  },
];

const purposePoints = [
  { icon: "🧠", text: "Assess mathematical reasoning beyond standard school curricula" },
  { icon: "💡", text: "Encourage creative and non-routine problem solving" },
  { icon: "⭐", text: "Identify students with high mathematical potential" },
  { icon: "🥇", text: "Prepare students for elite competitions like USAJMO and IMO" },
  { icon: "🎓", text: "Strengthen university applications to top STEM institutions" },
];

const whoShouldPoints = [
  { icon: "📊", text: "Have a strong interest in mathematics and logical thinking" },
  { icon: "🌍", text: "Aspire to participate in Olympiads and international competitions" },
  { icon: "🏛️", text: "Are preparing for top universities and STEM-focused programs" },
  { icon: "🔥", text: "Want to challenge themselves with high-difficulty math problems" },
];

const formatPoints = [
  { icon: "📝", title: "Question Format", desc: "Multiple-choice questions designed to test deep mathematical understanding and creative reasoning." },
  { icon: "⏱️", title: "25 Questions in 75 Minutes", desc: "AMC 10 & AMC 12 each feature 25 questions in a 75-minute window — rewarding speed and accuracy." },
  { icon: "🎯", title: "Strategic Problem Selection", desc: "Emphasis on accuracy, speed, and knowing which problems to attempt for maximum score impact." },
  { icon: "🚫", title: "No Calculators Allowed", desc: "Pure mental and written computation — all about mathematical insight and technique." },
];

const preparationPoints = [
  {
    icon: "📚",
    title: "Strong Foundations",
    desc: "Deep training in algebra, geometry, number theory, and combinatorics — the core pillars of AMC success.",
  },
  {
    icon: "🔍",
    title: "Problem-Solving Strategies",
    desc: "Step-by-step strategies for tackling high-difficulty AMC problems with efficiency and clarity.",
  },
  {
    icon: "📋",
    title: "Extensive Practice",
    desc: "Extensive practice with past AMC papers, mock tests, and AIME-style questions for competition readiness.",
  },
  {
    icon: "⏳",
    title: "Time & Accuracy Training",
    desc: "Time-management and accuracy-focused techniques to maximize correct answers under exam conditions.",
  },
  {
    icon: "📈",
    title: "Personalized Mentoring",
    desc: "Personalized mentoring with continuous performance tracking and targeted improvement plans.",
  },
  {
    icon: "🚀",
    title: "AIME & Beyond Pathway",
    desc: "Structured progression from AMC to AIME, USAJMO, and ultimately the IMO pathway for top achievers.",
  },
];

export default function AMC() {
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
      <section className="w-full bg-white pt-14 pb-12 sm:pt-16 sm:pb-14 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-blue-900">
            AMC
          </h1>
          <p className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            American Mathematics Competitions
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            A prestigious series of mathematics contests conducted by the{" "}
            <strong className="text-blue-900">Mathematical Association of America (MAA)</strong> — the
            gateway to AIME, USAJMO, and the International Mathematical Olympiad.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToOverview}
              className="w-full sm:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Explore AMC
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
                src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80"
                alt="Mathematics competition"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                About the AMC
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                What is the AMC?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                The <strong className="text-blue-900">AMC (American Mathematics Competitions)</strong> is
                a prestigious series of mathematics contests conducted by the Mathematical Association
                of America (MAA).
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                Designed to identify and nurture mathematical talent, the AMC exams are widely
                recognized by top universities worldwide and serve as a{" "}
                <strong className="text-blue-900">gateway to elite competitions</strong> such as AIME,
                USAJMO, and the International Mathematical Olympiad (IMO).
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                The AMC is highly regarded for testing deep mathematical understanding, logical
                reasoning, and creative problem-solving — making it a key milestone for students
                aiming for excellence in advanced mathematics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXAM LEVELS ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Competition Levels
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              AMC Exam Levels
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The AMC consists of multiple levels based on a student's grade and mathematical
              maturity — each building toward elite competition pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {examLevels.map((level) => (
              <div
                key={level.code}
                className={`relative bg-gradient-to-br ${level.color} rounded-2xl p-6 md:p-8 text-white shadow-2xl overflow-hidden flex flex-col`}
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -translate-y-14 translate-x-14" />
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 md:w-14 md:h-14 ${level.badgeColor} rounded-xl flex items-center justify-center font-extrabold text-sm md:text-base shadow-lg shrink-0`}>
                      {level.code.replace("AMC ", "")}
                    </div>
                    <div>
                      <div className={`text-xs ${level.subColor} uppercase tracking-widest`}>{level.grade}</div>
                      <h3 className="text-lg md:text-xl font-bold">{level.code}</h3>
                    </div>
                    <span className="ml-auto text-2xl">{level.icon}</span>
                  </div>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5 flex-1">{level.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {level.tags.map((tag) => (
                      <span key={tag} className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {level.aime && (
                    <div className="bg-white/20 border border-white/30 rounded-xl px-4 py-2.5 text-xs font-semibold text-yellow-300 flex items-center gap-2">
                      <span>🌟</span>
                      <span>AIME Qualifier — top scorers advance to AIME</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* AIME pathway note */}
          <div className="mt-5 md:mt-8 bg-blue-900 rounded-2xl p-5 md:p-8 text-white text-center">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              Top scorers in AMC 10 and AMC 12 qualify for the{" "}
              <strong className="text-yellow-400">AIME (American Invitational Mathematics Examination)</strong> —
              a critical step toward national and international Olympiads including USAJMO and IMO.
            </p>
          </div>
        </div>
      </section>

      {/* ── PURPOSE ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Why It Matters
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Purpose of the AMC
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The AMC goes far beyond standard curricula — it challenges students to think deeply,
              creatively, and strategically about mathematics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {purposePoints.map((pt, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-8 hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex items-start gap-4"
              >
                <span className="text-3xl md:text-4xl flex-shrink-0">{pt.icon}</span>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD TAKE ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                alt="Students studying for competition"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="w-full lg:flex-1 order-1 lg:order-2">
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Is This For You?
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                Who Should Take the AMC?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                The AMC is ideal for students who are passionate about mathematics and want to push
                beyond conventional learning — setting themselves apart for top universities and
                international competitions.
              </p>
              <div className="space-y-3">
                {whoShouldPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white rounded-xl border-2 border-gray-100 p-4 md:p-5 hover:border-blue-900 hover:shadow-lg transition-all duration-300"
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

      {/* ── EXAM FORMAT ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Exam Format
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              AMC Exam Format
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Designed to reward both conceptual clarity and strategic problem-solving — no
              calculators, no shortcuts, pure mathematical thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {formatPoints.map((pt, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-8 hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex items-start gap-4"
              >
                <span className="text-3xl md:text-4xl flex-shrink-0">{pt.icon}</span>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-blue-900 mb-2">{pt.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 md:mt-8 bg-gray-50 border-2 border-gray-200 rounded-2xl p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-3xl">✨</span>
              <div>
                <h3 className="font-bold text-blue-900 text-base md:text-lg mb-1">
                  Conceptual Clarity Rewarded
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  The AMC exam rewards students who can combine precise mathematical understanding
                  with efficient and elegant problem-solving techniques — a skill set valued by top
                  universities worldwide.
                </p>
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
              How iThinkLearn Prepares Students for the AMC
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              At iThinkLearn, AMC preparation is built around deep conceptual understanding,
              structured problem-solving, and Olympiad-level mathematical thinking.
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
              "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/75 to-indigo-900/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white w-full">
          <div className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest backdrop-blur-sm">
            Start Today
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
            Ready to Start Your AMC Journey?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-3 leading-relaxed max-w-2xl mx-auto">
            With expert faculty, structured training, and individualized guidance, iThinkLearn
            helps students progress confidently from AMC to AIME, USAJMO, and ultimately the
            IMO pathway.
          </p>
          <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-semibold mb-8 sm:mb-10">
            Your Olympiad journey to the world stage starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3.5 px-8 md:px-12 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base md:text-lg shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 active:scale-95"
            >
              Start AMC Preparation
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
