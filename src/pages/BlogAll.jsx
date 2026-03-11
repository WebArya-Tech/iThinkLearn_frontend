import React from 'react'
import { Toaster } from 'react-hot-toast'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { BlogListPage } from '../component/blog/BlogListPage'

export default function BlogAll() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        <BlogListPage />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}
