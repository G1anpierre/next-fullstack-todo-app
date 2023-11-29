import React, {Suspense} from 'react'
import {Todos} from './components/Todos'
import {AddTodoForm} from './components/AddTodoForm'
import {LoadingTodos} from './components/LoadingTodos'

export default function Home() {
  return (
    <main className="min-h-screen">
      <AddTodoForm />
      <Suspense fallback={<LoadingTodos />}>
        <Todos />
      </Suspense>
    </main>
  )
}
