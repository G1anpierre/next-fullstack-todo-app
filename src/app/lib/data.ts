import {prisma} from './database-prisma'
import {unstable_noStore as noStore} from 'next/cache'
import {z} from 'zod'

export const getTodos = async () => {
  noStore()
  try {
    const todos = await prisma.todo.findMany()
    return todos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}

export const SingleTodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  dueDate: z.date().nullable().optional(),
  authorId: z.string().nullable().optional(),
})

export const getTodo = async (id: string) => {
  noStore()
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    })

    const validatedTodo = SingleTodoSchema.parse(todo)
    return validatedTodo
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}
