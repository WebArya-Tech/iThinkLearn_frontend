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
  const [isSticky, setIsSticky] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const whiteNavbarRef = useRef(null)
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

  // ICFY-style: White navbar becomes sticky after scrolling past blue navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Blue navbar is ~40px tall (py-2 = 8px + content)
      // When scrolled past blue navbar, make white navbar sticky
      if (scrollY > 40) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Upper Blue Navbar - Static, scrolls away */}
      <div className="bg-blue-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="hidden md:flex items-center justify-between gap-1 lg:gap-3 py-2">
            {/* Left Side - Social Media Icons */}
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/ithinknlearn/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/ithinklearn/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/ithinklearn/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.14-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/iThinkLearn" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="https://www.youtube.com/@iThinknLearn" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>

            {/* Right Side - Navigation */}
            <div className="flex items-center gap-1 lg:gap-3">
              <Link to="/blogs" className={`relative hover:text-yellow-300 transition font-semibold text-xs lg:text-sm px-2 lg:px-3 py-1 after:content-[''] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-yellow-400 after:transition-all ${location.pathname === '/blogs' ? 'after:w-full text-yellow-400' : 'after:w-0 hover:after:w-full'}`}>Blogs</Link>
              <Link to="/running-classes" className={`relative hover:text-yellow-300 transition font-semibold text-xs lg:text-sm px-2 lg:px-3 py-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-yellow-400 after:transition-all ${location.pathname === '/running-classes' ? 'after:w-full text-yellow-400' : 'after:w-0 hover:after:w-full'}`}>Running Classes</Link>
              <Link to="/contact" className={`relative hover:text-yellow-300 transition font-semibold text-xs lg:text-sm px-2 lg:px-3 py-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-yellow-400 after:transition-all ${location.pathname === '/contact' ? 'after:w-full text-yellow-400' : 'after:w-0 hover:after:w-full'}`}>Contact Us</Link>
              
              {/* Book Demo Dropdown */}
              <div className="relative" ref={demoDropdownRef}>
                <button 
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-3 lg:px-4 py-1.5 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg text-xs lg:text-sm whitespace-nowrap"
                >
                  Book Free Demo
                </button>
                
                {demoDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                    <div className="bg-blue-900 text-white px-4 py-3">
                      <p className="font-bold text-sm">📚 Book a Free Demo Class</p>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">📞 Call/WhatsApp:</p>
                        <a href="tel:+918197466607" className="block text-blue-900 hover:text-blue-700 font-semibold text-sm">+91 819 746 6607</a>
                        <a href="tel:+917795010900" className="block text-blue-900 hover:text-blue-700 font-semibold text-sm">+91 779 501 0900</a>
                      </div>
                      <div className="border-t pt-3">
                        <p className="text-xs text-gray-500 font-medium mb-1">📧 Email:</p>
                        <a href="mailto:ithinklearn@ixpoe.com" className="text-blue-900 hover:text-blue-700 font-semibold text-sm">ithinklearn@ixpoe.com</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Lower White Navbar - Becomes sticky after scrolling past blue navbar (ICFY style) */}
      <div ref={whiteNavbarRef} className={`${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-lg backdrop-blur-sm bg-white/95' : 'relative bg-white'} transition-all duration-300 ease-in-out`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center h-16 gap-2 md:gap-4 lg:gap-6">
            {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2 md:gap-2 group cursor-pointer">
            <img src="/logo.jpeg" alt="iThinkLearn Logo" className="h-10 md:h-11 lg:h-12 w-auto rounded-lg shadow-md group-hover:scale-105 transition-transform" />
            <div className="hidden lg:block">
              <h1 className="text-lg xl:text-xl font-bold text-blue-900">iThinkLearn</h1>
              <p className="text-[9px] xl:text-[10px] text-gray-500">Global Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop Navigation - Lower */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-2 xl:gap-3 ml-auto">
            <Link to="/" className={`relative hover:text-blue-600 transition font-semibold text-xs lg:text-sm xl:text-base px-2 lg:px-3 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600 after:transition-all ${location.pathname === '/' ? 'after:w-full text-blue-600' : 'after:w-0 hover:after:w-full'}`}>Home</Link>
            <Link to="/about" className={`relative hover:text-blue-600 transition font-semibold text-xs lg:text-sm xl:text-base px-2 lg:px-3 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600 after:transition-all ${location.pathname === '/about' ? 'after:w-full text-blue-600' : 'after:w-0 hover:after:w-full'}`}>About Us</Link>

            {/* Why iThinkLearn Dropdown */}
            <div className="relative" ref={whyDropdownRef}>
              <button
                onClick={() => { setWhyDropdownOpen(!whyDropdownOpen); setCollegeDropdownOpen(false); setOlympiadDropdownOpen(false); setApExamsDropdownOpen(false) }}
                className={`flex items-center gap-0.5 hover:text-blue-600 transition font-semibold text-xs lg:text-sm xl:text-base px-2 lg:px-3 py-1 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600 after:transition-all ${['/teaching-methodology','/our-tutors','/testimonials'].includes(location.pathname) ? 'text-blue-600 after:w-full' : 'after:w-0 hover:after:w-full'}`}
              >
                Why iThinkLearn
                <svg className={`w-3 h-3 transition-transform ${whyDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              {whyDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-blue-900 px-4 py-3">
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

            {/* Aptitude Tests Dropdown */}
            <div className="relative" ref={collegeDropdownRef}>
              <button
                onClick={() => { setCollegeDropdownOpen(!collegeDropdownOpen); setWhyDropdownOpen(false); setOlympiadDropdownOpen(false); setApExamsDropdownOpen(false) }}
                className={`flex items-center gap-0.5 hover:text-blue-600 transition font-semibold text-xs lg:text-sm xl:text-base px-2 lg:px-3 py-1 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600 after:transition-all ${location.pathname === '/aptitude-tests' ? 'text-blue-600 after:w-full' : 'after:w-0 hover:after:w-full'}`}
              >
                Aptitude Tests
                <svg className={`w-3 h-3 transition-transform ${collegeDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              {collegeDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-blue-900 px-4 py-3">
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
                className={`flex items-center gap-0.5 hover:text-blue-600 transition font-semibold text-xs lg:text-sm xl:text-base px-2 lg:px-3 py-1 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600 after:transition-all ${location.pathname === '/olympiads' ? 'text-blue-600 after:w-full' : 'after:w-0 hover:after:w-full'}`}
              >
                Olympiads
                <svg className={`w-3 h-3 transition-transform ${olympiadDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              {olympiadDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-blue-900 px-4 py-3">
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
                className={`flex items-center gap-0.5 hover:text-blue-600 transition font-semibold text-xs lg:text-sm xl:text-base px-2 lg:px-3 py-1 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600 after:transition-all ${location.pathname === '/ap-exams' ? 'text-blue-600 after:w-full' : 'after:w-0 hover:after:w-full'}`}
              >
                AP Exams
                <svg className={`w-3 h-3 transition-transform ${apExamsDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
              {apExamsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-blue-900 px-4 py-3">
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

            {/* Login / User Button */}
            {user ? (
              <button
                onClick={() => navigate(isAdmin ? '/admin-dashboard' : '/student-dashboard')}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition font-semibold text-xs lg:text-sm xl:text-base px-2 lg:px-3 py-1 whitespace-nowrap"
              >
                <span className="hidden xl:inline">👤 {user.name}</span>
                <span className="xl:hidden flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
                </span>
              </button>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg text-xs lg:text-sm xl:text-base whitespace-nowrap"
              >
                Login
              </button>
            )}
          </nav>

          </div>
        </div>
      </div>


      {/* Mobile Menu Button - outside sticky for mobile */}
      <div className="md:hidden max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between py-2">
          <Link to="/" className="shrink-0 flex items-center gap-2">
            <img src="/logo.jpeg" alt="iThinkLearn Logo" className="h-8 w-auto rounded-lg" />
            <span className="text-lg font-bold text-blue-900">iThinkLearn</span>
          </Link>
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 transition"
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

      {/* Spacer only when white navbar is sticky (white navbar height = 64px) */}
      {isSticky && <div className="h-16 md:h-16"></div>}

      {/* Mobile Backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer — slides in from right */}
      <div className={`md:hidden fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-blue-700/50 shrink-0">
          <div className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="iThinkLearn" className="h-7 w-auto rounded-md" />
            <span className="font-bold text-sm">iThinkLearn</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Nav Content */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block py-2.5 px-3 hover:bg-white/10 rounded-lg transition font-medium text-sm relative after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-yellow-400 after:transition-all after:duration-300 ${location.pathname === '/' ? 'bg-white/10 text-yellow-400 after:opacity-100' : 'after:opacity-0 hover:after:opacity-100'}`}>Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`block py-2.5 px-3 hover:bg-white/10 rounded-lg transition font-medium text-sm ${location.pathname === '/about' ? 'bg-white/10 text-yellow-400' : ''}`}>About Us</Link>

          {/* Mobile: Why iThinkLearn */}
          <div>
            <button onClick={() => setMobileWhyOpen(!mobileWhyOpen)} className="w-full flex items-center justify-between py-2.5 px-3 hover:bg-white/10 rounded-lg transition font-medium text-sm">
              <span>Why iThinkLearn</span>
              <svg className={`w-4 h-4 transition-transform ${mobileWhyOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {mobileWhyOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-blue-400/50 pl-2 mb-1">
                <Link to="/online-classes" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2 text-xs hover:bg-white/10 rounded-lg transition text-blue-200">Online Classes</Link>
                <Link to="/how-are-we-different" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2 text-xs hover:bg-white/10 rounded-lg transition text-blue-200">How are we Different</Link>
                <Link to="/teaching-methodology" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2 text-xs hover:bg-white/10 rounded-lg transition text-blue-200">Teaching Methodology</Link>
                <Link to="/our-tutors" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2 text-xs hover:bg-white/10 rounded-lg transition text-blue-200">Our Tutors</Link>
                <Link to="/testimonials" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2 text-xs hover:bg-white/10 rounded-lg transition text-blue-200">Testimonials &amp; Success Stories</Link>
                <Link to="/reviews" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2 text-xs hover:bg-white/10 rounded-lg transition text-blue-200">Reviews</Link>
              </div>
            )}
          </div>

          {/* Mobile: Aptitude Tests */}
          <div>
            <button onClick={() => setMobileCollegeOpen(!mobileCollegeOpen)} className="w-full flex items-center justify-between py-2.5 px-3 hover:bg-white/10 rounded-lg transition font-medium text-sm">
              <span>Aptitude Tests</span>
              <svg className={`w-4 h-4 transition-transform ${mobileCollegeOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {mobileCollegeOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-blue-400/50 pl-2 mb-1">
                {[{name:'TMUA',path:'/tmua'},{name:'ACT',path:'/act'},{name:'GRE',path:'/gre'},{name:'GMAT',path:'/gmat'}].map(c => (
                  <Link key={c.name} to={c.path} onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2 text-xs hover:bg-white/10 rounded-lg transition text-blue-200">{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Olympiads */}
          <div>
            <button onClick={() => setMobileOlympiadOpen(!mobileOlympiadOpen)} className="w-full flex items-center justify-between py-2.5 px-3 hover:bg-white/10 rounded-lg transition font-medium text-sm">
              <span>Olympiads</span>
              <svg className={`w-4 h-4 transition-transform ${mobileOlympiadOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {mobileOlympiadOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-blue-400/50 pl-2 mb-1">
                {[{name:'AMC',path:'/amc'},{name:'IMO',path:'/imo'},{name:'AIME',path:'/aime'}].map(c => (
                  <Link key={c.name} to={c.path} onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2 text-xs hover:bg-white/10 rounded-lg transition text-blue-200">{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: AP Exams */}
          <div>
            <button onClick={() => setMobileApOpen(!mobileApOpen)} className="w-full flex items-center justify-between py-2.5 px-3 hover:bg-white/10 rounded-lg transition font-medium text-sm">
              <span>AP Exams</span>
              <svg className={`w-4 h-4 transition-transform ${mobileApOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {mobileApOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-blue-400/50 pl-2 mb-1">
                {[{name:'Calculus',path:'/calculus'},{name:'Statistics',path:'/statistics'},{name:'Biology',path:'/courses#ap-biology'},{name:'Economics',path:'/courses#ap-economics'}].map(c => (
                  <Link key={c.name} to={c.path} onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2 text-xs hover:bg-white/10 rounded-lg transition text-blue-200">{c.name}</Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} className={`block py-2.5 px-3 hover:bg-white/10 rounded-lg transition font-medium text-sm ${location.pathname === '/blogs' ? 'bg-white/10 text-yellow-400' : ''}`}>Blogs</Link>
          <Link to="/running-classes" onClick={() => setMobileMenuOpen(false)} className={`block py-2.5 px-3 hover:bg-white/10 rounded-lg transition font-medium text-sm ${location.pathname === '/running-classes' ? 'bg-white/10 text-yellow-400' : ''}`}>Running Classes</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={`block py-2.5 px-3 hover:bg-white/10 rounded-lg transition font-medium text-sm ${location.pathname === '/contact' ? 'bg-white/10 text-yellow-400' : ''}`}>Contact Us</Link>

          {/* Mobile Book Demo - collapsible */}
          <div className="mt-3">
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold rounded-xl px-4 py-2.5 flex items-center justify-between shadow-lg text-sm"
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
          <div className="mt-2 mb-3">
            {user ? (
              <div className="bg-white/10 rounded-xl px-4 py-2.5 text-center">
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
                className="w-full py-2.5 rounded-xl font-bold text-white border-2 border-white/60 hover:bg-white/10 transition text-center text-sm"
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
    </>
  )
}

