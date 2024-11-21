import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import clientPromise from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const client = await clientPromise
  const db = client.db('todo-app')
  const result = await db.collection('todos').updateOne(
    { _id: new ObjectId(params.id), userId },
    { $set: { completed: true } }
  )

  if (result.matchedCount === 0) {
    return new NextResponse('Todo not found', { status: 404 })
  }

  return new NextResponse('Todo updated successfully', { status: 200 })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const client = await clientPromise
  const db = client.db('todo-app')
  const result = await db.collection('todos').deleteOne({
    _id: new ObjectId(params.id),
    userId,
  })

  if (result.deletedCount === 0) {
    return new NextResponse('Todo not found', { status: 404 })
  }

  return new NextResponse('Todo deleted successfully', { status: 200 })
}

