'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, School, Users, Phone, Heart, DollarSign, 
  CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, 
  Calendar, MapPin, Mail, FileText, GraduationCap, Shield
} from 'lucide-react'
import { 
  allSavannahSchools, 
  eligibleSCCPSSSchools, 
  checkPromiseScholarshipEligibility,
  promiseScholarshipInfo,
  type PromiseScholarshipEligibility 
} from '@/lib/promise-scholarship'
import { RootWorkLogo } from '@/components/RootWorkLogo'

interface StudentFormData {
  // Section 1: Basic Student Information
  firstName: string
  lastName: string
  dateOfBirth: string
  gradeLevel: string
  gender: string
  
  // Section 2: School Information
  currentSchool: string
  isRisingKindergarten: boolean
  enrolledTwoSemesters: boolean
  receivingOtherScholarships: boolean
  
  // Section 3: Parent/Guardian Information
  parentName: string
  parentEmail: string
  parentPhone: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  yearsInGeorgia: number
  isActiveDutyMilitary: boolean
  
  // Section 4: Emergency Contact
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
  
  // Section 5: Medical & Special Needs
  allergies: string
  medications: string
  specialNeeds: string
  hasIepOr504: string
  
  // Section 6: Promise Scholarship
  householdIncomeRange: string
  interestedInPromiseScholarship: boolean
}

const emptyFormData: StudentFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gradeLevel: '',
  gender: '',
  currentSchool: '',
  isRisingKindergarten: false,
  enrolledTwoSemesters: false,
  receivingOtherScholarships: false,
  parentName: '',
  parentEmail: '',
  parentPhone: '',
  streetAddress: '',
  city: '',
  state: 'GA',
  zipCode: '',
  yearsInGeorgia: 0,
  isActiveDutyMilitary: false,
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelationship: '',
  allergies: '',
  medications: '',
  specialNeeds: '',
  hasIepOr504: '',
  householdIncomeRange: '',
  interestedInPromiseScholarship: false
}

