import { useEffect, useMemo, useState } from 'react'
import { X, Calendar, Clock, Users, Phone, Mail, FileText } from 'lucide-react'
import { format, addDays, isToday, isTomorrow } from 'date-fns'
import { submitBooking, fetchBookedSlots } from '../lib/bookingService'

export default function AppointmentModal({ onClose }) {
  const [step, setStep] = useState(1) // 1: Date & Time, 2: Patient Form, 3: Success Status
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    concern: '',
    referredBy: 'Self'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [bookedSlots, setBookedSlots] = useState([])
  const [loadingAvailability, setLoadingAvailability] = useState(true)

  // Calendar dates generation (next 30 days, skipping Sundays)
  const availableDates = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => addDays(new Date(), i))
      .filter(date => date.getDay() !== 0) // Skip Sundays
  }, [])

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

  useEffect(() => {
    let active = true
    async function loadAvailability() {
      try {
        const slots = await fetchBookedSlots()
        if (active) setBookedSlots(slots)
      } catch (err) {
        console.error('Failed to load slots:', err)
      } finally {
        if (active) setLoadingAvailability(false)
      }
    }
    loadAvailability()
    return () => { active = false }
  }, [])

  const bookedTimesForSelectedDate = useMemo(() => {
    if (!selectedDate) return new Set()
    const dateStr = format(selectedDate, 'yyyy-MM-dd')
    return new Set(
      bookedSlots
        .filter(s => s.preferredDateISO === dateStr)
        .map(s => s.preferredTime)
    )
  }, [bookedSlots, selectedDate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = (e) => {
    e.preventDefault()
    if (selectedDate && selectedTime) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const booking = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...formData,
        preferredDate: format(selectedDate, 'MMMM d, yyyy'),
        preferredDateISO: format(selectedDate, 'yyyy-MM-dd'),
        preferredTime: selectedTime,
      }

      await submitBooking(booking)
      setStep(3)
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (err) {
      setSubmitError('Failed to confirm your booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDateLabel = (date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'd MMM')
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#DC2626] to-[#991B1B] text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold font-serif">
            {step === 1 ? 'Select Appointment Slot' : step === 2 ? 'Provide Patient Info' : 'Success'}
          </h2>
          <button onClick={onClose} className="hover:bg-red-800/50 p-1.5 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="bg-gray-100 h-1 flex">
          <div className={`h-full flex-1 ${step >= 1 ? 'bg-[#DC2626]' : 'bg-gray-200'} transition-all`} />
          <div className={`h-full flex-1 ${step >= 2 ? 'bg-[#DC2626]' : 'bg-gray-200'} transition-all`} />
          <div className={`h-full flex-1 ${step >= 3 ? 'bg-[#DC2626]' : 'bg-gray-200'} transition-all`} />
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Dates grid */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#DC2626]" /> Date Selection
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
                  {availableDates.slice(0, 18).map((date, idx) => {
                    const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                        className={`p-2 rounded-lg border text-center transition ${
                          isSelected ? 'border-[#DC2626] bg-red-50 text-[#DC2626] font-bold' : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <span className="block text-[10px] text-gray-500 uppercase">{getDateLabel(date)}</span>
                        <span className="block text-base font-bold">{format(date, 'd')}</span>
                        <span className="block text-[10px] text-gray-500">{format(date, 'EEE')}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time grid */}
              {selectedDate && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-[#DC2626]" /> Time Selection
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map(time => {
                      const isBooked = bookedTimesForSelectedDate.has(time)
                      const isSelected = selectedTime === time
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2.5 rounded-lg border text-center text-sm font-semibold transition ${
                            isBooked ? 'border-gray-100 bg-gray-50 text-gray-400 line-through cursor-not-allowed' :
                            isSelected ? 'border-[#DC2626] bg-red-50 text-[#DC2626]' : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={handleNextStep}
                className="w-full bg-gradient-to-r from-[#DC2626] to-[#991B1B] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-premium w-full"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="120"
                    className="input-premium w-full"
                    placeholder="e.g. 45"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-4 h-4" /> Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input-premium w-full"
                    placeholder="e.g. +91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-premium w-full"
                  placeholder="e.g. name@domain.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Brief Description of Health Concern
                </label>
                <textarea
                  name="concern"
                  value={formData.concern}
                  onChange={handleInputChange}
                  rows={2}
                  className="input-premium w-full resize-none"
                  placeholder="e.g. Routine cardiovascular checkup, chest discomfort..."
                />
              </div>

              {submitError && <p className="text-xs text-red-600 font-semibold">{submitError}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#DC2626] to-[#991B1B] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming...' : 'Book Appointment'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Booking Confirmed!</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Your consultation has been reserved for {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
