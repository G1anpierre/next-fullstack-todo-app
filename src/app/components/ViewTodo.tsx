import React from 'react'
import {SingleTodoType} from '../lib/types'
import Link from 'next/link'

export const ViewTodo = ({singleTodo}: {singleTodo: SingleTodoType}) => {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="title" className="sr-only">
          {singleTodo.title}
        </label>
        <div className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0 p-2">
          {singleTodo.title}
        </div>
        <label htmlFor="content" className="sr-only">
          {singleTodo.content}
        </label>
        <div className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 p-2">
          {singleTodo.content}
        </div>

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
        <div className="flex">
          {/* <StatusDropdown todoPosibleStatus={singleTodo.todoPosibleStatus} /> */}
          {/* <button
    type="button"
    className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
  >
    <PaperClipIcon
      className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
      aria-hidden="true"
    />
    <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
      Attach a file
    </span>
  </button> */}
        </div>
        <div className="flex-shrink-0">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go To-Do&apos;s
          </Link>
        </div>
      </div>
    </div>
  )
}
