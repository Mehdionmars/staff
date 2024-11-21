'use client'

import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">
          Todo App
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/todos" className="text-gray-600 hover:text-gray-900">
            Todos
          </Link>
          <Link href="/settings" className="text-gray-600 hover:text-gray-900">
            Settings
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  )
}

