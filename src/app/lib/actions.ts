'use server'
import {prisma} from './database-prisma'
import {z} from 'zod'
import {revalidatePath} from 'next/cache'

const rawFormDataSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
  }),
  content: z.string().nullable().optional(),
  status: z.enum(['COMPLETE', 'IN_PROGRESS', 'PLANNED']).optional(),
})

export async function createTodo(prevState: any, formData: FormData) {
  const rawFormData = {
    title: formData.get('title'),
    content: formData.get('content'),
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
        content: validatedFormData.data.content,
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
