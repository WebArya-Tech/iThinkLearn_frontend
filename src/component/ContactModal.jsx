import React from 'react'

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-2xl leading-none"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600">
            Contact us to book your free demo class or learn more about our programs
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          {/* Phone Numbers */}
          <div className="bg-linear-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-2">📞 Call/WhatsApp:</p>
            <div className="space-y-2">
              <a 
                href="tel:+918197466607"
                className="block text-lg font-bold text-blue-600 hover:text-blue-700 transition"
              >
                +91 819 746 6607
              </a>
              <a 
                href="tel:+918861919000"
                className="block text-lg font-bold text-blue-600 hover:text-blue-700 transition"
              >
                +91 779 501 0900
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-linear-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-2">📧 Email:</p>
            <a 
              href="mailto:  ithinklearn@ixpoe.com"
              className="text-lg font-bold text-purple-600 hover:text-purple-700 transition break-all"
            >
                ithinklearn@ixpoe.com
            </a>
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-linear-to-r from-green-50 to-green-100 p-4 rounded-xl">
            <a
              href="https://wa.me/918197466607?text=Hi%20  iThinkLearn%20team!%20I%20would%20like%20to%20book%20a%20free%20demo%20class."
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition text-center transform hover:scale-105"
            >
              💬 Message on WhatsApp
            </a>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-4 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  )
}
