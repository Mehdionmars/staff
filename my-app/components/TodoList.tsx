'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

interface Todo {
  _id: string
  title: string
  completed: boolean
  assignedTo: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const { user } = useUser()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await fetch('/api/todos')
    const data = await response.json()
    setTodos(data)
  }

  const toggleTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: 'PATCH' })
    fetchTodos()
  }

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    fetchTodos()
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo._id} className="flex items-center justify-between bg-white p-4 rounded shadow">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id)}
              className="mr-2"
            />
            <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
          </div>
          <div>
            <span className="mr-4 text-sm text-gray-500">
              Assigned to: {todo.assignedTo === user?.id ? 'You' : todo.assignedTo}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

