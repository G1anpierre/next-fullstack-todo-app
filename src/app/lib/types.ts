import {SingleTodoSchema} from './data'
import {z} from 'zod'
import {DefaultUser} from 'next-auth'
import { pricing } from './api'

export type StatusesType = {
  [key: string]: string
}

export type ProjectType = {
  id: string
  title: string
  content: string | null
  status: string
  createdAt: Date
  updatedAt: Date
  dueDate: Date | null
  authorId: string | null
}

export type State = {
  errors: {
    title?: string[]
  }
  message: string
  success: boolean
}

export type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultUser & {
      /** The user's postal address. */
      id: string
      stripeCustomerId: string
      isActive: boolean
    }
  }
  interface User extends DefaultUser {
    /** The user's postal address. */
    stripeCustomerId: string | null
    isActive: boolean
  }
}

export type SingleTodoType = z.infer<typeof SingleTodoSchema>

export const SignUpSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
})

export type SignInSchemaType = z.infer<typeof SignInSchema>

export type Pricing = z.infer<typeof pricing>;

export type StripePlanType = {
  id: string
  object: string
  active: boolean
  billing_scheme: string
  created: number
  currency: string
  custom_unit_amount: null
  livemode: boolean
  lookup_key: null
  metadata: Metadata
  nickname: null
  product: string
  recurring: null
  tax_behavior: string
  tiers_mode: null
  transform_quantity: null
  type: string
  unit_amount: number
  unit_amount_decimal: string
}

export type Metadata = {}
