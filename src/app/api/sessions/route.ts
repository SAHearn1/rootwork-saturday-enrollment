import { NextResponse } from 'next/server'

// Generate sessions dynamically for a rolling 6-month window
// Requirements:
// - Weekdays (Mon-Fri): 4:00 PM - 5:30 PM (one session per grade band)
// - Saturdays: 8:00 AM - 5:30 PM (five 90-minute sessions with 30-min breaks)
// - Grade bands: G35 (3-5), G68 (6-8), G912 (9-12)
// - Each grade band has max 25 students per 90-minute session
// - 30-minute break between sessions

type GradeLevel = 'G35' | 'G68' | 'G912'

interface Session {
  id: string
  date: string
  gradeLevel: GradeLevel
  startTime: string
  endTime: string
  availableSpots: number
}

function generateSessions(): Session[] {
  const sessions: Session[] = []
  let sessionId = 1
  const gradeLevels: GradeLevel[] = ['G35', 'G68', 'G912']
  
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
      
      for (const timeSlot of saturdayTimes) {
        for (const gradeLevel of gradeLevels) {
          sessions.push({
            id: String(sessionId++),
            date: dateStr,
            gradeLevel,
            startTime: timeSlot.start,
            endTime: timeSlot.end,
            availableSpots: 25
          })
        }
      }
    } else {
      // Weekday (Monday-Friday): 4:00 PM - 5:30 PM
      // One 90-minute session per grade band
      for (const gradeLevel of gradeLevels) {
        sessions.push({
          id: String(sessionId++),
          date: dateStr,
          gradeLevel,
          startTime: '4:00 PM',
          endTime: '5:30 PM',
          availableSpots: 25
        })
      }
    }
  }
  
  return sessions
}

const sessions = generateSessions()

export async function GET() {
  return NextResponse.json(sessions)
}
