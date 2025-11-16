export const siteConfig = {
  name: 'RootWork Framework',
  description: 'Saturday Enrichment Program Registration',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  sessions: {
    pricePerSession: parseInt(process.env.PRICE_PER_SESSION || '7500'), // $75.00
    depositAmount: parseInt(process.env.DEPOSIT_AMOUNT || '4500'), // $45.00
    sessionDuration: 90,
    capacity: {
      G35: 15,   // Elementary: Grades 3-5
      G68: 15,   // Middle School: Grades 6-8
      G912: 20,  // High School: Grades 9-12
    },
  },
  gradeLevels: {
    G35: '3-5',
    G68: '6-8',
    G912: '9-12',
  },
  ageRange: {
    min: 10,
    max: 17,
  },
}
