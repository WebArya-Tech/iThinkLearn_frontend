import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoginModal from './auth/LoginModal'
import SignupModal from './auth/SignupModal'
import ForgotPasswordModal from './auth/ForgotPasswordModal'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false)
  const [whyDropdownOpen, setWhyDropdownOpen] = useState(false)
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false)
  const [olympiadDropdownOpen, setOlympiadDropdownOpen] = useState(false)
  const [apExamsDropdownOpen, setApExamsDropdownOpen] = useState(false)
  const [mobileWhyOpen, setMobileWhyOpen] = useState(false)
  const [mobileCollegeOpen, setMobileCollegeOpen] = useState(false)
  const [mobileOlympiadOpen, setMobileOlympiadOpen] = useState(false)
  const [mobileApOpen, setMobileApOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const demoDropdownRef = useRef(null)
  const whyDropdownRef = useRef(null)
  const collegeDropdownRef = useRef(null)
  const olympiadDropdownRef = useRef(null)
  const apExamsDropdownRef = useRef(null)

  // Close all dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (demoDropdownRef.current && !demoDropdownRef.current.contains(e.target)) setDemoDropdownOpen(false)
      if (whyDropdownRef.current && !whyDropdownRef.current.contains(e.target)) setWhyDropdownOpen(false)
      if (collegeDropdownRef.current && !collegeDropdownRef.current.contains(e.target)) setCollegeDropdownOpen(false)
      if (olympiadDropdownRef.current && !olympiadDropdownRef.current.contains(e.target)) setOlympiadDropdownOpen(false)
      if (apExamsDropdownRef.current && !apExamsDropdownRef.current.contains(e.target)) setApExamsDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <header className="bg-linear-to-r from-blue-900 via-blue-800 to-indigo-900 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-3 group cursor-pointer">
            <img src="/logo.jpeg" alt="  iThinkLearn Logo" className="h-10 lg:h-12 xl:h-14 w-auto rounded-lg shadow-md group-hover:scale-105 transition-transform" />
            <div>
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">  iThinkLearn</h1>
              <p className="text-xs text-blue-300 hidden xl:block">Global Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            <Link to="/" className={`relative hover:text-blue-200 transition font-medium text-xs xl:text-sm px-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-yellow-400 after:transition-all ${location.pathname === '/' ? 'after:w-full text-yellow-400' : 'after:w-0 hover:after:w-full'}`}>Home</Link>
            <Link to="/about" className={`relative hover:text-blue-200 transition font-medium text-xs xl:text-sm px-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-yellow-400 after:transition-all ${location.pathname === '/about' ? 'after:w-full text-yellow-400' : 'after:w-0 hover:after:w-full'}`}>About Us</Link>

            {/* Why iThinkLearn Dropdown */}
            <div className="relative" ref={whyDropdownRef}>
              <button
                onClick={() => { setWhyDropdownOpen(!whyDropdownOpen); setCollegeDropdownOpen(false); setOlympiadDropdownOpen(false); setApExamsDropdownOpen(false) }}
                className={`flex items-center gap-0.5 hover:text-blue-200 transition font-medium text-xs xl:text-sm px-1 whitespace-nowrap ${['/teaching-methodology','/our-tutors','/testimonials'].includes(location.pathname) ? 'text-yellow-400' : ''}`}
              >
                Why iThinkLearn
                <svg className={`w-3 h-3 transition-transform ${whyDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              {whyDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-4 py-3">
                    <p className="font-bold text-sm text-white">Why iThinkLearn</p>
                  </div>
                  <div className="py-1">
                    <Link to="/online-classes" onClick={() => setWhyDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium">Online Classes</Link>
                    <Link to="/how-are-we-different" onClick={() => setWhyDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium">How are we Different</Link>
                    <Link to="/teaching-methodology" onClick={() => setWhyDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium">Teaching Methodology</Link>
                    <Link to="/our-tutors" onClick={() => setWhyDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium">Our Tutors</Link>
                    <Link to="/testimonials" onClick={() => setWhyDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium">Testimonials &amp; Success Stories</Link>
                    <Link to="/reviews" onClick={() => setWhyDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium">Reviews</Link>
                  </div>
                </div>
              )}
            </div>

            {/* College Admissions (Aptitude Tests) Dropdown */}
            <div className="relative" ref={collegeDropdownRef}>
              <button
                onClick={() => { setCollegeDropdownOpen(!collegeDropdownOpen); setWhyDropdownOpen(false); setOlympiadDropdownOpen(false); setApExamsDropdownOpen(false) }}
                className={`flex items-center gap-0.5 hover:text-blue-200 transition font-medium text-xs xl:text-sm px-1 whitespace-nowrap ${location.pathname === '/courses' ? 'text-yellow-400' : ''}`}
              >
                Aptitude Tests
                <svg className={`w-3 h-3 transition-transform ${collegeDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              {collegeDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-4 py-3">
                    <p className="font-bold text-sm text-white">Aptitude Tests</p>
                  </div>
                  <div className="py-1">
                    {[{name:'TMUA',path:'/tmua'},{name:'ACT',path:'/act'},{name:'GRE',path:'/gre'},{name:'GMAT',path:'/gmat'}].map(c => (
                      <Link key={c.name} to={c.path} onClick={() => setCollegeDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium">{c.name}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Olympiads Dropdown */}
            <div className="relative" ref={olympiadDropdownRef}>
              <button
                onClick={() => { setOlympiadDropdownOpen(!olympiadDropdownOpen); setWhyDropdownOpen(false); setCollegeDropdownOpen(false); setApExamsDropdownOpen(false) }}
                className="flex items-center gap-0.5 hover:text-blue-200 transition font-medium text-xs xl:text-sm px-1 whitespace-nowrap"
              >
                Olympiads
                <svg className={`w-3 h-3 transition-transform ${olympiadDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              {olympiadDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-4 py-3">
                    <p className="font-bold text-sm text-white">Olympiads</p>
                  </div>
                  <div className="py-1">
                    {[{name:'AMC',path:'/amc'},{name:'IMO',path:'/imo'},{name:'AIME',path:'/aime'}].map(c => (
                      <Link key={c.name} to={c.path} onClick={() => setOlympiadDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium">{c.name}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AP Exams Dropdown */}
            <div className="relative" ref={apExamsDropdownRef}>
              <button
                onClick={() => { setApExamsDropdownOpen(!apExamsDropdownOpen); setWhyDropdownOpen(false); setCollegeDropdownOpen(false); setOlympiadDropdownOpen(false) }}
                className="flex items-center gap-0.5 hover:text-blue-200 transition font-medium text-xs xl:text-sm px-1 whitespace-nowrap"
              >
                AP Exams
                <svg className={`w-3 h-3 transition-transform ${apExamsDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              {apExamsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-4 py-3">
                    <p className="font-bold text-sm text-white">AP Exams</p>
                  </div>
                  <div className="py-1">
                    {[{name:'Calculus',path:'/calculus'},{name:'Statistics',path:'/statistics'}].map(c => (
                      <Link key={c.name} to={c.path} onClick={() => setApExamsDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium">{c.name}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/blogs" className={`relative hover:text-blue-200 transition font-medium text-xs xl:text-sm px-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-yellow-400 after:transition-all ${location.pathname === '/blogs' ? 'after:w-full text-yellow-400' : 'after:w-0 hover:after:w-full'}`}>Blogs</Link>
            <Link to="/running-classes" className={`relative hover:text-blue-200 transition font-medium text-xs xl:text-sm px-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-yellow-400 after:transition-all ${location.pathname === '/running-classes' ? 'after:w-full text-yellow-400' : 'after:w-0 hover:after:w-full'}`}>Running Classes</Link>
            <Link to="/contact" className={`relative hover:text-blue-200 transition font-medium text-xs xl:text-sm px-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-yellow-400 after:transition-all ${location.pathname === '/contact' ? 'after:w-full text-yellow-400' : 'after:w-0 hover:after:w-full'}`}>Contact Us</Link>
            
            {/* Book Demo Dropdown */}
            <div className="relative" ref={demoDropdownRef}>
              <button 
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 px-3 xl:px-4 py-2 rounded-lg font-bold hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg flex items-center gap-1 text-xs xl:text-sm whitespace-nowrap"
              >
                📞 Book Free Demo →
              </button>
              
              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-linear-to-r from-blue-900 to-indigo-900 text-white px-4 py-3">
                    <p className="font-bold text-sm">📚 Book a Free Demo Class</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">📞 Call/WhatsApp:</p>
                      <a href="tel:+918197466607" className="block text-blue-900 hover:text-blue-700 font-semibold text-sm">+91 819 746 6607</a>
                      <a href="tel:+918861919000" className="block text-blue-900 hover:text-blue-700 font-semibold text-sm">+91 779 501 0900</a>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">📧 Email:</p>
                      <a href="mailto:  ithinklearn@ixpoe.com" className="text-blue-900 hover:text-blue-700 font-semibold text-sm">  ithinklearn@ixpoe.com</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Login / User Button */}
            {user ? (
              <button
                onClick={() => navigate(isAdmin ? '/admin-dashboard' : '/student-dashboard')}
                className="text-blue-200 text-sm font-semibold hover:text-yellow-400 transition"
              >
                👤 {user.name}
              </button>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="border-2 border-white/60 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/10 hover:border-white transition-all"
              >
                 Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer — slides in from right */}
      <div className={`lg:hidden fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-700/50 shrink-0">
          <div className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="iThinkLearn" className="h-8 w-auto rounded-md" />
            <span className="font-bold text-base">iThinkLearn</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Nav Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block py-3 px-4 hover:bg-white/10 rounded-lg transition font-medium ${location.pathname === '/' ? 'bg-white/10 text-yellow-400' : ''}`}>Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`block py-3 px-4 hover:bg-white/10 rounded-lg transition font-medium ${location.pathname === '/about' ? 'bg-white/10 text-yellow-400' : ''}`}>About Us</Link>

          {/* Mobile: Why iThinkLearn */}
          <div>
            <button onClick={() => setMobileWhyOpen(!mobileWhyOpen)} className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/10 rounded-lg transition font-medium">
              <span>Why iThinkLearn</span>
              <svg className={`w-4 h-4 transition-transform ${mobileWhyOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {mobileWhyOpen && (
              <div className="ml-4 space-y-1 border-l-2 border-blue-400/50 pl-3 mb-2">
                <Link to="/online-classes" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm hover:bg-white/10 rounded-lg transition text-blue-200">Online Classes</Link>
                <Link to="/how-are-we-different" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm hover:bg-white/10 rounded-lg transition text-blue-200">How are we Different</Link>
                <Link to="/teaching-methodology" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm hover:bg-white/10 rounded-lg transition text-blue-200">Teaching Methodology</Link>
                <Link to="/our-tutors" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm hover:bg-white/10 rounded-lg transition text-blue-200">Our Tutors</Link>
                <Link to="/testimonials" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm hover:bg-white/10 rounded-lg transition text-blue-200">Testimonials &amp; Success Stories</Link>
                <Link to="/reviews" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm hover:bg-white/10 rounded-lg transition text-blue-200">Reviews</Link>
              </div>
            )}
          </div>

          {/* Mobile: Aptitude Tests */}
          <div>
            <button onClick={() => setMobileCollegeOpen(!mobileCollegeOpen)} className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/10 rounded-lg transition font-medium">
              <span>Aptitude Tests</span>
              <svg className={`w-4 h-4 transition-transform ${mobileCollegeOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {mobileCollegeOpen && (
              <div className="ml-4 space-y-1 border-l-2 border-blue-400/50 pl-3 mb-2">
                {[{name:'TMUA',path:'/tmua'},{name:'ACT',path:'/act'},{name:'GRE',path:'/gre'},{name:'GMAT',path:'/gmat'}].map(c => (
                  <Link key={c.name} to={c.path} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm hover:bg-white/10 rounded-lg transition text-blue-200">{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Olympiads */}
          <div>
            <button onClick={() => setMobileOlympiadOpen(!mobileOlympiadOpen)} className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/10 rounded-lg transition font-medium">
              <span>Olympiads</span>
              <svg className={`w-4 h-4 transition-transform ${mobileOlympiadOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {mobileOlympiadOpen && (
              <div className="ml-4 space-y-1 border-l-2 border-blue-400/50 pl-3 mb-2">
                {[{name:'AMC',path:'/amc'},{name:'IMO',path:'/imo'},{name:'AIME',path:'/aime'}].map(c => (
                  <Link key={c.name} to={c.path} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm hover:bg-white/10 rounded-lg transition text-blue-200">{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: AP Exams */}
          <div>
            <button onClick={() => setMobileApOpen(!mobileApOpen)} className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/10 rounded-lg transition font-medium">
              <span>AP Exams</span>
              <svg className={`w-4 h-4 transition-transform ${mobileApOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {mobileApOpen && (
              <div className="ml-4 space-y-1 border-l-2 border-blue-400/50 pl-3 mb-2">
                {[{name:'Calculus',path:'/calculus'},{name:'Statistics',path:'/statistics'},{name:'Biology',path:'/courses#ap-biology'},{name:'Economics',path:'/courses#ap-economics'}].map(c => (
                  <Link key={c.name} to={c.path} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm hover:bg-white/10 rounded-lg transition text-blue-200">{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} className={`block py-3 px-4 hover:bg-white/10 rounded-lg transition font-medium ${location.pathname === '/blogs' ? 'bg-white/10 text-yellow-400' : ''}`}>Blogs</Link>
          <Link to="/running-classes" onClick={() => setMobileMenuOpen(false)} className={`block py-3 px-4 hover:bg-white/10 rounded-lg transition font-medium ${location.pathname === '/running-classes' ? 'bg-white/10 text-yellow-400' : ''}`}>Running Classes</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={`block py-3 px-4 hover:bg-white/10 rounded-lg transition font-medium ${location.pathname === '/contact' ? 'bg-white/10 text-yellow-400' : ''}`}>Contact Us</Link>

          {/* Mobile Book Demo - collapsible */}
          <div className="mt-4">
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold rounded-xl px-4 py-3 flex items-center justify-between shadow-lg"
            >
              <span>Book a Free Demo Class</span>
              <svg className={`w-4 h-4 transition-transform ${demoDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {demoDropdownOpen && (
              <div className="mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-4 py-3">
                  <p className="font-bold text-sm">Book a Free Demo Class</p>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Call/WhatsApp:</p>
                    <a href="tel:+918197466607" className="block text-blue-900 hover:text-blue-700 font-semibold text-sm">+91 819 746 6607</a>
                    <a href="tel:+917795010900" className="block text-blue-900 hover:text-blue-700 font-semibold text-sm">+91 779 501 0900</a>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 font-medium mb-1">Email:</p>
                    <a href="mailto:ithinklearn@ixpoe.com" className="text-blue-900 hover:text-blue-700 font-semibold text-sm">ithinklearn@ixpoe.com</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Login Button */}
          <div className="mt-3 mb-4">
            {user ? (
              <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                <button
                  onClick={() => { navigate(isAdmin ? '/admin-dashboard' : '/student-dashboard'); setMobileMenuOpen(false) }}
                  className="text-blue-200 text-sm font-semibold hover:text-yellow-400 transition"
                >
                  👤 {user.name}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setLoginOpen(true); setMobileMenuOpen(false) }}
                className="w-full py-3 rounded-xl font-bold text-white border-2 border-white/60 hover:bg-white/10 transition text-center"
              >
                🔐 Login
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenSignup={() => setSignupOpen(true)}
        onOpenForgotPassword={() => setForgotOpen(true)}
      />
      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onOpenLogin={() => setLoginOpen(true)}
      />
      <ForgotPasswordModal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
        onOpenLogin={() => setLoginOpen(true)}
      />
    </header>
  )
}

