import { PrismaClient, GradeLevel, ProgramType, Location } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const admin = await prisma.admin.upsert({
    where: { email: 'hearn.sa@gmail.com' },
    update: {},
    create: {
      email: 'hearn.sa@gmail.com',
      name: 'Dr. Shawn A. Hearn',
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  const januarySaturdays = [
    new Date('2026-01-10'),
    new Date('2026-01-17'),
    new Date('2026-01-24'),
    new Date('2026-01-31'),
  ]

  const timeSlots = [
    { start: '8:00 AM', end: '9:30 AM' },
    { start: '10:00 AM', end: '11:30 AM' },
    { start: '12:00 PM', end: '1:30 PM' },
    { start: '2:00 PM', end: '3:30 PM' },
    { start: '4:00 PM', end: '5:30 PM' },
  ]

  const gradeLevels: { grade: GradeLevel; capacity: number }[] = [
    { grade: 'G35', capacity: 15 },
    { grade: 'G68', capacity: 15 },
    { grade: 'G912', capacity: 20 },
  ]

  // Locations to rotate through
  const locations: Location[] = [
    'WW_LAW_CENTER',
    'UCA',
    'CARVER_HEIGHTS',
    'LIBERTY_CITY',
    'TATUMVILLE',
  ]

  let sessionCount = 0

  // Create K-12 sessions
  for (const date of januarySaturdays) {
    for (const time of timeSlots) {
      // Rotate through locations
      const locationIndex = sessionCount % locations.length
      const location = locations[locationIndex]
      
      for (const gradeConfig of gradeLevels) {
        await prisma.session.create({
          data: {
            date,
            startTime: time.start,
            endTime: time.end,
            gradeLevel: gradeConfig.grade,
            programType: 'K12',
            capacity: gradeConfig.capacity,
            location,
          },
        })
        sessionCount++
      }
    }
  }

  console.log(`✅ Created ${sessionCount} K-12 sessions`)

  // Create Adult program sessions (no grade level)
  const adultSessionCount = sessionCount
  for (const date of januarySaturdays) {
    // Create 2 adult sessions per Saturday at different times
    const adultTimeSlots = [
      { start: '9:00 AM', end: '11:00 AM' },
      { start: '2:00 PM', end: '4:00 PM' },
    ]
    
    for (const time of adultTimeSlots) {
      const locationIndex = sessionCount % locations.length
      const location = locations[locationIndex]
      
      await prisma.session.create({
        data: {
          date,
          startTime: time.start,
          endTime: time.end,
          gradeLevel: null, // Adult programs don't have grade levels
          programType: 'ADULT',
          capacity: 25,
          location,
        },
      })
      sessionCount++
    }
  }

  console.log(`✅ Created ${sessionCount - adultSessionCount} Adult sessions`)
  console.log(`✅ Total sessions created: ${sessionCount}`)
  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }