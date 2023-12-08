'use client'

import {Link} from '@/navigation'
import React from 'react'
import {useParams} from 'next/navigation'
import classNames from 'classnames'

export const SwitchLocale = () => {
  const {locale} = useParams()

  const activeEnglish = classNames(
    'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus:z-10',
    {
      'bg-black text-white': locale === 'en',
      'bg-white text-black': locale === 'es',
    },
  )

  const activeSpanish = classNames(
    'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-500 focus:z-10',
    {
      'bg-black text-white': locale === 'es',
      'bg-white text-black': locale === 'en',
    },
  )

  return (
    <div>
      <span className="isolate inline-flex rounded-md shadow-sm" />
      <Link href="/dashboard" locale="en" className={activeEnglish}>
        EN
      </Link>
      <Link href="/dashboard" locale="es" className={activeSpanish}>
        ES
      </Link>
    </div>
  )
}
