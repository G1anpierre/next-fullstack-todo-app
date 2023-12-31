import React from 'react'
// import Link from 'next/link'
import {classNamesLib, formattedStatus, statuses} from '../lib/utils'
import {format, formatDistance} from 'date-fns'
import {MenuTodo} from './MenuTodo'
import {SingleTodoType} from '../lib/types'
import {getTranslations} from 'next-intl/server'
import {Link} from '@/navigation'

export const Todo = async ({todo}: {todo: SingleTodoType}) => {
  const t = await getTranslations('Home')

  return (
    <li
      key={todo.todoId}
      className="flex items-center justify-between gap-x-6 py-5"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-x-3">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {todo.title}
          </p>
          <p
            className={classNamesLib(
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
            <span>{t('createAt')}: </span>
            <time dateTime={format(new Date(todo.createdAt), 'MM/dd/yyyy')}>
              {format(new Date(todo.createdAt), "MM/dd/yyyy '|' HH:mm")}
            </time>
          </p>
          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>
          {todo.dueDate ? (
            <p className="whitespace-nowrap text-red-500">
              <span>{t('dueDate')}: </span>
              <time dateTime={format(new Date(todo.dueDate), 'MM/dd/yyyy')}>
                {format(new Date(todo.dueDate), "MM/dd/yyyy '|' HH:mm")}
              </time>
            </p>
          ) : (
            <span>No {t('dueDate')}</span>
          )}
          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>
          {todo.dueDate ? (
            <p className="truncate text-gray-500">
              {formatDistance(new Date(todo.dueDate), new Date(), {
                addSuffix: true,
              })}
            </p>
          ) : null}
        </div>
        <div className="truncate text-gray-500 text-xs">
          {t('createBy', {name: `${todo?.author?.name}`})}
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <Link
          href={`/todo/${todo.todoId}`}
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
        >
          {t('viewTodo')}
          <span className="sr-only">, {todo.title}</span>
        </Link>

        <MenuTodo
          todo={todo}
          editText={t('editTodo')}
          deleteText={t('deleteTodo')}
        />
      </div>
    </li>
  )
}
