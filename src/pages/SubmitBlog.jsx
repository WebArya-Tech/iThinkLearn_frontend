import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import ErrorBoundary from '../component/ErrorBoundary'
import { SubmitBlogPage } from '../component/blog/SubmitBlogPage'

export default function SubmitBlog() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        <ErrorBoundary>
          <SubmitBlogPage />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