export default function StudentPage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(1)
  const [formData, setFormData] = useState<StudentFormData>(emptyFormData)
  const [eligibility, setEligibility] = useState<PromiseScholarshipEligibility | null>(null)

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('studentFormData')
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error('Failed to parse saved form data:', e)
      }
    }
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('studentFormData', JSON.stringify(formData))
  }, [formData])

  // Check eligibility when relevant fields change
  useEffect(() => {
    if (formData.currentSchool && formData.yearsInGeorgia >= 0) {
      const result = checkPromiseScholarshipEligibility(
        formData.currentSchool,
        formData.yearsInGeorgia,
        formData.enrolledTwoSemesters,
        formData.isRisingKindergarten,
        formData.receivingOtherScholarships
      )
      setEligibility(result)
    }
  }, [
    formData.currentSchool,
    formData.yearsInGeorgia,
    formData.enrolledTwoSemesters,
    formData.isRisingKindergarten,
    formData.receivingOtherScholarships
  ])

  const updateField = (field: keyof StudentFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateSection = (section: number): boolean => {
    switch (section) {
      case 1:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.dateOfBirth &&
          formData.gradeLevel
        )
      case 2:
        return !!formData.currentSchool
      case 3:
        return !!(
          formData.parentName &&
          formData.parentEmail &&
          formData.parentPhone &&
          formData.streetAddress &&
          formData.city &&
          formData.state &&
          formData.zipCode &&
          formData.yearsInGeorgia >= 0
        )
      case 4:
        return !!(
          formData.emergencyContactName &&
          formData.emergencyContactPhone &&
          formData.emergencyContactRelationship
        )
      case 5:
        return !!formData.hasIepOr504
      case 6:
        return true // Final review, always valid
      default:
        return false
    }
  }

  const goToNextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, 6))
    }
  }

  const goToPreviousSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 1))
  }

  const handleContinueToPayment = () => {
    router.push('/register/payment')
  }

  const isSchoolEligible = (schoolName: string) => {
    return eligibleSCCPSSSchools.some(
      school => school.name === schoolName
    )
  }

  const gradeLevels = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  const incomeRanges = [
    'Less than $25,000',
    '$25,000 - $49,999',
    '$50,000 - $74,999',
    '$75,000 - $99,999',
    '$100,000 - $149,999',
    '$150,000 or more',
    'Prefer not to say'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-evergreen-dark via-evergreen to-evergreen-light p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-evergreen-dark to-evergreen p-6 md:p-8 rounded-2xl shadow-xl mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg overflow-hidden bg-white">
              <RootWorkLogo width={56} height={56} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-canvas-light">Student Registration</h1>
              <p className="text-gold-leaf text-sm md:text-base">Complete all sections to continue</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-xl p-4 md:p-6 mb-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4, 5, 6].map((section) => (
              <div key={section} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    section === currentSection
                      ? 'bg-evergreen text-white scale-110'
                      : section < currentSection
                      ? 'bg-gold-leaf text-evergreen'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {section < currentSection ? '✓' : section}
                </div>
                <div className="text-xs mt-1 text-center hidden md:block text-gray-600">
                  {section === 1 && 'Student'}
                  {section === 2 && 'School'}
                  {section === 3 && 'Parent'}
                  {section === 4 && 'Emergency'}
                  {section === 5 && 'Medical'}
                  {section === 6 && 'Review'}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-evergreen to-gold-leaf h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentSection / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Sections */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Section 1: Basic Student Information */}
          {currentSection === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Basic Student Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Grade Level *
                  </label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => updateField('gradeLevel', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  >
                    <option value="">Select grade level</option>
                    {gradeLevels.map(grade => (
                      <option key={grade} value={grade}>{grade === 'K' ? 'Kindergarten' : `Grade ${grade}`}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Gender (Optional)
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          )}

          {/* Section 2: School Information */}
          {currentSection === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <School className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">School Information</h2>
              </div>

              <div className="bg-gold-leaf-light p-4 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-gold-leaf-dark mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-evergreen-dark">
                    <strong>Georgia Promise Scholarship:</strong> Schools marked with ⭐ are eligible for up to $6,500 in state funding per student annually.
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Current School *
                </label>
                <select
                  value={formData.currentSchool}
                  onChange={(e) => updateField('currentSchool', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                >
                  <option value="">Select school</option>
                  {allSavannahSchools.map(school => (
                    <option key={school.name} value={school.name}>
                      {isSchoolEligible(school.name) ? '⭐ ' : ''}{school.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-evergreen cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={formData.isRisingKindergarten}
                    onChange={(e) => updateField('isRisingKindergarten', e.target.checked)}
                    className="mt-1 w-5 h-5 text-evergreen rounded focus:ring-evergreen"
                  />
                  <div>
                    <div className="font-semibold text-evergreen">Rising Kindergarten Student</div>
                    <div className="text-sm text-gray-600">Check if student will be entering kindergarten</div>
                  </div>
                </label>

                {!formData.isRisingKindergarten && (
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-evergreen cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      checked={formData.enrolledTwoSemesters}
                      onChange={(e) => updateField('enrolledTwoSemesters', e.target.checked)}
                      className="mt-1 w-5 h-5 text-evergreen rounded focus:ring-evergreen"
                    />
                    <div>
                      <div className="font-semibold text-evergreen">Enrolled for Two Consecutive Semesters</div>
                      <div className="text-sm text-gray-600">Student has been enrolled in a GA public school for 2 consecutive semesters</div>
                    </div>
                  </label>
                )}

                <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-evergreen cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={formData.receivingOtherScholarships}
                    onChange={(e) => updateField('receivingOtherScholarships', e.target.checked)}
                    className="mt-1 w-5 h-5 text-evergreen rounded focus:ring-evergreen"
                  />
                  <div>
                    <div className="font-semibold text-evergreen">Receiving Other GA Scholarships</div>
                    <div className="text-sm text-gray-600">Currently receiving GA Special Needs Scholarship or SSO funds</div>
                  </div>
                </label>
              </div>

              {/* Eligibility Banner */}
              {eligibility && formData.currentSchool && (
                <div className={`p-6 rounded-xl ${eligibility.isEligible ? 'bg-green-50 border-2 border-green-500' : 'bg-orange-50 border-2 border-orange-500'}`}>
                  <div className="flex items-start gap-3 mb-4">
                    {eligibility.isEligible ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-evergreen mb-2">
                        {eligibility.isEligible 
                          ? '🎉 Student May Qualify for Georgia Promise Scholarship!'
                          : 'Georgia Promise Scholarship Eligibility Status'}
                      </h3>
                      {eligibility.isEligible ? (
                        <p className="text-evergreen-dark mb-3">
                          Based on the information provided, this student appears eligible for up to ${promiseScholarshipInfo.amount.toLocaleString()} in state funding.
                        </p>
                      ) : (
                        <p className="text-evergreen-dark mb-3 font-semibold">
                          Eligibility Requirements Not Met:
                        </p>
                      )}
                      <ul className="space-y-2">
                        {eligibility.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-evergreen-dark">
                            <span className="text-gold-leaf-dark mt-0.5">→</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                      {eligibility.nextSteps && (
                        <div className="mt-4 pt-4 border-t border-green-300">
                          <p className="font-semibold text-evergreen mb-2">Next Steps:</p>
                          <ul className="space-y-2">
                            {eligibility.nextSteps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-evergreen-dark">
                                <span className="text-gold-leaf-dark mt-0.5">→</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 3: Parent/Guardian Information */}
          {currentSection === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Parent/Guardian Information</h2>
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => updateField('parentName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  placeholder="Enter parent/guardian name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => updateField('parentEmail', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => updateField('parentPhone', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => updateField('streetAddress', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                    placeholder="Savannah"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                    placeholder="GA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => updateField('zipCode', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                    placeholder="31401"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-900 mb-3">
                  <strong>Required for Promise Scholarship:</strong> Georgia residency verification
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-evergreen mb-2">
                      Years as Georgia Resident *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.yearsInGeorgia}
                      onChange={(e) => updateField('yearsInGeorgia', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-evergreen cursor-pointer transition-all w-full">
                      <input
                        type="checkbox"
                        checked={formData.isActiveDutyMilitary}
                        onChange={(e) => updateField('isActiveDutyMilitary', e.target.checked)}
                        className="w-5 h-5 text-evergreen rounded focus:ring-evergreen"
                      />
                      <div>
                        <div className="font-semibold text-evergreen">Active Duty Military</div>
                        <div className="text-xs text-gray-600">Exempt from residency requirement</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Emergency Contact */}
          {currentSection === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Phone className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Emergency Contact</h2>
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Emergency Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => updateField('emergencyContactName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  placeholder="Enter emergency contact name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Emergency Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => updateField('emergencyContactPhone', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Relationship to Student *
                </label>
                <input
                  type="text"
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => updateField('emergencyContactRelationship', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  placeholder="e.g., Aunt, Grandparent, Family Friend"
                />
              </div>
            </div>
          )}

          {/* Section 5: Medical & Special Needs */}
          {currentSection === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Medical & Special Needs</h2>
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Allergies
                </label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => updateField('allergies', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  rows={3}
                  placeholder="List any allergies (food, environmental, medication, etc.)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Medications
                </label>
                <textarea
                  value={formData.medications}
                  onChange={(e) => updateField('medications', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  rows={3}
                  placeholder="List any medications and dosage instructions"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Special Educational Needs
                </label>
                <textarea
                  value={formData.specialNeeds}
                  onChange={(e) => updateField('specialNeeds', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                  rows={4}
                  placeholder="Describe any special educational needs, accommodations, or support requirements"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-3">
                  Does the student have an IEP or 504 Plan? *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-evergreen cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="hasIepOr504"
                      value="yes"
                      checked={formData.hasIepOr504 === 'yes'}
                      onChange={(e) => updateField('hasIepOr504', e.target.value)}
                      className="w-5 h-5 text-evergreen focus:ring-evergreen"
                    />
                    <span className="font-medium text-evergreen">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-evergreen cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="hasIepOr504"
                      value="no"
                      checked={formData.hasIepOr504 === 'no'}
                      onChange={(e) => updateField('hasIepOr504', e.target.value)}
                      className="w-5 h-5 text-evergreen focus:ring-evergreen"
                    />
                    <span className="font-medium text-evergreen">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Promise Scholarship Interest & Review */}
          {currentSection === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Promise Scholarship Interest & Review</h2>
              </div>

              {/* Promise Scholarship Information */}
              <div className="bg-gradient-to-br from-gold-leaf-light to-canvas-cream p-6 rounded-xl border-2 border-gold-leaf">
                <div className="flex items-start gap-3 mb-4">
                  <DollarSign className="w-8 h-8 text-gold-leaf-dark flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-evergreen mb-2">Georgia Promise Scholarship Program</h3>
                    <p className="text-evergreen-dark text-sm mb-3">{promiseScholarshipInfo.programDetails.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Household Income Range (for priority consideration)
                </label>
                <select
                  value={formData.householdIncomeRange}
                  onChange={(e) => updateField('householdIncomeRange', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-evergreen focus:outline-none"
                >
                  <option value="">Select income range</option>
                  {incomeRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <label className="flex items-start gap-3 p-4 border-2 border-gold-leaf rounded-lg hover:bg-gold-leaf-light cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={formData.interestedInPromiseScholarship}
                  onChange={(e) => updateField('interestedInPromiseScholarship', e.target.checked)}
                  className="mt-1 w-5 h-5 text-evergreen rounded focus:ring-evergreen"
                />
                <div>
                  <div className="font-semibold text-evergreen">Yes, I&apos;m interested in Georgia Promise Scholarship information</div>
                  <div className="text-sm text-gray-600 mt-1">Receive updates about the application process and eligibility requirements</div>
                </div>
              </label>

              {/* Final Eligibility Status */}
              {eligibility && (
                <div className={`p-6 rounded-xl ${eligibility.isEligible ? 'bg-green-50 border-2 border-green-500' : 'bg-orange-50 border-2 border-orange-500'}`}>
                  <div className="flex items-start gap-3">
                    {eligibility.isEligible ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-evergreen mb-2">
                        Eligibility Status
                      </h3>
                      <ul className="space-y-2">
                        {eligibility.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-evergreen-dark">
                            <span className="text-gold-leaf-dark mt-0.5">→</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Review Summary */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-evergreen mb-4">Registration Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Student Name:</span>
                    <span className="font-semibold text-evergreen">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Grade Level:</span>
                    <span className="font-semibold text-evergreen">{formData.gradeLevel === 'K' ? 'Kindergarten' : `Grade ${formData.gradeLevel}`}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Current School:</span>
                    <span className="font-semibold text-evergreen">{formData.currentSchool}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Parent/Guardian:</span>
                    <span className="font-semibold text-evergreen">{formData.parentName}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Contact Email:</span>
                    <span className="font-semibold text-evergreen">{formData.parentEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Contact:</span>
                    <span className="font-semibold text-evergreen">{formData.emergencyContactName}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
            <button
              onClick={goToPreviousSection}
              disabled={currentSection === 1}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            {currentSection < 6 ? (
              <button
                onClick={goToNextSection}
                disabled={!validateSection(currentSection)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-evergreen to-evergreen-light text-canvas-light rounded-lg font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleContinueToPayment}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-leaf to-gold-leaf-dark text-evergreen rounded-lg font-bold text-lg transition-all hover:shadow-xl"
              >
                <Shield className="w-6 h-6" />
                Continue to Payment
                <ArrowRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
