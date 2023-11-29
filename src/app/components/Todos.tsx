import React from 'react'
import {getTodos} from '../lib/data'
import {Todo} from './Todo'

export const Todos = async () => {
  const todos = await getTodos()

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {todos.length === 0 ? (
        <div className="border flex justify-center align-center">
          Add your First To-Do
        </div>
      ) : null}
      {todos.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </ul>
  )
}
