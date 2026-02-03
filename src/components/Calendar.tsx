'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  getMonthDates,
  isSameDay,
  isInCurrentMonth,
  toISODateString,
  getAvailableSpotsForDate,
  type Session
} from '@/lib/date-utils'

interface CalendarProps {
  availableDates: string[]
  selectedDate: string | null
  onDateSelect: (date: string) => void
  sessionsByDate?: Record<string, Session[]>
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export function Calendar({ availableDates, selectedDate, onDateSelect, sessionsByDate }: CalendarProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const dates = getMonthDates(currentYear, currentMonth)

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const goToCurrentMonth = () => {
    const now = new Date()
    setCurrentMonth(now.getMonth())
    setCurrentYear(now.getFullYear())
  }

  const isDateAvailable = (date: Date): boolean => {
    const dateStr = toISODateString(date)
    return availableDates.includes(dateStr)
  }

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false
    return isSameDay(date, selectedDate)
  }

  const isToday = (date: Date): boolean => {
    return isSameDay(date, today)
  }

  const handleDateClick = (date: Date) => {
    const dateStr = toISODateString(date)
    if (isDateAvailable(date)) {
      onDateSelect(dateStr)
    }
  }

  const getCapacityIndicator = (date: Date): { color: string; text: string } | null => {
    if (!sessionsByDate) return null
    
    const dateStr = toISODateString(date)
    const sessions = sessionsByDate[dateStr] || []
    
    if (sessions.length === 0) return null
    
    const totalSpots = getAvailableSpotsForDate(sessions, dateStr)
    
    if (totalSpots === 0) {
      return { color: 'bg-red-500', text: 'Full' }
    } else if (totalSpots < 10) {
      return { color: 'bg-orange-500', text: 'Limited' }
    } else {
      return { color: 'bg-green-500', text: 'Open' }
    }
  }

  // Check if we can go to previous month (shouldn't go before current month)
  const canGoPrevious = () => {
    if (currentYear > today.getFullYear()) return true
    if (currentYear === today.getFullYear() && currentMonth > today.getMonth()) return true
    return false
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header with month navigation */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gold-leaf">
        <button
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious()}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-6 h-6 text-evergreen" />
        </button>
        
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-evergreen">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h2>
          {(currentMonth !== today.getMonth() || currentYear !== today.getFullYear()) && (
            <button
              onClick={goToCurrentMonth}
              className="text-sm text-gold-leaf hover:text-gold-dark transition-colors mt-1"
            >
              Jump to current month
            </button>
          )}
        </div>
        
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-6 h-6 text-evergreen" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAY_LABELS.map(day => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, index) => {
          const isInMonth = isInCurrentMonth(date, currentMonth, currentYear)
          const available = isDateAvailable(date)
          const selected = isDateSelected(date)
          const todayDate = isToday(date)
          const capacityInfo = getCapacityIndicator(date)

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={!available || !isInMonth}
              className={`
                relative aspect-square p-2 rounded-lg text-sm font-medium transition-all
                ${!isInMonth ? 'text-gray-300 cursor-default' : ''}
                ${isInMonth && !available ? 'text-gray-400 cursor-not-allowed' : ''}
                ${isInMonth && available && !selected ? 'text-evergreen hover:bg-green-50 hover:border-gold-leaf border-2 border-transparent cursor-pointer' : ''}
                ${selected ? 'bg-evergreen text-canvas-light border-2 border-evergreen shadow-md' : ''}
                ${todayDate && !selected ? 'ring-2 ring-gold-leaf ring-offset-2' : ''}
              `}
              aria-label={`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
              aria-pressed={selected}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className={`${selected ? 'font-bold' : ''}`}>
                  {date.getDate()}
                </span>
                
                {/* Capacity indicator dot */}
                {isInMonth && available && capacityInfo && !selected && (
                  <div className={`w-1.5 h-1.5 rounded-full ${capacityInfo.color} mt-1`} />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700">Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-700">Limited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700">Full</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg ring-2 ring-gold-leaf"></div>
            <span className="text-gray-700">Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}
