import React, { useState, useEffect } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import ScheduleFreeDemoModal from '../component/ScheduleFreeDemoModal'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { demoApi } from '../api/demoApi'

const GRADES = ['1-5', '6-8', '9-10', '11-12', 'Undergraduate', 'Post-Graduate', 'Other']
const BOARDS = ['IGCSE', 'IB', 'Cambridge', 'CBSE', 'ICSE', 'Others']
const TIME_SLOTS = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM'
]
const OTP_VALIDITY_MS = 5 * 60 * 1000
const OFFICIAL_EMAIL = 'ithinklearn@ixpoe.com'
const OFFICIAL_WHATSAPP = '918197466607'

export default function ContactUs() {
  const { isAuthenticated, user } = useAuth()
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [otpExpiry, setOtpExpiry] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [otpInput, setOtpInput] = useState('')
  const [consentChecked, setConsentChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [storedOtp, setStoredOtp] = useState(null)

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    grade: '',
    board: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })

  // Update form data with user info when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        studentName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [isAuthenticated, user])

  // OTP Timer
  useEffect(() => {
    if (otpExpiry) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const remaining = Math.max(0, otpExpiry - now)
        setTimeRemaining(Math.ceil(remaining / 1000))

        if (remaining <= 0) {
          clearInterval(timer)
          setOtpExpiry(null)
          setStoredOtp(null)
          toast.error('OTP has expired. Please request a new one.')
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [otpExpiry])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone)
  }

  const validateFormStep1 = () => {
    const newErrors = {}

    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required'
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required'
    if (!formData.grade) newErrors.grade = 'Grade is required'
    if (!formData.board) newErrors.board = 'Board is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (formData.phone.length < 10) newErrors.phone = 'Phone number must be exactly 10 digits'
    else if (!validatePhoneNumber(formData.phone)) newErrors.phone = 'Phone number must be exactly 10 digits'
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required'
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time slot is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let finalValue = value

    if (name === 'phone') {
      finalValue = value.replace(/\D/g, '').slice(0, 10)
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleSendOTP = async () => {
    if (!validateFormStep1()) return

    try {
      const otp = generateOTP()
      setStoredOtp(otp)
      setOtpInput('')

      try {
        await demoApi.sendOtp({
          email: formData.email,
          studentName: formData.studentName,
          otp,
          otpValidityMinutes: 5,
          message: 'This OTP is valid for only 5 minutes.'
        })
      } catch {
        console.info(`Demo OTP fallback for ${formData.email}: ${otp}`)
      }

      toast.success(`OTP sent to ${formData.email}. This OTP is valid for only 5 minutes.`)

      const expiryTime = new Date().getTime() + OTP_VALIDITY_MS
      setOtpExpiry(expiryTime)
      setStep(2)
    } catch (error) {
      console.error('Error sending OTP:', error)
      toast.error('Failed to send OTP. Please try again.')
    }
  }

  const handleVerifyOTP = () => {
    if (!otpInput.trim()) {
      toast.error('Please enter OTP')
      return
    }

    if (!otpExpiry || new Date().getTime() >= otpExpiry || timeRemaining <= 0 || !storedOtp) {
      setStoredOtp(null)
      toast.error('OTP has expired. Please request a new one.')
      return
    }

    if (otpInput !== storedOtp) {
      toast.error('Invalid OTP')
      return
    }

    demoApi.verifyOtp({ email: formData.email, otp: otpInput }).catch(() => null).finally(() => {
      toast.success('OTP verified successfully!')
      setStep(3)
    })
  }

  const handleResendOTP = () => {
    setOtpInput('')
    setStoredOtp(null)
    setOtpExpiry(null)
    setTimeRemaining(0)
    handleSendOTP()
  }

  const handleSubmitDemo = async () => {
    if (!consentChecked) {
      toast.error('Please agree to the consent to proceed')
      return
    }

    setIsSubmitting(true)

    try {
      const demoRequests = JSON.parse(localStorage.getItem('runningClassDemoRequests') || '[]')
      const adminDemoRequests = JSON.parse(localStorage.getItem('icfy_demo_requests') || '[]')

      const newDemoRequest = {
        id: `DEMO${Date.now()}`,
        demoNumber: `DEMO${demoRequests.length + 1}${Math.floor(Date.now() / 1000)}`,
        studentName: formData.studentName,
        parentName: formData.parentName,
        grade: formData.grade,
        board: formData.board,
        email: formData.email,
        phone: formData.phone,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message,
        consentGiven: true,
        requestDate: new Date().toISOString(),
        status: 'Pending',
        verified: true
      }

      demoRequests.push(newDemoRequest)
      localStorage.setItem('runningClassDemoRequests', JSON.stringify(demoRequests))

      const adminRequest = {
        id: newDemoRequest.id,
        name: newDemoRequest.studentName,
        parentName: newDemoRequest.parentName,
        email: newDemoRequest.email,
        phone: newDemoRequest.phone,
        course: `${newDemoRequest.grade} - ${newDemoRequest.board}`,
        grade: newDemoRequest.grade,
        board: newDemoRequest.board,
        preferredDate: newDemoRequest.preferredDate,
        preferredTime: newDemoRequest.preferredTime,
        status: 'Pending',
        notes: newDemoRequest.message,
        requestedOn: new Date(newDemoRequest.requestDate).toLocaleDateString('en-IN'),
        demoNumber: newDemoRequest.demoNumber
      }
      adminDemoRequests.push(adminRequest)
      localStorage.setItem('icfy_demo_requests', JSON.stringify(adminDemoRequests))

      window.dispatchEvent(new StorageEvent('storage', {
        key: 'runningClassDemoRequests',
        newValue: JSON.stringify(demoRequests)
      }))

      const emailSubject = `New Demo Request - ${newDemoRequest.demoNumber} | ${newDemoRequest.studentName}`
      const emailBody = [
        `New Free Demo Request Received`,
        ``,
        `Demo Number: ${newDemoRequest.demoNumber}`,
        `Submitted On: ${new Date(newDemoRequest.requestDate).toLocaleString('en-IN')}`,
        ``,
        `--- STUDENT DETAILS ---`,
        `Student Name : ${newDemoRequest.studentName}`,
        `Parent Name  : ${newDemoRequest.parentName}`,
        `Grade        : ${newDemoRequest.grade}`,
        `Board        : ${newDemoRequest.board}`,
        ``,
        `--- CONTACT DETAILS ---`,
        `Email  : ${newDemoRequest.email}`,
        `Phone  : ${newDemoRequest.phone}`,
        ``,
        `--- PREFERRED SCHEDULE ---`,
        `Date : ${newDemoRequest.preferredDate}`,
        `Time : ${newDemoRequest.preferredTime}`,
        ``,
        newDemoRequest.message ? `--- MESSAGE ---\n${newDemoRequest.message}` : '',
        ``,
        `Please follow up with the student at the earliest.`,
        ``,
        `-- iThinkLearn Demo Request System`
      ].filter(l => l !== undefined).join('\n')

      window.open(
        `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
        '_blank'
      )

      const whatsappMsg = [
        `🎓 *New Demo Request - ${newDemoRequest.demoNumber}*`,
        ``,
        `👤 *Student:* ${newDemoRequest.studentName}`,
        `👨‍👩‍👦 *Parent:* ${newDemoRequest.parentName}`,
        `📚 *Grade/Board:* ${newDemoRequest.grade} - ${newDemoRequest.board}`,
        ``,
        `📧 *Email:* ${newDemoRequest.email}`,
        `📞 *Phone:* ${newDemoRequest.phone}`,
        ``,
        `📅 *Preferred Date:* ${newDemoRequest.preferredDate}`,
        `⏰ *Preferred Time:* ${newDemoRequest.preferredTime}`,
        newDemoRequest.message ? `\n💬 *Message:* ${newDemoRequest.message}` : '',
        ``,
        `🕐 *Submitted:* ${new Date(newDemoRequest.requestDate).toLocaleString('en-IN')}`,
        ``,
        `Please follow up at the earliest! ✅`
      ].filter(l => l !== undefined).join('\n')

      window.open(
        `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`,
        '_blank'
      )

      toast.success('Demo scheduled! Email & WhatsApp notifications sent.')
      resetForm()
    } catch (error) {
      console.error('Error submitting demo:', error)
      toast.error('Failed to schedule demo. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setOtpExpiry(null)
    setOtpInput('')
    setConsentChecked(false)
    setErrors({})
    setFormData({
      studentName: '',
      parentName: '',
      grade: '',
      board: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
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
                +91 8197 466 607
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

      {/* Contact Form & Demo Schedule Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">Get Your Free Demo Today</h2>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Location & Info */}
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
                  88, Borewell Road, Whitefield<br/>
                  Bangalore - 560066<br/>
                  <span className="font-semibold">Karnataka, INDIA</span><br/>
                  <span className="text-sm text-gray-600">Landmark: ICICI Bank, Vivero International School</span>
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                  iThinkLearn operates globally with students from:
              </p>
              <ul className="text-gray-700 space-y-2 mb-8">
                <li>✓ India</li>
                <li>✓ United States</li>
                <li>✓ Europe</li>
                <li>✓ Middle East</li>
                <li>✓ Australia & More</li>
              </ul>

              <div className="border-t pt-6 mt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h4>
                <div className="space-y-3">
                  <a href="https://wa.me/918197466607" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp: +91 8197 466 607
                  </a>
                  <a href="tel:+917795010900" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Call: +91 779 501 0900
                  </a>
                  <a href="mailto:ithinklearn@ixpoe.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    Email: ithinklearn@ixpoe.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Schedule Demo Form */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-blue-600 max-h-full overflow-y-auto">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5h4v4h-4z"/>
                </svg>
                <h3 className="text-xl font-bold text-gray-900">
                  {step === 1 ? 'Schedule Free Demo' : step === 2 ? 'Verify OTP' : 'Confirm Details'}
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 flex gap-2">
                <div className={`h-1 flex-1 rounded ${step >= 1 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                <div className={`h-1 flex-1 rounded ${step >= 2 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                <div className={`h-1 flex-1 rounded ${step >= 3 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
              </div>

              {/* Step 1: Form */}
              {step === 1 && (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1">Student Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                          errors.studentName ? 'border-red-500' : 'border-gray-200 focus:border-yellow-400'
                        }`}
                        placeholder="Student's name"
                      />
                      {errors.studentName && <p className="text-xs text-red-500 mt-0.5">{errors.studentName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1">Parent Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                          errors.parentName ? 'border-red-500' : 'border-gray-200 focus:border-yellow-400'
                        }`}
                        placeholder="Parent's name"
                      />
                      {errors.parentName && <p className="text-xs text-red-500 mt-0.5">{errors.parentName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1">Grade <span className="text-red-500">*</span></label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                          errors.grade ? 'border-red-500' : 'border-gray-200 focus:border-yellow-400'
                        }`}
                      >
                        <option value="">Select Grade</option>
                        {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                      {errors.grade && <p className="text-xs text-red-500 mt-0.5">{errors.grade}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1">Board <span className="text-red-500">*</span></label>
                      <select
                        name="board"
                        value={formData.board}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                          errors.board ? 'border-red-500' : 'border-gray-200 focus:border-yellow-400'
                        }`}
                      >
                        <option value="">Select Board</option>
                        {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {errors.board && <p className="text-xs text-red-500 mt-0.5">{errors.board}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1">Email ID <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                        errors.email ? 'border-red-500' : 'border-gray-200 focus:border-yellow-400'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                        errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-yellow-400'
                      }`}
                      placeholder="10-digit mobile"
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1">Preferred Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                          errors.preferredDate ? 'border-red-500' : 'border-gray-200 focus:border-yellow-400'
                        }`}
                      />
                      {errors.preferredDate && <p className="text-xs text-red-500 mt-0.5">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1">Time Slot <span className="text-red-500">*</span></label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                          errors.preferredTime ? 'border-red-500' : 'border-gray-200 focus:border-yellow-400'
                        }`}
                      >
                        <option value="">Select Time</option>
                        {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                      {errors.preferredTime && <p className="text-xs text-red-500 mt-0.5">{errors.preferredTime}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-1">Message (Optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-sm"
                      placeholder="Any specific topics you'd like to focus on?"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition text-sm sm:text-base"
                  >
                    Send OTP
                  </button>
                </form>
              )}

              {/* Step 2: OTP Verification */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900 font-semibold mb-2">OTP has been sent to:</p>
                    <p className="text-sm text-blue-700 break-all">{formData.email}</p>
                    {timeRemaining > 0 && (
                      <p className="text-xs text-blue-600 mt-2">Expires in: {formatTime(timeRemaining)}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-blue-900 mb-2">Enter OTP <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength="6"
                      className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 text-center text-2xl tracking-widest font-bold"
                      placeholder="000000"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition text-sm"
                    >
                      Verify OTP
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={timeRemaining > 0}
                      className="bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:shadow-lg transition text-sm disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Consent & Confirmation */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-900 font-semibold">✓ OTP Verified Successfully!</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3 max-h-48 overflow-y-auto">
                    <h4 className="font-bold text-gray-900 text-sm">Demo Details:</h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p><span className="font-semibold">Student:</span> {formData.studentName}</p>
                      <p><span className="font-semibold">Parent:</span> {formData.parentName}</p>
                      <p><span className="font-semibold">Grade:</span> {formData.grade}</p>
                      <p><span className="font-semibold">Board:</span> {formData.board}</p>
                      <p><span className="font-semibold">Date:</span> {formData.preferredDate}</p>
                      <p><span className="font-semibold">Time:</span> {formData.preferredTime}</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="w-5 h-5 border-2 border-gray-300 rounded mt-1 cursor-pointer"
                    />
                    <span className="text-xs text-gray-700">
                      I agree that iThinkLearn can contact me via email or phone for demo class details and course information.
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={handleSubmitDemo}
                    disabled={!consentChecked || isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Demo'}
                  </button>
                </div>
              )}
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
            <button
              type="button"
              onClick={() => setIsDemoOpen(true)}
              className="bg-white text-blue-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition transform hover:scale-105 shadow-lg"
            >
              Schedule Free Demo
            </button>
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
      <ScheduleFreeDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  )
}

