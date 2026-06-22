import React, { useEffect, useState } from 'react'
import Pagination from '../ui/Pagination'

const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    type: 'assignment',
    title: 'New Assignment Posted',
    message: 'Calculus Problem Set 3 has been posted. Due date: Jan 25, 2026',
    createdAt: '2026-01-20T10:00:00Z',
    status: 'sent'
  },
  {
    id: 2,
    type: 'announcement',
    title: 'Important Announcement',
    message: 'Physics Midterm exam scheduled for Jan 28, 2026 at 2:00 PM',
    createdAt: '2026-01-19T10:00:00Z',
    status: 'sent'
  }
]

const getReadMap = () => {
  try {
    return JSON.parse(localStorage.getItem('icfy_notification_reads') || '{}')
  } catch {
    return {}
  }
}

const saveReadMap = (readMap) => {
  localStorage.setItem('icfy_notification_reads', JSON.stringify(readMap))
}

const formatTime = (dateValue) => {
  if (!dateValue) return 'Recent'
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return 'Recent'
  return date.toLocaleString('en-IN')
}

const loadNotifications = () => {
  const readMap = getReadMap()
  let source = DEFAULT_NOTIFICATIONS

  try {
    const saved = JSON.parse(localStorage.getItem('icfy_notifications') || 'null')
    if (saved && saved.length > 0) source = saved
  } catch {
    source = DEFAULT_NOTIFICATIONS
  }

  return source
    .filter(notification => notification.status === 'sent')
    .map(notification => ({
      ...notification,
      time: formatTime(notification.sentAt || notification.createdAt),
      color: getTypeColor(notification.type),
      read: Boolean(readMap[notification.id])
    }))
}

const getTypeColor = (type) => {
  switch (type) {
    case 'assignment': return '#1e3a8a'
    case 'reminder': return '#f59e0b'
    case 'announcement': return '#dc3545'
    case 'class': return '#1e3a8a'
    default: return '#28a745'
  }
}

export default function Notifications() {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [notifications, setNotifications] = useState(loadNotifications)
  const itemsPerPage = 100

  useEffect(() => {
    const refresh = () => setNotifications(loadNotifications())

    window.addEventListener('storage', refresh)
    window.addEventListener('icfy_notifications_updated', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('icfy_notifications_updated', refresh)
    }
  }, [])

  const filteredNotifications = filter === 'all'
    ? notifications
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter)

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    const readMap = { ...getReadMap(), [id]: true }
    saveReadMap(readMap)
    setNotifications(loadNotifications())
  }

  const markAllAsRead = () => {
    const readMap = notifications.reduce((acc, notification) => {
      acc[notification.id] = true
      return acc
    }, getReadMap())
    saveReadMap(readMap)
    setNotifications(loadNotifications())
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Notifications</h2>
          <p className="text-gray-500 text-sm">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="px-6 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition-all bg-blue-900 text-white"
        >
          Mark All as Read
        </button>
      </div>

      <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl shadow-md">
        {[
          ['all', `All (${notifications.length})`],
          ['unread', `Unread (${unreadCount})`],
          ['assignment', 'Assignments'],
          ['reminder', 'Reminders'],
          ['announcement', 'Announcements']
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setFilter(key)
              setCurrentPage(1)
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              filter === key ? 'text-white shadow-md' : 'text-gray-700 hover:bg-white'
            }`}
            style={{ backgroundColor: filter === key ? (key === 'unread' ? '#dc3545' : '#1e3a8a') : 'transparent' }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {paginatedNotifications.length > 0 ? (
          paginatedNotifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4"
              style={{
                borderLeftColor: !notification.read ? notification.color : '#e0e0e0',
                backgroundColor: 'white'
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1" style={{ color: '#1e3a8a' }}>
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-3 px-2 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#dc3545' }}>
                            NEW
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-700 mb-2">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold transition-all border-2"
                      style={{ borderColor: notification.color, color: notification.color, backgroundColor: 'transparent' }}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#1e3a8a' }}>
              No Notifications
            </h3>
            <p className="text-gray-600">You're all caught up! No notifications to show.</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredNotifications.length}
        itemsPerPage={itemsPerPage}
        alwaysShow={true}
      />
    </div>
  )
}
