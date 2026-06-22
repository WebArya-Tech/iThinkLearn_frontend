import React, { useMemo, useState, useEffect } from 'react'
import { Copy, Download, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { demoApi } from '../../api/demoApi'

const OFFICIAL_EMAIL = 'ithinklearn@ixpoe.com'
const OFFICIAL_WHATSAPP = '918197466607'

const DEFAULT_GRADES = [
  { name: '1-5', displayName: '1-5' },
  { name: '6-8', displayName: '6-8' },
  { name: '9-10', displayName: '9-10' },
  { name: '11-12', displayName: '11-12' },
  { name: 'Other', displayName: 'Other' }
]
const DEFAULT_BOARDS = [
  { name: 'IGCSE', displayName: 'IGCSE' },
  { name: 'CBSE', displayName: 'CBSE' },
  { name: 'State Board', displayName: 'State Board' },
  { name: 'ICSE', displayName: 'ICSE' },
  { name: 'Others', displayName: 'Others' }
]

export default function DemoRequestsManagement() {
  const loadRequests = () => {
    const requests = JSON.parse(localStorage.getItem('runningClassDemoRequests') || '[]')
    return requests.toReversed ? requests.toReversed() : [...requests].reverse()
  }

  const [demoRequests, setDemoRequests] = useState(loadRequests)
  const [apiRequests, setApiRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [gradeMap, setGradeMap] = useState({})
  const [boardMap, setBoardMap] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Build grade/board lookup maps from API
  const fetchGradeBoardMaps = async () => {
    try {
      const [gradeRes, boardRes] = await Promise.all([
        demoApi.getAdminGrades(),
        demoApi.getAdminBoards()
      ])
      const grades = Array.isArray(gradeRes?.data) ? gradeRes.data : Array.isArray(gradeRes) ? gradeRes : gradeRes?.grades || []
      const boards = Array.isArray(boardRes?.data) ? boardRes.data : Array.isArray(boardRes) ? boardRes : boardRes?.boards || []
      const gMap = {}
      for (const g of grades) {
        const key = g.id || g._id
        if (key) gMap[key] = g.displayName || g.name || g.title
      }
      const bMap = {}
      for (const b of boards) {
        const key = b.id || b._id
        if (key) bMap[key] = b.displayName || b.name || b.title
      }
      setGradeMap(gMap)
      setBoardMap(bMap)
    } catch (_) {
      // Fallback: try public endpoints
      try {
        const [gRes, bRes] = await Promise.all([
          demoApi.getGrades(),
          demoApi.getBoards()
        ])
        const grades = Array.isArray(gRes?.data) ? gRes.data : Array.isArray(gRes) ? gRes : []
        const boards = Array.isArray(bRes?.data) ? bRes.data : Array.isArray(bRes) ? bRes : []
        const gMap = {}
        for (const g of grades) {
          const key = g.id || g._id
          if (key) gMap[key] = g.displayName || g.name || g.title
        }
        const bMap = {}
        for (const b of boards) {
          const key = b.id || b._id
          if (key) bMap[key] = b.displayName || b.name || b.title
        }
        if (Object.keys(gMap).length) setGradeMap(gMap)
        if (Object.keys(bMap).length) setBoardMap(bMap)
      } catch (_2) {}
    }
  }

  const extractValue = (obj, ...fields) => {
    for (const f of fields) {
      const v = obj[f]
      if (v != null) {
        if (typeof v === 'object') return v.displayName || v.name || ''
        return String(v)
      }
    }
    return ''
  }

  const resolveGrade = (val) => {
    if (!val) return ''
    if (typeof val === 'object') return val.displayName || val.name || ''
    if (gradeMap[val]) return gradeMap[val]
    const fallback = DEFAULT_GRADES.find(g => g.name === val || g.displayName === val)
    if (fallback) return fallback.displayName
    // For unresolved ObjectIds return 'N/A'
    if (/^[a-fA-F0-9]{24}$/.test(val)) return 'N/A'
    return val
  }

  const resolveBoard = (val) => {
    if (!val) return ''
    if (typeof val === 'object') return val.displayName || val.name || ''
    if (boardMap[val]) return boardMap[val]
    const fallback = DEFAULT_BOARDS.find(b => b.name === val || b.displayName === val)
    if (fallback) return fallback.displayName
    if (/^[a-fA-F0-9]{24}$/.test(val)) return 'N/A'
    return val
  }

  // Load from API on mount
  const fetchFromApi = async () => {
    setLoading(true)
    try {
      const res = await demoApi.getAdminSchedules()
      const data = res?.data || res
      if (Array.isArray(data)) {
        setApiRequests(data)
      }
    } catch (_) {
      // API fails silently, use localStorage
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchFromApi(); fetchGradeBoardMaps() }, [])

  // Live-refresh when a new demo request is submitted (same tab via dispatchEvent)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'runningClassDemoRequests') {
        setDemoRequests(loadRequests())
      }
    }
    const handleCustom = () => {
      setDemoRequests(loadRequests())
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener('demoRequestUpdated', handleCustom)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('demoRequestUpdated', handleCustom)
    }
  }, [])

  // Merge API and localStorage requests
  const allRequests = useMemo(() => {
    const localWithSource = demoRequests.map(r => ({ ...r, source: 'local' }))
    const apiWithSource = apiRequests.map(r => ({
      id: r.id || r.demoNumber,
      demoNumber: r.demoNumber || r.id,
      studentName: r.studentName || r.student_name || '',
      parentName: r.parentName || r.parent_name || '',
      grade: resolveGrade(extractValue(r, 'grade', 'gradeId')),
      board: resolveBoard(extractValue(r, 'board', 'boardId')),
      email: r.email || r.emailId || '',
      phone: r.phone || r.phoneNumber || r.mobileNumber || '',
      preferredDate: r.preferredDate || r.preferred_date || '',
      preferredTime: r.preferredTime || r.preferred_time || '',
      message: r.message || '',
      requestDate: r.requestDate || r.requestedOn || r.createdAt || new Date().toISOString(),
      status: r.status || 'Pending',
      source: 'api'
    }))

    // Merge: API data first, then local (local overrides for same IDs)
    const merged = [...apiWithSource]
    const existingIds = new Set(merged.map(r => r.id))
    for (const local of localWithSource) {
      if (existingIds.has(local.id)) {
        const idx = merged.findIndex(r => r.id === local.id)
        if (idx >= 0) merged[idx] = { ...merged[idx], ...local }
      } else {
        merged.push(local)
      }
    }
    return merged
  }, [demoRequests, apiRequests])

  // Filter requests
  const filteredRequests = useMemo(() => {
    let filtered = allRequests
    if (statusFilter !== 'All') {
      filtered = filtered.filter(r => r.status === statusFilter)
    }
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone?.includes(searchTerm) ||
        r.parentName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return filtered
  }, [allRequests, statusFilter, searchTerm])

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredRequests.slice(start, start + itemsPerPage)
  }, [filteredRequests, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1) }, [searchTerm, statusFilter])

  const updateRequestStatus = async (id, newStatus) => {
    const req = allRequests.find(r => r.id === id)
    if (req?.source === 'api') {
      try {
        if (newStatus === 'Approved' || newStatus === 'Scheduled') {
          await demoApi.approveSchedule(id)
        } else if (newStatus === 'Cancelled') {
          await demoApi.cancelSchedule(id)
        }
        toast.success(`Status updated to ${newStatus}`)
        fetchFromApi()
        return
      } catch (_) {
        toast.error('Failed to update via API, falling back to local storage')
      }
    }
    // Fallback to localStorage
    const all = JSON.parse(localStorage.getItem('runningClassDemoRequests') || '[]')
    const updatedAll = all.map(r => r.id === id ? { ...r, status: newStatus } : r)
    localStorage.setItem('runningClassDemoRequests', JSON.stringify(updatedAll))
    setDemoRequests(loadRequests())
    toast.success(`Status updated to ${newStatus}`)
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const downloadAsCSV = () => {
    if (filteredRequests.length === 0) {
      toast.error('No data to download')
      return
    }

    const headers = ['Demo Number', 'Student Name', 'Parent Name', 'Grade', 'Board', 'Email', 'Phone', 'Preferred Date', 'Preferred Time', 'Status', 'Request Date']
    const csvContent = [
      headers.join(','),
      ...filteredRequests.map(r => [
        r.demoNumber,
        r.studentName,
        r.parentName,
        r.grade,
        r.board,
        r.email,
        r.phone,
        r.preferredDate,
        r.preferredTime,
        r.status,
        new Date(r.requestDate).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `demo-requests-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success('CSV downloaded successfully')
  }

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Contacted': return 'bg-blue-100 text-blue-800'
      case 'Scheduled': return 'bg-purple-100 text-purple-800'
      case 'Completed': return 'bg-gray-100 text-gray-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="px-3 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col max-w-7xl  mx-auto sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Demo Requests</h2>
          <p className="text-gray-600 text-sm mt-1">Manage all free demo scheduling requests</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchFromApi} disabled={loading}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-semibold disabled:opacity-50">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={downloadAsCSV}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Contacted">Contacted</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div className="text-sm text-gray-600 py-2.5">
          {filteredRequests.length} request(s) found
        </div>
      </div>

      {/* Table - Desktop View */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-lg border border-gray-200">
        {filteredRequests.length === 0 ? (
          <div className="  text-gray-500">
            <p className="text-lg font-semibold">No demo requests found</p>
            <p className="text-sm">Requests will appear here when students schedule demos</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Student</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Parent</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Grade / Board</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Date & Time</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-semibold text-gray-900">{request.studentName}</td>
                  <td className="px-4 py-3 text-gray-700">{request.parentName}</td>
                  <td className="px-4 py-3 text-gray-700 text-xs">{request.email}</td>
                  <td className="px-4 py-3 text-gray-700">{request.phone}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{request.grade} / {request.board}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{request.preferredDate}<br />{request.preferredTime}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button onClick={() => { setSelectedRequest(request); setShowDetails(true); }}
                        className="px-2.5 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition">
                        View
                      </button>
                      <button onClick={() => updateRequestStatus(request.id, 'Approved')}
                        className="px-2.5 py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition">
                        Approve
                      </button>
                      <button onClick={() => updateRequestStatus(request.id, 'Cancelled')}
                        className="px-2.5 py-1.5 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition">
                        Decline
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="p-6 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
            <p className="text-lg font-semibold">No demo requests found</p>
            <p className="text-sm">Requests will appear here when students schedule demos</p>
          </div>
        ) : (
          paginatedRequests.map((request) => (
            <div key={request.id} className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{request.studentName}</p>
                  <p className="text-xs text-gray-500">{request.parentName}</p>
                </div>
                <span className={`shrink-0 px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(request.status)}`}>
                  {request.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Email</p>
                  <p className="text-xs text-gray-900 break-all">{request.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Phone</p>
                  <p className="text-xs text-gray-900">{request.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Grade / Board</p>
                  <p className="text-xs text-gray-900">{request.grade} / {request.board}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Date & Time</p>
                  <p className="text-xs text-gray-900">{request.preferredDate}<br />{request.preferredTime}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => { setSelectedRequest(request); setShowDetails(true); }}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition">
                  View
                </button>
                <button onClick={() => updateRequestStatus(request.id, 'Approved')}
                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-green-700 transition">
                  Approve
                </button>
                <button onClick={() => updateRequestStatus(request.id, 'Cancelled')}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-red-700 transition">
                  Decline
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredRequests.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1}&ndash;{Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm font-semibold rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((p, idx, arr) => (
                <React.Fragment key={p}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-gray-400">...</span>}
                  <button
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-1.5 text-sm font-semibold rounded border transition ${
                      p === currentPage
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm font-semibold rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-start sticky top-0 bg-white">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Demo Request Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Demo Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Demo Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Demo Number</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-blue-600">{selectedRequest.demoNumber}</p>
                      <button
                        onClick={() => copyToClipboard(selectedRequest.demoNumber, 'Demo Number')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-semibold">{selectedRequest.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Request Date</p>
                    <p className="font-semibold">{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Request Time</p>
                    <p className="font-semibold">{new Date(selectedRequest.requestDate).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Student Name</p>
                    <p className="font-semibold">{selectedRequest.studentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Parent Name</p>
                    <p className="font-semibold">{selectedRequest.parentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Grade</p>
                    <p className="font-semibold">{selectedRequest.grade}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Board</p>
                    <p className="font-semibold">{selectedRequest.board}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Email</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a href={`mailto:${selectedRequest.email}`} className="font-semibold text-blue-600 hover:underline break-all">
                        {selectedRequest.email}
                      </a>
                      <button
                        onClick={() => copyToClipboard(selectedRequest.email, 'Email')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone Number</p>
                    <div className="flex items-center gap-2">
                      <a href={`tel:${selectedRequest.phone}`} className="font-semibold text-blue-600 hover:underline">
                        {selectedRequest.phone}
                      </a>
                      <button
                        onClick={() => copyToClipboard(selectedRequest.phone, 'Phone')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Demo Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Preferred Date</p>
                    <p className="font-semibold">{selectedRequest.preferredDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Preferred Time</p>
                    <p className="font-semibold">{selectedRequest.preferredTime}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedRequest.message && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Additional Message</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-wrap">{selectedRequest.message}</p>
                </div>
              )}

             
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
