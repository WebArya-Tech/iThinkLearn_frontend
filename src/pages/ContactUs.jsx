import React, { useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappNumber = '918197466607'
    const message = `Hello! My name is ${formData.name}. Email: ${formData.email}. Phone: ${formData.phone}. ${formData.message}`
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-10 md:py-10 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">📞 Get In Touch</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Have questions about our courses or want to book a free demo class? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-10 md:py-10 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">Quick Contact Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {/* WhatsApp */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="mb-4">
                <svg className="w-12 sm:w-16 h-12 sm:h-16 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">WhatsApp</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">Quick support & instant response</p>
              <a 
                href="https://wa.me/918197466607" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:text-blue-700 break-all text-sm sm:text-base"
              >
                +91 819 746 6607
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="mb-4">
                <svg className="w-12 sm:w-16 h-12 sm:h-16 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Phone</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">Call us directly</p>
              <div className="space-y-2">
                <a href="tel:+917795010900" className="text-blue-600 font-bold hover:text-blue-700 block text-sm sm:text-base">
                  +91 779 501 0900
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="mb-4">
                <svg className="w-12 sm:w-16 h-12 sm:h-16 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Email</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">Send us an email</p>
              <a 
                href="mailto:  ithinklearn@ixpoe.com"
                className="text-blue-600 font-bold hover:text-blue-700 break-all text-sm sm:text-base"
              >
                  ithinklearn@ixpoe.com
              </a>
            </div>

            {/* Facebook */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="mb-4">
                <svg className="w-16 h-16 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 10h-3v3h3v8h-3v-8H8v-3h3V8.5c0-2.164.756-3.5 3.5-3.5h2.5v3h-1.914C13.97 8 13.972 8.214 13.972 8.7V10h2.528l-.528 3h-2v8h-3v-8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Facebook</h3>
              <p className="text-gray-600 mb-4">Follow us on Facebook</p>
              <a 
                href="https://www.facebook.com/ithinknlearn"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:text-blue-700"
              >
                @ithinknlearn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* First Row - Office Hours & Why Contact Us */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Office Hours</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 font-semibold">Monday - Friday</p>
                  <p className="text-lg text-gray-900">9:00 AM - 8:00 PM IST</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Saturday - Sunday</p>
                  <p className="text-lg text-gray-900">10:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-purple-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Contact Us?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  <span>Book a Free Demo Class</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">❓</span>
                  <span>Ask about courses & programs</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <span>Get personalized guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Discuss academic goals</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🌟</span>
                  <span>Learn about new updates</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Second Row - Map & Location */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full min-h-96">
              <h3 className="text-2xl font-bold text-gray-900 p-6 pb-2">Find Us On Map</h3>
              <p className="text-gray-600 px-6 pb-4">Bengaluru, India</p>
              <iframe
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.116485023308!2d77.74379577520325!3d13.048279870759854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16e5c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2s  iThinkLearn%20-%20Premium%20Coaching%20for%20Global%20Exams!5e0!3m2!1sen!2sin!4v1234567890123"
              ></iframe>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-600">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
                <h3 className="text-2xl font-bold text-gray-900">Our Location</h3>
              </div>
              <div className="mb-6">
                <p className="text-gray-700 font-semibold mb-3 text-lg">Bengaluru Office</p>
                <p className="text-gray-700 leading-relaxed">
                  No. 81, Ground Floor, Share Space<br/>
                  88, Borewell Road, near Palm Meadows, Dodsworth Layout<br/>
                  Whitefield, Bengaluru, Karnataka 560066<br/>
                  <span className="font-semibold">INDIA</span>
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                  iThinkLearn operates globally with students from:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>✓ India</li>
                <li>✓ United States</li>
                <li>✓ Europe</li>
                <li>✓ Middle East</li>
                <li>✓ Australia & More</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-linear-to-r from-blue-400 via-blue-400 to-purple-400 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have achieved excellence with   iThinkLearn
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a 
              href="https://wa.me/918197466607"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition transform hover:scale-105 shadow-lg"
            >
              📱 WhatsApp Now
            </a>
            <a 
              href="tel:+917795010900"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition"
            >
              📞 Call Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

