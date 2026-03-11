import React from 'react'
import { Toaster } from 'react-hot-toast'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { SubscribePage } from '../component/blog/SubscribePage'

export default function Subscribe() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        <SubscribePage />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}
