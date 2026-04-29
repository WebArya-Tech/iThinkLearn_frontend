import React, { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import SubmitTestimonialModal from "../component/SubmitTestimonialModal";
import LoginModal from "../component/auth/LoginModal";
import SignupModal from "../component/auth/SignupModal";
import { getApprovedTestimonials } from "../api/testimonialApi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const hardcodedTestimonials = [
  // Student Testimonials
  {
    name: "Aarav S.",
    role: "AP Calculus BC Student",
    text: "iThinkLearn helped me master AP Calculus BC with complete conceptual clarity. The problem-solving approach made even the toughest questions manageable.",
    type: "student",
  },
  {
    name: "Rohan K.",
    role: "AMC (USA) Aspirant",
    text: "The AMC and Olympiad-style training at iThinkLearn significantly improved my logical thinking and speed. I feel far more confident now.",
    type: "student",
  },
  {
    name: "Meera P.",
    role: "AP Statistics & SAT Student",
    text: "AP Statistics and SAT Math became much easier after joining iThinkLearn. The classes are focused, interactive, and very effective.",
    type: "student",
  },
  {
    name: "Daniel M.",
    role: "TMUA Candidate",
    text: "The TMUA preparation was extremely structured. Every session focused on accuracy, reasoning, and exam strategy.",
    type: "student",
  },
  {
    name: "Ananya R.",
    role: "GRE Student",
    text: "iThinkLearn's GRE Quant coaching helped me improve my score in a short time. The faculty explains concepts in a very clear and practical way.",
    type: "student",
  },
  {
    name: "Lucas T.",
    role: "AP Economics Student",
    text: "From AP Economics to advanced math problem-solving, iThinkLearn helped me build confidence across subjects.",
    type: "student",
  },
  {
    name: "Vikram S.",
    role: "AMC & IMO Track Student",
    text: "The Olympiad-level questions and mentoring pushed me to think beyond textbooks. It was exactly what I needed for AMC preparation.",
    type: "student",
  },
  // Parent Testimonials
  {
    name: "Parent of AP Calculus AB Student",
    role: "Parent",
    text: "The personalized attention at iThinkLearn is outstanding. My son's performance in AP Calculus AB improved significantly within months.",
    type: "parent",
  },
  {
    name: "Parent of SAT & AP Statistics Student",
    role: "Parent",
    text: "iThinkLearn's structured teaching and regular feedback helped my daughter gain confidence in SAT Math and AP Statistics.",
    type: "parent",
  },
  {
    name: "Parent of AMC (USA) Student",
    role: "Parent",
    text: "The faculty is highly knowledgeable and patient. The one-on-one mentoring made a big difference in my child's AMC preparation.",
    type: "parent",
  },
  {
    name: "Parent of GMAT Student",
    role: "Parent",
    text: "We chose iThinkLearn for GMAT Quant preparation, and the results were excellent. The teaching is focused and exam-oriented.",
    type: "parent",
  },
  {
    name: "Parent of Olympiad Student",
    role: "Parent",
    text: "The clarity with which complex concepts are explained is remarkable. My son now enjoys advanced math.",
    type: "parent",
  },
  {
    name: "Parent of International Student",
    role: "Parent",
    text: "iThinkLearn provides global-level coaching with consistent monitoring and feedback. We are very satisfied with the progress.",
    type: "parent",
  },
  {
    name: "Parent of AP Biology Student",
    role: "Parent",
    text: "The mentors are approachable and genuinely invested in student success. AP Biology and Statistics preparation was well-structured.",
    type: "parent",
  },
  {
    name: "Parent of Competitive Exam Student",
    role: "Parent",
    text: "iThinkLearn is not just coaching—it's mentorship. My child gained both academic strength and confidence.",
    type: "parent",
  },
  {
    name: "Ananya Oberoi",
    role: "Undergraduate Student, International Track",
    text: "I have rarely encountered mentors with such depth of knowledge and genuine commitment to student success. ICFY Global tutors' clarity of explanation, structured guidance, and continuous availability for academic support played a pivotal role in strengthening my understanding of complex undergraduate concepts.",
  },
  {
    name: "Sunita Rao",
    role: "Parent of an Undergraduate Student",
    text: "The individualized mentoring approach truly sets the ICFY Global platform apart. The one-to-one academic support provided my son with the confidence and clarity needed to manage demanding university-level coursework successfully.",
  },
  {
    name: "Karan Deshpande",
    role: "Bachelor's Degree Student",
    text: "The systematic learning structure and continuous academic monitoring of ICFY Global helped me remain focused and consistent throughout my bachelor's program. The ICFY Global mentors ensured seamless progression across subjects, which was essential for long-term academic stability.",
  },
  {
    name: "Ishita Mehra",
    role: "Undergraduate Student, Overseas Program",
    text: "As an international learner, I was impressed by the clarity, organization, and academic rigor of the teaching methodology of the ICFY Global tutors. Regular doubt-resolution sessions and personalized study planning significantly enhanced my confidence in tackling advanced topics.",
  },
  {
    name: "Christopher Allen",
    role: "Undergraduate Student, International Program",
    text: "The emphasis on conceptual mastery rather than rote learning made a remarkable difference in my academic journey. Even advanced coursework felt approachable due to the ICFY Global mentors' detailed explanations and continuous guidance.",
  },
  {
    name: "Sneha Menon",
    role: "Bachelor's Program Student",
    text: "The ICFY Global helped me establish a strong academic foundation during my bachelor's degree. Clear instruction, structured assessments, and insightful feedback of the ICFY Global tutors contributed significantly to my improved performance and subject mastery.",
  },
  {
    name: "Ritvik Malhotra",
    role: "Final-Year Undergraduate Student",
    text: "Throughout my final year, ICFY Global served as a reliable academic anchor. The mentors offered in-depth syllabus coverage along with effective exam strategies that helped me stay confident and well-prepared.",
  },
  {
    name: "Daniel Fernandes",
    role: "Undergraduate Student, International",
    text: "University-level studies can be challenging, but the personalized doubt-clearing sessions and well-curated practice assignments made learning both efficient and enjoyable at ICFY Global. My accuracy and problem-solving speed improved considerably.",
  },
  {
    name: "Aditya Jain",
    role: "Engineering Undergraduate Student",
    text: "Analytical problem-solving was once my weakest area, but the structured, step-by-step mentoring approach transformed my learning experience. Targeted practice, continuous feedback, and ICFY Global mentor support helped me exceed my own expectations.",
  },
  {
    name: "Emily Carter",
    role: "Undergraduate Student, Global Program",
    text: "The ICFY Global mentors focus on logical reasoning and real-world application rather than memorization. This approach made complex concepts engaging and enabled me to develop strong analytical skills critical for my degree program.",
  },
  {
    name: "Rahul Srivastava",
    role: "Graduation-Level Student",
    text: "Expert mentorship of ICFY Global provided me with exceptional conceptual clarity in advanced subjects. Strategic revision plans and exam-focused guidance reduced academic pressure and made complex material manageable.",
  },
  {
    name: "Megha Khurana",
    role: "Undergraduate Science Student",
    text: "The integration of practical examples and real-world applications significantly enhanced my understanding across disciplines. The overall learning experience has been intellectually stimulating and academically enriching. Thank you to ICFY Global tutors for their enormous support.",
  },
  {
    name: "Oliver Grant",
    role: "Undergraduate Student, Overseas Program",
    text: "Structured notes, precise explanations, and regular academic evaluations made revision streamlined and effective. Weekly assessments conducted by ICFY Global tutors helped me track progress and build consistent academic confidence.",
  },
  {
    name: "Nandita Bose",
    role: "Undergraduate Student",
    text: "ICFY Global has been transformative for my college education. The mentors address every academic query with patience and depth, ensuring a strong conceptual foundation across multiple subjects.",
  },
  {
    name: "Vikram Raghavan",
    role: "Graduation-Level Student",
    text: "I am sincerely grateful to the ICFY Global mentors for making my academic journey engaging, organized, and stress-free. Their constant support and guidance were instrumental in helping me manage rigorous coursework with confidence and clarity.",
  }
];

