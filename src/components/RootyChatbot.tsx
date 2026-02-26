'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Send, MessageCircle, RotateCcw } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
}

interface KnowledgeEntry {
  patterns: string[]
  response: string
  followUps?: string[]
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    patterns: ['hi', 'hello', 'hey', 'howdy', 'greetings', 'good morning', 'good afternoon'],
    response: `Hi there! 🌱 I'm Rooty, your RootWork enrollment guide! I'm here to help you with questions about the registration process, the Georgia Promise Scholarship, and everything about the RWFW Saturday Enrichment Program. What would you like to know?`,
    followUps: ['What is RWFW?', 'Tell me about the Georgia Promise Scholarship', 'How do I register?', 'What does it cost?'],
  },
  {
    patterns: ['rwfw', 'rootwork', 'root work framework', 'saturday program', 'enrichment program', 'about the program', 'what is the program', 'tell me about', 'what is rwfw'],
    response: `**RootWork Framework (RWFW) Saturday Enrichment Program** 🌳

RWFW offers structured Saturday sessions designed to enrich students academically and personally.

**Programs Available:**
• **K-12 Program** — For students in grades 3–12
• **Adult Program** — For adult participants

**Schedule:**
• Weekday sessions: 4:00 PM – 5:30 PM (Mon–Fri)
• Saturday sessions: 8:00 AM, 10:00 AM, 12:00 PM, 2:00 PM, and 4:00 PM
• Each session is 90 minutes long

**Locations:** Sessions rotate between W.W. Law Center, UCA, Carver Heights, Liberty City, and Tatumville.`,
    followUps: ['How much does it cost?', 'How do I register?', 'What grades can join?'],
  },
  {
    patterns: ['georgia promise', 'promise scholarship', 'gps scholarship', 'gps program', 'scholarship'],
    response: `**Georgia Promise Scholarship (GPS)** 🎓

The GPS provides up to **$6,500 per year** for eligible students to use for educational expenses.

**What it covers:**
• Private school tuition and fees
• Tutoring by certified educators
• Textbooks and curriculum materials
• Therapy services (occupational, behavioral, physical, speech-language)
• Transportation to service providers (up to $500/year)

During RWFW registration, if your student qualifies, the scholarship can cover your session cost — bringing it to **$0 out of pocket**!

To apply for GPS, visit **mygeorgiapromise.org**.`,
    followUps: ['Am I eligible for GPS?', 'Which schools qualify?', 'How do I apply for GPS?'],
  },
  {
    patterns: ['eligible', 'eligibility', 'qualify', 'do i qualify', 'am i eligible', 'who qualifies', 'requirements', 'who can get'],
    response: `**GPS Eligibility Requirements** ✅

To qualify for the Georgia Promise Scholarship, students must meet **ALL** of the following:

1. **Eligible school** — Student must be zoned for one of the 18 qualifying Savannah-Chatham County schools
2. **Enrollment** — Enrolled in a GA public school for 2 consecutive semesters (OR a rising kindergartener)
3. **Residency** — Parent/guardian must be a GA resident for 1+ years (active-duty military exempt)
4. **No conflicts** — Cannot simultaneously receive GA Special Needs Scholarship or SSO funds

During RWFW registration, we'll ask about your school and automatically check eligibility for you!`,
    followUps: ['Which schools qualify?', 'How do I apply for GPS?', 'What if I\'m not eligible?'],
  },
  {
    patterns: ['which schools', 'eligible schools', 'school list', 'qualifying schools', 'what schools', 'school qualify'],
    response: `**18 GPS-Eligible Savannah-Chatham County Schools** 🏫

**Elementary Schools:**
• Robert W. Gadsden Elementary
• Bishop Gilbert Haven Elementary
• School of Humanities at Juliette Gordon Low Elementary
• Casimir Pulaski K-8 School
• Windsor Forest Elementary

**Middle Schools:**
• DeRenne Middle School
• John W. Hubert Middle School
• George A. Mercer Middle School (Davis-Edwards-Harris Complex)
• Lee Roy Myers Middle School

**High Schools:**
• Robert W. Groves High School (Davis-Edwards-Harris Complex)
• Herschel V. Jenkins High School
• School of Liberal Studies at Savannah High

If your student attends one of these schools, they may be eligible for GPS!`,
    followUps: ['Am I eligible for GPS?', 'How do I apply for GPS?'],
  },
  {
    patterns: ['apply for gps', 'how to apply', 'gps application', 'apply for scholarship', 'application process', 'apply scholarship'],
    response: `**Applying for the Georgia Promise Scholarship** 📋

**Steps to apply:**
1. Visit **mygeorgiapromise.org** to create an account
2. Gather your documents:
   • Proof of GA residency (driver's license or state ID)
   • Proof of income (most recent federal 1040 tax form)
   • Proof of enrollment (report card or school letter)
3. Submit your online application

**Using GPS for RWFW Registration:**
If you're eligible, simply select "GPS Scholarship" as your payment method during registration — the scholarship covers the session cost entirely!`,
    followUps: ['Am I eligible?', 'How much does it cost without GPS?'],
  },
  {
    patterns: ['cost', 'price', 'how much', 'fee', 'payment', 'pay', 'pricing', 'affordable'],
    response: `**RWFW Program Pricing** 💰

| Payment Option | Amount |
|----------------|--------|
| Full Session Payment | $75.00 |
| 50% Deposit | $37.50 now |
| GPS Scholarship | $0 (covered!) |
| Curriculum Guide (optional) | +$35.00 |

**Available payment options:**
• **Full payment** — Pay $75 upfront for the session
• **50% Deposit** — Pay $37.50 now, remainder due before the session
• **GPS Scholarship** — If eligible, the scholarship covers the entire session cost

All payments are processed securely via Stripe.`,
    followUps: ['Am I eligible for GPS?', 'How do I register?', 'What is the deposit option?'],
  },
  {
    patterns: ['how to register', 'register', 'registration', 'sign up', 'enroll', 'how do i', 'get started', 'start'],
    response: `**How to Register for RWFW** 📝

**Step 1** — Select your program type (K-12 or Adult)
**Step 2** — Pick a date from the calendar and choose a time slot
**Step 3** — Fill in student/participant information
**Step 4** — Choose your payment method:
   • Full payment ($75)
   • 50% deposit ($37.50)
   • GPS Scholarship (if eligible — $0!)
**Step 5** — Complete payment and receive your confirmation 🎉

Need a walkthrough? Look for the **"Take the Tour"** button on this page — it'll guide you through each step with helpful arrows!`,
    followUps: ['What is GPS?', 'How much does it cost?', 'What grades can join?'],
  },
  {
    patterns: ['grades', 'grade level', 'what grades', 'age', 'who can join', 'k-12', 'kids', 'children'],
    response: `**K-12 Program Grade Levels** 🎒

Sessions are organized by grade band so students are grouped with peers their age:

• **Grades 3–5** — Elementary level sessions
• **Grades 6–8** — Middle school level sessions
• **Grades 9–12** — High school level sessions

Each grade band has dedicated time slots. When you select a date and time, you'll see which sessions match your student's grade level.

For the **Adult Program**, there are no grade requirements.`,
    followUps: ['How do I register?', 'What does it cost?', 'What is the schedule?'],
  },
  {
    patterns: ['location', 'where', 'address', 'venue', 'place', 'sites'],
    response: `**RWFW Session Locations** 📍

Sessions rotate between five community locations:

• **W.W. Law Center**
• **UCA** (Universal Community Arts)
• **Carver Heights**
• **Liberty City**
• **Tatumville**

When you select a date and time slot during registration, the specific location for that session will be displayed. Make sure to note your location before the session day!`,
    followUps: ['What is the session schedule?', 'How do I register?'],
  },
  {
    patterns: ['schedule', 'days', 'when', 'time', 'hours', 'saturday', 'weekday', 'what time', 'availability'],
    response: `**RWFW Session Schedule** 📅

**Weekday Sessions (Mon–Fri):**
• 4:00 PM – 5:30 PM
• One session per grade band for K-12, plus one Adult session

**Saturday Sessions:**
• 8:00 AM – 9:30 AM
• 10:00 AM – 11:30 AM
• 12:00 PM – 1:30 PM
• 2:00 PM – 3:30 PM
• 4:00 PM – 5:30 PM

Sessions are available on a 6-month rolling schedule. Use the calendar to see all currently available dates and time slots!`,
    followUps: ['How do I register?', 'Where are sessions held?'],
  },
  {
    patterns: ['curriculum', 'curriculum guide', 'materials', 'textbook', 'guide', 'book'],
    response: `**RootWork K-12 Curriculum Guide** 📚

The optional **RootWork K-12 Curriculum Guide** is available for an additional **$35.00** and can be added to your registration during the payment step.

It contains supplemental educational materials designed to support your student's learning between sessions and reinforce what's covered in the program.`,
    followUps: ['How do I register?', 'What does it cost?'],
  },
  {
    patterns: ['after registration', 'confirmation', 'next steps', 'what happens', 'after i register', 'confirmed'],
    response: `**After Registration** ✅

Once you complete registration, you'll receive:

1. **Confirmation page** — Shows your registration number, session details (date, time, location), and payment summary
2. **Email confirmation** — Sent to the email address provided during registration

**If using GPS Scholarship:**
• Your session will be reserved and you'll see instructions for applying at mygeorgiapromise.org (if you haven't already)

**Day of the session:**
• Arrive a few minutes early
• Bring your confirmation number
• Go to the location listed on your confirmation`,
    followUps: ['How do I register?', 'What is the GPS scholarship?'],
  },
  {
    patterns: ['deposit', '50%', 'half', 'partial payment', 'pay half', 'down payment'],
    response: `**50% Deposit Option** 💳

If you'd prefer not to pay the full amount upfront, you can secure your spot with a **50% deposit of $37.50**.

The remaining balance of $37.50 will be due before your session date.

This option is available for standard registrations. If you're using the GPS Scholarship, the scholarship covers the full session cost — so no deposit is needed!`,
    followUps: ['How much does it cost?', 'Am I eligible for GPS?'],
  },
  {
    patterns: ['not eligible', 'not qualify', 'ineligible', 'what if i\'m not', 'what if not eligible'],
    response: `**If You're Not GPS Eligible** 🤔

No worries! You can still register for RWFW with our regular payment options:

• **Full payment** — $75.00 for the session
• **50% deposit** — $37.50 now, remainder due before the session
• **Optional add-on** — RootWork K-12 Curriculum Guide (+$35.00)

The GPS Scholarship requirements are set by the state of Georgia. If your situation changes in the future (new school enrollment, residency requirements met), you may become eligible!`,
    followUps: ['How do I register?', 'What does it cost?', 'Tell me about GPS requirements'],
  },
  {
    patterns: ['thank', 'thanks', 'thank you', 'great', 'awesome', 'perfect', 'helpful', 'appreciate', 'got it'],
    response: `You're welcome! 🌱 It's my job to make sure your registration goes smoothly. If any more questions come up, just ask — I'm always here to help. Good luck, and we hope to see you at a RootWork session soon! 🎉`,
    followUps: ['How do I register?', 'Tell me about GPS', 'What is RWFW?'],
  },
]

