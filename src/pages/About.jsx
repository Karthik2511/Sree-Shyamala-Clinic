import Reveal from '../components/Reveal'

export default function About() {
  const credentials = [
    { title: 'Fellow of the American College of Cardiology (FACC)', year: '2012' },
    { title: 'Fellow of the Society for Cardiovascular Angiography and Interventions (FSCAI)', year: '2015' },
    { title: 'Fellow of the European Society of Cardiology (FESC)', year: '2018' },
    { title: 'Doctor of Medicine in Cardiology (DM)', year: '2000' }
  ]

  return (
    <div className="min-h-screen bg-white pt-24">
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-gray-900 mb-4">About the Clinic & Specialists</h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Read about our medical staff, advanced training, and clinical philosophy.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-serif text-gray-900">Dr. Syamala Cardiology Team</h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Our clinic brings over 20 years of clinical and interventional practice in cardiology. Led by senior specialists holding board-certifications and international fellowships, we treat complex conditions like coronary artery disease, arrhythmias, and cardiac failure.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              We focus on a personalized, patient-first approach to care. From our state-of-the-art diagnostic testing options to custom risk intervention planning, we are committed to keeping you active, healthy, and informed.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200 rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4 shadow-sm h-80">
            <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Certified Care</span>
            <h3 className="text-2xl font-bold text-gray-900 font-serif">Board-Certified Specialists</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Every staff doctor maintains standing credentials at premier national and international heart associations.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold font-serif text-gray-900 text-center">Fellowships & Qualifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {credentials.map((cred, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 flex justify-between items-center gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{cred.title}</h4>
                    <span className="text-xs text-gray-400">Accredited Member</span>
                  </div>
                  <span className="text-sm font-semibold text-[#DC2626] font-mono">{cred.year}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
