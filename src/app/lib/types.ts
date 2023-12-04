import {SingleTodoSchema} from './data'
import {z} from 'zod'

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
    user: {
      /** The user's postal address. */
      name: string
      email: string
      image: string
      id: string
    }
  }
}

export type SingleTodoType = z.infer<typeof SingleTodoSchema>
