import { supabase } from './supabaseClient'

const BACKEND_URL = import.meta.env.VITE_BOOKING_API_URL || 'http://localhost:3001'

/**
 * Normalizes appointment data layout for UI state consistency
 */
export function buildBookingPayload(booking) {
  return {
    id: booking.id,
    createdAt: booking.createdAt || new Date().toISOString(),
    name: booking.name,
    age: booking.age,
    email: booking.email,
    phone: booking.phone,
    concern: booking.concern,
    referredBy: booking.referredBy,
    preferredDate: booking.preferredDate,
    preferredDateISO: booking.preferredDateISO,
    preferredTime: booking.preferredTime,
  }
}

/**
 * Formats booking input to fit database schema design
 */
function buildDatabaseBookingRow(booking) {
  return {
    name: booking.name.trim(),
    age: booking.age ? parseInt(booking.age, 10) : null,
    email: booking.email.trim(),
    phone: booking.phone.trim(),
    concern: booking.concern?.trim() || null,
    referred_by: booking.referredBy?.trim() || null,
    preferred_date: booking.preferredDateISO,
    preferred_time: booking.preferredTime,
    status: 'pending',
  }
}

/**
 * Submits the booking request to database and secondary integrations
 */
export async function submitBooking(booking) {
  const payload = buildBookingPayload(booking)
  const dbRow = buildDatabaseBookingRow(booking)

  // 1. Insert into Supabase (Primary Datastore)
  const { data, error } = await supabase
    .from('bookings')
    .insert([dbRow])
    .select()

  if (error) {
    console.error('Database insertion error:', error)
    throw error
  }

  // 2. Dispatch notifications via webhook integrations (Optional background tasks)
  const webhooks = [
    import.meta.env.VITE_BOOKING_EMAIL_WEBHOOK_URL,
    import.meta.env.VITE_BOOKING_SMS_WEBHOOK_URL
  ].filter(Boolean)

  if (webhooks.length > 0) {
    await Promise.all(
      webhooks.map(url =>
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.error(`Webhook target ${url} failed:`, err))
      )
    )
  }

  return data
}

/**
 * Fetches booked slots to disable them in the user calendar interface
 */
export async function fetchBookedSlots() {
  const { data, error } = await supabase
    .from('bookings')
    .select('preferred_date, preferred_time')
    .neq('status', 'cancelled')

  if (error) {
    console.error('Error fetching booked slots:', error)
    return []
  }

  return data.map(slot => ({
    preferredDateISO: slot.preferred_date,
    preferredTime: slot.preferred_time,
  }))
}
