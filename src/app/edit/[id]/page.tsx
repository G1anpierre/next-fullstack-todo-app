import {EditTodoForm} from '@/app/components/EditTodoForm'
import {updateTodo} from '@/app/lib/actions'
import {getTodo} from '@/app/lib/data'
import React from 'react'

const EditPage = async ({params}: {params: {id: string}}) => {
  const singleTodo = await getTodo(params.id)
  const updateTodoWithId = updateTodo.bind(null, params.id)

  return (
    <div>
      <h1 className="">Edit</h1>
      <EditTodoForm
        singleTodo={singleTodo}
        updateTodoWithId={updateTodoWithId}
      />
    </div>
  )
}

export default EditPage
