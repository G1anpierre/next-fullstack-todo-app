'use server'
import {prisma} from './database-prisma'
import {State} from './types'
import {z} from 'zod'
import {revalidatePath} from 'next/cache'

const rawFormDataSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
  }),
  content: z.string().nullable().optional(),
})

export async function createTodo(prevState: any, formData: FormData) {
  const rawFormData = {
    title: formData.get('title'),
  }

  const validatedFormData = rawFormDataSchema.safeParse(rawFormData)

  if (!validatedFormData.success) {
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Todo',
    }
  }

  try {
    await prisma.todo.create({
      data: {
        title: validatedFormData.data.title,
      },
    })
  } catch (error) {
    console.log('error :', error)
    return {
      errors: error,
      message: 'Database Error: Failed to Create Todo',
    }
  }
  revalidatePath('/')
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
