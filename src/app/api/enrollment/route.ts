import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const {
      studentData,
      sessionId,
      paymentIntentId,
      amountPaid,
      paymentStatus
    } = await req.json()
    
    // Create student record
    const student = await prisma.student.create({
      data: {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        dateOfBirth: new Date(studentData.dateOfBirth),
        gradeLevel: studentData.gradeLevel,
        parentName: studentData.parentName,
        parentEmail: studentData.parentEmail,
        parentPhone: studentData.parentPhone,
        emergencyName: studentData.emergencyName,
        emergencyPhone: studentData.emergencyPhone,
        emergencyRelation: studentData.emergencyRelation,
        allergies: studentData.allergies,
        medications: studentData.medications,
        specialNeeds: studentData.specialNeeds
      }
    })
    
    // Create enrollment record
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        sessionId: sessionId,
        stripePaymentIntentId: paymentIntentId,
        amountPaid: Math.round(amountPaid * 100), // Store as cents
        paymentStatus: paymentStatus,
        paymentMethod: 'card',
        status: paymentStatus === 'PAID_IN_FULL' ? 'CONFIRMED' : 'PENDING'
      }
    })
    
    return NextResponse.json({
      success: true,
      enrollmentId: enrollment.id,
      studentId: student.id
    })
  } catch (error) {
    console.error('Enrollment creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}
