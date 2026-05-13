import React, { useState, useRef } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ContactModal from "../component/ContactModal";

const purposePoints = [
  { icon: "📚", text: "Academic preparedness for college-level coursework" },
  { icon: "🧠", text: "Critical thinking and problem-solving skills" },
  { icon: "⏱️", text: "Ability to apply knowledge under time pressure" },
  { icon: "🎯", text: "Readiness across core subject areas" },
];

const examSections = [
  {
    code: "E",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    label: "English",
    sub: "Section 01",
    subColor: "text-blue-300",
    desc: "Tests grammar, sentence structure, punctuation, and rhetorical skills.",
    tags: ["Grammar", "Sentence Structure", "Punctuation", "Rhetoric"],
  },
  {
    code: "M",
    color: "from-indigo-900 to-purple-800",
    badgeColor: "bg-orange-400 text-white",
    label: "Mathematics",
    sub: "Section 02",
    subColor: "text-indigo-300",
    desc: "Covers pre-algebra, algebra, geometry, trigonometry, and basic statistics. Emphasis on accuracy, speed, and problem-solving.",
    tags: ["Algebra", "Geometry", "Trigonometry", "Statistics"],
  },
  {
    code: "R",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    label: "Reading",
    sub: "Section 03",
    subColor: "text-blue-300",
    desc: "Assesses comprehension, interpretation, and analytical reading skills through diverse passage types.",
    tags: ["Comprehension", "Interpretation", "Analysis", "Passages"],
  },
  {
    code: "S",
    color: "from-indigo-900 to-purple-800",
    badgeColor: "bg-orange-400 text-white",
    label: "Science",
    sub: "Section 04",
    subColor: "text-indigo-300",
    desc: "Focuses on data interpretation, analysis, and scientific reasoning — not memorization of scientific facts.",
    tags: ["Data Interpretation", "Analysis", "Reasoning", "Experiments"],
  },
];

const whoShouldPoints = [
  { icon: "🎓", text: "Plan to apply to US or international universities" },
  { icon: "⚡", text: "Prefer a test with direct questions and faster pacing" },
  { icon: "📊", text: "Have strong analytical and time-management skills" },
  { icon: "🏆", text: "Seek eligibility for merit-based scholarships" },
];

const scoringPoints = [
  { icon: "📊", title: "Section Scores", desc: "Each of the four sections is scored on a scale of 1–36." },
  { icon: "🔢", title: "Composite Score", desc: "The Composite Score is the average of all four section scores." },
  { icon: "🏛️", title: "University Impact", desc: "Higher scores significantly strengthen university applications and scholarship opportunities." },
];

const preparationPoints = [
  {
    icon: "📚",
    title: "Conceptual Strengthening",
    desc: "Conceptual strengthening in ACT Mathematics and Science reasoning through structured sessions.",
  },
  {
    icon: "⚡",
    title: "Speed & Accuracy",
    desc: "Proven strategies for accuracy, speed, and time management tailored to ACT's fast-paced format.",
  },
  {
    icon: "🧩",
    title: "ACT-Style Practice",
    desc: "Extensive practice with official ACT-style questions across all four sections.",
  },
  {
    icon: "📝",
    title: "Full-Length Mock Tests",
    desc: "Full-length mock tests and detailed performance analysis to identify strengths and gaps.",
  },
  {
    icon: "📈",
    title: "Personalized Feedback",
    desc: "One-on-one feedback and customized improvement plans for each student.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Faculty",
    desc: "Expert faculty with exam-focused methodology and continuous progress tracking.",
  },
];

