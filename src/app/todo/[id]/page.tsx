import {Breadcrumbs} from '@/app/components/Breadcrumbs'
import {Status} from '@/app/components/Status'
import {ViewTodo} from '@/app/components/ViewTodo'
import {getTodo} from '@/app/lib/data'
import React from 'react'

const Page = async ({params}: {params: {id: string}}) => {
  const singleTodo = await getTodo(params.id)

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
    </div>
  )
}

export default Page
