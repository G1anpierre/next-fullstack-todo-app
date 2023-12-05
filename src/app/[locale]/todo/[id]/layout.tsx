import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {notFound} from 'next/navigation'
import 'react-datepicker/dist/react-datepicker.css'


export const metadata: Metadata = {
  title: 'To-Do View Page',
  description: 'To-Do View Page',
}

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="p-8 xl:p-24">{children}</div>
    </>
  )
}
