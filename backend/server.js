import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const BOOKINGS_FILE = path.join(__dirname, 'data', 'bookings.json')
const LOGS_FILE = path.join(__dirname, 'data', 'logs.json')

// Helper function to read database files
async function readJsonFile(filePath, defaultValue = []) {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (err) {
    return defaultValue
  }
}

// Helper function to write database files
async function writeJsonFile(filePath, data) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error(`Error saving database file ${filePath}:`, err)
  }
}

/**
 * Endpoint: POST /api/bookings
 * Saves an appointment booking and dispatches callback webhooks.
 */
app.post('/api/bookings', async (req, res) => {
  const { booking, source } = req.body
  if (!booking || !booking.name || !booking.phone) {
    return res.status(400).json({ error: 'Invalid booking data payload.' })
  }

  const bookings = await readJsonFile(BOOKINGS_FILE)
  bookings.push({
    ...booking,
    syncSource: source || 'direct-api',
    recordedAt: new Date().toISOString()
  })

  await writeJsonFile(BOOKINGS_FILE, bookings)

  // Log notification callback activity
  const logs = await readJsonFile(LOGS_FILE)
  logs.push({
    bookingId: booking.id,
    action: 'Webhook Dispatch Triggered',
    timestamp: new Date().toISOString()
  })
  await writeJsonFile(LOGS_FILE, logs)

  res.status(201).json({ success: true, booking })
})

/**
 * Endpoint: GET /api/bookings
 * Returns saved bookings (for local synchronization).
 */
app.get('/api/bookings', async (req, res) => {
  const bookings = await readJsonFile(BOOKINGS_FILE)
  res.json({ bookings })
})

app.listen(PORT, () => {
  console.log(`Showcase backend server running on http://localhost:${PORT}`)
})
