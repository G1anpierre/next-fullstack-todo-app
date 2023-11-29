import {Breadcrumbs} from '@/app/components/Breadcrumbs'
import {Calendar} from '@/app/components/Calendar'
import {Status} from '@/app/components/Status'
import {ViewTodo} from '@/app/components/ViewTodo'
import {getTodo} from '@/app/lib/data'
import React from 'react'

const Page = async ({params}: {params: {id: string}}) => {
  const singleTodo = await getTodo(params.id)

  type CalendarInfoType = {
    id: string
    title: string
    date?: Date | null
  }

  const calendarInfo: CalendarInfoType[] = [
    {
      id: singleTodo.id,
      title: singleTodo.title,
      date: singleTodo.dueDate,
    },
  ]

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {label: `To-Do's`, href: '/'},
          {
            label: 'View To-Do',
            href: `/todo/${params.id}`,
            active: true,
          },
        ]}
      />
      <Status status={singleTodo.status} />
      <ViewTodo singleTodo={singleTodo} />
      <Calendar calendarInfo={calendarInfo} />
    </div>
  )
}

export default Page
