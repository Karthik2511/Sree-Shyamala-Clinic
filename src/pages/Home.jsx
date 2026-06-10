import { Link } from 'react-router-dom'
import { Heart, HeartPulse, Zap, Pill, BarChart3, Stethoscope, ShieldAlert } from 'lucide-react'
import Reveal from '../components/Reveal'

export default function Home({ onAppointmentClick }) {
  const stats = [
    { value: '20+', label: 'Years of Expertise' },
    { value: '15K+', label: 'Happy Patients' },
    { value: '8K+', label: 'Successful Procedures' },
    { value: '5+', label: 'Professional Fellowships' }
  ]

  const services = [
    {
      icon: HeartPulse,
      title: 'Interventional Cardiology',
      desc: 'Catheter-based therapies, coronary angioplasty, stenting, and structural heart care.'
    },
    {
      icon: Zap,
      title: 'Electrophysiology',
      desc: 'Expert diagnostic evaluation of cardiac rhythm disorders and pacemaker management.'
    },
    {
      icon: Pill,
      title: 'Heart Failure Program',
      desc: 'Comprehensive protocols, medication plans, and wellness tracking for cardiac health.'
    },
    {
      icon: BarChart3,
      title: 'Diagnostics & Imaging',
      desc: 'On-site advanced ECGs, 2D Echocardiograms, and cardiovascular stress assessments.'
    },
    {
      icon: Stethoscope,
      title: 'Preventative Screening',
      desc: 'Detailed risk profile analyses to detect, reverse, or prevent heart conditions early.'
    },
    {
      icon: ShieldAlert,
      title: 'Emergency Consultations',
      desc: 'Rapid diagnostic triages and priority treatment routing for critical cardiovascular issues.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full min-h-[600px] flex items-center bg-[#0F172A] text-white pt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EF4444_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block text-sm font-semibold tracking-wider text-red-400 uppercase bg-red-500/10 px-3 py-1 rounded-full">
              Syamala Cardiology Clinic
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold font-serif leading-tight">
              Compassionate Care for a Healthier Heart
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-xl">
              Partnering with you to deliver advanced diagnostics, preventative cardiovascular counsel, and state-of-the-art interventional procedures.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onAppointmentClick} 
                className="px-8 py-3.5 bg-[#DC2626] text-white rounded-full font-semibold hover:bg-red-700 hover:shadow-lg transition hover:scale-[1.03]"
              >
                Book Appointment
              </button>
              <Link 
                to="/services" 
                className="px-8 py-3.5 border border-gray-400 text-white rounded-full font-semibold hover:bg-white/10 transition"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative">
            <div className="w-96 h-96 bg-gradient-to-br from-[#DC2626]/20 to-red-950/40 rounded-3xl border border-red-500/20 p-8 flex flex-col justify-between shadow-2xl relative">
              <Heart className="w-12 h-12 text-[#DC2626] animate-pulse" />
              <div className="space-y-2">
                <span className="text-xs text-red-400 uppercase tracking-widest block font-bold">Live Pulse Monitor</span>
                <span className="text-5xl font-bold font-mono">72 <span className="text-lg text-gray-400 font-sans">BPM</span></span>
              </div>
              <div className="h-20 w-full flex items-end gap-1.5 pt-4">
                {[40, 20, 80, 50, 90, 30, 70, 40, 60, 30, 85, 45].map((h, i) => (
                  <div 
                    key={i} 
                    style={{ height: `${h}%` }} 
                    className="flex-1 bg-gradient-to-t from-red-800 to-red-500 rounded-t"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="py-16 px-4 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-[#DC2626] font-serif mb-2">{stat.value}</div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-5xl font-bold font-serif text-gray-900">
                Advanced Cardiovascular Services
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg">
                Delivering complete diagnostic evaluations, active treatments, and structured wellness oversight for optimal heart health.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon
                return (
                  <div 
                    key={idx} 
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#DC2626] hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-red-50 text-[#DC2626] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#DC2626] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-gradient-to-r from-[#DC2626] to-[#991B1B] text-white py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold font-serif">Schedule Your Consultation Today</h2>
            <p className="text-red-100 text-lg">
              Take the first step towards securing your cardiovascular health with state-of-the-art assessments.
            </p>
            <button 
              onClick={onAppointmentClick} 
              className="px-8 py-3.5 bg-white text-[#DC2626] font-bold rounded-full hover:shadow-xl transition hover:scale-[1.03]"
            >
              Book An Appointment Online
            </button>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
