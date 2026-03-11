import React from 'react'
import { Toaster } from 'react-hot-toast'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { SubmitBlogPage } from '../component/blog/SubmitBlogPage'

export default function SubmitBlog() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        <SubmitBlogPage />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}
