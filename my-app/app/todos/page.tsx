import { auth } from '@clerk/nextjs'
import Header from '../components/Header'
import TodoList from '../components/TodoList'
import AddTodoForm from '../components/AddTodoForm'

export default function TodosPage() {
  const { userId } = auth()

  if (!userId) {
    return <div>Not authenticated</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Todos</h1>
        <AddTodoForm />
        <TodoList />
      </main>
    </div>
  )
}

