import React from 'react'
import {deleteTodo} from '../lib/actions'

export const DeleteTodo = ({id}: {id: string}) => {
  const deleteTodoWithId = deleteTodo.bind(null, id)

  return (
    <>
      <form action={deleteTodoWithId}>
        <button
          type="submit"
          className="block w-full rounded-md bg-red-500 px-1.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          Delete Todo
        </button>
      </form>
    </>
  )
}
