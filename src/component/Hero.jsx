import React, { useState } from "react"
import ContactModal from "./ContactModal"

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLearnMore = () => {
    const section = document.getElementById('why-choose')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative text-white py-24 md:py-32 lg:py-27 min-h-[42rem] md:min-h-[30rem] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/image copy.png')" }}
      ></div>
      {/* Blue Overlay - semi-transparent to show image */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-900/80 via-blue-800/60 to-blue-700/50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Excellence in Global Test Preparation & Coaching
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              From SAT & ACT to Olympiads,   iThinkLearn provides world-class online mentoring with personalized guidance, expert faculty, and proven results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-900 px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-blue-50 transition transform hover:scale-105 w-full sm:w-auto text-center"
              >
                Get Started
              </button>
              <button 
                onClick={handleLearnMore}
                className="border-2 border-white text-white px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-white hover:text-blue-900 transition w-full sm:w-auto"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src="/image.png" 
              alt="  iThinkLearn Education" 
              className="rounded-2xl shadow-2xl w-full h-auto max-w-sm sm:max-w-md md:max-w-full md:max-h-[30rem] lg:max-h-[36rem] object-cover"
            />
          </div>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
