// Payment Page - Main payment flow with all features

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import OrderSummary from './OrderSummary'
import PaymentForm from './PaymentForm'
import {
  validateCardNumber,
  validateExpiryDate,
  validateCVC,
  validateCardholderName,
  validateBillingZip,
  calculatePayment
} from '@/lib/payment-validation'
import type { PaymentFormData, PaymentFormErrors } from '@/lib/payment-types'
import { checkPromiseScholarshipEligibility, promiseScholarshipInfo } from '@/lib/promise-scholarship'

interface StudentFormData {
  firstName: string
  lastName: string
  gradeLevel: string
  currentSchool: string
  yearsInGeorgia: number
  enrolledTwoSemesters: boolean
  isRisingKindergarten: boolean
  receivingOtherScholarships: boolean
}

export default function PaymentPage() {
  const router = useRouter()
  
  // State for form data
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: '',
    billingZip: ''
  })
  
  // State for form errors
  const [errors, setErrors] = useState<PaymentFormErrors>({})
  
  // State for payment options
  const [includeCurriculum, setIncludeCurriculum] = useState(false)
  const [paymentType, setPaymentType] = useState<'full' | 'deposit' | 'gps'>('full')
  
  // State for loading and submission
  const [isProcessing, setIsProcessing] = useState(false)
  const [isGPSEligible, setIsGPSEligible] = useState(false)
  
  // Student and session data from localStorage
  const [studentData, setStudentData] = useState<StudentFormData | null>(null)

  // Load data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('studentFormData')
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as StudentFormData
        setStudentData(parsed)
        
        // Check GPS eligibility
        if (parsed.currentSchool) {
          const eligibility = checkPromiseScholarshipEligibility(
            parsed.currentSchool,
            parsed.yearsInGeorgia || 0,
            parsed.enrolledTwoSemesters || false,
            parsed.isRisingKindergarten || false,
            parsed.receivingOtherScholarships || false
          )
          
          setIsGPSEligible(eligibility.isEligible)
          
          // Auto-select GPS payment if eligible
          if (eligibility.isEligible) {
            setPaymentType('gps')
          }
        }
      } catch (e) {
        console.error('Failed to parse student data:', e)
      }
    }
  }, [])

  // Calculate payment amounts
  const payment = calculatePayment(isGPSEligible && paymentType === 'gps', includeCurriculum, paymentType)

  // Handle field changes with real-time validation
  const handleFieldChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Validate individual field on blur
  const handleFieldBlur = (field: keyof PaymentFormData) => {
    let error: string | undefined
    
    switch (field) {
      case 'cardNumber':
        error = validateCardNumber(formData.cardNumber)
        break
      case 'expiryDate':
        error = validateExpiryDate(formData.expiryDate)
        break
      case 'cvc':
        error = validateCVC(formData.cvc)
        break
      case 'cardholderName':
        error = validateCardholderName(formData.cardholderName)
        break
      case 'billingZip':
        error = validateBillingZip(formData.billingZip)
        break
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  // Validate entire form before submission
  const validateForm = (): boolean => {
    const newErrors: PaymentFormErrors = {}
    
    // Skip card validation if GPS covers everything and no curriculum
    if (paymentType === 'gps' && !includeCurriculum) {
      return true
    }
    
    const cardNumberError = validateCardNumber(formData.cardNumber)
    if (cardNumberError) newErrors.cardNumber = cardNumberError
    
    const expiryError = validateExpiryDate(formData.expiryDate)
    if (expiryError) newErrors.expiryDate = expiryError
    
    const cvcError = validateCVC(formData.cvc)
    if (cvcError) newErrors.cvc = cvcError
    
    const nameError = validateCardholderName(formData.cardholderName)
    if (nameError) newErrors.cardholderName = nameError
    
    const zipError = validateBillingZip(formData.billingZip)
    if (zipError) newErrors.billingZip = zipError
    
    setErrors(newErrors)
    
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      setErrors(prev => ({
        ...prev,
        general: 'Please fix the errors above before continuing.'
      }))
      
      // Announce error to screen readers
      const errorMessage = 'Form validation failed. Please fix the errors and try again.'
      const announcement = document.createElement('div')
      announcement.setAttribute('role', 'alert')
      announcement.setAttribute('aria-live', 'assertive')
      announcement.className = 'sr-only'
      announcement.textContent = errorMessage
      document.body.appendChild(announcement)
      setTimeout(() => document.body.removeChild(announcement), 1000)
      
      return
    }
    
    setIsProcessing(true)
    setErrors({})
    
    try {
      // Simulate payment processing (in real app, this would call Stripe)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Prepare confirmation data
      const confirmationParams = new URLSearchParams({
        sessionDate: 'January 15, 2026', // Would come from session data
        sessionTime: '9:00 AM - 12:00 PM', // Would come from session data
        sessionLocation: 'RootWork Community Center', // Would come from session data
        studentName: `${studentData?.firstName || ''} ${studentData?.lastName || ''}`,
        studentGrade: studentData?.gradeLevel || '',
        promiseEligible: (isGPSEligible && paymentType === 'gps').toString(),
        includeCurriculum: includeCurriculum.toString(),
        paymentType: paymentType,
        amountPaid: payment.totalDue.toString(),
        balanceDue: payment.balanceDue.toString()
      })
      
      // Navigate to confirmation page
      router.push(`/register/confirmation?${confirmationParams.toString()}`)
    } catch (error) {
      console.error('Payment error:', error)
      setErrors({
        general: 'Payment processing failed. Please try again or contact support.'
      })
      setIsProcessing(false)
    }
  }

  const handleBack = () => {
    router.push('/register/student')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-evergreen-dark via-evergreen to-evergreen-light p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-evergreen-dark to-evergreen p-6 md:p-8 rounded-2xl shadow-xl mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gold-leaf to-gold-leaf-dark rounded-full flex items-center justify-center text-3xl shadow-lg">
              💳
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-canvas-light">Payment</h1>
              <p className="text-gold-leaf text-sm md:text-base">Complete your registration</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-evergreen mb-6">Payment Information</h2>

              {/* GPS Eligibility Banner */}
              {isGPSEligible && (
                <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        🎉 Georgia Promise Scholarship Eligible!
                      </h3>
                      <p className="text-green-700 mb-3">
                        Based on your information, you may qualify for the Georgia Promise Scholarship. 
                        The ${promiseScholarshipInfo.amount.toLocaleString()} scholarship can cover your session costs.
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <p className="text-sm text-green-800 font-semibold mb-2">
                          ⚠️ Important: You must still apply for the scholarship
                        </p>
                        <p className="text-xs text-green-700">
                          Application windows: March, May, August, or November 2026. 
                          After registration, you&apos;ll receive detailed instructions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-evergreen mb-4">Select Payment Option</h3>
                <div className="space-y-3">
                  {/* GPS Payment Option */}
                  {isGPSEligible && (
                    <label
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentType === 'gps'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        value="gps"
                        checked={paymentType === 'gps'}
                        onChange={(e) => setPaymentType(e.target.value as 'gps')}
                        className="mt-1 w-5 h-5 text-green-600 focus:ring-green-500"
                        aria-label="Pay with Georgia Promise Scholarship"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-green-800 flex items-center gap-2">
                          Georgia Promise Scholarship
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        </div>
                        <div className="text-sm text-green-700 mt-1">
                          Session cost covered by scholarship (you still need to apply)
                        </div>
                      </div>
                    </label>
                  )}

                  {/* Full Payment Option */}
                  <label
                    className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentType === 'full'
                        ? 'border-evergreen bg-canvas-cream'
                        : 'border-gray-300 hover:border-evergreen'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value="full"
                      checked={paymentType === 'full'}
                      onChange={(e) => setPaymentType(e.target.value as 'full')}
                      className="mt-1 w-5 h-5 text-evergreen focus:ring-evergreen"
                      aria-label="Pay full amount now"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-evergreen">Full Payment</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Pay the full amount today
                      </div>
                    </div>
                  </label>

                  {/* Deposit Option */}
                  <label
                    className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentType === 'deposit'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value="deposit"
                      checked={paymentType === 'deposit'}
                      onChange={(e) => setPaymentType(e.target.value as 'deposit')}
                      className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500"
                      aria-label="Pay 50% deposit now"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-blue-800">50% Deposit</div>
                      <div className="text-sm text-blue-700 mt-1">
                        Pay half now, remainder before your session
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Curriculum Add-on */}
              <div className="mb-6">
                <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-gold-leaf cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={includeCurriculum}
                    onChange={(e) => setIncludeCurriculum(e.target.checked)}
                    className="mt-1 w-5 h-5 text-evergreen rounded focus:ring-evergreen"
                    aria-label="Add RootWork K-12 Curriculum Guide for $35"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-evergreen">
                      Add RootWork K-12 Curriculum Guide (+$35.00)
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Comprehensive guide for year-round learning and character development
                    </div>
                  </div>
                </label>
              </div>

              {/* Payment Form - Only show if payment is needed */}
              {(paymentType !== 'gps' || includeCurriculum) && (
                <>
                  <div className="border-t-2 border-gray-200 pt-6 mb-6">
                    <h3 className="text-lg font-bold text-evergreen mb-4">Card Information</h3>
                    <PaymentForm
                      formData={formData}
                      errors={errors}
                      onFieldChange={handleFieldChange}
                      onFieldBlur={handleFieldBlur}
                      disabled={isProcessing}
                    />
                  </div>
                </>
              )}

              {/* General Error */}
              {errors.general && (
                <div
                  className="mb-6 bg-red-50 border-2 border-red-500 rounded-lg p-4"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm font-semibold text-red-800">{errors.general}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Student Info
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-evergreen to-evergreen-light text-canvas-light rounded-lg font-bold text-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <CheckCircle className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              isGPSEligible={isGPSEligible && paymentType === 'gps'}
              includeCurriculum={includeCurriculum}
              paymentType={paymentType}
              sessionCost={payment.sessionCost}
              curriculumCost={payment.curriculumCost}
              subtotal={payment.subtotal}
              depositAmount={payment.depositAmount}
              balanceDue={payment.balanceDue}
              totalDue={payment.totalDue}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
