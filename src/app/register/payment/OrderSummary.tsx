// OrderSummary Component - Displays payment breakdown

'use client'

import { DollarSign, Book, CheckCircle } from 'lucide-react'

interface OrderSummaryProps {
  isGPSEligible: boolean
  includeCurriculum: boolean
  paymentType: 'full' | 'deposit' | 'gps'
  sessionCost: number
  curriculumCost: number
  subtotal: number
  depositAmount: number
  balanceDue: number
  totalDue: number
}

export default function OrderSummary({
  isGPSEligible,
  includeCurriculum,
  paymentType,
  sessionCost,
  curriculumCost,
  subtotal,
  depositAmount,
  balanceDue,
  totalDue
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-6">
      <h2 className="text-2xl font-bold text-evergreen mb-6 flex items-center gap-3">
        <DollarSign className="w-6 h-6" />
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {/* Session Cost */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Saturday Session</span>
          <span className={`font-semibold ${isGPSEligible ? 'line-through text-gray-400' : 'text-evergreen'}`}>
            ${sessionCost.toFixed(2)}
          </span>
        </div>

        {/* GPS Discount */}
        {isGPSEligible && (
          <div className="flex justify-between items-center text-green-600 bg-green-50 rounded-lg p-3 -mt-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-semibold">GPS Scholarship</span>
            </div>
            <span className="font-bold">-$75.00</span>
          </div>
        )}

        {/* Curriculum Add-on */}
        {includeCurriculum && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4 text-evergreen" />
              <span className="text-gray-700">Curriculum Guide</span>
            </div>
            <span className="font-semibold text-evergreen">${curriculumCost.toFixed(2)}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t-2 border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Type Breakdown */}
        {paymentType === 'deposit' && (
          <>
            <div className="flex justify-between items-center text-blue-600 bg-blue-50 rounded-lg p-3">
              <span className="font-semibold">Deposit (50%)</span>
              <span className="font-bold">${depositAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Balance due before session</span>
              <span className="font-semibold">${balanceDue.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      {/* Total */}
      <div className="border-t-2 border-evergreen pt-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-evergreen">Total Due Today</span>
          <span className="text-3xl font-bold text-evergreen">${totalDue.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Type Labels */}
      <div className="mt-6 space-y-2">
        {paymentType === 'gps' && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Session covered by Georgia Promise Scholarship
            </p>
          </div>
        )}
        
        {paymentType === 'deposit' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Remaining balance of ${balanceDue.toFixed(2)} due before your session date.
            </p>
          </div>
        )}
        
        {paymentType === 'full' && !isGPSEligible && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-700">
              <strong>Full Payment:</strong> No additional payment required.
            </p>
          </div>
        )}
      </div>

      {/* Demo Mode Notice */}
      <div className="mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
        <p className="text-sm font-bold text-yellow-900 mb-1">🔧 Demo Mode</p>
        <p className="text-xs text-yellow-800">
          This is a demonstration. No actual charges will be processed.
        </p>
      </div>
    </div>
  )
}
