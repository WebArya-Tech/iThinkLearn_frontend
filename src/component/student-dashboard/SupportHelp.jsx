import React, { useState } from 'react'

export default function SupportHelp() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [ticketsPage, setTicketsPage] = useState(1)
  const [faqsPage, setFaqsPage] = useState(1)
  const itemsPerPage = 5

  const faqs = [
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on "Forgot Password" on the login page. You\'ll receive an email with instructions to reset your password.'
    },
    {
      category: 'courses',
      question: 'How do I enroll in a new course?',
      answer: 'You can enroll in a new course by navigating to the "My Courses" section and clicking on the "+ Enroll New Course" button. Browse available courses and select the one you want to enroll in.'
    },
    {
      category: 'assignments',
      question: 'How do I submit an assignment?',
      answer: 'Go to the "Assignments" section, click on the assignment you want to submit, and click the "Submit Assignment" button. You can then upload your files and add any comments before final submission.'
    },
    {
      category: 'technical',
      question: 'What should I do if I can\'t join a live class?',
      answer: 'If you\'re having trouble joining a live class, first check your internet connection. If the issue persists, try refreshing your browser or using a different browser. Contact technical support if the problem continues.'
    },
    {
      category: 'payments',
      question: 'How can I view my payment history?',
      answer: 'Your payment history is available in the "Profile" section under "Payment History". You can also download invoices for your records.'
    },
    {
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to the "Profile" section and click on "Edit Profile". Update your information and click "Save Changes" to apply the updates.'
    }
  ]

  const tickets = [
    {
      id: 'TK-2024-001',
      subject: 'Cannot access Chemistry course materials',
      category: 'technical',
      status: 'open',
      priority: 'high',
      date: 'Jan 19, 2026',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'TK-2024-002',
      subject: 'Assignment submission failed',
      category: 'technical',
      status: 'in-progress',
      priority: 'high',
      date: 'Jan 18, 2026',
      lastUpdate: '1 day ago'
    },
    {
      id: 'TK-2024-003',
      subject: 'Question about course schedule',
      category: 'courses',
      status: 'resolved',
      priority: 'low',
      date: 'Jan 15, 2026',
      lastUpdate: '4 days ago'
    }
  ]

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory)

  // Pagination for Tickets
  const ticketsTotalPages = Math.ceil(tickets.length / itemsPerPage)
  const ticketsStartIndex = (ticketsPage - 1) * itemsPerPage
  const paginatedTickets = tickets.slice(ticketsStartIndex, ticketsStartIndex + itemsPerPage)

  // Pagination for FAQs
  const faqsTotalPages = Math.ceil(filteredFaqs.length / itemsPerPage)
  const faqsStartIndex = (faqsPage - 1) * itemsPerPage
  const paginatedFaqs = filteredFaqs.slice(faqsStartIndex, faqsStartIndex + itemsPerPage)

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return '#dc3545'
      case 'in-progress':
        return '#ffc107'
      case 'resolved':
        return '#28a745'
      default:
        return '#1e3a8a'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-900">Support & Help</h2>
        <p className="text-gray-500 text-sm mt-1">Get help and support for your queries</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-900">
          <h3 className="text-xl font-bold mb-2 text-blue-900">Call Us</h3>
          <p className="text-gray-700 mb-3">+91 779 501 0900</p>
          <p className="text-sm text-gray-600">Mon - Sat, 9 AM - 6 PM IST</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-400">
          <h3 className="text-xl font-bold mb-2 text-yellow-500">Email Us</h3>
          <p className="text-gray-700 mb-3">icfyglobal@ixpoe.com</p>
          <p className="text-sm text-gray-600">We'll respond within 24 hours</p>
        </div>
      </div>

      {/* My Support Tickets */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6" style={{ color: '#1e3a8a' }}>My Support Tickets</h3>
        <div className="space-y-3">
          {paginatedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 rounded-lg border-l-4 hover:shadow-md transition-all"
              style={{
                backgroundColor: '#ffffff',
                borderLeftColor: getStatusColor(ticket.status)
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-gray-800">{ticket.subject}</h4>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: getStatusColor(ticket.status) }}
                    >
                      {ticket.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Ticket ID: {ticket.id}</p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>{ticket.date}</span>
                    <span>Updated: {ticket.lastUpdate}</span>
                    <span>Priority: {ticket.priority}</span>
                  </div>
                </div>
                <button
                  className="px-4 py-2 rounded-lg font-semibold transition-all border-2"
                  style={{
                    borderColor: '#1e3a8a',
                    color: '#1e3a8a',
                    backgroundColor: 'transparent'
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination for Tickets */}
        {ticketsTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setTicketsPage(prev => Math.max(prev - 1, 1))}
              disabled={ticketsPage === 1}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: ticketsPage === 1 ? '#e0e0e0' : '#1e3a8a',
                color: ticketsPage === 1 ? '#666' : 'white'
              }}
            >
              Previous
            </button>
            {[...Array(ticketsTotalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setTicketsPage(index + 1)}
                className="px-4 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: ticketsPage === index + 1 ? '#1e3a8a' : 'white',
                  color: ticketsPage === index + 1 ? 'white' : '#1e3a8a',
                  border: '2px solid #1e3a8a'
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setTicketsPage(prev => Math.min(prev + 1, ticketsTotalPages))}
              disabled={ticketsPage === ticketsTotalPages}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: ticketsPage === ticketsTotalPages ? '#e0e0e0' : '#1e3a8a',
                color: ticketsPage === ticketsTotalPages ? '#666' : 'white'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6" style={{ color: '#1e3a8a' }}>❓ Frequently Asked Questions</h3>
        
        {/* FAQ Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedCategory === 'all' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: selectedCategory === 'all' ? '#1e3a8a' : 'transparent', border: '2px solid #1e3a8a' }}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory('account')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedCategory === 'account' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: selectedCategory === 'account' ? '#f59e0b' : 'transparent', border: '2px solid #f59e0b' }}
          >
            Account
          </button>
          <button
            onClick={() => setSelectedCategory('courses')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedCategory === 'courses' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: selectedCategory === 'courses' ? '#28a745' : 'transparent', border: '2px solid #28a745' }}
          >
            Courses
          </button>
          <button
            onClick={() => setSelectedCategory('assignments')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedCategory === 'assignments' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: selectedCategory === 'assignments' ? '#ffc107' : 'transparent', border: '2px solid #ffc107' }}
          >
            Assignments
          </button>
          <button
            onClick={() => setSelectedCategory('technical')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedCategory === 'technical' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: selectedCategory === 'technical' ? '#dc3545' : 'transparent', border: '2px solid #dc3545' }}
          >
            Technical
          </button>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {paginatedFaqs.map((faq, index) => (
            <details
              key={index}
              className="p-4 rounded-lg cursor-pointer hover:shadow-md transition-all"
              style={{ backgroundColor: '#ffffff' }}
            >
              <summary className="font-bold text-gray-800 cursor-pointer">
                {faq.question}
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>

        {/* Pagination for FAQs */}
        {faqsTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFaqsPage(prev => Math.max(prev - 1, 1))}
              disabled={faqsPage === 1}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: faqsPage === 1 ? '#e0e0e0' : '#1e3a8a',
                color: faqsPage === 1 ? '#666' : 'white'
              }}
            >
              Previous
            </button>
            {[...Array(faqsTotalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setFaqsPage(index + 1)}
                className="px-4 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: faqsPage === index + 1 ? '#1e3a8a' : 'white',
                  color: faqsPage === index + 1 ? 'white' : '#1e3a8a',
                  border: '2px solid #1e3a8a'
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setFaqsPage(prev => Math.min(prev + 1, faqsTotalPages))}
              disabled={faqsPage === faqsTotalPages}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: faqsPage === faqsTotalPages ? '#e0e0e0' : '#1e3a8a',
                color: faqsPage === faqsTotalPages ? '#666' : 'white'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

     
    </div>
  )
}
