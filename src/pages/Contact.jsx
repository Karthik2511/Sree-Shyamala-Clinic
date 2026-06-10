import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Reveal from '../components/Reveal'

export default function Contact() {
  const contactDetails = [
    { icon: Phone, label: 'Telephone Support', value: '+91 99999 99999', href: 'tel:+919999999999' },
    { icon: Mail, label: 'Email Correspondence', value: 'contact@clinicname.com', href: 'mailto:contact@clinicname.com' },
    { icon: MapPin, label: 'Clinic Location', value: 'Clinic City, State, Country', href: '#' },
    { icon: Clock, label: 'Consultation Hours', value: 'Mon - Sat: 9:00 AM - 5:00 PM', href: '#' }
  ]

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Banner */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-gray-900 mb-4">Contact Our Office</h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Reach out by telephone, email, or schedule an appointment online.
          </p>
        </div>
      </section>

      {/* Details */}
      <Reveal>
        <section className="py-20 px-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactDetails.map((detail, idx) => {
            const Icon = detail.icon
            return (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-red-50 text-[#DC2626] rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">{detail.label}</h4>
                  {detail.href !== '#' ? (
                    <a href={detail.href} className="text-base font-bold text-gray-900 hover:text-[#DC2626] transition">
                      {detail.value}
                    </a>
                  ) : (
                    <span className="text-base font-bold text-gray-900">{detail.value}</span>
                  )}
                </div>
              </div>
            )
          })}
        </section>
      </Reveal>
    </div>
  )
}
