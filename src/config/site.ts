export const siteConfig = {
  name: 'RootWork Framework',
  description: 'Saturday Enrichment Program Registration',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  sessions: {
    pricePerSession: parseInt(process.env.PRICE_PER_SESSION || '4000'),
    depositAmount: parseInt(process.env.DEPOSIT_AMOUNT || '2500'),
    sessionDuration: 90,
    capacity: 30,
  },
  gradeLevels: {
    K2: 'K-2',
    G35: '3-5',
    G68: '6-8',
    G912: '9-12',
  },
}