export default function ACT() {
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
        <div className="max-w-6xl mx-auto text-center">
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-blue-900">
            ACT
          </h1>
          <p className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            American College Testing Exam
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-5xl mx-auto mb-8 leading-relaxed">
            A globally recognized standardized test for undergraduate college admissions — accepted by
            universities in the US, Canada, Europe, Australia, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToOverview}
              className="w-full sm:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Explore ACT
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
                src="https://media.gettyimages.com/id/1564640338/photo/female-young-behind-book-with-face-covered-for-a-red-book-while-smiling.jpg?s=612x612&w=0&k=20&c=M91SJ312EB1HUL46xU21-clGspaAx73StiaiNCvzdtk="
                alt="College admissions"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                College Admissions
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                What is the ACT?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                The <strong className="text-blue-900">ACT (American College Testing)</strong> exam is a globally recognized
                standardized test used for undergraduate college admissions, primarily in the United States,
                and accepted by universities in Canada, Europe, Australia, and other countries.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                The ACT assesses a student's academic readiness for college by evaluating skills developed
                through school education.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Many universities consider ACT scores as a{" "}
                <strong className="text-blue-900">key component of admissions decisions, scholarships, and placement</strong>,
                making it an important exam for students aiming for top global universities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PURPOSE ── */}
      <section className="w-full bg-gray-50 py-10 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Why It Matters
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Purpose of the ACT
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The ACT is designed to provide colleges with a standardized benchmark to compare students
              from diverse educational backgrounds.
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
              The ACT is especially valuable because it provides{" "}
              <strong className="text-yellow-400">a comprehensive, fair assessment of college readiness</strong>{" "}
              across all core academic subjects.
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
              ACT Exam Structure
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Four mandatory sections plus an optional Writing (Essay) section. Each section tests
              a distinct set of academic skills.
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
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${sec.badgeColor} rounded-xl flex items-center justify-center font-extrabold text-lg md:text-xl shadow-lg`}>
                      {sec.code}
                    </div>
                    <div>
                      <div className={`text-xs ${sec.subColor} uppercase tracking-widest`}>{sec.sub}</div>
                      <h3 className="text-lg md:text-xl font-bold">{sec.label}</h3>
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

          {/* Optional Writing */}
          <div className="mt-5 md:mt-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0">
                W
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-blue-900">Writing (Essay)</h3>
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase">
                    Optional
                  </span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Evaluates the ability to analyze an issue and present a clear, well-structured argument.
                  Required by some universities — check individual admission requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCORING SYSTEM ── */}
      <section className="w-full bg-gray-50 py-10 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Scoring
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Scoring System
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The ACT uses a straightforward, transparent scoring model that universities rely on.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1">
              <img
                src="https://media.gettyimages.com/id/2260883703/photo/quality-assurance-concept-with-five-star-rating-and-check-mark-icon-in-hand-symbolizing.jpg?s=612x612&w=0&k=20&c=soTLiPxAKCecRIWd4qC0rzN6B_cRrLIHx3yOokv4QWY="
                alt="Student exam scoring"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1 space-y-4">
              {scoringPoints.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-xl border-2 border-gray-100 p-5 md:p-6 hover:border-blue-900 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-2xl md:text-3xl flex-shrink-0">{pt.icon}</span>
                  <div>
                    <h3 className="font-bold text-blue-900 text-base md:text-lg mb-1">{pt.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              ))}

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
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="Students in classroom"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="w-full lg:flex-1 order-1 lg:order-2">
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Is This For You?
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                Who Should Take the ACT?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                Many students choose the ACT as an alternative or complement to the SAT, depending
                on their individual strengths and goals.
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
              How iThinkLearn Prepares Students for the ACT
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              At iThinkLearn, ACT preparation is designed to help students achieve high scores with
              confidence through structured training and personalized mentoring.
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
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-blue-950/88" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Ready to Maximize Your ACT Score?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-3 leading-relaxed">
            With expert faculty, exam-focused methodology, and continuous progress tracking,
            iThinkLearn empowers students to maximize their ACT potential.
          </p>
          <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-semibold mb-8">
            Gain admission to top global universities with a competitive ACT score.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3 px-8 md:px-12 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl"
            >
              Start Your ACT Journey
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
