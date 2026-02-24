// Payment-related TypeScript interfaces and types

export interface PaymentFormData {
  cardNumber: string
  expiryDate: string
  cvc: string
  cardholderName: string
  billingZip: string
}

export interface PaymentCalculation {
  sessionCost: number
  curriculumCost: number
  subtotal: number
  depositAmount: number
  balanceDue: number
  totalDue: number
  isGPSEligible: boolean
}

export interface PaymentFormErrors {
  cardNumber?: string
  expiryDate?: string
  cvc?: string
  cardholderName?: string
  billingZip?: string
  general?: string
}

export interface SessionDetails {
  id: string
  date: string
  time: string
  location: string
  gradeLevel: string | null
  programType: string
}

export interface StudentDetails {
  firstName: string
  lastName: string
  gradeLevel?: string
  currentSchool?: string
  programType: string
}

export type PaymentType = 'full' | 'deposit' | 'gps'
