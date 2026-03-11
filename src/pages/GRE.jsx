import React, { useState, useRef } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ContactModal from "../component/ContactModal";

const purposePoints = [
  { icon: "🧠", text: "Analytical thinking and logical reasoning ability" },
  { icon: "📐", text: "Quantitative problem-solving skills" },
  { icon: "📖", text: "Verbal reasoning and comprehension" },
  { icon: "🎓", text: "Academic readiness for graduate-level coursework" },
];

const examSections = [
  {
    code: "VR",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    label: "Verbal Reasoning",
    sub: "Section 01",
    subColor: "text-blue-300",
    desc: "Tests reading comprehension, vocabulary usage, and the ability to analyze and evaluate written material.",
    tags: ["Reading Comprehension", "Vocabulary", "Text Analysis", "Critical Reasoning"],
  },
  {
    code: "QR",
    color: "from-indigo-900 to-purple-800",
    badgeColor: "bg-orange-400 text-white",
    label: "Quantitative Reasoning",
    sub: "Section 02",
    subColor: "text-indigo-300",
    desc: "Assesses mathematical skills such as arithmetic, algebra, geometry, and data analysis with strong emphasis on logic, accuracy, and time management.",
    tags: ["Arithmetic", "Algebra", "Geometry", "Data Analysis"],
  },
  {
    code: "AW",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    label: "Analytical Writing (AWA)",
    sub: "Section 03",
    subColor: "text-blue-300",
    desc: "Measures critical thinking and analytical writing skills through structured essay tasks — issue task and argument task.",
    tags: ["Issue Essay", "Argument Essay", "Critical Thinking", "Writing"],
  },
];

const whoShouldPoints = [
  { icon: "🎯", text: "Are applying to MS, MSc, MA, or PhD programs worldwide" },
  { icon: "🔬", text: "Plan to pursue careers in STEM, economics, analytics, or research-based fields" },
  { icon: "🏛️", text: "Seek admission to top-ranked universities and programs" },
  { icon: "💰", text: "Want to strengthen their profile for scholarships and funding opportunities" },
];

const scoringData = [
  { section: "Verbal Reasoning", range: "130 – 170", color: "bg-blue-900", bar: "75%" },
  { section: "Quantitative Reasoning", range: "130 – 170", color: "bg-indigo-800", bar: "75%" },
  { section: "Analytical Writing", range: "0 – 6", color: "bg-purple-800", bar: "100%" },
];

const preparationPoints = [
  {
    icon: "📚",
    title: "Quant Conceptual Training",
    desc: "In-depth conceptual training for GRE Quantitative Reasoning covering all key math topics.",
  },
  {
    icon: "⚡",
    title: "Logical Shortcuts",
    desc: "Logical shortcuts and problem-solving frameworks for speed and accuracy under exam conditions.",
  },
  {
    icon: "🎯",
    title: "High-Frequency Questions",
    desc: "Focused practice on high-frequency GRE question types across Verbal and Quant sections.",
  },
  {
    icon: "📝",
    title: "Full-Length Mock Tests",
    desc: "Full-length mock tests with detailed performance analysis to identify and fix weak areas.",
  },
  {
    icon: "📈",
    title: "Personalized Feedback",
    desc: "Personalized feedback and one-on-one mentoring tailored to each student's target score.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Faculty",
    desc: "Expert faculty with proven methodologies and continuous progress tracking for consistent improvement.",
  },
];

