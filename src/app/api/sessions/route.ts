import { NextResponse } from 'next/server'

// Mock session data - January 2026 (excluding Sundays)
const sessions = [
  // January 3, 2026 (Saturday)
  { id: '1', date: '2026-01-03', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 12 },
  { id: '2', date: '2026-01-03', gradeLevel: 'K2', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 8 },
  { id: '3', date: '2026-01-03', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 15 },
  { id: '4', date: '2026-01-03', gradeLevel: 'G35', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 3 },
  { id: '5', date: '2026-01-03', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 10 },
  { id: '6', date: '2026-01-03', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 0 },
  
  // January 5, 2026 (Monday)
  { id: '7', date: '2026-01-05', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 10 },
  { id: '8', date: '2026-01-05', gradeLevel: 'K2', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 5 },
  { id: '9', date: '2026-01-05', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 12 },
  { id: '10', date: '2026-01-05', gradeLevel: 'G35', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 7 },
  { id: '11', date: '2026-01-05', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 4 },
  { id: '12', date: '2026-01-05', gradeLevel: 'G68', startTime: '3:00 PM', endTime: '4:30 PM', availableSpots: 8 },
  { id: '13', date: '2026-01-05', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 6 },
  
  // January 9, 2026 (Friday)
  { id: '14', date: '2026-01-09', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 14 },
  { id: '15', date: '2026-01-09', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 11 },
  { id: '16', date: '2026-01-09', gradeLevel: 'G35', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 2 },
  { id: '17', date: '2026-01-09', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 9 },
  { id: '18', date: '2026-01-09', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 13 },
  
  // January 13, 2026 (Tuesday)
  { id: '19', date: '2026-01-13', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 10 },
  { id: '20', date: '2026-01-13', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 12 },
  { id: '21', date: '2026-01-13', gradeLevel: 'G35', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 5 },
  { id: '22', date: '2026-01-13', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 8 },
  { id: '23', date: '2026-01-13', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 11 },
  
  // January 16, 2026 (Friday)
  { id: '24', date: '2026-01-16', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 9 },
  { id: '25', date: '2026-01-16', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 14 },
  { id: '26', date: '2026-01-16', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 7 },
  { id: '27', date: '2026-01-16', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 10 },
  
  // January 21, 2026 (Wednesday)
  { id: '28', date: '2026-01-21', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 13 },
  { id: '29', date: '2026-01-21', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 8 },
  { id: '30', date: '2026-01-21', gradeLevel: 'G35', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 4 },
  { id: '31', date: '2026-01-21', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 6 },
  { id: '32', date: '2026-01-21', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 9 },
  
  // January 23, 2026 (Friday)
  { id: '33', date: '2026-01-23', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 11 },
  { id: '34', date: '2026-01-23', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 10 },
  { id: '35', date: '2026-01-23', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 12 },
  { id: '36', date: '2026-01-23', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 7 },
  
  // January 27, 2026 (Tuesday)
  { id: '37', date: '2026-01-27', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 15 },
  { id: '38', date: '2026-01-27', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 13 },
  { id: '39', date: '2026-01-27', gradeLevel: 'G35', startTime: '11:00 AM', endTime: '12:30 PM', availableSpots: 6 },
  { id: '40', date: '2026-01-27', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 8 },
  { id: '41', date: '2026-01-27', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 14 },
  
  // January 30, 2026 (Friday)
  { id: '42', date: '2026-01-30', gradeLevel: 'K2', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 10 },
  { id: '43', date: '2026-01-30', gradeLevel: 'G35', startTime: '9:00 AM', endTime: '10:30 AM', availableSpots: 11 },
  { id: '44', date: '2026-01-30', gradeLevel: 'G68', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 9 },
  { id: '45', date: '2026-01-30', gradeLevel: 'G912', startTime: '1:00 PM', endTime: '2:30 PM', availableSpots: 12 },
]

export async function GET() {
  return NextResponse.json(sessions)
}
