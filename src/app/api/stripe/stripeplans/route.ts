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

  const pricesData = prices.data


  const pricing = await Promise.all(pricesData.map(async (price) => {
    const product = await stripe.products.retrieve(price.product as string)

    return {
      id: price.id,
      product: product.name,
      description: product.description,
      features: product.features,
      unitAmount: price.unit_amount,
      interval: price.recurring?.interval,
      currency: price.currency,
      mostPopular: product.metadata.mostPopular === 'true' ? true : false,
    }
  }))

  return NextResponse.json(pricing)
}
