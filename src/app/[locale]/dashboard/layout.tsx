import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Notification} from '../../components/Notification'
import {notFound} from 'next/navigation'
import 'react-datepicker/dist/react-datepicker.css'
import {Header} from '../../components/Header'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'To-Do Dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="p-8 xl:p-24">{children}</div>
    </>
  )
}
