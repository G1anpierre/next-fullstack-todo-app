'use client'
import React, {useState} from 'react'
import {useFormState} from 'react-dom'
import {createTodo} from '../lib/actions'
import {State} from '../lib/types'

export const AddTodoForm = () => {
  const refTitle = React.useRef<HTMLInputElement>(null)
  const refContent = React.useRef<HTMLTextAreaElement>(null)
  const initialState = {
    errors: {},
    message: '',
  } as State
  const [state, dispatch] = useFormState(createTodo, initialState)
  const [title, setTitle] = useState('')

  return (
    <form
      action={payload => {
        dispatch(payload)
        if (refTitle?.current) {
          refTitle.current.value = ''
        }
        if (refContent?.current) {
          refContent.current.value = ''
        }
        setTitle('')
      }}
      className="max-w-2xl mx-auto"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-x-4">
          <label htmlFor="title" className="sr-only">
            To-Do
          </label>
          <input
            onChange={e => setTitle(e.target.value)}
            ref={refTitle}
            id="title"
            name="title"
            type="text"
            defaultValue=""
            required
            className="flex-1 rounded-md border-0 text-black bg-white/5 px-3.5 py-2 shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Enter your new To-Do"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Add To-Do
          </button>
        </div>
        {title.length > 0 && (
          <div>
            <label htmlFor="content" className="sr-only">
              Description
            </label>
            <textarea
              ref={refContent}
              name="content"
              id="content"
              rows={4}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Optional: Enter your new To-Do Description"
            />
          </div>
        )}
      </div>
    </form>
  )
}
