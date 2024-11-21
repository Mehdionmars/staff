import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import clientPromise from '../../../lib/mongodb'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const client = await clientPromise
  const db = client.db('todo-app')
  const todos = await db.collection('todos').find({ userId }).toArray()

  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { title, assignedTo } = await request.json()

  const client = await clientPromise
  const db = client.db('todo-app')
  const result = await db.collection('todos').insertOne({
    title,
    completed: false,
    userId,
    assignedTo,
    createdAt: new Date(),
  })

  return NextResponse.json({ _id: result.insertedId })
}

