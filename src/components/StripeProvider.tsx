'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

interface StripeProviderProps {
  children: React.ReactNode
}

export function StripeProvider({ children }: StripeProviderProps) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
  
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (key) {
      setStripePromise(loadStripe(key))
    }
  }, [])
  
  if (!stripePromise) {
    return <div>Loading payment system...</div>
  }
  
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  )
}
