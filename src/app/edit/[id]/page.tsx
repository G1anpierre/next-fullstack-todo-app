import {EditTodoForm} from '@/app/components/EditTodoForm'
import {Status} from '@/app/components/Status'
import {updateTodo} from '@/app/lib/actions'
import {getTodo} from '@/app/lib/data'
import React from 'react'

const EditPage = async ({params}: {params: {id: string}}) => {
  const singleTodo = await getTodo(params.id)
  const updateTodoWithId = updateTodo.bind(null, params.id)
  console.log('singleTodo :', singleTodo)
  return (
    <div>
      <Status status={singleTodo.status} />
      <EditTodoForm
        singleTodo={singleTodo}
        updateTodoWithId={updateTodoWithId}
      />
    </div>
  )
}

export default EditPage
