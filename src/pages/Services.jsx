import { HeartPulse, Zap, Pill, BarChart3, Stethoscope, ShieldAlert } from 'lucide-react'
import Reveal from '../components/Reveal'

export default function Services() {
  const serviceList = [
    {
      icon: HeartPulse,
      title: 'Coronary Angioplasty & Stenting',
      desc: 'Minimally invasive catheter treatment to restore blood flow in blocked arteries, optimizing cardiac supply lines.'
    },
    {
      icon: Zap,
      title: 'Cardiac Rhythm Management',
      desc: 'Expert pacing system implantation and device monitoring for heart blocks, bradycardia, or irregular arrhythmias.'
    },
    {
      icon: Pill,
      title: 'Heart Failure Care Optimization',
      desc: 'Structured medical management and follow-up tracking to manage cardiac function, breathing issues, and overall quality of life.'
    },
    {
      icon: BarChart3,
      title: 'Echocardiograms & ECG Diagnostics',
      desc: 'Non-invasive sound-wave mapping and electrical readings to review chambers, muscle walls, valves, and flow metrics.'
    },
    {
      icon: Stethoscope,
      title: 'Hyperlipidemia & Hypertension Controls',
      desc: 'Comprehensive protocols to manage high blood pressure and cholesterol profiles, avoiding long-term risk indicators.'
    },
    {
      icon: ShieldAlert,
      title: 'Cardiovascular Risk Mitigation',
      desc: 'Proactive guidance on nutrition, fitness, stress reduction, and preventative habits for patients with genetic risks.'
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Banner */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-gray-900 mb-4">Cardiology Solutions</h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Explore our advanced cardiovascular testing and intervention capabilities.
          </p>
        </div>
      </section>

      {/* Grid */}
      <Reveal>
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceList.map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-red-50 text-[#DC2626] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              )
            })}
          </div>
        </section>
      </Reveal>
    </div>
  )
}
