import {SignUpSchemaType, StripePlanType} from './types'

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

// * called from a server component
export const getPricing = async () => {
  const response = await fetch(
    new Request(`${process.env.NEXTAUTH_URL}/api/stripe/stripeplans`, {
      method: 'GET',
    }),
  )

  const pricing = await response.json()
  return pricing.data as StripePlanType[]
}
