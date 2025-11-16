// PaymentForm Component - Card input form with validation

'use client'

import { useState } from 'react'
import { CreditCard, Calendar, Lock, User, MapPin, AlertCircle } from 'lucide-react'
import {
  formatCardNumber,
  formatExpiryDate,
  formatCVC
} from '@/lib/payment-validation'
import type { PaymentFormData, PaymentFormErrors } from '@/lib/payment-types'

interface PaymentFormProps {
  formData: PaymentFormData
  errors: PaymentFormErrors
  onFieldChange: (field: keyof PaymentFormData, value: string) => void
  onFieldBlur: (field: keyof PaymentFormData) => void
  disabled?: boolean
}

export default function PaymentForm({
  formData,
  errors,
  onFieldChange,
  onFieldBlur,
  disabled = false
}: PaymentFormProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (field: keyof PaymentFormData, value: string) => {
    let formattedValue = value

    // Apply formatting based on field type
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (field === 'cvc') {
      formattedValue = formatCVC(value)
    } else if (field === 'billingZip') {
      // Only allow digits for ZIP
      formattedValue = value.replace(/\D/g, '').slice(0, 5)
    }

    onFieldChange(field, formattedValue)
  }

  const handleBlur = (field: keyof PaymentFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    onFieldBlur(field)
  }

  const showError = (field: keyof PaymentFormData) => {
    return touched[field] && errors[field]
  }

  return (
    <div className="space-y-6">
      {/* Card Number */}
      <div>
        <label
          htmlFor="cardNumber"
          className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          Card Number *
        </label>
        <div className="relative">
          <input
            id="cardNumber"
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleChange('cardNumber', e.target.value)}
            onBlur={() => handleBlur('cardNumber')}
            disabled={disabled}
            aria-required="true"
            aria-invalid={!!showError('cardNumber')}
            aria-describedby={showError('cardNumber') ? 'cardNumber-error' : 'cardNumber-description'}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              showError('cardNumber')
                ? 'border-red-500 focus:border-red-600 bg-red-50'
                : 'border-gray-300 focus:border-evergreen'
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        {!showError('cardNumber') && (
          <p id="cardNumber-description" className="text-xs text-gray-600 mt-1">
            Enter your 13-19 digit card number
          </p>
        )}
        {showError('cardNumber') && (
          <div id="cardNumber-error" className="flex items-center gap-2 mt-2 text-red-600" role="alert">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{errors.cardNumber}</span>
          </div>
        )}
      </div>

      {/* Expiry Date and CVC */}
      <div className="grid grid-cols-2 gap-4">
        {/* Expiry Date */}
        <div>
          <label
            htmlFor="expiryDate"
            className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Expiry Date *
          </label>
          <input
            id="expiryDate"
            type="text"
            value={formData.expiryDate}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            onBlur={() => handleBlur('expiryDate')}
            disabled={disabled}
            aria-required="true"
            aria-invalid={!!showError('expiryDate')}
            aria-describedby={showError('expiryDate') ? 'expiryDate-error' : 'expiryDate-description'}
            placeholder="MM/YY"
            maxLength={5}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              showError('expiryDate')
                ? 'border-red-500 focus:border-red-600 bg-red-50'
                : 'border-gray-300 focus:border-evergreen'
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          {!showError('expiryDate') && (
            <p id="expiryDate-description" className="text-xs text-gray-600 mt-1">
              MM/YY format
            </p>
          )}
          {showError('expiryDate') && (
            <div id="expiryDate-error" className="flex items-center gap-1 mt-2 text-red-600" role="alert">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs">{errors.expiryDate}</span>
            </div>
          )}
        </div>

        {/* CVC */}
        <div>
          <label
            htmlFor="cvc"
            className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            CVC *
          </label>
          <input
            id="cvc"
            type="text"
            value={formData.cvc}
            onChange={(e) => handleChange('cvc', e.target.value)}
            onBlur={() => handleBlur('cvc')}
            disabled={disabled}
            aria-required="true"
            aria-invalid={!!showError('cvc')}
            aria-describedby={showError('cvc') ? 'cvc-error' : 'cvc-description'}
            placeholder="123"
            maxLength={4}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              showError('cvc')
                ? 'border-red-500 focus:border-red-600 bg-red-50'
                : 'border-gray-300 focus:border-evergreen'
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          {!showError('cvc') && (
            <p id="cvc-description" className="text-xs text-gray-600 mt-1">
              3-4 digits on back
            </p>
          )}
          {showError('cvc') && (
            <div id="cvc-error" className="flex items-center gap-1 mt-2 text-red-600" role="alert">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs">{errors.cvc}</span>
            </div>
          )}
        </div>
      </div>

      {/* Cardholder Name */}
      <div>
        <label
          htmlFor="cardholderName"
          className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Cardholder Name *
        </label>
        <input
          id="cardholderName"
          type="text"
          value={formData.cardholderName}
          onChange={(e) => handleChange('cardholderName', e.target.value)}
          onBlur={() => handleBlur('cardholderName')}
          disabled={disabled}
          aria-required="true"
          aria-invalid={!!showError('cardholderName')}
          aria-describedby={showError('cardholderName') ? 'cardholderName-error' : 'cardholderName-description'}
          placeholder="John Smith"
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
            showError('cardholderName')
              ? 'border-red-500 focus:border-red-600 bg-red-50'
              : 'border-gray-300 focus:border-evergreen'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {!showError('cardholderName') && (
          <p id="cardholderName-description" className="text-xs text-gray-600 mt-1">
            Name as it appears on card
          </p>
        )}
        {showError('cardholderName') && (
          <div id="cardholderName-error" className="flex items-center gap-2 mt-2 text-red-600" role="alert">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{errors.cardholderName}</span>
          </div>
        )}
      </div>

      {/* Billing ZIP */}
      <div>
        <label
          htmlFor="billingZip"
          className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          Billing ZIP Code *
        </label>
        <input
          id="billingZip"
          type="text"
          value={formData.billingZip}
          onChange={(e) => handleChange('billingZip', e.target.value)}
          onBlur={() => handleBlur('billingZip')}
          disabled={disabled}
          aria-required="true"
          aria-invalid={!!showError('billingZip')}
          aria-describedby={showError('billingZip') ? 'billingZip-error' : 'billingZip-description'}
          placeholder="31401"
          maxLength={5}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
            showError('billingZip')
              ? 'border-red-500 focus:border-red-600 bg-red-50'
              : 'border-gray-300 focus:border-evergreen'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {!showError('billingZip') && (
          <p id="billingZip-description" className="text-xs text-gray-600 mt-1">
            5-digit ZIP code
          </p>
        )}
        {showError('billingZip') && (
          <div id="billingZip-error" className="flex items-center gap-2 mt-2 text-red-600" role="alert">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{errors.billingZip}</span>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Secure Payment</p>
            <p className="text-xs text-blue-800">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