export default function GRE() {
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
      <section className="w-full bg-white py-10 px-4 sm:px-6 md:px-8 lg:px-12 ">
        <div className="max-w-7xl mx-auto text-center">
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-blue-900">
            GRE
          </h1>
          <p className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Graduate Record Examination
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-6xl mx-auto mb-8 leading-relaxed">
            A globally recognized standardized test required for admission to master's and doctoral
            programs at top universities in the US, Canada, Europe, the UK, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToOverview}
              className="w-full sm:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Explore GRE
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
                src="https://media.gettyimages.com/id/2155365965/photo/male-and-female-high-school-students-holding-study-notebooks.jpg?s=612x612&w=0&k=20&c=yRYyrJINUTZbC6BQJR0IR-qa7ed8PxPSFdEgP3H1xi8="
                alt="Graduate student"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                Graduate Admissions
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                What is the GRE?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                The <strong className="text-blue-900">GRE (Graduate Record Examination)</strong> is a globally
                recognized standardized test required for admission to master's and doctoral programs across
                universities in the United States, Canada, Europe, the UK, and many other countries.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                It is widely used for graduate programs in Engineering, Science, Mathematics, Economics,
                Data Science, Management, and related fields.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                GRE scores play a crucial role in{" "}
                <strong className="text-blue-900">university admissions, scholarships, and assistantships</strong>,
                making it an important milestone for students aspiring to pursue higher education at top global institutions.
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
              Purpose of the GRE
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Unlike curriculum-based exams, the GRE evaluates thinking skills and problem-solving
              aptitude, allowing universities to compare applicants from diverse academic backgrounds.
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
              The GRE is valued because it provides universities with a{" "}
              <strong className="text-yellow-400">standardized, curriculum-independent measure</strong>{" "}
              of graduate-level academic readiness.
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
              GRE Exam Structure
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The GRE General Test consists of three main sections. It is computer-based, adaptive at
              the section level, and requires strategic test-taking skills in addition to strong fundamentals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8">
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
                <h3 className="font-bold text-blue-900 text-base md:text-lg mb-1">Computer-Based & Section-Adaptive</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  The GRE is delivered on a computer and adapts at the section level — your performance
                  in the first section determines the difficulty of the second. Strategic test-taking is essential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCORING SYSTEM ── */}
      <section className="w-full bg-gray-50 py-12 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Scoring
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              GRE Scoring System
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Each section is scored independently. Strong GRE scores significantly enhance graduate
              school applications and academic credibility.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1">
              <img
                src="https://media.gettyimages.com/id/184843366/photo/review-form-for-evaluation.jpg?s=612x612&w=0&k=20&c=0kAxHq8404H4ZxCDsSuttNoEf9qrTH1w3Dm-l7_7HbY="
                alt="Graduate study scoring"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1 space-y-4">
              {scoringData.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-6 hover:border-blue-900 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-blue-900 text-sm md:text-base">{item.section}</h3>
                    <span className="text-orange-500 font-extrabold text-base md:text-lg">{item.range}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: item.bar }}
                    />
                  </div>
                </div>
              ))}

              <div className="bg-blue-900 rounded-xl p-5 text-white">
                <p className="text-sm sm:text-base leading-relaxed">
                  <strong className="text-yellow-400">Strong GRE scores</strong> significantly enhance
                  graduate school applications, scholarship eligibility, and overall academic credibility
                  at top global institutions.
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
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Is This For You?
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                Who Should Take the GRE?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                The GRE is ideal for ambitious students who want to pursue graduate-level education
                at world-class universities and stand out in highly competitive admissions.
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
            <div className="w-full lg:flex-1">
              <img
                src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80"
                alt="Graduate students"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
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
              How iThinkLearn Prepares Students for the GRE
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              At iThinkLearn, GRE preparation is built around conceptual clarity, structured practice,
              and exam strategy to help students achieve their target scores efficiently.
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
              "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-blue-950/88" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Ready to Ace the GRE?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-3 leading-relaxed">
            With expert faculty, proven methodologies, and continuous progress tracking, iThinkLearn
            helps students build confidence, improve performance, and secure admissions to top global
            graduate programs.
          </p>
          <p className="text-yellow-300 text-sm sm:text-base md:text-lg font-semibold mb-8">
            Your path to top graduate programs starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3 px-8 md:px-12 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl"
            >
              Start Your GRE Journey
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
