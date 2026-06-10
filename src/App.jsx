import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AppointmentModal from './components/AppointmentModal'

// Showcase Pages (Mocked / Simplified for Portfolio)
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'

function App() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {isLoading && (
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="animate-pulse text-cardiac-600 font-semibold text-lg">Loading...</div>
          </div>
        )}
        <ScrollToTop />
        <Header onAppointmentClick={() => setShowAppointmentModal(true)} />
        
        <main className="flex-grow animate-fade-in-up">
          <Routes>
            <Route path="/" element={<Home onAppointmentClick={() => setShowAppointmentModal(true)} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer onAppointmentClick={() => setShowAppointmentModal(true)} />

        {showAppointmentModal && (
          <AppointmentModal onClose={() => setShowAppointmentModal(false)} />
        )}
      </div>
    </Router>
  )
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}

export default App
