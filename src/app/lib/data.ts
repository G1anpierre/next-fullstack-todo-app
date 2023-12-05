import {prisma} from './database-prisma'
import {unstable_noStore as noStore} from 'next/cache'
import {z} from 'zod'
import {User} from './types'

export const SingleTodoSchema = z.object({
  todoId: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  status: z.string(),
  todoPosibleStatus: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  dueDate: z.date().nullable().optional(),
  authorId: z.string().nullable().optional(),
  author: z
    .object({
      name: z.string().nullable(),
    })
    .optional(),
})

export const TodosSchema = z.array(SingleTodoSchema)

export const getUser = async (email: string): Promise<User | any> => {
  noStore()
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch User by Email.')
  }
}

export const getTodos = async () => {
  noStore()
  try {
    const todos = await prisma.todo.findMany({
      include: {
        author: true,
      },
    })
    const validatedTodos = TodosSchema.parse(todos)
    return validatedTodos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch Todos.')
  }
}

export const getTodo = async (id: string) => {
  noStore()
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        todoId: id,
      },
    })

    const validatedTodo = SingleTodoSchema.parse(todo)
    return validatedTodo
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}
