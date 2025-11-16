import { PrismaClient, GradeLevel } from '@prisma/client'

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

  let sessionCount = 0

  for (const date of januarySaturdays) {
    for (const time of timeSlots) {
      for (const gradeConfig of gradeLevels) {
        await prisma.session.create({
          data: {
            date,
            startTime: time.start,
            endTime: time.end,
            gradeLevel: gradeConfig.grade,
            capacity: gradeConfig.capacity,
            location: 'WW Law Center',
          },
        })
        sessionCount++
      }
    }
  }

  console.log(`✅ Created ${sessionCount} sessions`)
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