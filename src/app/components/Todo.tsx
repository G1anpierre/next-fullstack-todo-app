import React from 'react'
import Link from 'next/link'
import {classNames, formattedStatus, statuses} from '../lib/utils'
import {format} from 'date-fns'
import {MenuTodo} from './MenuTodo'
import {SingleTodoType} from '../lib/types'

export const Todo = ({todo}: {todo: SingleTodoType}) => {
  return (
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
        <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-x-2 text-xs leading-5 ">
          <p className="whitespace-nowrap text-green-500">
            Created at:{' '}
            <time dateTime={format(new Date(todo.createdAt), 'MM/dd/yyyy')}>
              {format(new Date(todo.createdAt), "MM/dd/yyyy 'T' HH:mm:ss")}
            </time>
          </p>
          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>
          {todo.dueDate ? (
            <p className="whitespace-nowrap text-red-500">
              Due Date:{' '}
              <time dateTime={format(new Date(todo.dueDate), 'MM/dd/yyyy')}>
                {format(new Date(todo.dueDate), "MM/dd/yyyy 'T' HH:mm:ss")}
              </time>
            </p>
          ) : (
            'No Due Date'
          )}
          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>
          <p className="truncate text-gray-500">by Gianpierre</p>
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
  )
}
