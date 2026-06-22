import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { studentMenuItems } from '../../config/dashboardModules'

export default function StudentSidebar({ currentView, setCurrentView, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const menuItems = studentMenuItems

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('icfy_token')
      localStorage.removeItem('icfy_role')
      localStorage.removeItem('icfy_user')
      logout()
      navigate('/')
    }
  }
  const handleItemClick = (id) => {
    setCurrentView(id)
    // Close sidebar on mobile after selecting
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }
  return (
    <>
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 px-5 py-4 flex items-center justify-between shrink-0">
          <div>
            <p className="text-white font-bold text-base">iThinkLearn</p>
            <p className="text-blue-300 text-xs">Student Portal</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/70 hover:text-white transition lg:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full text-left px-5 py-3 text-sm transition-all border-l-4 ${
                currentView === item.id
                  ? 'bg-white text-blue-900 font-semibold border-yellow-400'
                  : 'text-gray-600 hover:bg-white hover:text-blue-900 border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        {/* Logout */}
        <div className="px-4 py-4 border-t border-gray-200 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-lg text-white text-sm font-semibold bg-blue-900 hover:bg-blue-800 transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}