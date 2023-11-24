import {Todos} from './components/Todos'
import {AddTodoForm} from './components/AddTodoForm'

export default function Home() {
  return (
    <main className="min-h-screen">
      <AddTodoForm />
      <Todos />
    </main>
  )
}
