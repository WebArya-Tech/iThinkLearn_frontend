import React from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AdminSidebar({ currentView, setCurrentView, sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth()

  const menuItems = [
    { id: 'home',           label: 'Dashboard'       },
    { id: 'students',       label: 'Students'         },
    { id: 'courses',        label: 'Courses'          },
    { id: 'running-classes',label: 'Running Classes'  },
    { id: 'fee-payment',    label: 'Fee Payments'     },
    { id: 'demo-requests',  label: 'Demo Requests'    },
    { id: 'homework',       label: 'Homework'         },
    { id: 'practice-tests', label: 'Practice Tests'   },
    { id: 'questions',      label: 'Q&A Management'   },
    { id: 'announcements',  label: 'Announcements'    },
    { id: 'notifications',  label: 'Notifications'    },
    { id: 'feedback',       label: 'Feedback'         },
    { id: 'testimonials',   label: 'Testimonials'     },
    { id: 'tutors',         label: 'Tutors'           },
    { id: 'reviews',        label: 'Reviews'          },
    { id: 'blog',           label: 'Blog'             },
    { id: 'profile',        label: 'Profile'          },
  ]

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }

  const handleItemClick = (id) => {
    setCurrentView(id)
    if (window.innerWidth < 1024) setSidebarOpen(false)
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
        className={`fixed left-0 top-18 h-[calc(100vh-72px)] w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden px-5 py-2 flex justify-end border-b border-gray-100">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition"
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

        {/* Logout Button */}
        <div className="px-5 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition text-sm"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
