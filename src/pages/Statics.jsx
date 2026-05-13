import React, { useState, useRef } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ContactModal from "../component/ContactModal";

const keyTopics = [
  {
    icon: "📊",
    title: "Exploring Data",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    subColor: "text-blue-300",
    desc: "Describing patterns and distributions, summarizing data with numerical and graphical methods, comparing distributions, and interpreting results in context.",
    tags: ["Descriptive Statistics", "Graphical Displays", "Data Distributions", "Measures of Center & Spread"],
  },
  {
    icon: "🔬",
    title: "Sampling & Experimentation",
    color: "from-indigo-900 to-purple-900",
    badgeColor: "bg-orange-400 text-white",
    subColor: "text-indigo-300",
    desc: "Planning and conducting statistical studies, understanding sampling methods, experimental design, and evaluating bias and variability in collected data.",
    tags: ["Study Design", "Sampling Methods", "Bias & Variability", "Experimental Design"],
  },
  {
    icon: "🎲",
    title: "Probability",
    color: "from-blue-800 to-cyan-900",
    badgeColor: "bg-yellow-400 text-blue-900",
    subColor: "text-cyan-300",
    desc: "Understanding random variables, probability rules and models, probability distributions, and using simulation to model real-world random phenomena.",
    tags: ["Probability Rules", "Random Variables", "Distributions", "Simulation"],
  },
  {
    icon: "📈",
    title: "Statistical Inference",
    color: "from-purple-900 to-indigo-800",
    badgeColor: "bg-orange-400 text-white",
    subColor: "text-purple-300",
    desc: "Estimating population parameters using confidence intervals, conducting significance tests, and drawing conclusions through hypothesis testing and regression.",
    tags: ["Confidence Intervals", "Hypothesis Testing", "Significance Tests", "Linear Regression"],
  },
];

const examSections = [
  {
    section: "Section I",
    title: "Multiple Choice",
    color: "from-blue-900 to-blue-800",
    badgeColor: "bg-yellow-400 text-blue-900",
    subColor: "text-blue-300",
    icon: "📝",
    details: [
      { label: "Questions", value: "40 Questions" },
      { label: "Duration", value: "90 Minutes" },
      { label: "Worth", value: "50% of Score" },
    ],
    desc: "Tests conceptual understanding and interpretation of data across all four major themes. Questions require reading graphs, interpreting outputs, and applying statistical reasoning — no lengthy calculations.",
    tags: ["Conceptual Understanding", "Data Interpretation", "Statistical Reasoning"],
  },
  {
    section: "Section II",
    title: "Free Response",
    color: "from-indigo-900 to-purple-900",
    badgeColor: "bg-orange-400 text-white",
    subColor: "text-indigo-300",
    icon: "✍️",
    details: [
      { label: "Questions", value: "6 Questions" },
      { label: "Duration", value: "90 Minutes" },
      { label: "Worth", value: "50% of Score" },
    ],
    desc: "5 shorter problems plus 1 extended investigative task. Requires justifying conclusions, communicating statistical reasoning clearly, and applying statistical thinking to realistic scenarios.",
    tags: ["Short Problems", "Investigative Task", "Statistical Justification"],
  },
];

const whoShouldPoints = [
  { icon: "📊", text: "Students interested in data analysis, research, and real-world problem solving" },
  { icon: "🏥", text: "Future professionals in medicine, psychology, business, economics, or social sciences" },
  { icon: "🎓", text: "Students aiming to earn college credit or advanced placement" },
  { icon: "🤖", text: "Learners pursuing data science, AI, finance, or engineering disciplines" },
  { icon: "🏛️", text: "Students targeting top universities that value rigorous quantitative subjects" },
];

const whyMattersPoints = [
  { icon: "🎓", title: "College Credit", desc: "Earn college credit and skip introductory statistics courses — saving time and tuition at universities worldwide." },
  { icon: "📊", title: "Data Science Ready", desc: "Build a strong foundation for data science, machine learning, economics, and research-driven careers." },
  { icon: "🏛️", title: "University Advantage", desc: "Demonstrate quantitative rigor that strengthens applications to top global universities and programs." },
  { icon: "🧠", title: "Analytical Thinking", desc: "Develop critical thinking, data interpretation, and decision-making skills valued across every profession." },
];

