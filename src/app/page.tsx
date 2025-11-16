'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/register')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-evergreen-dark to-evergreen">
      <div className="text-center text-canvas-light">
        <h1 className="text-4xl font-bold mb-4">RootWork Framework</h1>
        <p className="text-xl">Redirecting to registration...</p>
      </div>
    </div>
  )
}
