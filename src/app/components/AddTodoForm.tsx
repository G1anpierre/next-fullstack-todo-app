'use client'
import React, {useState} from 'react'
import {useTranslations} from 'next-intl'
import {useFormState} from 'react-dom'
import {createTodo} from '../lib/actions'
import {State} from '../lib/types'
import {toast} from 'sonner'
import {ButtonForm} from './ButtonForm'

export const AddTodoForm = () => {
  const refTitle = React.useRef<HTMLInputElement>(null)
  const refContent = React.useRef<HTMLTextAreaElement>(null)

  const initialState = {
    errors: {
      title: [],
    },
    message: '',
    success: false,
  } as State

  const clientAction = async (prevState: State, payLoad: FormData) => {
    // * Probably I could add setOptimisticUpdateHere
    const result = await createTodo(prevState, payLoad)
    if (result.errors) {
      toast.error(result.message)
    }
    if (result.success) {
      toast.success(result.message)
    }
    return result
  }

  const [state, dispatch] = useFormState(clientAction, initialState)

  const [title, setTitle] = useState('')

  const t = useTranslations('Home')

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
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
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
              className="block w-full rounded-md border-0 text-black bg-white/5 px-3.5 py-2 shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder={t('inputPlaceHolder')}
            />
          </div>
          <ButtonForm />
        </div>
        {state.errors.title && (
          <p className="mt-2 text-xs text-red-500">
            {state.errors.title.map((message: string) => (
              <span key={message}>*{message}</span>
            ))}
          </p>
        )}
        {title.length > 0 && (
          <div className="mt-4">
            <label htmlFor="content" className="sr-only">
              Description
            </label>
            <textarea
              ref={refContent}
              name="content"
              id="content"
              rows={4}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder={t('inputDescriptionPlace')}
            />
          </div>
        )}
      </div>
    </form>
  )
}
