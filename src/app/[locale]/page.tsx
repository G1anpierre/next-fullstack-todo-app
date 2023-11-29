import React, {Suspense} from 'react'
import {Todos} from '../components/Todos'
import pick from 'lodash/pick'
import {AddTodoForm} from '../components/AddTodoForm'
import {LoadingTodos} from '../components/LoadingTodos'
import {NextIntlClientProvider, useMessages} from 'next-intl'

export default function Home() {
  const messages = useMessages()

  return (
    <main className="min-h-screen">
      <NextIntlClientProvider messages={pick(messages, 'Home')}>
        <AddTodoForm />
      </NextIntlClientProvider>
      <Suspense fallback={<LoadingTodos />}>
        <Todos />
      </Suspense>
    </main>
  )
}
