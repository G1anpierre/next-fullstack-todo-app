'use client'
import React from 'react'
import {Fragment} from 'react'
import Link from 'next/link'
import {Menu, Transition} from '@headlessui/react'
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid'
import {SingleTodoType} from '../lib/types'
import {classNames} from '../lib/utils'
import {DeleteTodo} from './DeleteTodo'

export const MenuTodo = ({
  todo,
  editText,
  deleteText,
}: {
  todo: SingleTodoType
  editText: string
  deleteText: string
}) => {
  return (
    <Menu as="div" className="relative flex-none">
      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <Menu.Item>
            {({active}) => (
              <Link
                href={`/edit/${todo.id}`}
                className={classNames(
                  active ? 'bg-gray-50' : '',
                  'block px-3 py-1 text-sm leading-6 text-gray-900',
                )}
              >
                <span className="flex justify-center rounded-md bg-yellow-500 px-1.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">
                  {editText}
                  <span className="sr-only">, {todo.title}</span>
                </span>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({active}) => (
              <div
                className={classNames(
                  active ? 'bg-gray-50' : '',
                  'px-3 py-1 text-sm leading-6 text-gray-900',
                )}
              >
                <DeleteTodo id={todo.id} deleteText={deleteText} />
                {/* <span className="sr-only">, {todo.title}</span> */}
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
