import React from 'react'
import Link from 'next/link'
import {MenuTodo} from './MenuTodo'
import {classNames, formattedStatus, statuses} from '../lib/utils'
import {getTodos} from '../lib/data'

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
        <li
          key={todo.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {todo.title}
              </p>
              <p
                className={classNames(
                  statuses[todo.status],
                  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                )}
              >
                {formattedStatus(todo.status)}
              </p>
              <p className="gap-x-2 text-xs leading-5 truncate text-gray-600 max-w-[140px]">
                {todo.content}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                created at:{' '}
                <time dateTime={new Date(todo.createdAt).toLocaleDateString()}>
                  {new Date(todo.createdAt).toLocaleTimeString()}
                </time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">by Gianpierre</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <Link
              href={`/todo/${todo.id}`}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View To-Do<span className="sr-only">, {todo.title}</span>
            </Link>
            <MenuTodo todo={todo} />
          </div>
        </li>
      ))}
    </ul>
  )
}
