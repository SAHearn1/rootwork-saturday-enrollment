import { NextResponse } from 'next/server'

// Mock session data
const sessions = [
  // December 7, 2025
  { id: '1', date: '2025-12-07', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 12 },
  { id: '2', date: '2025-12-07', gradeLevel: 'K2', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 8 },
  { id: '3', date: '2025-12-07', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 15 },
  { id: '4', date: '2025-12-07', gradeLevel: 'G35', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 3 },
  { id: '5', date: '2025-12-07', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 10 },
  { id: '6', date: '2025-12-07', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 0 },
  
  // December 14, 2025
  { id: '7', date: '2025-12-14', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 10 },
  { id: '8', date: '2025-12-14', gradeLevel: 'K2', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 5 },
  { id: '9', date: '2025-12-14', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 12 },
  { id: '10', date: '2025-12-14', gradeLevel: 'G35', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 7 },
  { id: '11', date: '2025-12-14', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 4 },
  { id: '12', date: '2025-12-14', gradeLevel: 'G68', startTime: '3:00 PM', endTime: '4:30 PM', availableSpots: 8 },
  { id: '13', date: '2025-12-14', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 6 },
  
  // December 21, 2025
  { id: '14', date: '2025-12-21', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 14 },
  { id: '15', date: '2025-12-21', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 11 },
  { id: '16', date: '2025-12-21', gradeLevel: 'G35', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 2 },
  { id: '17', date: '2025-12-21', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 9 },
  { id: '18', date: '2025-12-21', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 13 },
]

export async function GET() {
  return NextResponse.json(sessions)
}
