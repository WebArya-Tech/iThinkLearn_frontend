import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl mb-4">!</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-500 mb-4">An error occurred while rendering this page.</p>
          <pre className="text-left bg-gray-100 p-4 rounded-lg text-sm text-red-600 overflow-auto max-h-40 mb-6">
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload() }}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
