import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { BlogDetailPage } from '../component/blog/BlogDetailPage'

export default function BlogDetail() {
  return (
    <div>
      <Header />
      <main>
        <BlogDetailPage />
      </main>
      <Footer />
    </div>
  )
}
