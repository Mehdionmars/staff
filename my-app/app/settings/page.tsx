import { auth } from '@clerk/nextjs'
import Header from '../components/Header'

export default function SettingsPage() {
  const { userId } = auth()

  if (!userId) {
    return <div>Not authenticated</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        {/* Add settings form or components here */}
        <p>Settings page content goes here.</p>
      </main>
    </div>
  )
}

