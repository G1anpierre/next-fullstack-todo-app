import {headers} from 'next/headers'
import Stripe from 'stripe'
import {Resend} from 'resend'
import {EmailTemplate} from '@/app/components/EmailTemplate'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})
const resend = new Resend(process.env.MAIL_RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const text = await request.text()
    const signature = headers().get('stripe-signature')!
    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const email = session.customer_details?.email
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [`${email}`],
        subject: 'Successful Purchase',
        react: EmailTemplate(),
      })
    }
    return new Response('ok', {status: 200})
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Webhook error: ${error.message}`, {
        status: 400,
      })
    }
  }
}
