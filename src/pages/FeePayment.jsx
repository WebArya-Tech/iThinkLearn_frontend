import React, { useEffect, useState } from 'react'
import {
  Building2,
  CheckCircle,
  Copy,
  CreditCard,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Shield,
  Smartphone,
} from 'lucide-react'
import Header from '../component/Header'
import Footer from '../component/Footer'

const bankDetails = {
  bankName: 'HDFC Bank',
  accountName: 'DRONAVYAS IXPOE PVT LTD',
  accountType: 'Current Account',
  accountNumber: '50200002163572',
  ifscCode: 'HDFC0002377',
  micrCode: '560240072',
  swiftCode: 'HDFCINBBBNG',
  branch: 'Old No 118, 1/1, Whitefield Main Rd, opposite Reliance Fresh, Dodsworth Layout, Whitefield, Bengaluru, Karnataka 560066',
  country: 'India',
  state: 'Karnataka',
  city: 'Bengaluru',
}

const CopyButton = ({ text, field, copiedField, onCopy }) => (
  <button
    type="button"
    onClick={() => onCopy(text, field)}
    className="ml-2 p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors group relative touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
    title="Copy to clipboard"
    aria-label="Copy to clipboard"
  >
    {copiedField === field ? (
      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
    ) : (
      <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-hover:text-blue-900" />
    )}
  </button>
)

const DetailRow = ({ label, value, field, icon: Icon, highlight = false, copiedField, onCopy }) => (
  <div className={`flex items-start py-2 sm:py-3 border-b border-gray-100 last:border-0 ${highlight ? 'bg-blue-50/70 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-lg' : ''}`}>
    <div className="flex-shrink-0 mt-1">
      {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />}
    </div>
    <div className={`${Icon ? 'ml-2 sm:ml-3' : ''} flex-1 min-w-0`}>
      <p className="text-xs sm:text-sm text-gray-600 font-medium">{label}</p>
      <div className="flex items-center mt-1">
        <p className={`text-sm sm:text-base font-semibold break-all ${highlight ? 'text-blue-900' : 'text-gray-900'}`}>{value}</p>
        {field && <CopyButton text={value} field={field} copiedField={copiedField} onCopy={onCopy} />}
      </div>
    </div>
  </div>
)

export default function FeePayment() {
  const [copiedField, setCopiedField] = useState('')
  const [qrAvailable, setQrAvailable] = useState(true)

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(''), 2000)
    } catch {
      setCopiedField('')
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-4')
          entry.target.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-full bg-white">
      <Header />

      <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-black text-blue-900">Pay Fees Online</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Use iThinkLearn bank transfer or UPI QR payment details below.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-linear-to-r from-blue-950 via-blue-900 to-blue-800 p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl">
                    <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Bank Transfer</h2>
                    <p className="text-yellow-100 text-xs sm:text-sm">NEFT / RTGS / IMPS</p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <div className="space-y-1">
                  <DetailRow icon={Building2} label="Bank Name" value={bankDetails.bankName} highlight copiedField={copiedField} onCopy={copyToClipboard} />
                  <DetailRow icon={CreditCard} label="Account Holder Name" value={bankDetails.accountName} highlight copiedField={copiedField} onCopy={copyToClipboard} />
                  <DetailRow label="Account Type" value={bankDetails.accountType} copiedField={copiedField} onCopy={copyToClipboard} />
                  <DetailRow label="Account Number" value={bankDetails.accountNumber} field="accountNumber" highlight copiedField={copiedField} onCopy={copyToClipboard} />
                  <DetailRow label="IFSC Code" value={bankDetails.ifscCode} field="ifscCode" highlight copiedField={copiedField} onCopy={copyToClipboard} />
                  <DetailRow label="MICR Code" value={bankDetails.micrCode} field="micrCode" copiedField={copiedField} onCopy={copyToClipboard} />
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-blue-900 mb-1">Branch Address</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{bankDetails.branch}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-linear-to-r from-blue-950 via-blue-900 to-blue-800 p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl">
                    <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">UPI Payment</h2>
                    <p className="text-yellow-100 text-xs sm:text-sm">Scan & Pay Instantly</p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <div className="bg-linear-to-br from-blue-50 to-yellow-50 rounded-2xl p-4 sm:p-6 md:p-8 text-center mb-4 sm:mb-6">
                  <div className="inline-block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border-2 sm:border-4 border-yellow-400">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-white flex items-center justify-center rounded-lg sm:rounded-xl relative overflow-hidden">
                      {qrAvailable ? (
                        <img src="/qr.jpeg" alt="UPI QR Code" className="w-full h-full object-contain" onError={() => setQrAvailable(false)} />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-blue-50 text-blue-900 px-4">
                          <QrCode className="w-16 h-16" />
                          <p className="text-sm font-semibold">QR code image not found</p>
                          <p className="text-xs text-blue-700">Add qr.jpeg in the public folder.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <p className="text-gray-700 font-semibold text-sm sm:text-base mb-2">
                      Scan QR code using any UPI payment app
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 mb-3">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-900" />
                      <span>100% Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div data-aos="fade-up-right" className="opacity-0 translate-y-4 transition-all duration-500">
            <footer className="rounded-xl sm:rounded-2xl py-6 sm:py-8 border border-blue-100 bg-white shadow-sm">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3">
                    <Building2 className="w-7 h-7 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900">iThinkLearn</h3>
                    <p className="text-sm text-gray-700 mt-1">DronaVyas IXPOE Private Limited</p>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      No. 81, Ground Floor, Share Space 88, Borewell Road, Whitefield,
                      Bangalore - 560066<br />
                      <span className="text-xs text-gray-500">Landmark: ICICI Bank, Vivero International School</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 md:gap-6">
                  <a href="tel:+917795010900" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Phone className="w-5 h-5 text-blue-900 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="text-sm font-semibold text-gray-900">+91 779 501 0900</p>
                    </div>
                  </a>

                  <a href="https://wa.me/918197466607" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">WhatsApp</p>
                      <p className="text-sm font-semibold text-gray-900">+91 8197 466 607</p>
                    </div>
                  </a>

                  <a href="mailto:ithinklearn@ixpoe.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Mail className="w-5 h-5 text-blue-900 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="text-sm font-semibold text-gray-900">ithinklearn@ixpoe.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
