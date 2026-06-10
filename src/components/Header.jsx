import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart } from 'lucide-react'

export default function Header({ onAppointmentClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <header className={`fixed w-full top-0 z-50 bg-white border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'shadow-[0_8px_24px_rgba(0,0,0,0.08)]' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-transform duration-300 hover:scale-[1.02]">
            <div className="p-2 bg-red-100 rounded-full text-[#DC2626]">
              <Heart className="h-6 w-6 fill-[#DC2626]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Syamala Clinic
              </h1>
              <p className="text-xs text-[#EF4444] font-semibold">Cardiology Care</p>
            </div>
          </Link>

          <nav className="hidden lg:flex space-x-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `px-4 py-2 font-medium transition-all duration-300 text-sm rounded-full ${isActive ? 'text-[#DC2626] bg-[#FFF5F5] ring-1 ring-red-100' : 'text-gray-700 hover:text-[#DC2626] hover:bg-gray-50'}`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onAppointmentClick}
              className="bg-gradient-to-r from-[#DC2626] to-[#991B1B] text-white px-8 py-3 rounded-full hover:shadow-lg font-semibold transition duration-300 text-sm hover:scale-[1.03]"
            >
              Book Appointment
            </button>
          </div>

          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 animate-fade-in-up">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `mx-2 px-4 py-3 font-medium text-sm rounded-xl transition-all duration-300 ${isActive ? 'bg-red-50 text-[#DC2626]' : 'text-gray-700 hover:text-[#DC2626] hover:bg-gray-50'}`}
                >
                  {item.name}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  onAppointmentClick()
                }}
                className="bg-gradient-to-r from-[#DC2626] to-[#991B1B] text-white px-4 py-3 rounded-full font-semibold mx-4 mt-2 text-sm"
              >
                Book Appointment
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
