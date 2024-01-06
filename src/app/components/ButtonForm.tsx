'use client'

import {useTranslations} from 'next-intl'
import {useFormStatus} from 'react-dom'
import {Loading} from './Loading'

export const ButtonForm = () => {
  const {pending} = useFormStatus()
  const t = useTranslations('Home')

  return (
    <button
      type="submit"
      className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      aria-disabled={pending}
      disabled={pending}
    >
      <div className="flex gap-2">
        {pending && <Loading />}
        {t('addButton')}
      </div>
    </button>
  )
}
