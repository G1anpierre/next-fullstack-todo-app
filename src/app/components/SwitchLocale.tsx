import {Link} from '@/navigation'
import React from 'react'

export const SwitchLocale = () => {
  return (
    <div className="absolute top-10 right-10">
      <span className="isolate inline-flex rounded-md shadow-sm" />
      <Link
        href="/"
        locale="en"
        className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        EN
      </Link>
      <Link
        href="/"
        locale="es"
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        ES
      </Link>
    </div>
  )
}
