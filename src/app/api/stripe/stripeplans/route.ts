import Stripe from 'stripe'
import {NextResponse} from 'next/server'

// * api/stripe/stripeplans

export const GET = async (request: Request) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  })
  const prices = await stripe.prices.list({
    active: true,
    limit: 3,
  })
  return NextResponse.json(prices)
}
