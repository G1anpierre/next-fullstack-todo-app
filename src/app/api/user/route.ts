import {getUser} from '@/app/lib/data'
import {prisma} from '@/app/lib/database-prisma'
import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  // const body = await req.json()
  // const {email, name, password} = body

  // return NextResponse.json({user: body, message: 'User created successfully'})

  try {
    const body = await req.json()
    const {email, name, password} = body

    // Check if email already exist
    const existingUserByEmail = await getUser(email)
    if (existingUserByEmail) {
      return NextResponse.json({
        message: 'Email already exist',
        success: false,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const customer = await stripe.customers.create({
      name,
      email,
    })
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        stripeCustomerId: customer.id,
      },
    })

    return NextResponse.json({
      user: newUser,
      message: 'User created successfully',
      success: true,
    })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({
      message: 'Database Error: Failed to Create User',
      success: false,
    })
  }
}
