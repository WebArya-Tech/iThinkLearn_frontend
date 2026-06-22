import React, { useState } from 'react'
import { Copy, CheckCircle, Building2, CreditCard, Shield, Smartphone, QrCode } from 'lucide-react'
import Pagination from '../ui/Pagination'

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
    className="ml-2 p-1.5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors group relative touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
    title="Copy to clipboard"
    aria-label="Copy to clipboard"
  >
    {copiedField === field ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <Copy className="w-4 h-4 text-gray-500 group-hover:text-blue-900" />
    )}
  </button>
)

export default function FeePayment() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedFee, setSelectedFee] = useState(null)
  const [feePage, setFeePage] = useState(1)
  const [historyPage, setHistoryPage] = useState(1)
  const [itemsPerPage] = useState(100)
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

  const feeStructure = [
    {
      id: 1,
      course: 'Mathematics Advanced',
      amount: 15000,
      dueDate: 'Feb 28, 2026',
      status: 'pending'
    },
    {
      id: 2,
      course: 'Physics Fundamentals',
      amount: 12000,
      dueDate: 'Feb 28, 2026',
      status: 'pending'
    },
    {
      id: 3,
      course: 'Chemistry Basics',
      amount: 10000,
      dueDate: 'Jan 15, 2026',
      status: 'paid',
      paidOn: 'Jan 10, 2026'
    },
    {
      id: 4,
      course: 'Computer Science',
      amount: 18000,
      dueDate: 'Jan 15, 2026',
      status: 'paid',
      paidOn: 'Jan 12, 2026'
    }
  ]

  const paymentHistory = [
    {
      id: 'PAY-2026-001',
      course: 'Chemistry Basics',
      amount: 10000,
      date: 'Jan 10, 2026',
      method: 'Credit Card',
      status: 'success'
    },
    {
      id: 'PAY-2026-002',
      course: 'Computer Science',
      amount: 18000,
      date: 'Jan 12, 2026',
      method: 'UPI',
      status: 'success'
    },
    {
      id: 'PAY-2025-015',
      course: 'Mathematics Advanced',
      amount: 15000,
      date: 'Dec 15, 2025',
      method: 'Bank Transfer',
      status: 'success'
    }
  ]

  const pendingAmount = feeStructure.filter(f => f.status === 'pending').reduce((acc, f) => acc + f.amount, 0)
  const paidAmount = feeStructure.filter(f => f.status === 'paid').reduce((acc, f) => acc + f.amount, 0)

  // Pagination for Fee Structure
  const feeTotalPages = Math.ceil(feeStructure.length / itemsPerPage)
  const feeStartIndex = (feePage - 1) * itemsPerPage
  const paginatedFeeStructure = feeStructure.slice(feeStartIndex, feeStartIndex + itemsPerPage)

  // Pagination for Payment History
  const historyTotalPages = Math.ceil(paymentHistory.length / itemsPerPage)
  const historyStartIndex = (historyPage - 1) * itemsPerPage
  const paginatedPaymentHistory = paymentHistory.slice(historyStartIndex, historyStartIndex + itemsPerPage)

  const handlePayNow = (fee) => {
    setSelectedFee(fee)
    setShowPaymentModal(true)
  }

  const handleDownload = (payment) => {
    alert(`Downloading receipt for ${payment.id} — ${payment.course}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold" style={{ color: '#196d83' }}>Fee Payment</h2>
        <p className="text-gray-600 mt-2">Manage your course fees and payment history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#dc3545' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Pending Payment</h3>
          <p className="text-3xl font-bold" style={{ color: '#dc3545' }}>₹{pendingAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#28a745' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Paid This Term</h3>
          <p className="text-3xl font-bold" style={{ color: '#28a745' }}>₹{paidAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#1e3a8a' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Courses</h3>
          <p className="text-3xl font-bold" style={{ color: '#1e3a8a' }}>{feeStructure.length}</p>
        </div>
      </div>

      {/* Current Fee Structure */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6" style={{ color: '#1e3a8a' }}>Current Fee Structure</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#1e3a8a' }}>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Course</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Amount</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Due Date</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Paid On</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Status</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFeeStructure.map((fee) => (
                <tr key={fee.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">{fee.course}</td>
                  <td className="py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>₹{fee.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm">{fee.dueDate}</td>
                  <td className="py-3 px-4 text-sm">{fee.paidOn || '—'}</td>
                  <td className="py-3 px-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: fee.status === 'paid' ? '#28a745' : '#dc3545' }}
                    >
                      {fee.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {fee.status === 'pending' ? (
                      <button
                        onClick={() => handlePayNow(fee)}
                        className="px-4 py-2 rounded-lg text-white text-sm font-bold hover:bg-blue-800 transition-all"
                        style={{ backgroundColor: '#1e3a8a' }}
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-sm font-semibold" style={{ color: '#28a745' }}>Paid ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={feePage}
          totalPages={feeTotalPages}
          onPageChange={setFeePage}
          totalItems={feeStructure.length}
          itemsPerPage={itemsPerPage}
          alwaysShow={true}
        />
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6" style={{ color: '#1e3a8a' }}>Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#1e3a8a' }}>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Transaction ID</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Course</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Amount</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Date</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Method</th>
                <th className="text-left py-3 px-4 font-bold" style={{ color: '#1e3a8a' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPaymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{payment.id}</td>
                  <td className="py-3 px-4">{payment.course}</td>
                  <td className="py-3 px-4 font-bold" style={{ color: '#28a745' }}>₹{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">{payment.date}</td>
                  <td className="py-3 px-4">{payment.method}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDownload(payment)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold border-2 bg-white transition-all hover:bg-blue-50"
                      style={{ borderColor: '#1e3a8a', color: '#1e3a8a' }}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={historyPage}
          totalPages={historyTotalPages}
          onPageChange={setHistoryPage}
          totalItems={paymentHistory.length}
          itemsPerPage={itemsPerPage}
          alwaysShow={true}
        />
      </div>

      {/* Payment Details Modal */}
      {showPaymentModal && selectedFee && (
        <div
          className="fixed inset-0  flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-lg max-h-[85vh] sm:max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header */}
            <div className="flex justify-between items-start p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
              <div className="pr-4">
                <h2 className="text-lg sm:text-2xl font-bold" style={{ color: '#1e3a8a' }}>Pay Fees Online</h2>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">Bank transfer or UPI details</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl font-bold flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-3 sm:p-4 space-y-4">
              {/* Amount to Pay */}
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#eff6ff', borderLeft: '4px solid #1e3a8a' }}>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">Amount Due</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1" style={{ color: '#1e3a8a' }}>₹{selectedFee.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-600 mt-1">{selectedFee.course}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Bank Transfer Section */}
                <div className="bg-gray-50 rounded-xl border border-blue-100 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#1e3a8a' }} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base" style={{ color: '#1e3a8a' }}>Bank Transfer</h3>
                      <p className="text-xs text-gray-600">NEFT / RTGS</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="border-b pb-2">
                      <p className="text-xs text-gray-600 font-semibold">Bank</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="font-semibold text-gray-900 truncate">{bankDetails.bankName}</p>
                        <CopyButton text={bankDetails.bankName} field="bankName" copiedField={copiedField} onCopy={copyToClipboard} />
                      </div>
                    </div>

                    <div className="border-b pb-2">
                      <p className="text-xs text-gray-600 font-semibold">Account</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="font-semibold text-gray-900 truncate text-xs">{bankDetails.accountName}</p>
                        <CopyButton text={bankDetails.accountName} field="accountName" copiedField={copiedField} onCopy={copyToClipboard} />
                      </div>
                    </div>

                    <div className="border-b pb-2">
                      <p className="text-xs text-gray-600 font-semibold">Acc No</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="font-semibold text-gray-900 font-mono text-xs">{bankDetails.accountNumber}</p>
                        <CopyButton text={bankDetails.accountNumber} field="accountNumber" copiedField={copiedField} onCopy={copyToClipboard} />
                      </div>
                    </div>

                    <div className="border-b pb-2">
                      <p className="text-xs text-gray-600 font-semibold">IFSC</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="font-semibold text-gray-900 font-mono text-xs">{bankDetails.ifscCode}</p>
                        <CopyButton text={bankDetails.ifscCode} field="ifscCode" copiedField={copiedField} onCopy={copyToClipboard} />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 font-semibold">MICR</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="font-semibold text-gray-900 font-mono text-xs">{bankDetails.micrCode}</p>
                        <CopyButton text={bankDetails.micrCode} field="micrCode" copiedField={copiedField} onCopy={copyToClipboard} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* UPI QR Code Section */}
                <div className="bg-gray-50 rounded-xl border border-blue-100 p-3 sm:p-4 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-3 w-full">
                    <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#1e3a8a' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base" style={{ color: '#1e3a8a' }}>UPI Payment</h3>
                      <p className="text-xs text-gray-600">Scan & Pay</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-2 w-full text-center mb-2 flex justify-center">
                    <div className="inline-block bg-white rounded-lg p-2 border-2 border-yellow-400">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white flex items-center justify-center rounded">
                        {qrAvailable ? (
                          <img src="/qr.jpeg" alt="UPI QR Code" className="w-full h-full object-contain" onError={() => setQrAvailable(false)} />
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-1 text-blue-900">
                            <QrCode className="w-8 h-8 sm:w-12 sm:h-12" />
                            <p className="text-xs font-semibold">QR not found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-blue-900 bg-blue-50 px-2 py-1.5 rounded w-full justify-center">
                    <Shield className="w-3 h-3 flex-shrink-0" />
                    <span className="font-semibold">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="border-t border-gray-200 p-3 sm:p-4 bg-white flex gap-2 flex-shrink-0">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2 sm:py-3 rounded-lg font-bold border-2 transition-all bg-white hover:bg-gray-50 text-sm sm:text-base"
                style={{ borderColor: '#6b7280', color: '#374151' }}
              >
                Close
              </button>
              <a
                href="https://wa.me/918197466607?text=I%20want%20to%20pay%20fees%20for%20my%20course"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 sm:py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all text-center text-sm sm:text-base"
                style={{ backgroundColor: '#25D366' }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
