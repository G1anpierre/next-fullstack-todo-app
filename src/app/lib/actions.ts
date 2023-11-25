'use server'
import {prisma} from './database-prisma'
import {z} from 'zod'
import {revalidatePath} from 'next/cache'
import {State} from './types'

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

  try {
    await prisma.todo.create({
      data: {
        title: validatedFormData.data.title,
        content: validatedFormData.data.content,
      },
    })
    revalidatePath('/')
    return {
      success: true,
      message: 'Todo Created',
      errors: {},
    }
  } catch (error: any) {
    console.log('error :', error)
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
        id: id,
      },
    })
  } catch (error) {
    console.log('error :', error)
    return {
      errors: error,
      message: 'Database Error: Failed to Delete Todo',
    }
  }
  revalidatePath('/')
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
    }
  }

  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title: validatedFormData.data.title,
        content: validatedFormData.data.content,
        status: validatedFormData.data.status,
      },
    })
  } catch (error) {
    return {
      errors: error,
      message: 'Database Error: Failed to Update Todo',
    }
  }
  revalidatePath('/')
}
