'use client'
import React from 'react'
import {useFormState} from 'react-dom'
import {createTodo} from '../lib/actions'
import {State} from '../lib/types'

export const AddTodoForm = () => {
  const ref = React.useRef<HTMLInputElement>(null)
  const initialState = {
    errors: {},
    message: '',
  } as State
  const [state, dispatch] = useFormState(createTodo, initialState)

  return (
    <form
      action={payload => {
        dispatch(payload)
        if (ref?.current) {
          ref.current.value = ''
        }
      }}
      className="max-w-2xl mx-auto"
    >
      <div className="mt-6 flex gap-x-4">
        <label htmlFor="title" className="sr-only">
          Todo
        </label>
        <input
          ref={ref}
          id="title"
          name="title"
          type="text"
          defaultValue=""
          required
          className="min-w-0 flex-auto rounded-md border-0 text-black bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="Enter your new todo"
        />
        <button
          type="submit"
          className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Add Todo
        </button>
      </div>
    </form>
  )
}