const INITIAL_QUICK_REPLIES = [
  'What is RWFW?',
  'About the Georgia Promise Scholarship',
  'How do I register?',
  'What does it cost?',
  'Which schools qualify for GPS?',
  'Session schedule & locations',
]

function getResponse(input: string): { response: string; followUps: string[] } {
  const lower = input.toLowerCase().trim()

  for (const entry of knowledgeBase) {
    if (entry.patterns.some(p => lower.includes(p))) {
      return { response: entry.response, followUps: entry.followUps ?? [] }
    }
  }

  return {
    response: `Hmm, I'm not sure about that specific question! I can help with:\n\n• **Georgia Promise Scholarship** — eligibility, schools, and how to apply\n• **RWFW program** — schedule, locations, grade levels\n• **Registration process** — step-by-step walkthrough\n• **Pricing** — payment options including GPS coverage\n\nTry asking about one of those topics, or contact RootWork directly for more specific questions. 😊`,
    followUps: ['What is the GPS scholarship?', 'How do I register?', 'What does it cost?', 'What is RWFW?'],
  }
}

function MessageBubble({ text, role }: { text: string; role: 'user' | 'bot' }) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: React.ReactNode[] = []

  const renderInline = (line: string) =>
    line.split(/(\*\*[^*]+\*\*)/).map((seg, i) =>
      seg.startsWith('**') && seg.endsWith('**')
        ? <strong key={i}>{seg.slice(2, -2)}</strong>
        : <span key={i}>{seg}</span>
    )

  lines.forEach((line, idx) => {
    const trimmed = line.trimStart()
    const isBullet = trimmed.startsWith('• ') || trimmed.startsWith('- ')

    if (isBullet) {
      const content = trimmed.replace(/^[•\-]\s*/, '')
      listItems.push(
        <li key={idx} className="flex gap-2">
          <span className="mt-0.5 flex-shrink-0 opacity-60">•</span>
          <span>{renderInline(content)}</span>
        </li>
      )
    } else {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${idx}`} className="space-y-1 my-1 ml-1">
            {listItems}
          </ul>
        )
        listItems = []
      }
      if (line === '') {
        elements.push(<div key={idx} className="h-1" />)
      } else if (line.startsWith('|') && line.endsWith('|')) {
        // Simple table row rendering - skip header separators
        if (!line.includes('---')) {
          const cells = line.split('|').filter(c => c.trim())
          elements.push(
            <div key={idx} className="flex gap-4 text-xs font-mono bg-black/10 rounded px-2 py-1 my-0.5">
              {cells.map((cell, i) => (
                <span key={i} className={i === 0 ? 'flex-1' : 'font-semibold'}>{cell.trim()}</span>
              ))}
            </div>
          )
        }
      } else {
        elements.push(<p key={idx}>{renderInline(line)}</p>)
      }
    }
  })

  if (listItems.length > 0) {
    elements.push(
      <ul key="ul-last" className="space-y-1 my-1 ml-1">
        {listItems}
      </ul>
    )
  }

  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-evergreen text-canvas-light rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm space-y-1">
          {elements}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2.5 items-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-evergreen to-evergreen-light flex items-center justify-center flex-shrink-0 text-base mt-0.5">
        🌱
      </div>
      <div className="max-w-[85%] bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-800 space-y-1">
        {elements}
      </div>
    </div>
  )
}

export function RootyChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [quickReplies, setQuickReplies] = useState<string[]>(INITIAL_QUICK_REPLIES)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'bot',
          text: `Hi! I'm **Rooty** 🌱, your RootWork enrollment guide!\n\nI can answer questions about the registration process, the Georgia Promise Scholarship, and the RWFW Saturday Enrichment Program. How can I help you today?`,
        },
      ])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setQuickReplies([])
    setIsTyping(true)

    setTimeout(() => {
      const { response, followUps } = getResponse(text)
      const botMsg: Message = { id: `b-${Date.now()}`, role: 'bot', text: response }
      setMessages(prev => [...prev, botMsg])
      setQuickReplies(followUps)
      setIsTyping(false)
    }, 700)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleReset = () => {
    setMessages([])
    setQuickReplies(INITIAL_QUICK_REPLIES)
    setInput('')
    setIsTyping(false)
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-evergreen-dark to-evergreen px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xl shadow-inner">
                🌱
              </div>
              <div>
                <p className="text-canvas-light font-bold text-sm leading-tight">Rooty</p>
                <p className="text-gold-leaf text-xs">RootWork Enrollment Guide</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Start over"
                className="p-1.5 rounded-lg text-canvas-light/70 hover:text-canvas-light hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-canvas-light/70 hover:text-canvas-light hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <MessageBubble key={msg.id} text={msg.text} role={msg.role} />
            ))}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-evergreen to-evergreen-light flex items-center justify-center flex-shrink-0 text-base">
                  🌱
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-2.5">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {quickReplies.length > 0 && !isTyping && (
            <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-gray-100 bg-white flex-shrink-0">
              {quickReplies.slice(0, 4).map(reply => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="text-xs px-3 py-1.5 rounded-full border border-evergreen/30 text-evergreen hover:bg-evergreen hover:text-canvas-light transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 px-3 py-3 border-t border-gray-100 bg-white flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-evergreen bg-gray-50 text-gray-800 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-xl bg-evergreen text-canvas-light disabled:opacity-40 hover:bg-evergreen-dark transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-evergreen to-evergreen-light text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
        aria-label="Chat with Rooty"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-canvas-light" />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-xl leading-none">🌱</span>
          </div>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-leaf rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Tooltip on hover when closed */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 z-40 pointer-events-none">
          <div className="bg-evergreen-dark text-canvas-light text-xs px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100">
            Chat with Rooty
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-evergreen-dark rotate-45" />
          </div>
        </div>
      )}
    </>
  )
}
