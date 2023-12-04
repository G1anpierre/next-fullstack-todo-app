'use server'
import {prisma} from './database-prisma'
import {z} from 'zod'
import {revalidatePath} from 'next/cache'
import {State} from './types'
import {getServerSession} from 'next-auth'
import auth from '../../../auth'

const rawFormDataSchema = z.object({
  title: z.string().min(3, {message: 'Must be 5 or more characters long'}),
  content: z.string().nullable().optional(),
  status: z.enum(['COMPLETE', 'IN_PROGRESS', 'PLANNED']).optional(),
})

export async function createTodo(prevState: State, formData: FormData) {
  const rawFormData = {
    title: formData.get('title'),
    content: formData.get('content'),
  }

  const validatedFormData = rawFormDataSchema.safeParse(rawFormData)

  if (!validatedFormData.success) {
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Todo',
      success: false,
    }
  }

  const session = await getServerSession(auth)

  try {
    await prisma.todo.create({
      data: {
        title: validatedFormData.data.title,
        content: validatedFormData.data.content,
        authorId: String(session?.user.id),
      },
    })
    revalidatePath('/')
    return {
      success: true,
      message: 'Todo Created',
      errors: {},
    }
  } catch (error: any) {
    return {
      errors: {},
      message: 'Database Error: Failed to Create Todo',
      success: false,
    }
  }
}

export const deleteTodo = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: {
        todoId: id,
      },
    })
    revalidatePath('/')
    return {
      errors: {},
      message: 'Todo Deleted',
      success: true,
    }
  } catch (error: any) {
    return {
      errors: {error: error.message},
      message: 'Database Error: Failed to Delete Todo',
      success: false,
    }
  }
}

export const updateTodo = async (
  id: string,
  prevState: any,
  formData: FormData,
) => {
  const rawFormData = {
    title: formData.get('title'),
    content: formData.get('content'),
    status: formData.get('status'),
  }

  const validatedFormData = rawFormDataSchema.safeParse(rawFormData)

  if (!validatedFormData.success) {
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Todo',
      success: false,
    }
  }

  try {
    await prisma.todo.update({
      where: {
        todoId: id,
      },
      data: {
        title: validatedFormData.data.title,
        content: validatedFormData.data.content,
        status: validatedFormData.data.status,
      },
    })
    revalidatePath(`/edit/${id}`)

    return {
      errors: {},
      message: 'Todo Updated',
      success: true,
    }
  } catch (error: any) {
    return {
      errors: {error: error.message},
      message: 'Database Error: Failed to Update Todo',
      success: false,
    }
  }
}

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  return null
}
