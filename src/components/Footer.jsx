import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer({ onAppointmentClick }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#0b0908] text-white pt-12 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pt-4">
          <div className="md:pr-2">
            <h3 className="text-lg font-bold text-[#f1cf9c] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Syamala Clinic
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-4">
              Dedicated to providing quality cardiology care with modern diagnostics and personalized treatments since 2004.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4 font-semibold">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-gray-400 hover:text-[#f1cf9c] transition text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4 font-semibold">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+919999999999" className="flex items-center space-x-3 text-gray-400 hover:text-[#f1cf9c] transition text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 99999 99999</span>
              </a>
              <a href="mailto:contact@clinicname.com" className="flex items-center space-x-3 text-gray-400 hover:text-[#f1cf9c] transition text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <span>contact@clinicname.com</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>clinic city, State, Country</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-400 text-sm">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Mon-Sat: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4 font-semibold">Quick Booking</h4>
            <p className="text-gray-400 text-sm mb-4">
              Schedule your cardiology consultation online in less than a minute.
            </p>
            <button
              onClick={onAppointmentClick}
              className="w-full bg-gradient-to-r from-[#DC2626] to-[#991B1B] text-white py-3 rounded-full font-semibold hover:shadow-premium transition text-sm"
            >
              Book Now
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs text-center md:text-left">
              &copy; {currentYear} Syamala Clinic. All rights reserved. Built for showcase purposes.
            </p>
            <div className="flex items-center gap-6 text-gray-500 text-xs">
              <a href="#" className="hover:text-[#f1cf9c] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[#f1cf9c] transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
