import React, { useState, useRef } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ContactModal from "../component/ContactModal";

const purposePoints = [
  {
    icon: "🧮",
    text: "Apply core mathematical concepts in unfamiliar contexts",
  },
  {
    icon: "🧠",
    text: "Reason logically and construct clear mathematical arguments",
  },
  {
    icon: "⏱️",
    text: "Solve challenging problems under time constraints",
  },
  {
    icon: "📐",
    text: "Demonstrate depth of understanding beyond standard school exams",
  },
];

const whoShouldPoints = [
  {
    icon: "🎓",
    text: "Are applying to top-tier universities for mathematics-heavy degrees",
  },
  {
    icon: "📊",
    text: "Have strong interest in pure mathematics, applied mathematics, economics, or computer science",
  },
  {
    icon: "🏆",
    text: "Aim to distinguish themselves in competitive university admissions",
  },
  {
    icon: "🔢",
    text: "Enjoy challenging, non-routine mathematical problem solving",
  },
];

const preparationPoints = [
  {
    icon: "📚",
    title: "Conceptual Foundations",
    desc: "Strong conceptual foundations in core mathematics built over structured sessions.",
  },
  {
    icon: "🧩",
    title: "Advanced Problem-Solving",
    desc: "Advanced problem-solving techniques and logical reasoning to tackle non-routine questions.",
  },
  {
    icon: "🎯",
    title: "TMUA-Style Strategies",
    desc: "Step-by-step strategies to tackle high-difficulty TMUA-style questions with precision.",
  },
  {
    icon: "⏳",
    title: "Timed Practice & Simulation",
    desc: "Timed practice and exam simulation for speed, accuracy, and real-exam readiness.",
  },
  {
    icon: "📈",
    title: "Performance Tracking",
    desc: "Personalized feedback and performance tracking to monitor and accelerate progress.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Mentors",
    desc: "Experienced mentors dedicated to helping each student excel and build lasting confidence.",
  },
];

export default function TMUA() {
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
      <section className="w-full bg-white py-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-blue-900">
            TMUA
          </h1>
          <p className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Test of Mathematics for University Admission
          </p>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            A prestigious mathematics aptitude exam used by leading UK and European universities to
            assess mathematical thinking, logical reasoning, and problem-solving ability.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToOverview}
              className="w-full sm:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Explore TMUA
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
            {/* Image */}
            <div className="w-full lg:flex-1">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
                alt="University campus"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>

            {/* Text */}
            <div className="w-full lg:flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                What is the TMUA?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                The <strong className="text-blue-900">TMUA (Test of Mathematics for University Admission)</strong> is a
                prestigious and highly competitive mathematics aptitude exam used by leading universities,
                particularly in the UK and Europe, as part of their undergraduate admissions process.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                It is designed to assess a student's mathematical thinking, logical reasoning, and
                problem-solving ability — rather than rote learning or syllabus-heavy computation.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                TMUA is commonly <strong className="text-blue-900">required or strongly recommended</strong> for admission to
                top programs in Mathematics, Computer Science, Economics, Engineering, and related
                quantitative disciplines at universities such as Cambridge, Imperial College London,
                Warwick, and other globally ranked institutions.
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
              Purpose of the TMUA
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The TMUA evaluates how effectively students can demonstrate genuine mathematical aptitude,
              independent of different school curricula across countries.
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
              The TMUA is especially valued by universities because it provides a{" "}
              <strong className="text-yellow-400">fair and rigorous measure of mathematical aptitude</strong>,
              independent of different school curricula across countries.
            </p>
          </div>
        </div>
      </section>

      {/* ── EXAM STRUCTURE ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Exam Structure
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The TMUA consists of two papers, each designed to test different aspects of mathematical thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 max-w-7xl mx-auto">
            {/* Paper 1 */}
            <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 md:p-8 text-white shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-blue-900 font-extrabold text-lg md:text-xl shadow-lg">
                    P1
                  </div>
                  <div>
                    <div className="text-xs text-blue-300 uppercase tracking-widest">First Paper</div>
                    <h3 className="text-lg md:text-xl font-bold">Paper 1</h3>
                  </div>
                </div>
                <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-5">
                  Focuses on <strong className="text-white">problem-solving</strong> using foundational
                  mathematics such as algebra, functions, geometry, and basic calculus.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Algebra", "Functions", "Geometry", "Calculus"].map((tag) => (
                    <span key={tag} className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Paper 2 */}
            <div className="relative bg-gradient-to-br from-indigo-900 to-purple-800 rounded-2xl p-6 md:p-8 text-white shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-400 rounded-xl flex items-center justify-center text-white font-extrabold text-lg md:text-xl shadow-lg">
                    P2
                  </div>
                  <div>
                    <div className="text-xs text-indigo-300 uppercase tracking-widest">Second Paper</div>
                    <h3 className="text-lg md:text-xl font-bold">Paper 2</h3>
                  </div>
                </div>
                <p className="text-indigo-100 text-sm md:text-base leading-relaxed mb-5">
                  Emphasizes <strong className="text-white">mathematical reasoning, proofs, and logical thinking</strong>,
                  requiring deeper conceptual understanding and analytical skills.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Proofs", "Reasoning", "Logic", "Analysis"].map((tag) => (
                    <span key={tag} className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Common attributes */}
          <div className="mt-6 md:mt-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: "✅", label: "Multiple Choice", sub: "Format" },
              { icon: "⌛", label: "Time-Bound", sub: "Structure" },
              { icon: "🎯", label: "Precision & Speed", sub: "Required" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 border-2 border-gray-100 rounded-xl p-4 md:p-5 text-center hover:border-blue-900 hover:shadow-lg transition-all"
              >
                <div className="text-2xl md:text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-blue-900 text-sm">{item.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD TAKE ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Text */}
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Is This For You?
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                Who Should Take TMUA?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                TMUA is ideal for students who are determined to pursue quantitative disciplines at
                world-class universities and want to stand out in a highly competitive admissions pool.
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

            {/* Image */}
            <div className="w-full lg:flex-1">
              <img
                src="https://images.unsplash.com/photo-1509869175650-a1d97972541a?auto=format&fit=crop&w=800&q=80"
                alt="Student studying mathematics"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW iTHINKLEARN PREPARES ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Our Approach
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              How iThinkLearn Prepares Students for TMUA
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              At iThinkLearn, TMUA preparation is designed to go beyond routine practice and focus
              on deep mathematical thinking. Our expert-led coaching helps students develop the exact
              skills universities look for.
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

      {/* ── CLOSING VISUAL SECTION ── */}
      <section className="w-full py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-blue-950/88" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Ready to Excel in TMUA?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-3 leading-relaxed">
            With structured guidance, experienced mentors, and targeted practice, iThinkLearn helps
            students build confidence, sharpen reasoning skills, and perform at their best in the
            TMUA exam.
          </p>
          <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-semibold mb-8">
            Opening doors to world-class universities and competitive degree programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3 px-8 md:px-12 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl"
            >
              Start Your TMUA Journey
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-white/10 border-2 border-white/40 text-white font-bold py-3 px-8 md:px-12 rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base md:text-lg backdrop-blur-sm"
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
