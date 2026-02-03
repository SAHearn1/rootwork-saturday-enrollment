'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { promiseScholarshipInfo } from '@/lib/promise-scholarship'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { RootWorkLogo } from '@/components/RootWorkLogo'
import { Calendar } from '@/components/Calendar'
import { getAvailableDatesFromSessions } from '@/lib/date-utils'

interface Session {
  id: string
  date: string
  gradeLevel: string
  startTime: string
  endTime: string
  availableSpots: number
}

type GradeLevel = 'G35' | 'G68' | 'G912'

const gradeLabels: Record<GradeLevel, string> = { 
  G35: '3-5', 
  G68: '6-8', 
  G912: '9-12' 
}

export default function RegisterPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSession, setSelectedSession] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [showScholarshipDetails, setShowScholarshipDetails] = useState(false)

  useEffect(() => {
    fetchSessions()
  }, [])

  async function fetchSessions() {
    try {
      const res = await fetch('/api/sessions')
      const data: Session[] = await res.json()
      setSessions(data)
      
      // Auto-select first available date with sessions
      const availableDates = getAvailableDatesFromSessions(data)
      if (availableDates.length > 0) {
        setSelectedDate(availableDates[0] as string)
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const availableDates = useMemo(() => getAvailableDatesFromSessions(sessions), [sessions])
  const selectedDateSessions = sessions.filter(s => s.date === selectedDate)
  
  // Group sessions by date for calendar
  const sessionsByDate = useMemo(() => {
    const grouped: Record<string, Session[]> = {}
    sessions.forEach(session => {
      if (!grouped[session.date]) {
        grouped[session.date] = []
      }
      grouped[session.date].push(session)
    })
    return grouped
  }, [sessions])

  const handleContinue = () => {
    if (selectedSession) {
      localStorage.setItem('selectedSessionId', selectedSession)
      router.push('/register/student')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-evergreen-dark via-evergreen to-evergreen-light p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-canvas-light text-xl mt-20">Loading sessions...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-evergreen-dark via-evergreen to-evergreen-light p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-evergreen-dark to-evergreen p-10 rounded-2xl shadow-xl mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg overflow-hidden bg-white">
              <RootWorkLogo width={64} height={64} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-canvas-light mb-2">RootWork Framework</h1>
              <p className="text-gold-leaf text-lg">Saturday Enrichment Program Registration</p>
            </div>
          </div>
        </div>

        {/* Georgia Promise Scholarship Banner */}
        <div className="bg-gradient-to-r from-gold-leaf via-gold-leaf-light to-gold-leaf rounded-xl shadow-xl mb-6 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🎓</span>
                  <h2 className="text-2xl font-bold text-evergreen-dark">
                    Georgia Promise Scholarship Available!
                  </h2>
                  <span className="bg-evergreen text-canvas-light px-4 py-1 rounded-full text-sm font-bold">
                    ${promiseScholarshipInfo.amount.toLocaleString()} Available
                  </span>
                </div>
                <p className="text-evergreen-dark text-lg mb-3">
                  Eligible students zoned to 18 Savannah-Chatham County schools can receive up to ${promiseScholarshipInfo.amount.toLocaleString()} annually for educational expenses.
                </p>
                <button
                  onClick={() => setShowScholarshipDetails(!showScholarshipDetails)}
                  className="flex items-center gap-2 text-evergreen font-semibold hover:text-evergreen-dark transition-colors"
                >
                  {showScholarshipDetails ? (
                    <>
                      <ChevronUp className="w-5 h-5" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      Learn More About Eligibility
                    </>
                  )}
                </button>
              </div>
            </div>

            {showScholarshipDetails && (
              <div className="mt-6 pt-6 border-t-2 border-evergreen/20">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-evergreen mb-3 flex items-center gap-2">
                      <span className="text-xl">✅</span>
                      Eligible Uses
                    </h3>
                    <ul className="space-y-2 text-evergreen-dark">
                      {promiseScholarshipInfo.programDetails.eligibleUses.map((use, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-gold-dark font-bold">→</span>
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-evergreen mb-3 flex items-center gap-2">
                      <span className="text-xl">📋</span>
                      Requirements
                    </h3>
                    <ul className="space-y-2 text-evergreen-dark">
                      {promiseScholarshipInfo.programDetails.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-gold-dark font-bold">→</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <a
                    href={promiseScholarshipInfo.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-evergreen text-canvas-light px-6 py-3 rounded-lg font-bold hover:bg-evergreen-dark transition-colors"
                  >
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <span className="text-evergreen-dark font-semibold">
                    Application Deadline: {promiseScholarshipInfo.applicationDeadline}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-canvas-light rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-evergreen mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            How to Register
          </h3>
          <ul className="space-y-2 text-evergreen-dark">
            <li className="flex items-start gap-2">
              <span className="text-gold-leaf font-bold">→</span>
              Choose your preferred date from the available options below (weekdays or Saturdays)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-leaf font-bold">→</span>
              Select a time slot that works best for your schedule
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-leaf font-bold">→</span>
              Pick the session that matches your child&apos;s grade level
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Calendar Date Selection */}
          <Calendar
            availableDates={availableDates}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            sessionsByDate={sessionsByDate}
          />

          {/* Session List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="bg-gradient-to-r from-evergreen to-evergreen-light text-canvas-light p-4 rounded-xl mb-6">
              <h3 className="text-xl font-bold">Available Sessions</h3>
              <p className="text-gold-leaf text-sm">
                {selectedDate 
                  ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                  : 'Select a date to view available sessions'
                }
              </p>
            </div>

            {(['G35', 'G68', 'G912'] as GradeLevel[]).map((gradeLevel) => {
              const gradeSessions = selectedDateSessions.filter(s => s.gradeLevel === gradeLevel)
              if (gradeSessions.length === 0) return null

              return (
                <div key={gradeLevel} className="mb-6">
                  <h4 className="text-lg font-bold text-evergreen mb-3 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gold-leaf rounded" />
                    Grade {gradeLabels[gradeLevel]}
                  </h4>
                  <div className="space-y-2">
                    {gradeSessions.map((session: Session) => {
                      const isFull = session.availableSpots === 0
                      const isLimited = session.availableSpots > 0 && session.availableSpots < 5
                      const isOpen = session.availableSpots >= 5
                      
                      return (
                        <button
                          key={session.id}
                          onClick={() => setSelectedSession(session.id)}
                          disabled={isFull}
                          className={`w-full p-4 rounded-xl border-2 transition-all flex justify-between items-center ${
                            selectedSession === session.id
                              ? 'border-evergreen bg-green-50 shadow-md'
                              : isFull
                              ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                              : 'border-gray-200 hover:border-gold-leaf hover:shadow-md'
                          }`}
                        >
                          <span className="font-semibold text-evergreen">
                            {session.startTime} - {session.endTime}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 font-medium">
                              {session.availableSpots} {session.availableSpots === 1 ? 'spot' : 'spots'} remaining
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              isFull
                                ? 'bg-red-500 text-white'
                                : isLimited
                                ? 'bg-orange-500 text-white'
                                : 'bg-green-500 text-white'
                            }`}>
                              {isFull ? 'Full' : isLimited ? 'Limited' : 'Open'}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {!selectedDate && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">Please select a date from the calendar above to view available sessions.</p>
              </div>
            )}

            {selectedDate && selectedDateSessions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No sessions available for the selected date.</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <button 
                onClick={handleContinue}
                disabled={!selectedSession}
                className="w-full py-4 px-6 bg-gradient-to-br from-evergreen to-evergreen-light text-canvas-light rounded-xl font-bold text-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Student Information →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
