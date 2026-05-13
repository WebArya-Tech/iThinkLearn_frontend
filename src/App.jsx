import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import TeachingMethodology from './pages/TeachingMethodology'
import OurTutors from './pages/OurTutors'
import Testimonials from './pages/Testimonials'
import Courses from './pages/Courses'
import Blogs from './pages/Blogs'
import BlogAll from './pages/BlogAll'
import BlogDetail from './pages/BlogDetail'
import SubmitBlog from './pages/SubmitBlog'
import Subscribe from './pages/Subscribe'
import ContactUs from './pages/ContactUs'
import RunningClasses from './pages/RunningClasses'
import Reviews from './pages/Reviews'
import WriteReview from './pages/WriteReview'
import FeePayment from './pages/FeePayment'
import OnlineClasses from './pages/OnlineClasses'
import HowAreDifferent from './pages/HowAreDifferent'
import TMUA from './pages/TMUA'
import ACT from './pages/ACT'
import GRE from './pages/GRE'
import GMAT from './pages/GMAT'
import AMC from './pages/AMC'
import IMO from './pages/IMO'
import AIME from './pages/AIME'
import Calculus from './pages/Calculus'
import Statistics from './pages/Statics'
import AdminDashboard from './component/admin-dashboard/AdminDashboard'
import StudentDashboard from './component/student-dashboard/StudentDashboard'
import { useAuth } from './context/AuthContext'

function ProtectedAdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth()
  if (!isAuthenticated || !isAdmin) return <Navigate to="/" replace />
  return <AdminDashboard />
}

function ProtectedStudentRoute() {
  const { isAuthenticated, isAdmin } = useAuth()
  if (!isAuthenticated) return <Navigate to="/" replace />
  if (isAdmin) return <Navigate to="/admin-dashboard" replace />
  return <StudentDashboard />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/teaching-methodology" element={<TeachingMethodology />} />
        <Route path="/our-tutors" element={<OurTutors />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/write-review" element={<WriteReview />} />
        <Route path="/fee-payment" element={<FeePayment />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/all" element={<BlogAll />} />
        <Route path="/blogs/submit" element={<SubmitBlog />} />
        <Route path="/blogs/subscribe" element={<Subscribe />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/submit" element={<Navigate to="/blogs/submit" replace />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/running-classes" element={<RunningClasses />} />
        <Route path="/online-classes" element={<OnlineClasses />} />
        <Route path="/how-are-we-different" element={<HowAreDifferent />} />
        <Route path="/tmua" element={<TMUA />} />
        <Route path="/act" element={<ACT />} />
        <Route path="/gre" element={<GRE />} />
        <Route path="/gmat" element={<GMAT />} />
        <Route path="/amc" element={<AMC />} />
        <Route path="/imo" element={<IMO />} />
        <Route path="/aime" element={<AIME />} />
        <Route path="/calculus" element={<Calculus />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/admin-dashboard" element={<ProtectedAdminRoute />} />
        <Route path="/admin-dashboard/:section" element={<ProtectedAdminRoute />} />
        <Route path="/student-dashboard" element={<ProtectedStudentRoute />} />
        <Route path="/student-dashboard/:section" element={<ProtectedStudentRoute />} />
      </Routes>
    </Router>
  )
}
export default App
