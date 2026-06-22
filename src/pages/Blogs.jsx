import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { HomePage } from '../component/blog/HomePage'

export default function Blogs() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}
