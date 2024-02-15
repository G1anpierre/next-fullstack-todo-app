import {SignUpSchemaType} from './types'
import z from 'zod'

// * called from a client component
export const updateDueDate = async (todoId: string, content: Date) => {
  const response = await fetch(
    new Request(`/api/duedate/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(content),
    }),
  )

  const data = await response.json()
  return data
}


// * called from a client component
export const signUpUser = async (form: SignUpSchemaType) => {
  const response = await fetch(
    new Request(`/api/user`, {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        name: form.name,
        password: form.password,
      }),
    }),
  )

  const data = await response.json()
  return data
}

export const pricing = z.object({
  id: z.string(),
  product: z.string(),
  description: z.string(),
  features: z.array(z.object({
    name: z.string(),
  })),
  unitAmount: z.number(),
  interval: z.string().optional(),
  currency: z.string(),
  mostPopular: z.boolean(),
});


const pricingList = z.array(pricing);

// * called from a server component
export const getPricing = async () => {
  const response = await fetch(
    new Request(`${process.env.NEXTAUTH_URL}/api/stripe/stripeplans`, {
      method: 'GET',
    }),
  )

  const pricing = await response.json()

  const validatePricing =  pricingList.parse(pricing)
  return validatePricing
}
