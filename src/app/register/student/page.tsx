'use client'

import { useState, useEffect } from 'react'
import { 
  User, 
  School, 
  Users, 
  Phone, 
  Heart, 
  Award,
  ChevronRight,
  ChevronLeft,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { 
  eligibleSCCPSSSchools, 
  allSavannahSchools,
  checkPromiseScholarshipEligibility,
  type PromiseScholarshipEligibility 
} from '@/lib/promise-scholarship'

interface StudentFormData {
  // Section 1: Basic Info
  firstName: string
  lastName: string
  dateOfBirth: string
  grade: string
  
  // Section 2: School Info
  currentSchool: string
  schoolDistrict: string
  yearsInGeorgia: string
  enrolledTwoSemesters: string
  isRisingKindergarten: string
  receivingOtherScholarships: string
  
  // Section 3: Parent/Guardian
  parentFirstName: string
  parentLastName: string
  parentEmail: string
  parentPhone: string
  relationshipToStudent: string
  
  // Section 4: Emergency Contact
  emergencyName: string
  emergencyPhone: string
  emergencyRelationship: string
  
  // Section 5: Medical
  allergies: string
  medications: string
  specialNeeds: string
  
  // Section 6: Promise Scholarship Interest
  interestedInScholarship: string
  scholarshipNotes: string
}

export default function StudentPage() {
  const [currentSection, setCurrentSection] = useState(1)
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    grade: '',
    currentSchool: '',
    schoolDistrict: 'Savannah-Chatham',
    yearsInGeorgia: '',
    enrolledTwoSemesters: '',
    isRisingKindergarten: '',
    receivingOtherScholarships: '',
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    relationshipToStudent: 'Parent',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    allergies: '',
    medications: '',
    specialNeeds: '',
    interestedInScholarship: '',
    scholarshipNotes: ''
  })
  
  const [eligibility, setEligibility] = useState<PromiseScholarshipEligibility | null>(null)
  const [saveMessage, setSaveMessage] = useState('')

  // Load form data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('studentFormData')
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved form data:', e)
      }
    }
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('studentFormData', JSON.stringify(formData))
    setSaveMessage('Changes saved automatically')
    const timer = setTimeout(() => setSaveMessage(''), 2000)
    return () => clearTimeout(timer)
  }, [formData])

  // Check eligibility when Section 2 is completed
  useEffect(() => {
    if (formData.currentSchool && formData.yearsInGeorgia && 
        (formData.enrolledTwoSemesters || formData.isRisingKindergarten) &&
        formData.receivingOtherScholarships) {
      const result = checkPromiseScholarshipEligibility(
        formData.currentSchool,
        parseInt(formData.yearsInGeorgia) || 0,
        formData.enrolledTwoSemesters === 'yes',
        formData.isRisingKindergarten === 'yes',
        formData.receivingOtherScholarships === 'yes'
      )
      setEligibility(result)
    }
  }, [formData.currentSchool, formData.yearsInGeorgia, formData.enrolledTwoSemesters, 
      formData.isRisingKindergarten, formData.receivingOtherScholarships])

  const updateField = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isSchoolEligible = (schoolName: string) => {
    return eligibleSCCPSSSchools.some(
      school => school.name.toLowerCase() === schoolName.toLowerCase()
    )
  }

  const validateSection = (section: number): boolean => {
    switch (section) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.dateOfBirth && formData.grade)
      case 2:
        return !!(formData.currentSchool && formData.yearsInGeorgia && 
                 (formData.enrolledTwoSemesters || formData.isRisingKindergarten) &&
                 formData.receivingOtherScholarships)
      case 3:
        return !!(formData.parentFirstName && formData.parentLastName && 
                 formData.parentEmail && formData.parentPhone && formData.relationshipToStudent)
      case 4:
        return !!(formData.emergencyName && formData.emergencyPhone && formData.emergencyRelationship)
      case 5:
        return true // Medical section is optional
      case 6:
        return !!(formData.interestedInScholarship)
      default:
        return false
    }
  }

  const nextSection = () => {
    if (validateSection(currentSection) && currentSection < 6) {
      setCurrentSection(currentSection + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    if (!validateSection(6)) return
    
    const sessionId = localStorage.getItem('selectedSessionId')
    if (!sessionId) {
      alert('No session selected. Please go back and select a session.')
      return
    }

    // Here you would submit the form data to your API
    alert('Form submitted successfully! (API integration pending)')
    // router.push('/register/confirmation')
  }

  const sections = [
    { number: 1, title: 'Basic Info', icon: User },
    { number: 2, title: 'School Info', icon: School },
    { number: 3, title: 'Parent/Guardian', icon: Users },
    { number: 4, title: 'Emergency Contact', icon: Phone },
    { number: 5, title: 'Medical', icon: Heart },
    { number: 6, title: 'Promise Scholarship', icon: Award }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-evergreen-dark via-evergreen to-evergreen-light p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-evergreen-dark to-evergreen p-8 rounded-2xl shadow-xl mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gold-leaf to-gold-dark rounded-full flex items-center justify-center text-3xl shadow-lg">
              🌱
            </div>
            <div>
              <h1 className="text-3xl font-bold text-canvas-light">Student Registration</h1>
              <p className="text-gold-leaf">Complete all sections to register</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 mt-6">
            {sections.map((section, idx) => (
              <div key={section.number} className="flex-1 flex items-center">
                <div
                  className={`flex-1 h-2 rounded-full ${
                    section.number <= currentSection
                      ? 'bg-gold-leaf'
                      : 'bg-evergreen-light'
                  }`}
                />
                {idx < sections.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gold-leaf mx-1" />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {sections.map((section) => (
              <div
                key={section.number}
                className={`text-xs ${
                  section.number === currentSection
                    ? 'text-gold-leaf font-bold'
                    : section.number < currentSection
                    ? 'text-canvas-light'
                    : 'text-evergreen-light'
                }`}
              >
                {section.number}. {section.title}
              </div>
            ))}
          </div>
        </div>

        {/* Save Indicator */}
        {saveMessage && (
          <div className="fixed top-4 right-4 bg-evergreen text-canvas-light px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <Save className="w-4 h-4" />
            {saveMessage}
          </div>
        )}

        {/* Eligibility Banner */}
        {eligibility && currentSection >= 2 && (
          <div className={`rounded-xl p-6 mb-6 shadow-lg ${
            eligibility.isEligible
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-orange-50 border-2 border-orange-500'
          }`}>
            <div className="flex items-start gap-3">
              {eligibility.isEligible ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-2 ${
                  eligibility.isEligible ? 'text-green-800' : 'text-orange-800'
                }`}>
                  {eligibility.isEligible 
                    ? '🎉 Eligible for Georgia Promise Scholarship!' 
                    : 'Georgia Promise Scholarship Eligibility'}
                </h3>
                <ul className={`space-y-1 ${
                  eligibility.isEligible ? 'text-green-700' : 'text-orange-700'
                }`}>
                  {eligibility.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span>{eligibility.isEligible ? '✓' : '•'}</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
                {eligibility.nextSteps && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <h4 className="font-bold text-green-800 mb-2">Next Steps:</h4>
                    <ol className="space-y-1 text-green-700">
                      {eligibility.nextSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-bold">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Section 1: Basic Info */}
          {currentSection === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gold-leaf">
                <User className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Basic Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                    required
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    Current Grade *
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => updateField('grade', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                    required
                  >
                    <option value="">Select grade...</option>
                    <option value="K">Kindergarten</option>
                    <option value="1">1st Grade</option>
                    <option value="2">2nd Grade</option>
                    <option value="3">3rd Grade</option>
                    <option value="4">4th Grade</option>
                    <option value="5">5th Grade</option>
                    <option value="6">6th Grade</option>
                    <option value="7">7th Grade</option>
                    <option value="8">8th Grade</option>
                    <option value="9">9th Grade</option>
                    <option value="10">10th Grade</option>
                    <option value="11">11th Grade</option>
                    <option value="12">12th Grade</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: School Info */}
          {currentSection === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gold-leaf">
                <School className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">School Information</h2>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Current School *
                </label>
                <select
                  value={formData.currentSchool}
                  onChange={(e) => updateField('currentSchool', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  required
                >
                  <option value="">Select school...</option>
                  {allSavannahSchools.map((school) => (
                    <option key={school.name} value={school.name}>
                      {isSchoolEligible(school.name) ? '⭐ ' : ''}{school.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  ⭐ Schools marked with a star are eligible for Georgia Promise Scholarship
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Years Living in Georgia *
                </label>
                <select
                  value={formData.yearsInGeorgia}
                  onChange={(e) => updateField('yearsInGeorgia', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  required
                >
                  <option value="">Select...</option>
                  <option value="0">Less than 1 year</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Enrolled in GA Public School for 2 Consecutive Semesters? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="enrolledTwoSemesters"
                      value="yes"
                      checked={formData.enrolledTwoSemesters === 'yes'}
                      onChange={(e) => updateField('enrolledTwoSemesters', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="enrolledTwoSemesters"
                      value="no"
                      checked={formData.enrolledTwoSemesters === 'no'}
                      onChange={(e) => updateField('enrolledTwoSemesters', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Rising Kindergarten Student?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="isRisingKindergarten"
                      value="yes"
                      checked={formData.isRisingKindergarten === 'yes'}
                      onChange={(e) => updateField('isRisingKindergarten', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="isRisingKindergarten"
                      value="no"
                      checked={formData.isRisingKindergarten === 'no'}
                      onChange={(e) => updateField('isRisingKindergarten', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Receiving GA Special Needs or SSO Scholarships? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="receivingOtherScholarships"
                      value="yes"
                      checked={formData.receivingOtherScholarships === 'yes'}
                      onChange={(e) => updateField('receivingOtherScholarships', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="receivingOtherScholarships"
                      value="no"
                      checked={formData.receivingOtherScholarships === 'no'}
                      onChange={(e) => updateField('receivingOtherScholarships', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Parent/Guardian */}
          {currentSection === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gold-leaf">
                <Users className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Parent/Guardian Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.parentFirstName}
                    onChange={(e) => updateField('parentFirstName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.parentLastName}
                    onChange={(e) => updateField('parentLastName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => updateField('parentEmail', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-evergreen mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => updateField('parentPhone', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                    placeholder="(555) 555-5555"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Relationship to Student *
                </label>
                <select
                  value={formData.relationshipToStudent}
                  onChange={(e) => updateField('relationshipToStudent', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  required
                >
                  <option value="Parent">Parent</option>
                  <option value="Guardian">Legal Guardian</option>
                  <option value="Grandparent">Grandparent</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Section 4: Emergency Contact */}
          {currentSection === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gold-leaf">
                <Phone className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Emergency Contact</h2>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.emergencyName}
                  onChange={(e) => updateField('emergencyName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => updateField('emergencyPhone', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  placeholder="(555) 555-5555"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Relationship to Student *
                </label>
                <input
                  type="text"
                  value={formData.emergencyRelationship}
                  onChange={(e) => updateField('emergencyRelationship', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  placeholder="e.g., Aunt, Uncle, Family Friend"
                  required
                />
              </div>
            </div>
          )}

          {/* Section 5: Medical */}
          {currentSection === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gold-leaf">
                <Heart className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Medical Information</h2>
              </div>
              
              <p className="text-gray-600 italic">
                This information helps us ensure your child&apos;s safety during our program. All fields are optional but recommended.
              </p>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Allergies (Food, Environmental, etc.)
                </label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => updateField('allergies', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  rows={3}
                  placeholder="List any allergies or write 'None'"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Current Medications
                </label>
                <textarea
                  value={formData.medications}
                  onChange={(e) => updateField('medications', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  rows={3}
                  placeholder="List medications and dosages or write 'None'"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Special Needs or Accommodations
                </label>
                <textarea
                  value={formData.specialNeeds}
                  onChange={(e) => updateField('specialNeeds', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  rows={3}
                  placeholder="Describe any special needs, learning accommodations, or other information we should know"
                />
              </div>
            </div>
          )}

          {/* Section 6: Promise Scholarship Interest */}
          {currentSection === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gold-leaf">
                <Award className="w-8 h-8 text-evergreen" />
                <h2 className="text-2xl font-bold text-evergreen">Georgia Promise Scholarship Interest</h2>
              </div>
              
              <div className="bg-gold-leaf/10 border-2 border-gold-leaf rounded-lg p-4 mb-6">
                <p className="text-evergreen-dark">
                  <strong>Reminder:</strong> The Georgia Promise Scholarship provides up to $6,500 annually for eligible students. 
                  Based on your school information, {eligibility?.isEligible 
                    ? 'your student appears to be eligible! 🎉' 
                    : 'your student may need to meet additional requirements.'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Are you interested in applying for the Georgia Promise Scholarship? *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="interestedInScholarship"
                      value="yes"
                      checked={formData.interestedInScholarship === 'yes'}
                      onChange={(e) => updateField('interestedInScholarship', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Yes, I plan to apply</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="interestedInScholarship"
                      value="maybe"
                      checked={formData.interestedInScholarship === 'maybe'}
                      onChange={(e) => updateField('interestedInScholarship', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Maybe, I need more information</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="interestedInScholarship"
                      value="no"
                      checked={formData.interestedInScholarship === 'no'}
                      onChange={(e) => updateField('interestedInScholarship', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>No, not at this time</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-evergreen mb-2">
                  Additional Notes or Questions about the Scholarship
                </label>
                <textarea
                  value={formData.scholarshipNotes}
                  onChange={(e) => updateField('scholarshipNotes', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold-leaf focus:outline-none"
                  rows={4}
                  placeholder="Share any questions or notes about the Georgia Promise Scholarship..."
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t-2 border-gray-200">
            <button
              onClick={prevSection}
              disabled={currentSection === 1}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-evergreen rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="text-sm text-gray-600">
              Section {currentSection} of 6
            </div>
            
            {currentSection < 6 ? (
              <button
                onClick={nextSection}
                disabled={!validateSection(currentSection)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-evergreen to-evergreen-light text-canvas-light rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!validateSection(6)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-br from-gold-leaf to-gold-dark text-evergreen-dark rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Registration
                <CheckCircle2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
