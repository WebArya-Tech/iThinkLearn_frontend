import React from 'react'
import { Toaster } from 'react-hot-toast'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { BlogDetailPage } from '../component/blog/BlogDetailPage'

export default function BlogDetail() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        <BlogDetailPage />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}
