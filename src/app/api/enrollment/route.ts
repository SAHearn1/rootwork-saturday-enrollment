import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const {
      studentData,
      sessionId,
      paymentIntentId,
      amountPaid,
      paymentStatus
    } = await req.json()
    
    // Create student record with conditional fields
    const student = await prisma.student.create({
      data: {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        dateOfBirth: new Date(studentData.dateOfBirth),
        // K-12 specific fields (optional for adults)
        gradeLevel: studentData.gradeLevel || null,
        currentSchool: studentData.currentSchool || null,
        parentName: studentData.parentName || null,
        parentEmail: studentData.parentEmail || null,
        parentPhone: studentData.parentPhone || null,
        promiseEligible: studentData.promiseEligible || null,
        // Adult contact info (optional for K-12)
        email: studentData.email || null,
        phone: studentData.phone || null,
        // Emergency contact (required for all)
        emergencyName: studentData.emergencyName,
        emergencyPhone: studentData.emergencyPhone,
        emergencyRelation: studentData.emergencyRelation,
        // Medical info (optional for all)
        allergies: studentData.allergies || null,
        medications: studentData.medications || null,
        specialNeeds: studentData.specialNeeds || null
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
