import {prisma} from '@/app/lib/database-prisma'
import {revalidatePath} from 'next/cache'
import {NextResponse} from 'next/server'

export const PATCH = async (
  request: Request,
  {params}: {params: {todoId: string}},
) => {
  const {todoId} = params
  const content = await request.json()

  try {
    const updatedDueDate = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        dueDate: content,
      },
    })
    revalidatePath(`/edit/${todoId}`)
    return NextResponse.json({
      data: updatedDueDate,
    })
  } catch (e) {
    console.log('error :', e)
    return NextResponse.json({error: 'Internal Server error'}, {status: 500})
  }
}