export default function Testimonials() {
  const { user } = useAuth()
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState(hardcodedTestimonials);
  const [loading, setLoading] = useState(false);
  const [pendingTestimonial, setPendingTestimonial] = useState(null);
  const testimonialsRef = useRef(null);
  const pendingRef = useRef(null);

  // Fetch approved testimonials from API
  useEffect(() => {
    const fetchApprovedTestimonials = async () => {
      setLoading(true);
      try {
        const data = await getApprovedTestimonials();
        // Combine hardcoded and API testimonials
        if (data && Array.isArray(data)) {
          setTestimonials([...hardcodedTestimonials, ...data]);
        }
      } catch (error) {
        // API unavailable — silently fall back to hardcoded testimonials
        setTestimonials(hardcodedTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedTestimonials();
  }, []);

  const handleSubmitSuccess = (submittedData) => {
    // Store pending testimonial to show immediately
    setPendingTestimonial({
      name: submittedData.name,
      role: submittedData.role || (submittedData.type === 'parent' ? 'Parent' : 'Student'),
      text: submittedData.message,
      type: submittedData.type,
      rating: submittedData.rating,
      isPending: true,
      submittedAt: new Date().toLocaleDateString()
    });
    
    // Scroll to pending section after a short delay
    setTimeout(() => {
      if (pendingRef.current) {
        pendingRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
    
    // Refresh testimonials after successful submission
    setLoading(true);
    const fetchApprovedTestimonials = async () => {
      try {
        const data = await getApprovedTestimonials();
        if (data && Array.isArray(data)) {
          setTestimonials([...hardcodedTestimonials, ...data]);
        }
      } catch (error) {
        // API unavailable — keep existing testimonials
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedTestimonials();
  };

  const handleExploreTestimonials = () => {
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <Header />
      <section className="w-full bg-white py-10 sm:py-12 md:py-16 px-3 sm:px-4 md:px-8 lg:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4 sm:mb-6">
            Testimonials & Success Stories
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
            Hear directly from students and parents whose academic journeys have been transformed through iThinkLearn's structured mentoring and personalized guidance.
          </p>
        </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8 sm:pt-10 justify-center px-4 sm:px-0">
            <button
              onClick={handleExploreTestimonials}
              className="bg-blue-900 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 md:px-12 rounded-lg hover:bg-blue-800 transition-colors text-base sm:text-lg shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Explore Testimonials
            </button>
            <button
              onClick={() => {
                if (!user) {
                  setIsLoginModalOpen(true)
                  return
                }
                setIsSubmitModalOpen(true)
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold py-3 sm:py-4 px-6 sm:px-8 md:px-12 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all text-base sm:text-lg shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Write Your Testimonial
            </button>
          </div>
      </section>

      <section className="w-full bg-gray-50 py-10 sm:py-12 md:py-16 px-3 sm:px-4 md:px-8 lg:px-12" ref={testimonialsRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border-2 border-gray-100 p-4 sm:p-6 md:p-8 hover:border-blue-900 hover:shadow-xl transition-all duration-300 flex flex-col relative">
                {!item.isPending && item.type === 'student' && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                    Student
                  </div>
                )}
                {!item.isPending && item.type === 'parent' && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                    Parent
                  </div>
                )}
                <Quote className="text-yellow-400 mb-3 sm:mb-4" size={28} />
                <p className="text-gray-700 mb-4 sm:mb-6 text-sm md:text-base leading-relaxed grow">
                  "{item.text}"
                </p>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 mb-3 sm:mb-4"></div>
                <div>
                  <h3 className="font-bold text-blue-900 text-base sm:text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pending Testimonial - Shows immediately after submission */}
        {pendingTestimonial && (
          <div ref={pendingRef} className="mt-8 sm:mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-4 sm:p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                ⏳ Your Review - Pending Approval
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-lg ${star <= (pendingTestimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <Quote className="text-yellow-500 mb-2" size={24} />
                <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                  "{pendingTestimonial.text}"
                </p>
                <div className="flex items-center justify-between border-t border-yellow-200 pt-3">
                  <div>
                    <h4 className="font-bold text-blue-900">{pendingTestimonial.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{pendingTestimonial.role}</p>
                  </div>
                  <span className="text-xs text-gray-500">Submitted: {pendingTestimonial.submittedAt}</span>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-500 text-xs sm:text-sm mt-3">
              Your review will be visible to everyone after admin approval.
            </p>
          </div>
        )}
      </section>

      {/* Modals */}
      <SubmitTestimonialModal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)}
        onSuccess={handleSubmitSuccess}
        user={user}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenSignup={() => { setIsLoginModalOpen(false); setIsSignupModalOpen(true) }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onOpenLogin={() => { setIsSignupModalOpen(false); setIsLoginModalOpen(true) }}
      />
      <Footer />
    </div>
  );
}
