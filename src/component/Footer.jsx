import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [gstModalOpen, setGstModalOpen] = useState(false)

  return (
    <footer id="contact" className="bg-linear-to-b from-blue-900 to-indigo-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top divider accent */}

        {/* Main Footer Grid */}
        <div className="py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-10">

          {/* ── Column 1: Brand ── */}
          <div className="sm:col-span-2 xl:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 hover:opacity-85 transition w-fit mx-auto sm:mx-0">
              <img src="/logo.jpeg" alt="iThinkLearn Logo" className="h-11 sm:h-13 w-auto rounded-lg shadow-md" />
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">iThinkLearn</h3>
            </Link>
            <p className="text-yellow-400 font-semibold text-sm mb-3 text-center sm:text-left">Global Excellence in Education</p>
            <p className="text-blue-200 text-xs sm:text-sm leading-relaxed mb-5 text-center sm:text-left">
              Transforming education through personalized online mentoring and expert coaching for competitive exams worldwide.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 justify-center sm:justify-start flex-wrap">
              <a href="https://www.facebook.com/ithinknlearn/" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 bg-blue-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors" title="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/ithinklearn/" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 bg-blue-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors" title="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://x.com/iThinkLearn" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 bg-blue-800 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors" title="Twitter / X">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/ithinklearn/" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 bg-blue-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors" title="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@iThinknLearn" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 bg-blue-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors" title="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Column 2: Quick Links + Why iThinkLearn ── */}
          <div>
            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-bold mb-4 text-white uppercase tracking-wider">
                <span className="w-1 h-4 bg-yellow-400 rounded-full" />
                Quick Links
              </h4>
              <ul className="space-y-2 text-blue-200 text-xs sm:text-sm pl-1">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About Us', path: '/about' },
                  { label: 'Blogs', path: '/blogs' },
                  { label: 'Running Classes', path: '/running-classes' },
                  { label: 'Contact Us', path: '/contact' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="hover:text-yellow-400 transition flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-blue-400 group-hover:bg-yellow-400 rounded-full transition-colors shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold mb-4 text-white uppercase tracking-wider">
                <span className="w-1 h-4 bg-yellow-400 rounded-full" />
                Why iThinkLearn
              </h4>
              <ul className="space-y-2 text-blue-200 text-xs sm:text-sm pl-1">
                {[
                  { label: 'Online Classes', path: '/online-classes' },
                  { label: 'How are we Different', path: '/how-are-we-different' },
                  { label: 'Teaching Methodology', path: '/teaching-methodology' },
                  { label: 'Our Tutors', path: '/our-tutors' },
                  { label: 'Testimonials', path: '/testimonials' },
                  { label: 'Reviews', path: '/reviews' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="hover:text-yellow-400 transition flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-blue-400 group-hover:bg-yellow-400 rounded-full transition-colors shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Column 3: Exam Categories ── */}
          <div>
            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-bold mb-4 text-white uppercase tracking-wider">
                <span className="w-1 h-4 bg-orange-400 rounded-full" />
                Aptitude Tests
              </h4>
              <ul className="space-y-2 text-blue-200 text-xs sm:text-sm pl-1">
                {[
                  { label: 'TMUA', path: '/tmua' },
                  { label: 'ACT', path: '/act' },
                  { label: 'GRE', path: '/gre' },
                  { label: 'GMAT', path: '/gmat' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="hover:text-yellow-400 transition flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-blue-400 group-hover:bg-yellow-400 rounded-full transition-colors shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-bold mb-4 text-white uppercase tracking-wider">
                <span className="w-1 h-4 bg-orange-400 rounded-full" />
                Olympiads
              </h4>
              <ul className="space-y-2 text-blue-200 text-xs sm:text-sm pl-1">
                {[
                  { label: 'AMC', path: '/amc' },
                  { label: 'IMO', path: '/imo' },
                  { label: 'AIME', path: '/aime' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="hover:text-yellow-400 transition flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-blue-400 group-hover:bg-yellow-400 rounded-full transition-colors shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold mb-4 text-white uppercase tracking-wider">
                <span className="w-1 h-4 bg-orange-400 rounded-full" />
                AP Exams
              </h4>
              <ul className="space-y-2 text-blue-200 text-xs sm:text-sm pl-1">
                {[
                  { label: 'AP Calculus', path: '/calculus' },
                  { label: 'AP Statistics', path: '/statistics' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="hover:text-yellow-400 transition flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-blue-400 group-hover:bg-yellow-400 rounded-full transition-colors shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Column 4: Contact ── */}
          <div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold mb-4 text-white uppercase tracking-wider">
                <span className="w-1 h-4 bg-yellow-400 rounded-full" />
                Get in Touch
              </h4>
              <div className="space-y-4 text-blue-200 text-xs sm:text-sm pl-1">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white text-xs uppercase tracking-wide">Email</p>
                  <a href="mailto:ithinklearn@ixpoe.com" className="hover:text-yellow-400 transition break-all">
                    ithinklearn@ixpoe.com
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white text-xs uppercase tracking-wide">Contact No</p>
                  <a href="tel:+917795010900" className="hover:text-yellow-400 transition">+91 779 5010 900</a>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-white text-xs uppercase tracking-wide">WhatsApp No</p>
                  <a href="https://wa.me/918197466607" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 hover:text-green-400 transition">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    +91 8197 466 607
                  </a>
                </div>
               
                <div className="pt-1">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 font-bold px-5 py-2.5 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all text-xs sm:text-sm shadow-lg"
                  >
                    📞 Book Free Demo
                  </Link>
                </div>
                {/* GST Number */}
                <div className="pt-2">
                  <button
                    onClick={() => setGstModalOpen(true)}
                    className="text-blue-300 hover:text-yellow-400 transition text-xs flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    GST: 29AAECD7872Q1ZO
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* GST Modal */}
        {gstModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setGstModalOpen(false)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
              {/* Header */}
              <div className="bg-blue-900 px-6 py-4 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">Business Details</h3>
                <button
                  onClick={() => setGstModalOpen(false)}
                  className="text-white/80 hover:text-white transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Content */}
              <div className="p-6 space-y-4 text-gray-700">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Trade Name</p>
                  <p className="font-bold text-lg text-blue-900">IThinkLearn Classes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Legal Name</p>
                  <p className="font-medium">DronaVyas IXPOE Private Limited</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Address</p>
                  <p className="text-sm leading-relaxed">
                    No. 81, Ground Floor, Share Space<br />
                    Borewell Road, Nallurahalli, Whitefield<br />
                    Bangalore — 560066, Karnataka
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">GST Number</p>
                    <p className="font-mono font-medium text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg">29AAECD7872Q1ZO</p>
                  </div>
                </div>
                <div className="pt-2 border-t space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <a href="tel:+917795010900" className="text-blue-900 hover:text-blue-700 font-medium">+91 779 5010 900</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <a href="https://wa.me/918197466607" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium">+91 8197 466 607</a>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <button
                  onClick={() => setGstModalOpen(false)}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Footer */}
        <div className="border-t border-blue-700/60 py-5 sm:py-6 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:justify-between lg:items-center">
          <p className="text-blue-300 text-xs sm:text-sm text-center lg:text-left">
            2026 iThinkLearn Tuitions. All rights reserved.
          </p>

          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-blue-300 flex-wrap justify-center">
            <p className="whitespace-nowrap">
              Developed by{' '}
              <a href="https://webarya.com/" target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-yellow-400 transition font-semibold">WebArya</a>
            </p>
            <span className="text-blue-600 hidden sm:inline">|</span>
            <Link to="/contact" className="hover:text-white transition whitespace-nowrap">Privacy Policy</Link>
            <span className="text-blue-600 hidden sm:inline">|</span>
            <Link to="/contact" className="hover:text-white transition whitespace-nowrap">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}