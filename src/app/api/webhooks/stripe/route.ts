import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!
  
  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        
        // Update enrollment status
        await prisma.enrollment.update({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: {
            status: 'CONFIRMED',
            paymentStatus: 'PAID_IN_FULL',
            confirmedAt: new Date()
          }
        })
        break
        
      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object
        console.error('Payment failed:', failedIntent.id)
        break
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }
}
