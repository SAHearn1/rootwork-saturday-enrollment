'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ChevronRight, SkipForward } from 'lucide-react'

interface Step {
  id: string
  title: string
  description: string
  targetId: string
  arrowDirection: 'down' | 'up' | 'left' | 'right'
}

const STEPS: Step[] = [
  {
    id: 'program-type',
    title: 'Step 1 of 4 — Choose Your Program',
    description: 'Start here! Select whether you\'re registering for a K-12 student (grades 3–12) or the Adult program.',
    targetId: 'program-type-section',
    arrowDirection: 'down',
  },
  {
    id: 'calendar',
    title: 'Step 2 of 4 — Pick a Date',
    description: 'Use the calendar to browse available session dates. Green dots mean open spots, orange means limited availability.',
    targetId: 'calendar-section',
    arrowDirection: 'down',
  },
  {
    id: 'sessions',
    title: 'Step 3 of 4 — Select a Time Slot',
    description: 'After selecting a date, available sessions appear here. Pick a time slot that works for your schedule!',
    targetId: 'sessions-section',
    arrowDirection: 'down',
  },
  {
    id: 'continue',
    title: 'Step 4 of 4 — Continue to Registration',
    description: 'Once you\'ve selected a session, this button becomes active. Click it to fill out student info and complete payment.',
    targetId: 'continue-button',
    arrowDirection: 'up',
  },
]

const STORAGE_KEY = 'rwfw_onboarding_complete'

interface HighlightRect {
  top: number
  left: number
  width: number
  height: number
}

