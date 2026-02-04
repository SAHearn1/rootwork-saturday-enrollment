'use client'

import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementOptions } from '@stripe/stripe-js'

interface StripeCardElementProps {
  onReady?: () => void
  onChange?: (complete: boolean) => void
}

const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#234F32', // evergreen
      fontFamily: 'system-ui, sans-serif',
      '::placeholder': {
        color: '#9CA3AF'
      }
    },
    invalid: {
      color: '#DC2626',
      iconColor: '#DC2626'
    }
  },
  hidePostalCode: false
}

export function StripeCardElement({ onReady, onChange }: StripeCardElementProps) {
  return (
    <div className="p-4 border-2 border-gray-300 rounded-lg focus-within:border-evergreen transition-colors">
      <CardElement
        options={CARD_ELEMENT_OPTIONS}
        onReady={onReady}
        onChange={(e) => onChange?.(e.complete)}
      />
    </div>
  )
}
