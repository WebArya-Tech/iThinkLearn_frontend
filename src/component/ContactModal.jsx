import React from 'react'

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      ></div>

      {/* Modal Content - Compact & Simple */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Get in Touch
          </h2>
        </div>

        {/* Contact Information - Simple */}
        <div className="p-4 space-y-3">
          {/* Call Section */}
          <div>
            <p className="text-xs text-gray-500 mb-1">📞 Call</p>
            <div className="space-y-1">
              <a 
                href="tel:+917795010900"
                className="block text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                +91 779 501 0900
              </a>
            </div>
          </div>

          {/* WhatsApp Section */}
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-1">💬 WhatsApp</p>
            <div className="space-y-1">
              <a 
                href="https://wa.me/918197466607"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-semibold text-green-600 hover:text-green-700"
              >
                +91 819 746 6607
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-1">📧 Email</p>
            <a 
              href="mailto:ithinklearn@ixpoe.com"
              className="text-sm font-semibold text-gray-700 hover:text-blue-600 break-all"
            >
              ithinklearn@ixpoe.com
            </a>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/918197466607?text=Hi%20iThinkLearn%20team!%20I%20would%20like%20to%20book%20a%20free%20demo%20class."
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition text-center mt-3"
          >
            Message on WhatsApp
          </a>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