export function OnboardingGuide() {
  const [active, setActive] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [highlight, setHighlight] = useState<HighlightRect | null>(null)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const rafRef = useRef<number | null>(null)

  const currentStep = STEPS[stepIndex]

  const positionTooltip = useCallback((rect: HighlightRect, direction: Step['arrowDirection']) => {
    const GAP = 16
    const TOOLTIP_WIDTH = 320
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let style: React.CSSProperties = { position: 'fixed', width: TOOLTIP_WIDTH }

    // Horizontal centering relative to target
    let left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2
    left = Math.max(12, Math.min(left, viewportWidth - TOOLTIP_WIDTH - 12))

    if (direction === 'down') {
      // Tooltip below the target
      style.top = rect.top + rect.height + GAP
      style.left = left
    } else if (direction === 'up') {
      // Tooltip above the target — we'll position it but check if there's room
      style.bottom = viewportHeight - rect.top + GAP
      style.left = left
    } else {
      style.top = rect.top + rect.height / 2 - 80
      style.left = left
    }

    setTooltipStyle(style)
  }, [])

  const measureAndPosition = useCallback(() => {
    if (!active || !currentStep) return

    const el = document.getElementById(currentStep.targetId)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const PADDING = 8

    const newHighlight: HighlightRect = {
      top: rect.top - PADDING,
      left: rect.left - PADDING,
      width: rect.width + PADDING * 2,
      height: rect.height + PADDING * 2,
    }

    setHighlight(newHighlight)
    positionTooltip(newHighlight, currentStep.arrowDirection)
  }, [active, currentStep, positionTooltip])

  // Scroll target into view and measure
  useEffect(() => {
    if (!active || !currentStep) return

    const el = document.getElementById(currentStep.targetId)
    if (!el) return

    el.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Wait for scroll to complete, then measure
    const timeout = setTimeout(() => {
      measureAndPosition()
    }, 400)

    return () => clearTimeout(timeout)
  }, [active, stepIndex, currentStep, measureAndPosition])

  // Reposition on resize/scroll
  useEffect(() => {
    if (!active) return

    const onUpdate = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(measureAndPosition)
    }

    window.addEventListener('resize', onUpdate)
    window.addEventListener('scroll', onUpdate, true)

    return () => {
      window.removeEventListener('resize', onUpdate)
      window.removeEventListener('scroll', onUpdate, true)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, measureAndPosition])

  // Auto-start on first visit
  useEffect(() => {
    try {
      const done = localStorage.getItem(STORAGE_KEY)
      if (!done) {
        const timer = setTimeout(() => setActive(true), 1200)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  const dismiss = useCallback(() => {
    setActive(false)
    setHighlight(null)
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignore
    }
  }, [])

  const next = useCallback(() => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((prev: number) => prev + 1)
    } else {
      dismiss()
    }
  }, [stepIndex, dismiss])

  const startTour = useCallback(() => {
    setStepIndex(0)
    setActive(true)
  }, [])

  // Arrow SVG pointing toward the target
  const ArrowIndicator = ({ direction }: { direction: Step['arrowDirection'] }) => {
    const rotations = { down: '0deg', up: '180deg', left: '90deg', right: '-90deg' }
    return (
      <div
        className="flex justify-center"
        style={{
          transform: `rotate(${rotations[direction]})`,
          marginTop: direction === 'up' ? 0 : 0,
          marginBottom: direction === 'down' ? 0 : 0,
          order: direction === 'down' ? -1 : 1,
        }}
      >
        <div className="flex flex-col items-center gap-0.5 animate-bounce">
          <div className="w-0 h-0" style={{
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '14px solid #2C5530',
          }} />
          <div className="w-1.5 bg-evergreen rounded" style={{ height: 24 }} />
        </div>
      </div>
    )
  }

  const isLastStep = stepIndex === STEPS.length - 1

  return (
    <>
      {/* Tour Trigger Button — always visible */}
      <button
        onClick={startTour}
        className="fixed bottom-20 right-4 z-40 bg-gold-leaf text-evergreen-dark text-xs font-bold px-3 py-2 rounded-full shadow-md hover:bg-gold-leaf-dark transition-colors whitespace-nowrap"
        style={{ display: active ? 'none' : 'block' }}
      >
        🗺 Take the Tour
      </button>

      {active && (
        <>
          {/* Dimmed Overlay */}
          <div
            className="fixed inset-0 z-40 pointer-events-none"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          />

          {/* Cutout highlight around target */}
          {highlight && (
            <div
              className="fixed z-40 pointer-events-none rounded-xl transition-all duration-300"
              style={{
                top: highlight.top,
                left: highlight.left,
                width: highlight.width,
                height: highlight.height,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.5), 0 0 0 3px #D4AF37, 0 0 20px 4px rgba(212,175,55,0.5)',
                borderRadius: 12,
              }}
            />
          )}

          {/* Tooltip */}
          <div
            className="fixed z-50 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
            style={{ ...tooltipStyle, maxWidth: 340 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-evergreen-dark to-evergreen px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <span className="text-canvas-light text-sm font-bold">Rooty&apos;s Registration Guide</span>
              </div>
              <button
                onClick={dismiss}
                className="text-canvas-light/70 hover:text-canvas-light transition-colors p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Arrow pointing toward target (for "up" direction — target is below tooltip) */}
            {currentStep.arrowDirection === 'up' && (
              <div className="flex justify-center pt-2">
                <ArrowIndicator direction="up" />
              </div>
            )}

            {/* Content */}
            <div className="px-4 py-4">
              <h3 className="font-bold text-evergreen mb-1.5 text-sm">{currentStep.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{currentStep.description}</p>
            </div>

            {/* Arrow pointing toward target (for "down" direction — target is below tooltip) */}
            {currentStep.arrowDirection === 'down' && (
              <div className="flex justify-center pb-2">
                <ArrowIndicator direction="down" />
              </div>
            )}

            {/* Progress dots + actions */}
            <div className="px-4 pb-4 flex items-center justify-between">
              {/* Progress dots */}
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === stepIndex
                        ? 'w-4 h-2 bg-evergreen'
                        : i < stepIndex
                        ? 'w-2 h-2 bg-evergreen/40'
                        : 'w-2 h-2 bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={dismiss}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
                >
                  <SkipForward className="w-3 h-3" />
                  Skip
                </button>
                <button
                  onClick={next}
                  className="flex items-center gap-1.5 bg-evergreen text-canvas-light text-sm font-semibold px-4 py-2 rounded-xl hover:bg-evergreen-dark transition-colors"
                >
                  {isLastStep ? 'Got it! 🎉' : 'Next'}
                  {!isLastStep && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
