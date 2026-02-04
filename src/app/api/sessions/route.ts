import { NextResponse } from 'next/server'

// Generate sessions dynamically for a rolling 6-month window
// Requirements:
// - Weekdays (Mon-Fri): 4:00 PM - 5:30 PM (one session per grade band)
// - Saturdays: 8:00 AM - 5:30 PM (five 90-minute sessions with 30-min breaks)
// - Grade bands: G35 (3-5), G68 (6-8), G912 (9-12)
// - Each grade band has max 25 students per 90-minute session
// - 30-minute break between sessions
// - Support for both K-12 and Adult programs
// - Multiple location options

type GradeLevel = 'G35' | 'G68' | 'G912'
type ProgramType = 'K12' | 'ADULT'
type Location = 'WW_LAW_CENTER' | 'UCA' | 'CARVER_HEIGHTS' | 'LIBERTY_CITY' | 'TATUMVILLE' | 'OTHER'

interface Session {
  id: string
  date: string
  gradeLevel: GradeLevel | null
  programType: ProgramType
  startTime: string
  endTime: string
  location: Location
  availableSpots: number
}

function generateSessions(): Session[] {
  const sessions: Session[] = []
  let sessionId = 1
  const gradeLevels: GradeLevel[] = ['G35', 'G68', 'G912']
  const locations: Location[] = ['WW_LAW_CENTER', 'UCA', 'CARVER_HEIGHTS', 'LIBERTY_CITY', 'TATUMVILLE']
  
  // Start from today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Generate sessions for 6 months (approximately 180 days)
  const daysToGenerate = 180
  
  for (let dayOffset = 0; dayOffset < daysToGenerate; dayOffset++) {
    const currentDate = new Date(today)
    currentDate.setDate(today.getDate() + dayOffset)
    
    const dayOfWeek = currentDate.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const dateStr = currentDate.toISOString().split('T')[0]
    
    // Skip Sundays
    if (dayOfWeek === 0) continue
    
    // Rotate through locations
    const locationIndex = dayOffset % locations.length
    const location = locations[locationIndex]
    
    if (dayOfWeek === 6) {
      // Saturday: 8:00 AM - 5:30 PM
      // Five 90-minute sessions with 30-minute breaks
      // Sessions: 8:00-9:30, 10:00-11:30, 12:00-1:30, 2:00-3:30, 4:00-5:30
      const saturdayTimes = [
        { start: '8:00 AM', end: '9:30 AM' },
        { start: '10:00 AM', end: '11:30 AM' },
        { start: '12:00 PM', end: '1:30 PM' },
        { start: '2:00 PM', end: '3:30 PM' },
        { start: '4:00 PM', end: '5:30 PM' }
      ]
      
      // K-12 sessions
      for (const timeSlot of saturdayTimes) {
        for (const gradeLevel of gradeLevels) {
          sessions.push({
            id: String(sessionId++),
            date: dateStr,
            gradeLevel,
            programType: 'K12',
            startTime: timeSlot.start,
            endTime: timeSlot.end,
            location,
            availableSpots: 25
          })
        }
      }
      
      // Adult sessions (2 per Saturday at different times)
      const adultTimes = [
        { start: '9:00 AM', end: '11:00 AM' },
        { start: '2:00 PM', end: '4:00 PM' }
      ]
      
      for (const timeSlot of adultTimes) {
        sessions.push({
          id: String(sessionId++),
          date: dateStr,
          gradeLevel: null, // Adult programs don't have grade levels
          programType: 'ADULT',
          startTime: timeSlot.start,
          endTime: timeSlot.end,
          location,
          availableSpots: 25
        })
      }
    } else {
      // Weekday (Monday-Friday): 4:00 PM - 5:30 PM
      // One 90-minute session per grade band for K-12
      for (const gradeLevel of gradeLevels) {
        sessions.push({
          id: String(sessionId++),
          date: dateStr,
          gradeLevel,
          programType: 'K12',
          startTime: '4:00 PM',
          endTime: '5:30 PM',
          location,
          availableSpots: 25
        })
      }
      
      // Add one Adult session per weekday
      sessions.push({
        id: String(sessionId++),
        date: dateStr,
        gradeLevel: null,
        programType: 'ADULT',
        startTime: '6:00 PM',
        endTime: '8:00 PM',
        location,
        availableSpots: 25
      })
    }
  }
  
  return sessions
}

const sessions = generateSessions()

export async function GET() {
  return NextResponse.json(sessions)
}
