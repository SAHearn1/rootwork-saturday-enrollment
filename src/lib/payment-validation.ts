// Payment validation and formatting utilities

/**
 * Implements the Luhn algorithm for credit card number validation
 * @param cardNumber - The card number to validate (digits only)
 * @returns true if the card number is valid, false otherwise
 */
export function validateCardNumberLuhn(cardNumber: string): boolean {
  // Remove all non-digit characters
  const digits = cardNumber.replace(/\D/g, '')
  
  // Card number must be at least 13 digits
  if (digits.length < 13 || digits.length > 19) {
    return false
  }
  
  let sum = 0
  let isEven = false
  
  // Loop through values starting from the rightmost digit
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)
    
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

/**
 * Formats a card number with spaces (4 digits per group)
 * @param value - The raw card number input
 * @returns Formatted card number (e.g., "4242 4242 4242 4242")
 */
export function formatCardNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '')
  
  // Limit to 16 digits
  const limited = digits.slice(0, 16)
  
  // Add spaces every 4 digits
  const groups = limited.match(/.{1,4}/g) || []
  return groups.join(' ')
}

/**
 * Formats expiry date as MM/YY
 * @param value - The raw expiry date input
 * @returns Formatted expiry date (e.g., "12/25")
 */
export function formatExpiryDate(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '')
  
  // Limit to 4 digits
  const limited = digits.slice(0, 4)
  
  // Add slash after 2 digits
  if (limited.length >= 2) {
    return `${limited.slice(0, 2)}/${limited.slice(2)}`
  }
  
  return limited
}

/**
 * Formats CVC with digit limit (3-4 digits)
 * @param value - The raw CVC input
 * @returns Formatted CVC (3-4 digits)
 */
export function formatCVC(value: string): string {
  // Remove all non-digit characters and limit to 4 digits
  return value.replace(/\D/g, '').slice(0, 4)
}

/**
 * Validates card number format and Luhn algorithm
 * @param cardNumber - The card number to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validateCardNumber(cardNumber: string): string | undefined {
  const digits = cardNumber.replace(/\D/g, '')
  
  if (!digits) {
    return 'Card number is required'
  }
  
  if (digits.length < 13) {
    return 'Card number must be at least 13 digits'
  }
  
  if (digits.length > 19) {
    return 'Card number must be no more than 19 digits'
  }
  
  if (!validateCardNumberLuhn(cardNumber)) {
    return 'Invalid card number'
  }
  
  return undefined
}

/**
 * Validates expiry date (must be MM/YY format and not expired)
 * @param expiryDate - The expiry date to validate (MM/YY format)
 * @returns Error message if invalid, undefined if valid
 */
export function validateExpiryDate(expiryDate: string): string | undefined {
  const digits = expiryDate.replace(/\D/g, '')
  
  if (!digits) {
    return 'Expiry date is required'
  }
  
  if (digits.length !== 4) {
    return 'Expiry date must be MM/YY format'
  }
  
  const month = parseInt(digits.slice(0, 2), 10)
  const year = parseInt(digits.slice(2), 10)
  
  if (month < 1 || month > 12) {
    return 'Invalid month (must be 01-12)'
  }
  
  // Check if card is expired
  const now = new Date()
  const currentYear = now.getFullYear() % 100 // Get last 2 digits of year
  const currentMonth = now.getMonth() + 1 // 0-indexed
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'Card is expired'
  }
  
  return undefined
}

/**
 * Validates CVC (must be 3-4 digits)
 * @param cvc - The CVC to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validateCVC(cvc: string): string | undefined {
  const digits = cvc.replace(/\D/g, '')
  
  if (!digits) {
    return 'CVC is required'
  }
  
  if (digits.length < 3) {
    return 'CVC must be 3-4 digits'
  }
  
  return undefined
}

/**
 * Validates cardholder name (must not be empty)
 * @param name - The cardholder name to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validateCardholderName(name: string): string | undefined {
  const trimmed = name.trim()
  
  if (!trimmed) {
    return 'Cardholder name is required'
  }
  
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters'
  }
  
  return undefined
}

/**
 * Validates billing ZIP code (5 digits)
 * @param zip - The ZIP code to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validateBillingZip(zip: string): string | undefined {
  const digits = zip.replace(/\D/g, '')
  
  if (!digits) {
    return 'Billing ZIP code is required'
  }
  
  if (digits.length !== 5) {
    return 'ZIP code must be 5 digits'
  }
  
  return undefined
}

/**
 * Calculates payment amounts based on GPS eligibility and options
 */
export function calculatePayment(
  isGPSEligible: boolean,
  includeCurriculum: boolean,
  paymentType: 'full' | 'deposit' | 'gps'
): {
  sessionCost: number
  curriculumCost: number
  subtotal: number
  depositAmount: number
  balanceDue: number
  totalDue: number
} {
  const sessionCost = isGPSEligible ? 0 : 75
  const curriculumCost = includeCurriculum ? 35 : 0
  const subtotal = sessionCost + curriculumCost
  
  let depositAmount = 0
  let balanceDue = 0
  let totalDue = 0
  
  if (paymentType === 'gps') {
    // GPS covers session, only pay for curriculum if selected
    totalDue = curriculumCost
    depositAmount = 0
    balanceDue = 0
  } else if (paymentType === 'deposit') {
    // Pay 50% deposit now
    depositAmount = Math.ceil(subtotal * 0.5)
    balanceDue = subtotal - depositAmount
    totalDue = depositAmount
  } else {
    // Pay full amount
    totalDue = subtotal
    depositAmount = 0
    balanceDue = 0
  }
  
  return {
    sessionCost,
    curriculumCost,
    subtotal,
    depositAmount,
    balanceDue,
    totalDue
  }
}
