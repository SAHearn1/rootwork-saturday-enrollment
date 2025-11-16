// Georgia Promise Scholarship Eligibility Data and Functions

export interface EligibleSchool {
  name: string
  type: 'elementary' | 'middle' | 'high'
  address: string
  zone?: string
}

// 18 Eligible Savannah-Chatham County Schools for Georgia Promise Scholarship
export const eligibleSCCPSSSchools: EligibleSchool[] = [
  // Elementary Schools
  {
    name: 'Robert W. Gadsden Elementary School',
    type: 'elementary',
    address: '919 May St, Savannah, GA 31401'
  },
  {
    name: 'Bishop Gilbert Haven Elementary School',
    type: 'elementary',
    address: '5111 Dillon Ave, Savannah, GA'
  },
  {
    name: 'School of Humanities at Juliette Gordon Low Elementary',
    type: 'elementary',
    address: '15 Blue Ridge Ave, Savannah, GA'
  },
  {
    name: 'Casimir Pulaski K-8 School',
    type: 'elementary',
    address: '1001 Tibet Ave, Savannah, GA'
  },
  {
    name: 'Windsor Forest Elementary',
    type: 'elementary',
    address: 'Savannah, GA'
  },
  
  // Middle Schools
  {
    name: 'DeRenne Middle School',
    type: 'middle',
    address: '1009 Clinch St, Savannah, GA'
  },
  {
    name: 'John W. Hubert Middle School',
    type: 'middle',
    address: '768 Grant St, Savannah, GA'
  },
  {
    name: 'George A. Mercer Middle School at Davis-Edwards-Harris Educational Complex',
    type: 'middle',
    address: '100 Priscilla D. Thomas Way, Garden City, GA'
  },
  {
    name: 'Lee Roy Myers Middle School',
    type: 'middle',
    address: '2025 E. 52nd St, Savannah, GA'
  },
  
  // High Schools
  {
    name: 'Robert W. Groves High School at Davis-Edwards-Harris Educational Complex',
    type: 'high',
    address: '100 Priscilla D. Thomas Way, Garden City, GA'
  },
  {
    name: 'Herschel V. Jenkins High School',
    type: 'high',
    address: '1800 E DeRenne Ave, Savannah, GA'
  },
  {
    name: 'School of Liberal Studies at Savannah High',
    type: 'high',
    address: '400 Pennsylvania Ave, Savannah, GA'
  }
]

// All eligible schools (for dropdown)
export const allSavannahSchools = [
  ...eligibleSCCPSSSchools,
  // Add non-eligible schools for completeness
  { name: 'Other Savannah-Chatham Public School', type: 'elementary' as const, address: '' },
  { name: 'Private School', type: 'elementary' as const, address: '' },
  { name: 'Homeschool', type: 'elementary' as const, address: '' },
  { name: 'Out of District', type: 'elementary' as const, address: '' },
]

export interface PromiseScholarshipEligibility {
  isEligible: boolean
  schoolQualifies: boolean
  reasons: string[]
  nextSteps?: string[]
}

export function checkPromiseScholarshipEligibility(
  schoolName: string,
  yearsInGeorgia: number,
  enrolledTwoSemesters: boolean,
  isRisingKindergarten: boolean,
  receivingOtherScholarships: boolean
): PromiseScholarshipEligibility {
  const reasons: string[] = []
  const nextSteps: string[] = []
  
  // Check if school is on eligible list
  const schoolQualifies = eligibleSCCPSSSchools.some(
    school => school.name.toLowerCase() === schoolName.toLowerCase()
  )
  
  if (!schoolQualifies) {
    reasons.push('Student is not zoned for an eligible Georgia Promise Scholarship school')
  }
  
  // Check residency requirement
  if (yearsInGeorgia < 1) {
    reasons.push('Parent/guardian must be a Georgia resident for at least 1 year')
  }
  
  // Check enrollment requirement
  if (!isRisingKindergarten && !enrolledTwoSemesters) {
    reasons.push('Student must be enrolled in a GA public school for 2 consecutive semesters')
  }
  
  // Check other scholarships
  if (receivingOtherScholarships) {
    reasons.push('Cannot receive Georgia Promise Scholarship while receiving GA Special Needs Scholarship or SSO funds')
  }
  
  const isEligible = schoolQualifies && 
                     yearsInGeorgia >= 1 && 
                     (isRisingKindergarten || enrolledTwoSemesters) &&
                     !receivingOtherScholarships
  
  if (isEligible) {
    nextSteps.push('Apply at mygeorgiapromise.org between November 10 - December 12, 2025')
    nextSteps.push('Prepare proof of residency (GA driver\'s license or state ID)')
    nextSteps.push('Prepare proof of income (most recent federal 1040 tax form)')
    nextSteps.push('Prepare proof of enrollment (report card or school letter)')
  }
  
  return {
    isEligible,
    schoolQualifies,
    reasons: isEligible ? ['All eligibility criteria met!'] : reasons,
    nextSteps: isEligible ? nextSteps : undefined
  }
}

export const promiseScholarshipInfo = {
  amount: 6500,
  applicationDeadline: 'December 12, 2025',
  applicationUrl: 'https://mygeorgiapromise.org',
  programDetails: {
    description: 'The Georgia Promise Scholarship provides up to $6,500 per student annually for educational expenses including private school tuition, tutoring, textbooks, and therapeutic services.',
    eligibleUses: [
      'Private school tuition and fees',
      'Tutoring services by certified educators',
      'Textbooks and curriculum materials',
      'Occupational, behavioral, physical, or speech-language therapy',
      'Transportation to service providers (up to $500/year)'
    ],
    requirements: [
      'Student must be zoned for an eligible school in the bottom 25% of GA public schools',
      'Student must be enrolled in GA public school for 2 consecutive semesters (or rising kindergarten)',
      'Parent/guardian must be GA resident for 1+ years (except active-duty military)',
      'Cannot receive other GA scholarships (Special Needs or SSO) simultaneously'
    ]
  }
}