const preparationPoints = [
  {
    icon: "📚",
    title: "Concept-First Teaching",
    desc: "Clear, intuitive explanations of every statistical concept with real-world examples before problem practice.",
  },
  {
    icon: "✍️",
    title: "Free-Response Mastery",
    desc: "Structured step-by-step training for FRQ writing — emphasizing how to justify conclusions and communicate statistical reasoning clearly.",
  },
  {
    icon: "🎯",
    title: "College Board Aligned",
    desc: "Exam-focused strategies aligned with College Board standards, scoring rubrics, and AP Statistics format.",
  },
  {
    icon: "📋",
    title: "Mock Exams & Feedback",
    desc: "Regular assessments, full-length mock exams, and detailed performance analysis to identify and close knowledge gaps.",
  },
  {
    icon: "👨‍🏫",
    title: "Personalized Mentoring",
    desc: "One-on-one doubt resolution and personalized mentoring tailored to each student's pace and learning style.",
  },
  {
    icon: "🔍",
    title: "Past Paper Practice",
    desc: "Extensive practice with College Board–style questions and past exam papers for confident exam-day performance.",
  },
];

export default function Statistics() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const overviewRef = useRef(null);

  return (
    <div className="w-full">
      <Header />

      {/* ── HERO ── */}
      <section className="w-full bg-white pt-14 pb-12 sm:pt-16 sm:pb-14 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12 ">
        <div className="max-w-7xl mx-auto text-center">
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-blue-900">
            AP Statistics
          </h1>
          <p className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Data Analysis &amp; Statistical Reasoning
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-6xl mx-auto mb-8 leading-relaxed">
            College Board AP course recognized by universities worldwide — essential for students pursuing{" "}
            <strong className="text-blue-900">data science, economics, business, medicine, psychology</strong>, and all STEM fields.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => overviewRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Explore AP Statistics
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
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                alt="AP Statistics data analysis"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
            </div>
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                About AP Statistics
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                What is AP Statistics?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                <strong className="text-blue-900">AP Statistics</strong> is a college-level course and examination offered by the College Board, designed to introduce students to the science of data analysis and statistical reasoning.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                The exam is widely recognized by universities worldwide and is particularly valuable for students pursuing{" "}
                <strong className="text-blue-900">data science, economics, business, psychology, biology, social sciences, engineering</strong>, and other STEM disciplines.
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                AP Statistics emphasizes <strong className="text-blue-900">conceptual understanding, interpretation of data, and real-world application</strong> — making it a critical subject for building strong analytical and decision-making skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PURPOSE ── */}
      <section className="w-full bg-gray-50 py-12 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Exam Purpose
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Purpose of AP Statistics
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The AP Statistics exam assesses a student's ability to think statistically — not just compute numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-8">
            {[
              { icon: "📊", title: "Explore & Analyze Data", desc: "Using graphical and numerical methods to describe patterns, distributions, and relationships in data." },
              { icon: "🎲", title: "Apply Probability Models", desc: "Connecting probability theory to real-life situations — from risk assessment to predicting outcomes." },
              { icon: "📈", title: "Draw Conclusions", desc: "Making predictions and drawing reliable conclusions using statistical inference techniques." },
              { icon: "💬", title: "Communicate Reasoning", desc: "Clearly and accurately expressing statistical thinking, justifications, and interpretations in writing." },
            ].map((pt, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-6 hover:border-blue-900 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{pt.icon}</div>
                <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-2">{pt.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-900 rounded-2xl p-5 md:p-8 text-white text-center">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              Rather than focusing on heavy computation, AP Statistics evaluates{" "}
              <strong className="text-yellow-400">statistical thinking and interpretation</strong> — essential skills for
              higher education and professional success in virtually every field.
            </p>
          </div>
        </div>
      </section>

      {/* ── KEY TOPICS ── */}
      <section className="w-full bg-white py-12 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Curriculum
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Key Topics Covered
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The AP Statistics curriculum is organized around four major themes — each building critical analytical and reasoning skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {keyTopics.map((topic) => (
              <div
                key={topic.title}
                className={`relative bg-gradient-to-br ${topic.color} rounded-2xl p-6 md:p-8 text-white shadow-2xl overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-11 h-11 md:w-14 md:h-14 ${topic.badgeColor} rounded-xl flex items-center justify-center text-xl shadow-lg shrink-0`}>
                      {topic.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">{topic.title}</h3>
                  </div>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5">{topic.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {topic.tags.map((tag) => (
                      <span key={tag} className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAM FORMAT ── */}
      <section className="w-full bg-gray-50 py-12 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              Exam Structure
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              AP Statistics Exam Format
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              The exam consists of two balanced sections — testing both conceptual knowledge and applied statistical reasoning.
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
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 md:w-14 md:h-14 ${sec.badgeColor} rounded-xl flex items-center justify-center text-xl shadow-lg shrink-0`}>
                      {sec.icon}
                    </div>
                    <div>
                      <div className={`text-xs ${sec.subColor} uppercase tracking-widest`}>{sec.section}</div>
                      <h3 className="text-lg md:text-xl font-bold">{sec.title}</h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {sec.details.map((d) => (
                      <div key={d.label} className="bg-white/15 rounded-lg px-3 py-2 text-center">
                        <div className="text-white/70 text-xs uppercase tracking-wide">{d.label}</div>
                        <div className="text-white font-bold text-sm">{d.value}</div>
                      </div>
                    ))}
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

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 md:p-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              ✨ Students are evaluated on{" "}
              <strong className="text-blue-900">accuracy, statistical reasoning, and clarity of explanation</strong>{" "}
              — not just final answers. The ability to communicate statistical thinking is critical to a high score.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD TAKE ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1">
              <div className="inline-block bg-blue-50 text-blue-800 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                Is This For You?
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                Who Should Take AP Statistics?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                AP Statistics is ideal for ambitious students who want to build a strong foundation in data analysis and statistical thinking valued by universities and employers worldwide.
              </p>
              <div className="space-y-3">
                {whoShouldPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-gray-50 rounded-xl border-2 border-gray-100 p-4 hover:border-blue-900 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-2xl shrink-0">{pt.icon}</span>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{pt.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:flex-1">
              <img
                src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"
                alt="Students analyzing statistical data"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY AP STATISTICS MATTERS ── */}
      <section className="w-full bg-gray-50 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:flex-1 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                alt="Data analytics and statistics"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="w-full lg:flex-1 order-1 lg:order-2">
              <div className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                Why It Matters
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                Why AP Statistics Matters
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                In a data-driven world, AP Statistics opens doors to top universities, valuable career paths, and the analytical skills essential for success in virtually every field.
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
              How iThinkLearn Prepares Students for AP Statistics
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              At iThinkLearn, AP Statistics preparation focuses on conceptual clarity, structured practice, and exam-oriented strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {preparationPoints.map((pt, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-gray-100 p-5 md:p-8 hover:border-blue-900 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4 shrink-0">
                  {pt.icon}
                </div>
                <h3 className="font-bold text-blue-900 text-base sm:text-lg mb-2">{pt.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 rounded-2xl border-2 border-gray-200 p-6 md:p-8 text-center">
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
              With <strong className="text-blue-900">expert faculty, interactive classes</strong>, and continuous progress tracking,
              iThinkLearn helps students gain confidence, master statistical reasoning, and{" "}
              <strong className="text-blue-900">achieve high scores in AP Statistics</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="w-full relative min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/75 to-indigo-900/70" />
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block bg-yellow-400 text-blue-900 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide shadow-lg">
              Start Your Journey
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Ready to Excel in AP Statistics?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Join iThinkLearn's expert-led AP Statistics program and master statistical reasoning, data analysis, and exam strategy — all with personalized mentoring and structured guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3.5 px-10 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all text-sm sm:text-base shadow-2xl hover:shadow-orange-500/30"
              >
                Book a Free Demo Class
              </button>
              <a
                href="mailto:ithinklearn@ixpoe.com"
                className="w-full sm:w-auto bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white font-bold py-3.5 px-10 rounded-lg hover:bg-white/25 transition-all text-sm sm:text-base inline-flex items-center justify-center"
              >
                Talk to an Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
