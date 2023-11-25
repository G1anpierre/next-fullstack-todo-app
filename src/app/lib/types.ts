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

export type SingleTodoType = z.infer<typeof SingleTodoSchema>
