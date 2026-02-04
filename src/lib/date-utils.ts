/**
 * Date utility functions for calendar and session management
 */

export interface Session {
  id: string
  date: string
  gradeLevel: string
  startTime: string
  endTime: string
  availableSpots: number
}

/**
 * Returns an array of dates for a calendar grid including padding days
 * @param year - The year
 * @param month - The month (0-11, January = 0)
 * @returns Array of Date objects for the calendar grid
 */
export function getMonthDates(year: number, month: number): Date[] {
  const dates: Date[] = []
  
  // First day of the month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay()
  
  // Add padding days from previous month
  const prevMonthLastDay = new Date(year, month, 0)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const paddingDate = new Date(year, month - 1, prevMonthLastDay.getDate() - i)
    dates.push(paddingDate)
  }
  
  // Add all days of the current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    dates.push(new Date(year, month, day))
  }
  
  // Add padding days from next month to complete the grid
  const lastDayOfWeek = lastDay.getDay()
  const remainingDays = lastDayOfWeek === 6 ? 0 : 6 - lastDayOfWeek
  for (let day = 1; day <= remainingDays; day++) {
    dates.push(new Date(year, month + 1, day))
  }
  
  return dates
}

/**
 * Checks if two dates are the same day (ignoring time)
 * @param date1 - First date
 * @param date2 - Second date
 * @returns true if both dates are on the same day
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2
  
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

/**
 * Checks if a date is a weekend (Saturday or Sunday)
 * @param date - The date to check
 * @returns true if the date is a weekend
 */
export function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}

/**
 * Formats a date for display in a user-friendly format
 * @param date - The date to format
 * @param format - The format type ('short' | 'long' | 'iso')
 * @returns Formatted date string
 */
export function formatDateForDisplay(date: Date | string, format: 'short' | 'long' | 'iso' = 'long'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'iso') {
    return d.toISOString().split('T')[0]
  }
  
  if (format === 'short') {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  // 'long' format
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

/**
 * Extracts unique dates with available spots from sessions
 * @param sessions - Array of session objects
 * @returns Array of date strings (YYYY-MM-DD) that have available spots
 */
export function getAvailableDatesFromSessions(sessions: Session[]): string[] {
  const dateMap = new Map<string, number>()
  
  sessions.forEach(session => {
    const currentSpots = dateMap.get(session.date) || 0
    dateMap.set(session.date, currentSpots + session.availableSpots)
  })
  
  // Return dates that have at least one available spot
  return Array.from(dateMap.entries())
    .filter(([, spots]) => spots > 0)
    .map(([date]) => date)
}

/**
 * Converts a Date object to ISO date string (YYYY-MM-DD)
 * @param date - The date to convert
 * @returns ISO date string
 */
export function toISODateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Checks if a date is in the current month
 * @param date - The date to check
 * @param currentMonth - The current month (0-11)
 * @param currentYear - The current year
 * @returns true if the date is in the current month
 */
export function isInCurrentMonth(date: Date, currentMonth: number, currentYear: number): boolean {
  return date.getMonth() === currentMonth && date.getFullYear() === currentYear
}

/**
 * Gets the total available spots for a specific date
 * @param sessions - Array of session objects
 * @param date - The date string (YYYY-MM-DD)
 * @returns Total available spots for the date
 */
export function getAvailableSpotsForDate(sessions: Session[], date: string): number {
  return sessions
    .filter(session => session.date === date)
    .reduce((total, session) => total + session.availableSpots, 0)
}
