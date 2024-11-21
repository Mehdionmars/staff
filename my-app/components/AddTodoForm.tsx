'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

export default function AddTodoForm() {
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const { user } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, assignedTo: assignedTo || user?.id }),
    })
    if (response.ok) {
      setTitle('')
      setAssignedTo('')
      // Optionally, you can trigger a refresh of the todo list here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex space-x-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          className="flex-grow p-2 border rounded"
          required
        />
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Assign to (user ID)"
          className="w-48 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Todo
        </button>
      </div>
    </form>
  )
}

