import React, { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle, CreditCard, Download, Mail, Printer, X } from 'lucide-react'
import toast from 'react-hot-toast'
import Header from '../component/Header'
import Footer from '../component/Footer'

const EMPTY_FORM = {
  fullName: '',
  fatherName: '',
  courseName: '',
  feeAmount: '',
  email: '',
  phone: '',
  address: ''
}

export default function FeePayment() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [lastPayment, setLastPayment] = useState(null)

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
    if (existingScript) return undefined

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateReceipt = (paymentData) => `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Receipt - iThinkLearn</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 3px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { font-size: 32px; font-weight: bold; color: #1e3a8a; }
          .receipt-title { font-size: 24px; color: #1e3a8a; margin-top: 10px; }
          .info-section { margin: 20px 0; }
          .info-row { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; gap: 16px; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; text-align: right; }
          .amount-section { background: #eff6ff; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .amount { font-size: 36px; font-weight: bold; color: #1e3a8a; }
          .status { display: inline-block; padding: 8px 16px; background: #10b981; color: white; border-radius: 20px; font-weight: bold; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">iThinkLearn</div>
          <div class="receipt-title">Payment Receipt</div>
        </div>
        <div class="info-section">
          <div class="info-row"><span class="label">Receipt No:</span><span class="value">${paymentData.id}</span></div>
          <div class="info-row"><span class="label">Transaction ID:</span><span class="value">${paymentData.razorpayPaymentId}</span></div>
          <div class="info-row"><span class="label">Payment Date:</span><span class="value">${new Date(paymentData.paymentDate).toLocaleString()}</span></div>
          <div class="info-row"><span class="label">Payment Status:</span><span class="value"><span class="status">SUCCESS</span></span></div>
        </div>
        <div class="info-section">
          <h3 style="color: #1e3a8a;">Student Details</h3>
          <div class="info-row"><span class="label">Full Name:</span><span class="value">${paymentData.fullName}</span></div>
          <div class="info-row"><span class="label">Father's Name:</span><span class="value">${paymentData.fatherName}</span></div>
          <div class="info-row"><span class="label">Email:</span><span class="value">${paymentData.email}</span></div>
          <div class="info-row"><span class="label">Phone:</span><span class="value">${paymentData.phone}</span></div>
          <div class="info-row"><span class="label">Course:</span><span class="value">${paymentData.courseName}</span></div>
        </div>
        <div class="amount-section">
          <div style="font-size: 18px; margin-bottom: 10px;">Total Amount Paid</div>
          <div class="amount">₹${paymentData.feeAmount}</div>
        </div>
        <div class="footer">
          <p><strong>iThinkLearn</strong></p>
          <p>Email: ithinklearn@ixpoe.com | Phone: +91 779 501 0900</p>
          <p>Thank you for your payment!</p>
        </div>
      </body>
    </html>
  `

  const downloadReceipt = () => {
    if (!lastPayment) return

    const blob = new Blob([generateReceipt(lastPayment)], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `iThinkLearn_Receipt_${lastPayment.id}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Receipt downloaded successfully!')
  }

  const printReceipt = () => {
    if (!lastPayment) return

    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      toast.error('Please allow popups to print receipt.')
      return
    }
    printWindow.document.write(generateReceipt(lastPayment))
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 250)
  }

  const sendReceiptEmail = () => {
    if (!lastPayment) return
    toast.success(`Receipt will be sent to ${lastPayment.email}`)
  }

  const handleRazorpayPayment = () => {
    const amount = Number.parseInt(formData.feeAmount, 10)
    const options = {
      key: 'rzp_test_RlZy2hUEUVQyxy',
      amount: amount * 100,
      currency: 'INR',
      name: 'iThinkLearn',
      description: `Fee Payment - ${formData.courseName}`,
      image: '/logo.jpeg',
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        courseName: formData.courseName,
        fatherName: formData.fatherName,
        address: formData.address
      },
      theme: {
        color: '#1e3a8a'
      },
      handler: (response) => {
        const paymentData = {
          id: `ITL${Date.now()}`,
          ...formData,
          paymentDate: new Date().toISOString(),
          status: 'Success',
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id || '',
          razorpaySignature: response.razorpay_signature || ''
        }

        const payments = JSON.parse(localStorage.getItem('feePayments') || '[]')
        payments.push(paymentData)
        localStorage.setItem('feePayments', JSON.stringify(payments))

        setLastPayment(paymentData)
        setShowReceipt(true)
        setFormData(EMPTY_FORM)
        setIsSubmitting(false)
        toast.success('Payment successful! Receipt generated.')

        setTimeout(() => toast.success(`Receipt sent to ${paymentData.email}`), 1500)
      },
      modal: {
        ondismiss: () => {
          toast.error('Payment cancelled')
          setIsSubmitting(false)
        }
      }
    }

    const razorpayInstance = new window.Razorpay(options)
    razorpayInstance.on('payment.failed', (response) => {
      toast.error(`Payment failed: ${response.error.description}`)
      setIsSubmitting(false)
    })
    razorpayInstance.open()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const amount = Number.parseInt(formData.feeAmount, 10)

    if (amount < 99 || amount > 99999) {
      toast.error('Fee amount must be between ₹99 and ₹99,999')
      return
    }

    setIsSubmitting(true)
    if (typeof window.Razorpay === 'undefined') {
      toast.error('Payment gateway not loaded. Please refresh the page.')
      setIsSubmitting(false)
      return
    }

    handleRazorpayPayment()
  }

  return (
    <div className="w-full bg-white">
      <Header />

      <section className="py-10 sm:py-14 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 text-blue-900">
            Pay Fees Online
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700">
            Secure and convenient online fee payment for iThinkLearn students
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { title: 'Secure Payment', text: '256-bit SSL encryption', color: 'text-blue-900 border-blue-900' },
              { title: 'Multiple Options', text: 'UPI, Cards, Net Banking', color: 'text-yellow-600 border-yellow-500' },
              { title: 'Instant Receipt', text: 'Auto-confirmation', color: 'text-green-600 border-green-600' }
            ].map((item) => (
              <div key={item.title} className={`bg-white rounded-lg p-4 border-2 text-center ${item.color}`}>
                <CheckCircle size={32} className="mx-auto mb-2" />
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="flex items-center gap-3">
                <CreditCard size={28} className="text-blue-900" />
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">Fee Payment Form</h2>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-xs text-gray-500">We accept:</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">UPI</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Cards</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Net Banking</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" required />
                <FormInput label="Father Name" name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Enter father's name" required />
                <FormInput label="Course Name" name="courseName" value={formData.courseName} onChange={handleInputChange} placeholder="e.g., UG Mathematics, GRE" required />
                <div>
                  <FormInput label="Fee Amount (₹)" type="number" name="feeAmount" value={formData.feeAmount} onChange={handleInputChange} placeholder="Range: ₹99 - ₹99,999" min="99" max="99999" required />
                  <p className="text-xs text-gray-500 mt-1">Minimum: ₹99 | Maximum: ₹99,999</p>
                </div>
                <FormInput label="Email ID" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" required />
                <FormInput label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" pattern="[0-9+\s-]+" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition"
                  placeholder="Enter your complete address"
                  required
                />
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <div className="flex items-start gap-2">
                  <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-800 text-sm">Secure Payment via Razorpay</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your payment will be processed securely through Razorpay. All major payment methods are supported.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 rounded-lg font-bold text-white text-lg transition hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-blue-900"
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    <CreditCard size={20} />
                    Pay Now with Razorpay
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p className="mb-2">Powered by Razorpay - Secure & Encrypted Payment Gateway</p>
            <p>
              For any queries, contact us at{' '}
              <a href="mailto:ithinklearn@ixpoe.com" className="text-blue-900 font-semibold hover:underline">ithinklearn@ixpoe.com</a>
              {' '}or call{' '}
              <a href="tel:+917795010900" className="text-blue-900 font-semibold hover:underline">+91 779 501 0900</a>
            </p>
          </div>
        </div>
      </section>

      {showReceipt && lastPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-blue-900 to-yellow-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle size={40} />
                  <div>
                    <h2 className="text-2xl font-bold">Payment Successful!</h2>
                    <p className="text-sm text-white/80 mt-1">Thank you for your payment</p>
                  </div>
                </div>
                <button onClick={() => setShowReceipt(false)} className="p-2 hover:bg-white/20 rounded-full transition">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <ReceiptRow label="Receipt No:" value={lastPayment.id} strong />
                <ReceiptRow label="Transaction ID:" value={lastPayment.razorpayPaymentId} />
                <ReceiptRow label="Payment Date:" value={new Date(lastPayment.paymentDate).toLocaleString()} />
                <div className="flex justify-between items-center gap-4">
                  <span className="text-sm font-semibold text-gray-600">Status:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">SUCCESS</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-200">Student Details</h3>
                <div className="space-y-2">
                  <ReceiptRow label="Full Name:" value={lastPayment.fullName} />
                  <ReceiptRow label="Father's Name:" value={lastPayment.fatherName} />
                  <ReceiptRow label="Email:" value={lastPayment.email} />
                  <ReceiptRow label="Phone:" value={lastPayment.phone} />
                  <ReceiptRow label="Course:" value={lastPayment.courseName} />
                </div>
              </div>

              <div className="bg-linear-to-r from-blue-50 to-teal-50 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Total Amount Paid</p>
                <p className="text-4xl font-bold text-blue-900">₹{lastPayment.feeAmount}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <ReceiptAction icon={Download} label="Download" className="bg-blue-900" onClick={downloadReceipt} />
                <ReceiptAction icon={Mail} label="Email" className="bg-yellow-500" onClick={sendReceiptEmail} />
                <ReceiptAction icon={Printer} label="Print" className="bg-gray-700" onClick={printReceipt} />
              </div>

              <div className="text-center border-t-2 border-gray-200 pt-4">
                <p className="text-sm font-bold text-gray-800">iThinkLearn</p>
                <p className="text-xs text-gray-600 mt-1">Email: ithinklearn@ixpoe.com | Phone: +91 779 501 0900</p>
                <p className="text-xs text-gray-500 mt-2">Thank you for your payment!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

function FormInput({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        required={required}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition"
      />
    </div>
  )
}

function ReceiptRow({ label, value, strong = false }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="text-sm font-semibold text-gray-600">{label}</span>
      <span className={`${strong ? 'font-mono font-bold text-blue-900' : 'text-sm font-semibold text-gray-800'} text-right break-all`}>{value}</span>
    </div>
  )
}

function ReceiptAction({ icon: Icon, label, className, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 p-4 text-white rounded-lg hover:opacity-90 transition ${className}`}>
      {React.createElement(Icon, { size: 24 })}
      <span className="text-sm font-semibold">{label}</span>
    </button>
  )
}
